import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const contentRoot = path.join(rootDir, 'src', 'content');

const collectionNames = ['phases', 'subjects', 'systems', 'topics', 'conditions', 'presentations', 'diagrams', 'drugs', 'investigations', 'sources'];
const entries = new Map();
const failures = [];
const warnings = [];

function readMarkdownFiles(dir) {
	const results = [];
	const items = fs.readdirSync(dir, { withFileTypes: true });

	for (const item of items) {
		const nextPath = path.join(dir, item.name);
		if (item.isDirectory()) {
			results.push(...readMarkdownFiles(nextPath));
			continue;
		}

		if (item.isFile() && item.name.endsWith('.md')) {
			results.push(nextPath);
		}
	}

	return results;
}

function parseFrontmatter(filePath) {
	const raw = fs.readFileSync(filePath, 'utf8');
	const match = raw.match(/^---\n([\s\S]*?)\n---/);

	if (!match) {
		throw new Error(`Missing frontmatter in ${filePath}`);
	}

	return yaml.load(match[1]);
}

function addFailure(message) {
	failures.push(message);
}

function addWarning(message) {
	warnings.push(message);
}

function getCollectionMap(name) {
	const map = entries.get(name);
	if (!map) {
		throw new Error(`Unknown collection: ${name}`);
	}
	return map;
}

function assertRefs({ collection, slug, field, targetCollection, value, isArray = true }) {
	if (isArray) {
		if (!Array.isArray(value)) {
			addFailure(`[${collection}:${slug}] field "${field}" must be an array`);
			return;
		}

		for (const ref of value) {
			if (!getCollectionMap(targetCollection).has(ref)) {
				addFailure(`[${collection}:${slug}] field "${field}" points to missing ${targetCollection} slug "${ref}"`);
			}
		}
		return;
	}

	if (typeof value !== 'string') {
		addFailure(`[${collection}:${slug}] field "${field}" must be a string`);
		return;
	}

	if (!getCollectionMap(targetCollection).has(value)) {
		addFailure(`[${collection}:${slug}] field "${field}" points to missing ${targetCollection} slug "${value}"`);
	}
}

for (const collectionName of collectionNames) {
	const dir = path.join(contentRoot, collectionName);
	const files = fs.existsSync(dir) ? readMarkdownFiles(dir) : [];
	const map = new Map();

	for (const filePath of files) {
		const data = parseFrontmatter(filePath);
		const slug = data?.slug;

		if (!slug || typeof slug !== 'string') {
			addFailure(`[${collectionName}] ${path.relative(rootDir, filePath)} is missing a valid slug`);
			continue;
		}

		if (map.has(slug)) {
			addFailure(`[${collectionName}] duplicate slug "${slug}"`);
			continue;
		}

		map.set(slug, { data, filePath });
	}

	entries.set(collectionName, map);
}

for (const [slug, entry] of getCollectionMap('phases')) {
	assertRefs({ collection: 'phases', slug, field: 'subjects', targetCollection: 'subjects', value: entry.data.subjects ?? [] });
	assertRefs({ collection: 'phases', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'phases', slug, field: 'startHere', targetCollection: 'topics', value: entry.data.startHere ?? [] });

	for (const subjectSlug of entry.data.subjects ?? []) {
		const subject = getCollectionMap('subjects').get(subjectSlug);
		if (subject?.data.phase !== slug) {
			addFailure(`[phases:${slug}] subject "${subjectSlug}" belongs to phase "${subject?.data.phase ?? 'unknown'}"`);
		}
	}

	for (const systemSlug of entry.data.systems ?? []) {
		const system = getCollectionMap('systems').get(systemSlug);
		if (system?.data.phase !== slug) {
			addFailure(`[phases:${slug}] system "${systemSlug}" belongs to phase "${system?.data.phase ?? 'unknown'}"`);
		}
	}

	for (const topicSlug of entry.data.startHere ?? []) {
		const topic = getCollectionMap('topics').get(topicSlug);
		if (topic?.data.phase !== slug) {
			addFailure(`[phases:${slug}] startHere topic "${topicSlug}" belongs to phase "${topic?.data.phase ?? 'unknown'}"`);
		}
	}
}

for (const [slug, entry] of getCollectionMap('subjects')) {
	assertRefs({ collection: 'subjects', slug, field: 'phase', targetCollection: 'phases', value: entry.data.phase, isArray: false });
	assertRefs({ collection: 'subjects', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'subjects', slug, field: 'topicSlugs', targetCollection: 'topics', value: entry.data.topicSlugs ?? [] });

	for (const systemSlug of entry.data.systems ?? []) {
		const system = getCollectionMap('systems').get(systemSlug);
		if (system && !(system.data.subjects ?? []).includes(slug)) {
			addFailure(`[subjects:${slug}] linked system "${systemSlug}" does not link back to the subject`);
		}
	}

	for (const topicSlug of entry.data.topicSlugs ?? []) {
		const topic = getCollectionMap('topics').get(topicSlug);
		if (topic?.data.subject !== slug) {
			addFailure(`[subjects:${slug}] topic "${topicSlug}" belongs to subject "${topic?.data.subject ?? 'unknown'}"`);
		}
	}
}

for (const [slug, entry] of getCollectionMap('systems')) {
	assertRefs({ collection: 'systems', slug, field: 'phase', targetCollection: 'phases', value: entry.data.phase, isArray: false });
	assertRefs({ collection: 'systems', slug, field: 'subjects', targetCollection: 'subjects', value: entry.data.subjects ?? [] });
	assertRefs({ collection: 'systems', slug, field: 'anchorTopics', targetCollection: 'topics', value: entry.data.anchorTopics ?? [] });

	for (const topicSlug of entry.data.anchorTopics ?? []) {
		const topic = getCollectionMap('topics').get(topicSlug);
		if (topic && !(topic.data.systems ?? []).includes(slug)) {
			addFailure(`[systems:${slug}] anchor topic "${topicSlug}" does not link back to the system`);
		}
	}
}

for (const [slug, entry] of getCollectionMap('topics')) {
	assertRefs({ collection: 'topics', slug, field: 'phase', targetCollection: 'phases', value: entry.data.phase, isArray: false });
	assertRefs({ collection: 'topics', slug, field: 'subject', targetCollection: 'subjects', value: entry.data.subject, isArray: false });
	assertRefs({ collection: 'topics', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'topics', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });
	assertRefs({ collection: 'topics', slug, field: 'diagramSlugs', targetCollection: 'diagrams', value: entry.data.diagramSlugs ?? [] });
	assertRefs({ collection: 'topics', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });

	if ((entry.data.relatedTopics ?? []).includes(slug)) {
		addFailure(`[topics:${slug}] relatedTopics must not include the topic itself`);
	}

	const subject = getCollectionMap('subjects').get(entry.data.subject);
	if (subject?.data.phase !== entry.data.phase) {
		addFailure(`[topics:${slug}] subject "${entry.data.subject}" belongs to phase "${subject?.data.phase ?? 'unknown'}" but the topic is in "${entry.data.phase}"`);
	}

	if ((entry.data.sourceSlugs ?? []).length === 0) {
		addWarning(`[topics:${slug}] has no linked sources yet`);
	}
}

for (const [slug, entry] of getCollectionMap('conditions')) {
	assertRefs({ collection: 'conditions', slug, field: 'primarySubject', targetCollection: 'subjects', value: entry.data.primarySubject, isArray: false });
	assertRefs({ collection: 'conditions', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'conditions', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });
	assertRefs({ collection: 'conditions', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });

	if ((entry.data.relatedTopics ?? []).length === 0) {
		addWarning(`[conditions:${slug}] has no related foundational topics`);
	}

	if ((entry.data.sourceSlugs ?? []).length === 0) {
		addWarning(`[conditions:${slug}] has no linked sources yet`);
	}

	for (const topicSlug of entry.data.relatedTopics ?? []) {
		const topic = getCollectionMap('topics').get(topicSlug);
		if (topic && !((topic.data.systems ?? []).some((systemSlug) => (entry.data.systems ?? []).includes(systemSlug)))) {
			addWarning(`[conditions:${slug}] related topic "${topicSlug}" does not share a linked system`);
		}
	}
}

for (const [slug, entry] of getCollectionMap('presentations')) {
	assertRefs({ collection: 'presentations', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'presentations', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });
	assertRefs({ collection: 'presentations', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });
	assertRefs({ collection: 'presentations', slug, field: 'relatedConditions', targetCollection: 'conditions', value: entry.data.relatedConditions ?? [] });

	if ((entry.data.sourceSlugs ?? []).length === 0) {
		addWarning(`[presentations:${slug}] has no linked sources yet`);
	}
}

for (const [slug, entry] of getCollectionMap('diagrams')) {
	assertRefs({ collection: 'diagrams', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'diagrams', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });
	assertRefs({ collection: 'diagrams', slug, field: 'relatedConditions', targetCollection: 'conditions', value: entry.data.relatedConditions ?? [] });
	assertRefs({ collection: 'diagrams', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });

	if (typeof entry.data.assetPath !== 'string' || !entry.data.assetPath.startsWith('/')) {
		addFailure(`[diagrams:${slug}] field "assetPath" must be an absolute public path`);
	} else {
		const assetPath = path.join(rootDir, 'public', entry.data.assetPath.replace(/^\//, ''));
		if (!fs.existsSync(assetPath)) {
			addFailure(`[diagrams:${slug}] assetPath points to missing file "${entry.data.assetPath}"`);
		}
	}

	if ((entry.data.relatedTopics ?? []).length === 0 && (entry.data.relatedConditions ?? []).length === 0) {
		addWarning(`[diagrams:${slug}] is not linked to a topic or condition yet`);
	}
}

for (const [slug, entry] of getCollectionMap('drugs')) {
	assertRefs({ collection: 'drugs', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'drugs', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });
	assertRefs({ collection: 'drugs', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });
	assertRefs({ collection: 'drugs', slug, field: 'relatedConditions', targetCollection: 'conditions', value: entry.data.relatedConditions ?? [] });
	assertRefs({ collection: 'drugs', slug, field: 'relatedPresentations', targetCollection: 'presentations', value: entry.data.relatedPresentations ?? [] });

	if ((entry.data.sourceSlugs ?? []).length === 0) {
		addWarning(`[drugs:${slug}] has no linked sources yet`);
	}

	if (
		(entry.data.relatedTopics ?? []).length === 0 &&
		(entry.data.relatedConditions ?? []).length === 0 &&
		(entry.data.relatedPresentations ?? []).length === 0
	) {
		addWarning(`[drugs:${slug}] is not linked to a topic, condition, or presentation yet`);
	}
}

for (const [slug, entry] of getCollectionMap('investigations')) {
	assertRefs({ collection: 'investigations', slug, field: 'systems', targetCollection: 'systems', value: entry.data.systems ?? [] });
	assertRefs({ collection: 'investigations', slug, field: 'sourceSlugs', targetCollection: 'sources', value: entry.data.sourceSlugs ?? [] });
	assertRefs({ collection: 'investigations', slug, field: 'relatedTopics', targetCollection: 'topics', value: entry.data.relatedTopics ?? [] });
	assertRefs({ collection: 'investigations', slug, field: 'relatedConditions', targetCollection: 'conditions', value: entry.data.relatedConditions ?? [] });
	assertRefs({ collection: 'investigations', slug, field: 'relatedPresentations', targetCollection: 'presentations', value: entry.data.relatedPresentations ?? [] });

	if ((entry.data.sourceSlugs ?? []).length === 0) {
		addWarning(`[investigations:${slug}] has no linked sources yet`);
	}

	if (
		(entry.data.relatedTopics ?? []).length === 0 &&
		(entry.data.relatedConditions ?? []).length === 0 &&
		(entry.data.relatedPresentations ?? []).length === 0
	) {
		addWarning(`[investigations:${slug}] is not linked to a topic, condition, or presentation yet`);
	}
}

for (const [slug] of getCollectionMap('sources')) {
	const topicUsage = [...getCollectionMap('topics').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	const conditionUsage = [...getCollectionMap('conditions').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	const presentationUsage = [...getCollectionMap('presentations').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	const diagramUsage = [...getCollectionMap('diagrams').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	const drugUsage = [...getCollectionMap('drugs').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	const investigationUsage = [...getCollectionMap('investigations').values()].filter((entry) => (entry.data.sourceSlugs ?? []).includes(slug));
	if (
		topicUsage.length === 0 &&
		conditionUsage.length === 0 &&
		presentationUsage.length === 0 &&
		diagramUsage.length === 0 &&
		drugUsage.length === 0 &&
		investigationUsage.length === 0
	) {
		addWarning(`[sources:${slug}] is not linked from any topic, condition, presentation, diagram, drug, or investigation yet`);
	}
}

if (warnings.length > 0) {
	console.warn('Warnings:');
	for (const warning of warnings) {
		console.warn(`- ${warning}`);
	}
}

if (failures.length > 0) {
	console.error('Content lint failed:');
	for (const failure of failures) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log(`Content lint passed for ${collectionNames.length} collections.`);
