# Learnings

## 2026-04-05

- The site should be built as a medical knowledge system, not a content dump.
- The long-term brand can target doctors, but the first useful wedge is still MBBS students.
- The data collection workflow should follow `raw -> maintained markdown wiki -> typed public content`.
- The condition layer should remain structurally separate from foundational topic pages because clinical pages need different fields and editorial rules.
- Breadth-first expansion is the right near-term strategy: map the whole MBBS landscape with seed pages before deepening individual specialties.
- When widening breadth, add condition pages in the same move as the supporting topic and source links so the graph stays usable, not just larger.
- Diagrams need their own typed collection and review metadata; treating visuals as arbitrary media files would make the atlas impossible to maintain at scale.
- If a collection is added to the schema and navigation, it also needs at least a browse route and a tracked base directory so the product model does not outrun the site.
- Common drug pages are a high-leverage breadth layer because they connect basic pharmacology, symptom-first reasoning, and condition management without needing specialist depth first.
- Reverse-linked graph sections work well for breadth: one drug page can power topic, condition, presentation, and source pages without duplicating content across frontmatter everywhere.
- Investigation pages are another high-leverage breadth layer because a small test library can improve symptom-first and condition-first navigation across large parts of the site.
- Bedside tests, lab tests, and imaging should live in one typed diagnostic layer, but they still need enough metadata to distinguish their clinical roles.
- Procedure pages are a separate breadth layer from investigations because students need explicit how-to, equipment, and pitfall framing for practical skills.
