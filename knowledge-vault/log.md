# Knowledge Log

Append new entries instead of rewriting history.

## [2026-04-05] scaffold | site-and-knowledge-system

- created the Astro website scaffold for phases, subjects, systems, topics, and search
- adapted the project to the `LLM Wiki` collection pattern with `raw/`, `knowledge-vault/`, and `src/content/`
- added operating docs for ingest, query, and lint workflows
- seeded the vault index and the first subject, system, and topic hub notes

## [2026-04-05] upgrade | provenance-and-lint

- added a structured `sources` collection to the public site
- upgraded topic pages with maturity labels, review dates, and linked source records
- added a content lint script to validate the publishing graph
- seeded source notes in the knowledge vault so provenance also compounds in the research layer

## [2026-04-05] upgrade | conditions-layer

- added a typed `conditions` collection for clinical-reference pages
- linked conditions back to foundational topics, systems, and sources
- added condition browsing to the public site so the wiki can start serving both students and clinical workflows
- seeded the knowledge vault with the first clinical condition notes
