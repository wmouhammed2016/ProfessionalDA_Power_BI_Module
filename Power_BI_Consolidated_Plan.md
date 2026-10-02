# Power BI Module — Consolidated Plan (Draft for Curation)

Merges the Power BI content of both course documents. Nothing is removed or reworded away; every topic title from either file appears once, tagged with where it came from.

- **Original** = `Professional Data Analyst.docx` (120-hour syllabus; Power BI = S21–S35, 15 sessions, 45 hrs)
- **Revised** = `Professional Data Analyst - Final Course Plan.docx` (Power BI = S21–S34.01, 15 sessions)

## How to read this

**Source column**: `O` = in the original only · `R` = in the revised only · `O+R` = in both. Session numbers follow, e.g. `O:S22 · R:S22`.

**Importance column** (my suggestion, for you to overrule):

| Label | Meaning |
|---|---|
| **Essential** | A student cannot work as a Power BI analyst without it |
| **High** | Expected in a professional or an interview setting |
| **Medium** | Useful, but could be shortened or merged |
| **Optional** | Nice to have; first candidate for cutting if hours are tight |

---

## A. Orientation & Environment

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| A1 | Power BI ecosystem: Desktop, Service (SaaS), Mobile | O+R · O:S21 · R:S21 | Essential | Sets the mental model for the whole module |
| A2 | Download and install Power BI Desktop | O · O:S21 | Medium | Short, but must happen before anything else |
| A3 | Interface tour: report canvas, ribbon, fields pane, visualisations pane | O+R · O:S21 · R:S21 | Essential | |
| A4 | Using interface elements to manage and organise visualisations | O · O:S21 | Medium | Largely covered by A3 |
| A5 | Import vs. DirectQuery: performance trade-offs | O+R · O:S35 · R:S21, S22 | Essential | Taught in three places; consolidate into one |
| A6 | Power BI Project files (.pbip): Git, collaboration, CI/CD | R · R:S21 | High | Differentiator vs. typical courses; needs Git from S1 |
| A7 | First visuals: area, bar, line, pie, cards, KPIs, slicers | O+R · O:S21 · R:S21 | Essential | |
| A8 | Best practices for choosing and configuring visuals | O · O:S21 | High | Foundation for later design sessions |
| A9 | Research exercise: Power BI community, forums, webinars, tutorials | O · O:S21 | Optional | Cheap self-learning habit |
| A10 | Research exercise: heat maps, waterfall charts, marketplace visuals | O · O:S21 | Medium | Overlaps with F1 |

## B. Extracting Data from Multiple Sources

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| B1 | Flat files: CSV, multi-sheet Excel, JSON | O+R · O:S21, S22 · R:S22 | Essential | |
| B2 | Relational databases: SQL Server, MySQL, PostgreSQL | O+R · O:S22 · R:S22 | Essential | Needs a database environment for students |
| B3 | Connecting to APIs | O · O:S22 | High | Missing from the revised plan; real-world data often arrives via API |
| B4 | Basic SQL SELECT queries to extract data from a SQL database | O · O:S22 | High | Links the SQL block to Power BI |
| B5 | NoSQL databases, Analysis Services, Dataverse, Dataflows | R · R:S22 | Medium | Awareness level is enough |
| B6 | Settings and configuration needed for successful extraction | O · O:S22 | Medium | |
| B7 | Storage mode selection: Import vs. DirectQuery (refresh and performance) | R · R:S22 | High | Duplicates A5 |
| B8 | Troubleshooting data source connections | O+R · O:S21 · R:S22 | High | |
| B9 | Optimising extraction performance | R · R:S22 | Medium | |
| B10 | Hands-on: extract data from a new source | O · O:S22 | High | Practice session |

## C. Power Query & M Language

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| C1 | Power Query Editor: interface, ribbon, query pane, Applied Steps | O+R · O:S23 · R:S23 | Essential | |
| C2 | Basic filtering and sorting | O · O:S23 | Essential | |
| C3 | Basic transformations: first row as headers, remove columns, remove top/error rows | R · R:S23 | Essential | |
| C4 | Changing data types | R · R:S23 | Essential | A leading cause of errors downstream |
| C5 | Column from Examples | R · R:S23 | Medium | |
| C6 | Conditional columns | R · R:S23 | High | |
| C7 | Merge queries: all join kinds | R · R:S24 | Essential | Ties back to SQL joins (S10) |
| C8 | Append queries | R · R:S24 | Essential | |
| C9 | Data profiling: distribution, quality, column profile | R · R:S24 | High | |
| C10 | Validating transformations; reviewing Applied Steps order | R · R:S24 | High | |
| C11 | Advanced transformation techniques; cleaning a complex dataset | O · O:S23–24 | High | Not itemised in either file; see appendix |
| C12 | Handling missing data, duplicates, and errors | O · O:S23–24 | Essential | Not itemised in the revised plan |
| C13 | Data quality best practices | O · O:S23–24 | High | |
| C14 | Automating data cleaning processes | O · O:S23–24 | Medium | |
| C15 | M language: what it is and why it matters | O+R · O:S25 · R:S25 | High | |
| C16 | `let … in` structure; reading and modifying M in the Advanced Editor | R · R:S25 | High | |
| C17 | Creating custom, reusable functions | O+R · O:S25 · R:S25 | High | |
| C18 | Practical M examples: conditional logic, text, dates, error handling | R · R:S25 | Medium | |
| C19 | Real-world data cleaning project with written report | O · O:S26 | High | The revised plan replaces this with mini-projects |
| C20 | Assignment: self-implemented real-world cleaning project | O · O:S26 | High | Independent practice |

## D. Data Modeling & Integration

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| D1 | Why modeling must precede dashboard development | R · R:S26 | Essential | |
| D2 | Principles of data modeling; entity-relationship diagrams | O · O:S32 | Medium | |
| D3 | Normalisation vs. denormalisation | O+R · O:S32 · R:S26 | High | |
| D4 | Star schema: fact and dimension tables | R · R:S26 | Essential | |
| D5 | Surrogate keys and requirements for a performant model | R · R:S26 | Medium | |
| D6 | Building relationships in Model view (auto and manual) | O+R · O:S32 · R:S27 | Essential | |
| D7 | Cardinality: *:1, 1:1, *:* | O+R · O:S32 · R:S27 | Essential | |
| D8 | Cross-filter direction: single vs. bidirectional | R · R:S27 | Essential | |
| D9 | Editing, activating and deactivating relationships; `USERELATIONSHIP` | R · R:S27 | High | |
| D10 | Integrating disparate sources; handling consistency and conflicts | O · O:S33 | High | |
| D11 | Data integrity across sources: duplicates and security | R · R:S27 | High | |
| D12 | Data integrity and security measures during modeling | O · O:S33 | High | Links to Governance block |
| D13 | Governance practices on data handling and usage | O · O:S33 | Medium | Overlaps with Block 5 |
| D14 | Assignment: hands-on data modeling practice | O · O:S33 | High | |

## E. DAX

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| E1 | DAX purpose and syntax | O+R · O:S27 · R:S28 | Essential | |
| E2 | Calculated columns | O · O:S27–28 | High | |
| E3 | Measures vs. calculated columns | O+R · O:S28 · R:S28 | Essential | |
| E4 | Row context vs. filter context | R · R:S28 | Essential | The concept students most often get wrong |
| E5 | Core aggregations: SUM, COUNT, AVERAGE, MIN, MAX, DISTINCTCOUNT | R · R:S28 | Essential | |
| E6 | Common DAX functions and their applications | O · O:S27 | Essential | |
| E7 | Creating, formatting, testing and saving measures | R · R:S28 | High | |
| E8 | Logical functions: IF, SWITCH, AND, OR | R · R:S29 | Essential | |
| E9 | Iterators: SUMX, AVERAGEX | R · R:S29 | High | |
| E10 | FILTER, ALL, CALCULATE | R · R:S29 | Essential | `CALCULATE` is the core of DAX |
| E11 | `VAR` for intermediate calculations | R · R:S29 | High | |
| E12 | RANKX; nesting row contexts in calculated columns | R · R:S29 | Medium | |
| E13 | Measure update workflow and common performance pitfalls | R · R:S29 | High | |
| E14 | Advanced DAX scenarios and performance optimisation | O · O:S28 | High | |
| E15 | Hands-on: solving a business problem with DAX (case study) | O · O:S28 | High | Not in the revised plan |

## F. Data Analysis, Visualisation & Storytelling

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| F1 | Advanced chart and graph options | O · O:S29 | High | |
| F2 | Complex visualisations that convey deeper insight | O · O:S29 | Medium | |
| F3 | Techniques for effective data presentation | O · O:S29 | High | |
| F4 | Exploring new visualisation trends and tools | O · O:S29 | Optional | |
| F5 | Data storytelling principles: purpose, audience, simplicity | O+R · O:S29 · R:S30 | High | |
| F6 | Narrative structure: beginning–middle–end, logical flow | R · R:S30 | High | |
| F7 | Colour strategy: emphasis, meaning, limited palette | R · R:S30 | High | |
| F8 | Visual categories: summary, comparison, trend, distribution | R · R:S30 | High | |
| F9 | Directing attention: whitespace, callouts, titles, hierarchy | R · R:S30 | Medium | |
| F10 | Assignment: hands-on analysis and visualisation practice | O · O:S29 | High | |

## G. Dashboard & Report Development

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| G1 | Dashboard vs. report: purpose, scope, philosophy | R · R:S31 | Essential | |
| G2 | Dashboard design principles: layout, visual hierarchy | O+R · O:S30 · R:S31 | Essential | |
| G3 | Layout design: sketching, grid alignment, choosing the right visual | R · R:S31 | High | |
| G4 | Adding, sizing and formatting visuals on the canvas | R · R:S31 | Essential | |
| G5 | Conditional formatting: colour rules, icons, data bars | R · R:S31 | High | |
| G6 | Custom visuals from Microsoft AppSource | O+R · O:S30 · R:S31 | Medium | |
| G7 | Interactive elements; visual interactions (cross-filtering) | O+R · O:S30 · R:S32 | High | |
| G8 | Hierarchies: drill-down, drill-through, drill paths | R · R:S32 | High | |
| G9 | Report navigation: buttons, bookmarks, page navigation | R · R:S32 | High | |
| G10 | Slicers, filter pane (basic and advanced), sorting | R · R:S32 | Essential | |
| G11 | Building comprehensive reports with narrative structure | O · O:S31 | High | |
| G12 | User experience and accessibility | O · O:S31 | High | Missing from the revised plan |
| G13 | Performance Analyzer: diagnosing slow visuals | R · R:S32 | High | |
| G14 | Performance optimisation for large datasets | O · O:S31 | High | |
| G15 | Feedback loop and dashboard iteration based on user input | O · O:S31 | Medium | |
| G16 | Assignment: hands-on dashboard practice | O · O:S30–31 | High | |

## H. Publishing, Sharing & Data Refresh

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| H1 | Publishing from Desktop to the Power BI Service | O+R · O:S34 · R:S34 | Essential | |
| H2 | Publishing options and their implications | O · O:S34 | Medium | |
| H3 | Reports vs. datasets; reusing datasets across reports | O · O:S34 | High | The thin-report pattern used in every organisation |
| H4 | Creating and managing workspaces | O+R · O:S34 · R:S34 | Essential | |
| H5 | Sharing: direct, mobile app, Publish to Web, app packages | R · R:S34 | High | |
| H6 | Access permissions and role-based security | O+R · O:S34 · R:S34 | Essential | |
| H7 | Collaboration features and settings | O · O:S34 | Medium | |
| H8 | Security best practices in report sharing | O · O:S34 | High | |
| H9 | Data compliance and dataset labeling | O · O:S34 | Medium | Sensitivity labels; links to Governance |
| H10 | Power BI Gateway: setup for on-premises sources | R · R:S34 · (O: S35 benefit) | High | Needs an on-premises source for practice |
| H11 | Scheduled and on-demand refresh | O+R · O:S35 · R:S34 | Essential | |
| H12 | Refresh limitations and licensing | O+R · O:S35 · R:S34 | Medium | |
| H13 | DirectQuery options; effect of refresh strategy on accuracy and performance | O · O:S35 | High | |
| H14 | Refresh button linked to Power Automate | O · O:S35 | Optional | Good demo; low priority |
| H15 | Troubleshooting refresh issues: connectivity and performance | O · O:S35 | High | Only a passing mention in the revised plan |
| H16 | Hands-on: publishing and refresh practice | O · O:S34–35 | High | |

## I. Projects & Capstone

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| I1 | Mini-Project 3: Power BI end-to-end dashboard (`.pbip`, Git) | R · R:S33 | Essential | |
| I2 | Mini-Project 4: full-stack analytics (Python → SQL → Power BI Service) | R · R:S34.01 | Essential | |
| I3 | Capstone: full dashboard published to the Service, plus documentation and presentation | O+R · O:S40 · R:S40 | Essential | Ten project options in both files |
| I4 | Peer critique session | R · R:S40 | High | |
| I5 | Executive summary with a storytelling focus | R · R:S34.01 | High | |

## J. Power BI Topics Taught Outside Block 4

| ID | Topic | Source | Importance | Comment |
|---|---|---|---|---|
| J1 | Governance applied to Power BI workspace permissions | R · R:S36 | High | Reinforces H6 |
| J2 | Prompts for DAX assistance and Power Query troubleshooting | R · R:S39 | Medium | Natural link to Copilot |
| J3 | Prompt-based KPI explanations and executive summaries | R · R:S39 | Medium | |

---

## Appendix — Candidate additions (in neither file)

For consideration only. Importance is my suggestion for a PL-300-aligned, job-ready course.

| ID | Topic | Importance | Suggested home | Comment |
|---|---|---|---|---|
| X1 | Date/Calendar table and time intelligence (YTD, YoY, `DATEADD`) | Essential | E | Nearly every business dashboard needs it |
| X2 | Row-level security: static and dynamic roles, "View as" | Essential | D / H | Referenced only as "role-based security" |
| X3 | Query folding | High | C | Explains why some refreshes are slow |
| X4 | Pivot, unpivot, group by, split column in Power Query | High | C | Core transforms, not itemised in either file |
| X5 | `RELATED`, `RELATEDTABLE`, `ALLEXCEPT`, `SELECTEDVALUE` | High | E | |
| X6 | Parameters and What-If parameters; field parameters | High | C / G | |
| X7 | Requirements gathering and KPI definition | High | F / G | Starts every real project |
| X8 | Report QA: reconciling dashboard totals to the source | High | I | A professional habit that is rarely taught |
| X9 | Measure organisation: measures table, display folders, naming | Medium | E | |
| X10 | Model documentation: data dictionary, measure descriptions | Medium | D | |
| X11 | Incremental refresh | Medium | H | Licence-dependent |
| X12 | DAX Studio, Tabular Editor, Best Practice Analyzer | Medium | E / G | Free tools used by professionals |
| X13 | Themes (JSON) and report templates (`.pbit`) | Medium | G | |
| X14 | Mobile layout; tooltip pages | Medium | G | |
| X15 | Analyze in Excel; subscriptions, alerts, Q&A | Medium | H | |
| X16 | Copilot in Power BI | Medium | J | Links to the Prompt Engineering block |
| X17 | Deployment pipelines; Fabric Git integration | Optional | H | Licence-dependent |
| X18 | Endorsement, lineage view, impact analysis | Optional | H / J | |
| X19 | Microsoft Fabric overview: Lakehouse, OneLake, Dataflows Gen2 | Optional | B | Awareness only |
| X20 | Paginated reports / Power BI Report Builder | Optional | G | Awareness only |
| X21 | PL-300 exam orientation | Optional | I | Career preparation |
| X22 | Portfolio packaging: public Git repo with a README | Medium | I | |

---

## Summary counts

| Section | Topics |
|---|---|
| A. Orientation & Environment | 10 |
| B. Extracting Data | 10 |
| C. Power Query & M | 20 |
| D. Data Modeling | 14 |
| E. DAX | 15 |
| F. Analysis, Visualisation & Storytelling | 10 |
| G. Dashboard & Report Development | 16 |
| H. Publishing, Sharing & Refresh | 16 |
| I. Projects & Capstone | 5 |
| J. Outside Block 4 | 3 |
| **Total from the two files** | **119** |
| Appendix candidates | 22 |
