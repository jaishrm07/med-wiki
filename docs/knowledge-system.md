# Knowledge System

This project should follow the durable pattern from Karpathy's `LLM Wiki` gist published on April 4, 2026:

1. keep an immutable raw-source layer
2. maintain a persistent markdown knowledge layer
3. define operating rules so the LLM behaves like a disciplined wiki maintainer

The public website is only one part of that system.

## Recommendation

Use three layers:

1. `raw/` for immutable source captures
2. `knowledge-vault/` for the maintained markdown wiki
3. `src/content/` for reviewed public pages

This mirrors the useful core of the gist without forcing the public site to depend directly on research notes.

## Why this split matters for medical content

Medical content has a higher error cost than many other wiki domains. A casual note-taking workflow is not enough.

The split helps because:

- `raw/` preserves evidence and versioned source captures
- `knowledge-vault/` accumulates summaries, cross-links, contradictions, and gaps over time
- `src/content/` stays clean, typed, and reviewable for publishing

That gives you accumulation without collapsing evidence, working notes, and public guidance into the same file system.

## What should live where

### Raw layer

Use `raw/` for:

- NMC curriculum PDFs
- official treatment guidelines
- society guideline PDFs
- textbook chapter captures where licensing allows local notes
- WHO, CDC, NIH, NICE, ICMR, MoHFW, and specialty-society documents
- article clippings and extracted text

This layer is immutable.

### Knowledge vault

Use `knowledge-vault/` for:

- source summaries
- topic synthesis notes
- subject hubs
- system maps
- contradictions and unresolved questions
- editorial drafts
- coverage gaps

This layer is editable and compounding.

### Canonical site content

Use `src/content/` for:

- student-facing phase pages
- subject pages
- system pages
- topic pages
- diagram pages
- drug pages
- presentation pages
- condition pages
- source records with provenance and review metadata
- eventually: disease pages, drug pages, algorithms, practical guides, and exam prep layers

This is the publishable layer.

## Operating loop

### Ingest

1. capture the source in `raw/`
2. create or update a vault note summarizing it
3. connect it to related subjects, systems, and topics
4. update public content if the source changes what the site should say
5. append a dated entry to `knowledge-vault/log.md`

### Query

1. read the maintained vault first
2. verify against raw sources when needed
3. save useful answers back as notes or content updates

### Lint

Regularly ask the agent to look for:

- stale guidance
- source gaps
- orphan notes
- unsupported claims
- duplicated topics
- missing links between basic science and clinical relevance

## Indexing and logging

Two files are mandatory:

- `knowledge-vault/index.md`: the navigational catalog of important notes and hubs
- `knowledge-vault/log.md`: the append-only operational timeline

These are the main replacement for ad hoc memory.

## Practical rule

Do not answer every question by rediscovering everything from raw files. The whole point of the system is to compile knowledge once and keep it maintained.
