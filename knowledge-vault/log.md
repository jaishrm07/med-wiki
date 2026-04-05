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

## [2026-04-05] expansion | breadth-first-phase-3

- widened Phase III Part II across obstetrics and gynaecology, paediatrics, ophthalmology, ENT, orthopaedics, dermatology, psychiatry, anaesthesiology, radiology, and respiratory medicine
- added corresponding system pages so the site can browse these subjects in a connected way
- seeded lightweight starter topic pages across the new areas to favor breadth over early depth

## [2026-04-05] expansion | breadth-first-conditions

- added a new wave of seed condition pages across women's health, paediatrics, ophthalmology, ENT, orthopaedics, dermatology, psychiatry, and respiratory medicine
- linked the new conditions back to the new Phase III starter topics so the clinical graph remains connected to foundations
- added current official source records where practical for acne, asthma, depression, cataract, and antenatal care

## [2026-04-05] upgrade | diagram-atlas-and-presentation-route

- added a first-class `diagrams` collection with source-aware metadata, public browse pages, and reusable rendering
- seeded original SVG diagrams for brachial plexus, cardiac cycle, glycolysis, chest X-ray review, and fracture assessment
- linked the new visual atlas into topic, condition, source, and homepage flows so diagrams are part of the graph rather than loose assets
- created the initial `presentations` browse route so the symptom-first layer is now a real site section instead of a dead navigation path

## [2026-04-05] expansion | drugs-layer

- added a typed `drugs` collection with formulary pages linked to topics, conditions, presentations, and sources
- seeded common starter drugs across respiratory medicine, cardiovascular medicine, diabetes, psychiatry, obstetrics, dermatology, antibiotics, and pain management
- upgraded topic, condition, presentation, source, homepage, navigation, and lint flows so the drug layer behaves like a real part of the knowledge graph

## [2026-04-05] expansion | investigations-layer

- added a typed `investigations` collection with diagnostic pages linked to topics, conditions, presentations, and sources
- seeded a first wave of high-yield test pages across lab tests, imaging, and bedside investigations
- upgraded topic, condition, presentation, source, homepage, navigation, and lint flows so the diagnostic layer is now part of the public graph

## [2026-04-05] expansion | procedures-layer

- added a typed `procedures` collection with practical-skill pages linked to subjects, systems, topics, conditions, presentations, investigations, and sources
- seeded a first breadth-first wave of examination, preventive, and clinical procedure pages across physiology, medicine, microbiology, anaesthesiology, surgery, obstetrics, psychiatry, paediatrics, orthopaedics, and ENT
- upgraded homepage, navigation, source, subject, topic, condition, presentation, investigation, and lint flows so the practical layer is part of the public knowledge graph

## [2026-04-05] expansion | presentations-wave-2

- added a second wave of symptom-first pages for hypertension, asthma, diabetes-pattern symptoms, surgical wound infection, acne, and developmental concerns
- connected the new presentation pages to the matching drugs, investigations, and procedures so symptom routes expose more of the graph
- widened the symptom-first layer without waiting for deeper specialty writeups

## [2026-04-05] expansion | missing-systems-wave

- added new system pages for the nervous system, gastrointestinal system, endocrine system, and hematology so the MBBS map is less skewed toward the initial seed areas
- seeded starter topics across anatomy, physiology, biochemistry, pathology, medicine, and community medicine to give each new system at least one real study route
- added connected clinical pages for migraine, acute gastroenteritis, hypothyroidism, and iron deficiency anemia, along with matching presentations, drugs, investigations, procedures, and source records
- added current official source records for NICE headache guidance, NICE thyroid guidance, and WHO diarrhoea guidance to strengthen provenance in the new clinical layer
