import { withBase } from './content';

export const siteName = 'Med Wiki';

export const navItems = [
	{ href: withBase('/phases'), label: 'Phases' },
	{ href: withBase('/subjects'), label: 'Subjects' },
	{ href: withBase('/systems'), label: 'Systems' },
	{ href: withBase('/topics'), label: 'Topics' },
	{ href: withBase('/search'), label: 'Search' },
];
