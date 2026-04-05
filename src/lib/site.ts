import { withBase } from './content';

export const siteName = 'Med Wiki';

export const navItems = [
	{ href: withBase('/phases'), label: 'Phases' },
	{ href: withBase('/subjects'), label: 'Subjects' },
	{ href: withBase('/systems'), label: 'Systems' },
	{ href: withBase('/topics'), label: 'Topics' },
	{ href: withBase('/diagrams'), label: 'Diagrams' },
	{ href: withBase('/presentations'), label: 'Presentations' },
	{ href: withBase('/conditions'), label: 'Conditions' },
	{ href: withBase('/sources'), label: 'Sources' },
	{ href: withBase('/search'), label: 'Search' },
];
