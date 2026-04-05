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
		highYield: z.array(z.string()).default([]),
		examFocus: z.array(z.string()).default([]),
		clinicalBridge: z.string(),
		references: z.array(z.string()).default([]),
		relatedTopics: z.array(z.string()).default([]),
	}),
});

export const collections = {
	phases,
	subjects,
	systems,
	topics,
};
