import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const phases = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/phases' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		order: z.number(),
		duration: z.string(),
		summary: z.string(),
		focus: z.string(),
		subjects: z.array(z.string()).default([]),
		systems: z.array(z.string()).default([]),
		startHere: z.array(z.string()).default([]),
	}),
});

const subjects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/subjects' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		phase: z.string(),
		summary: z.string(),
		whyItMatters: z.string(),
		coreBlocks: z.array(z.string()).default([]),
		systems: z.array(z.string()).default([]),
		skills: z.array(z.string()).default([]),
		topicSlugs: z.array(z.string()).default([]),
	}),
});

const systems = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/systems' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		phase: z.string(),
		summary: z.string(),
		whyItMatters: z.string(),
		subjects: z.array(z.string()).default([]),
		anchorTopics: z.array(z.string()).default([]),
	}),
});

const topics = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		phase: z.string(),
		subject: z.string(),
		systems: z.array(z.string()).default([]),
		summary: z.string(),
		studyGoal: z.string(),
		audience: z.enum(['mbbs-foundation', 'mbbs-clinical', 'mixed']).default('mbbs-foundation'),
		maturity: z.enum(['seed', 'reviewed', 'expanded']).default('seed'),
		lastReviewed: z.coerce.date(),
		highYield: z.array(z.string()).default([]),
		examFocus: z.array(z.string()).default([]),
		clinicalBridge: z.string(),
		sourceSlugs: z.array(z.string()).default([]),
		diagramSlugs: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
	}),
});

const conditions = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/conditions' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		primarySubject: z.string(),
		systems: z.array(z.string()).default([]),
		summary: z.string(),
		presentation: z.string(),
		whyItMatters: z.string(),
		maturity: z.enum(['seed', 'reviewed', 'expanded']).default('seed'),
		lastReviewed: z.coerce.date(),
		redFlags: z.array(z.string()).default([]),
		workup: z.array(z.string()).default([]),
		firstLine: z.array(z.string()).default([]),
		whenToRefer: z.array(z.string()).default([]),
		sourceSlugs: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
	}),
});

const presentations = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/presentations' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		systems: z.array(z.string()).default([]),
		summary: z.string(),
		whyItMatters: z.string(),
		maturity: z.enum(['seed', 'reviewed', 'expanded']).default('seed'),
		lastReviewed: z.coerce.date(),
		firstQuestions: z.array(z.string()).default([]),
		redFlags: z.array(z.string()).default([]),
		firstSteps: z.array(z.string()).default([]),
		sourceSlugs: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
		relatedConditions: z.array(z.string()).default([]),
	}),
});

const diagrams = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/diagrams' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		diagramType: z.enum([
			'Anatomy schematic',
			'Physiology flow',
			'Biochemistry pathway',
			'Imaging framework',
			'Clinical algorithm',
		]),
		assetPath: z.string(),
		summary: z.string(),
		caption: z.string(),
		alt: z.string(),
		whyItMatters: z.string(),
		sourceBasis: z.string(),
		lastReviewed: z.coerce.date(),
		whatToNotice: z.array(z.string()).default([]),
		systems: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
		relatedConditions: z.array(z.string()).default([]),
		sourceSlugs: z.array(z.string()).default([]),
	}),
});

const drugs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/drugs' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		drugClass: z.string(),
		systems: z.array(z.string()).default([]),
		summary: z.string(),
		whyItMatters: z.string(),
		maturity: z.enum(['seed', 'reviewed', 'expanded']).default('seed'),
		lastReviewed: z.coerce.date(),
		coreUses: z.array(z.string()).default([]),
		majorCautions: z.array(z.string()).default([]),
		commonAdverseEffects: z.array(z.string()).default([]),
		keyPoints: z.array(z.string()).default([]),
		sourceSlugs: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
		relatedConditions: z.array(z.string()).default([]),
		relatedPresentations: z.array(z.string()).default([]),
	}),
});

const investigations = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/investigations' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		investigationType: z.enum(['Lab test', 'Imaging', 'Bedside test', 'Microbiology']),
		systems: z.array(z.string()).default([]),
		summary: z.string(),
		whyItMatters: z.string(),
		maturity: z.enum(['seed', 'reviewed', 'expanded']).default('seed'),
		lastReviewed: z.coerce.date(),
		whatItShows: z.array(z.string()).default([]),
		commonUses: z.array(z.string()).default([]),
		importantPatterns: z.array(z.string()).default([]),
		sourceSlugs: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
		relatedConditions: z.array(z.string()).default([]),
		relatedPresentations: z.array(z.string()).default([]),
	}),
});

const sources = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/sources' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		publisher: z.string(),
		sourceType: z.enum(['official', 'guideline', 'textbook', 'reference']),
		tier: z.enum(['primary', 'core-text', 'supporting']).default('primary'),
		url: z.string().url().optional(),
		edition: z.string().optional(),
		description: z.string(),
		recommendedFor: z.array(z.string()).default([]),
		lastReviewed: z.coerce.date(),
	}),
});

export const collections = {
	phases,
	subjects,
	systems,
	topics,
	conditions,
	presentations,
	diagrams,
	drugs,
	investigations,
	sources,
};
