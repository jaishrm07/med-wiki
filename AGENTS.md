# Knowledge Operations

This repository is being built as both a public medical website and a persistent research system. Treat those as related but distinct layers.

## Layers

1. `raw/`
   - immutable source captures
   - PDFs, guideline downloads, clipped articles, extracted text, and source-specific notes
   - never treated as publish-ready interpretation
2. `knowledge-vault/`
   - Obsidian-compatible research graph
   - source summaries, topic notes, subject maps, unresolved questions, and editorial drafts
   - useful for synthesis, backlinking, and ongoing maintenance
3. `src/content/`
   - canonical publishing graph
   - typed, reviewed, source-controlled content that powers the website

## Core rules

- Prefer primary medical sources before secondary summaries whenever possible.
- Keep educational summaries separate from raw evidence.
- Do not publish directly from `raw/` or `knowledge-vault/` without normalizing into `src/content/`.
- Preserve provenance: source title, upstream URL, date, guideline version, and review status.
- Use the website content as the public layer and the vault as the compounding knowledge layer.

## Operations

### Ingest

When adding a meaningful new source:

1. store the source or a stable reference in `raw/`
2. summarize it inside `knowledge-vault/`
3. update related subject, system, and topic notes
4. update canonical records in `src/content/` if the source changes what should be published
5. append an entry to `knowledge-vault/log.md`
6. update `knowledge-vault/index.md` if new durable notes or hubs were created

### Query

When answering product or editorial questions:

1. consult the maintained knowledge layer first
2. use raw sources to verify, deepen, or correct
3. file durable syntheses back into the wiki instead of letting them die in chat history

### Lint

Periodically check for:

- stale clinical guidance
- unsupported claims
- missing backlinks
- orphan notes
- duplicated concepts under different names
- topic pages missing source provenance
- areas where the site needs fresher guideline review

## Preferred direction of truth

`primary source -> raw capture -> knowledge-vault note -> canonical src/content page -> public site`

## What not to do

- Do not let exploratory notes silently become public truth.
- Do not treat textbook memory as enough for clinical claims.
- Do not rely on chat history as the only record of research work.
- Do not mix immutable evidence and human-facing summaries in the same layer.
