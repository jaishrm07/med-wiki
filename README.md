# Med Wiki

Med Wiki is a static-first Astro website for MBBS students. The initial build is structured as a study system rather than a blog:

- `Phases` mirror the MBBS journey from Phase I to Phase III Part II
- `Subjects` act as the main academic entry point
- `Systems` connect subjects across anatomy, physiology, biochemistry, pathology, pharmacology, and clinical medicine
- `Topics` are the actual high-yield study pages students will search, revise, and link back to
- `Diagrams` provide original SVG-first visuals that can be versioned, reviewed, and linked like the text
- `Drugs` add a starter formulary layer that connects pharmacology to bedside use, cautions, and adverse effects
- `Presentations` provide symptom-first entry points like a real medical reference workflow
- `Conditions` are structured clinical-reference pages that turn foundational knowledge into workup and management logic
- `Sources` preserve provenance so pages can show what they are based on and when they were last reviewed

This first scaffold is intentionally biased toward `first-year MBBS`, while keeping the information architecture ready for the full course.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
npm run content:lint
```

## Content Model

```text
src/content/
├── phases/
├── subjects/
├── systems/
├── topics/
├── diagrams/
├── drugs/
├── presentations/
├── conditions/
└── sources/
```

Each page is Markdown with typed frontmatter defined in `src/content.config.ts`. Relationships are slug-based so one topic can appear through phase, subject, and system views without duplication.

## Product Direction

- Build the whole MBBS site architecture now
- Fill out first-year content first
- Keep pages fast to scan, exam-aware, and clinically connected
- Add search early so the site behaves like a reference tool
- Treat provenance as a first-class feature, not a later cleanup task
