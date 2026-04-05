type LinkedCollection = 'phases' | 'subjects' | 'systems' | 'topics' | 'sources';

const collectionPaths: Record<LinkedCollection, string> = {
	phases: '/phases',
	subjects: '/subjects',
	systems: '/systems',
	topics: '/topics',
	sources: '/sources',
};

type SluggedEntry = {
	data: {
		slug: string;
		title: string;
	};
};

export function withBase(path: string) {
	if (!path || path === '/') {
		return import.meta.env.BASE_URL;
	}

	if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#')) {
		return path;
	}

	if (path.startsWith(import.meta.env.BASE_URL)) {
		return path;
	}

	const normalized = path.startsWith('/') ? path.slice(1) : path;
	return `${import.meta.env.BASE_URL}${normalized}`;
}

export function getEntryHref(collection: LinkedCollection, slug: string) {
	return withBase(`${collectionPaths[collection]}/${slug}`);
}

export function resolveBySlugs<T extends SluggedEntry>(entries: T[], slugs: string[] = []) {
	const index = new Map(entries.map((entry) => [entry.data.slug, entry]));
	return slugs.map((slug) => index.get(slug)).filter(Boolean) as T[];
}

export function filterByRelationship<T extends { data: Record<string, unknown> }>(
	entries: T[],
	field: string,
	slug: string,
) {
	return entries.filter((entry) => {
		const value = entry.data[field];
		return Array.isArray(value) && value.includes(slug);
	});
}

export function sortByNumericField<T extends { data: Record<string, unknown> }>(entries: T[], field: string) {
	return [...entries].sort((left, right) => {
		const leftValue = left.data[field];
		const rightValue = right.data[field];
		if (typeof leftValue !== 'number' || typeof rightValue !== 'number') {
			return 0;
		}
		return leftValue - rightValue;
	});
}

export function sortByTitle<T extends { data: { title: string } }>(entries: T[]) {
	return [...entries].sort((left, right) => left.data.title.localeCompare(right.data.title));
}

export function uniqueBySlug<T extends SluggedEntry>(entries: T[]) {
	const seen = new Set<string>();
	return entries.filter((entry) => {
		if (seen.has(entry.data.slug)) {
			return false;
		}
		seen.add(entry.data.slug);
		return true;
	});
}

export function formatDate(value: Date) {
	return new Intl.DateTimeFormat('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(value);
}
