# Power BI Module — Session-by-Session Outline (Draft v1)

Built from `Power_BI_Consolidated_Plan.md`. Topic IDs in brackets (e.g. **C4**, **X1**) point back to that file, so every session can be traced to its source topics. `X` IDs are the appendix candidates that are in neither original document.

## Assumptions I made (you haven't curated yet)

These are defaults. Each is easy to reverse, and the list of decisions at the end says which ones matter most.

1. **Included:** every Essential and High topic, most Medium topics, and the appendix items I rated Essential or High.
2. **Session length:** 3 hours each, as in both source documents.
3. **Session count: 17.** The original had 15 (S21–S35), and the revised plan has 15 (S21–S34.01). I added two sessions:
   - **M10**, a third DAX session for time intelligence and a business case study.
   - **M16**, data refresh, gateway and troubleshooting, restored from the original S35.
4. **Numbering:** sessions are `M01–M17` for now. Adding two sessions shifts the S-numbers of everything after Power BI (governance, prompt engineering, capstone). Pick the final numbering once the content is settled.
5. **Running dataset:** AdventureWorks, which your SQL block already uses. The mini-projects use a different provided dataset.
6. **Publishing:** the first publish to the Service happens in M15 using the Mini-Project 3 file, so students aren't waiting until the final project.

**Hours:** 17 × 3 = **51 hrs**, against 45 hrs in both source documents.

## Overview

| Session | Title | Phase | Plan IDs (main) |
|---|---|---|---|
| M01 | Introduction, Environment & Project Structure | Foundations | A1–A9 |
| M02 | Extracting Data from Multiple Sources | Foundations | B1–B10, X19 |
| M03 | Power Query I — Cleaning Fundamentals | Prepare | C1–C6, C12, C13 |
| M04 | Power Query II — Reshaping, Combining & Validation | Prepare | C7–C11, X3, X4 |
| M05 | M Language, Parameters & Reusable Functions | Prepare | C14–C20, X6 |
| M06 | Data Modeling I — Dimensional Design & Star Schema | Model | D1–D5 |
| M07 | Data Modeling II — Relationships, Integration & Security | Model | D6–D14, X2, X10 |
| M08 | Introduction to DAX | Calculate | E1–E7, X9 |
| M09 | Advanced DAX — Context, CALCULATE & Iterators | Calculate | E8–E14, X5 |
| M10 | DAX III — Time Intelligence & Business Case Study (**new**) | Calculate | X1, E15, X12 |
| M11 | Data Storytelling & Requirements | Present | F3, F5–F9, G1, G11, X7 |
| M12 | Dashboard & Report Design | Present | A8, A10, F1, F2, G2–G6, G12, X13, X14 |
| M13 | Interactive Reports & Performance | Present | G7–G10, G13–G15 |
| M14 | **Mini-Project 3** — Power BI End-to-End Dashboard | Apply | I1, F10, G16, X8 |
| M15 | Publishing, Sharing & Workspace Security | Deploy | H1–H9, J1 |
| M16 | Data Refresh, Gateway & Troubleshooting (**restored**) | Deploy | H10–H16, X11 |
| M17 | **Mini-Project 4** — Full-Stack Analytics Project | Apply | I2, I5, X22 |

**Flow:** get data in (M01–M05) → shape it into a model (M06–M07) → calculate (M08–M10) → present (M11–M13) → build one end-to-end (M14) → deploy and refresh (M15–M16) → build the full pipeline (M17).

---

## M01 — Introduction, Environment & Project Structure

**Outcome:** students have Power BI Desktop working, understand the product family, and create a first report in a Git-tracked `.pbip` project.

| Block | Content |
|---|---|
| Ecosystem (45 min) | Desktop, Service, Mobile and what each is for **[A1]**; install Desktop **[A2]**; Import vs. DirectQuery at overview level **[A5]** |
| Interface (45 min) | Canvas, ribbon, fields pane, visualisations pane **[A3]**; organising pages and visuals **[A4]** |
| Project structure (30 min) | `.pbip` format, what's in the folder, committing to Git **[A6]** |
| Lab (60 min) | Build a first report: area, bar, line, pie, card, KPI, slicer **[A7]**; choose and configure the right visual **[A8]** |

- **Homework:** research the Power BI community, forums and webinars and bring back three resources **[A9]**.
- **Notes:** requires Git from S1. The long Import vs. DirectQuery treatment is in M02 and M16.

## M02 — Extracting Data from Multiple Sources

**Outcome:** students connect to files, databases and an API, and know when to import and when to use DirectQuery.

| Block | Content |
|---|---|
| Files (40 min) | CSV, multi-sheet Excel, JSON **[B1]** |
| Databases (50 min) | SQL Server, MySQL, PostgreSQL connectors **[B2]**; native SQL SELECT queries to pull only what's needed **[B4]**; connection settings **[B6]** |
| Other sources (40 min) | REST APIs and the Web connector **[B3]**; NoSQL, Analysis Services, Dataverse, Dataflows at awareness level **[B5]**; Microsoft Fabric as context **[X19]** |
| Storage mode (20 min) | Import vs. DirectQuery trade-offs **[B7]** |
| Lab (30 min) | Extract data from a source the student hasn't seen **[B10]**; troubleshoot a deliberately broken connection **[B8]**; tune extraction **[B9]** |

- **Notes:** students need a working database. Prepare a shared instance or a local install guide in advance.

## M03 — Power Query I: Cleaning Fundamentals

**Outcome:** students can clean a messy table in Power Query and explain each step.

| Block | Content |
|---|---|
| Interface (30 min) | Editor, ribbon, query pane, Applied Steps **[C1]** |
| Core transforms (50 min) | Filter and sort **[C2]**; headers, remove columns, top and error rows **[C3]**; data types **[C4]** |
| Derived columns (30 min) | Column from Examples **[C5]**; conditional columns **[C6]** |
| Data quality (30 min) | Missing values, duplicates, errors **[C12]**; data quality best practices **[C13]** |
| Lab (40 min) | Clean a deliberately dirty dataset and document every step |

## M04 — Power Query II: Reshaping, Combining & Validation

**Outcome:** students reshape tables, combine multiple sources, and prove the results are correct.

| Block | Content |
|---|---|
| Reshaping (40 min) | Pivot, unpivot, group by, split column **[X4]**; advanced transformation patterns on a complex dataset **[C11]** |
| Combining (50 min) | Merge with all six join kinds **[C7]** (link back to SQL joins); append **[C8]** |
| Quality (30 min) | Column distribution, quality and profile **[C9]**; validating Applied Steps and their order **[C10]** |
| Performance (20 min) | What query folding is and why steps can break it **[X3]** |
| Lab (40 min) | Combine three sources into one clean table; reconcile row counts before and after |

## M05 — M Language, Parameters & Reusable Functions

**Outcome:** students read and edit M, build a reusable function, and apply it to a larger cleaning task.

| Block | Content |
|---|---|
| M basics (45 min) | What M is **[C15]**; `let … in` structure and the Advanced Editor **[C16]** |
| Functions (45 min) | Custom reusable functions **[C17]**; parameters **[X6]** |
| Practical M (30 min) | Conditional logic, text, dates, error handling **[C18]** |
| Automation (20 min) | Automating repeated cleaning steps **[C14]** |
| Lab (40 min) | Turn a repeated cleaning routine into a function and apply it to several files |

- **Assignment (take-home):** clean a real-world dataset end to end and write a short report on the process and results **[C19, C20]**. This is the original S26 project, kept as homework rather than a session.

---

## M06 — Data Modeling I: Dimensional Design & Star Schema

**Outcome:** students can sketch a star schema from a business question before touching Power BI.

| Block | Content |
|---|---|
| Why model first (30 min) | Why modeling must precede dashboards **[D1]** |
| Concepts (50 min) | Entities and ER diagrams **[D2]**; normalisation vs. denormalisation **[D3]** |
| Star schema (60 min) | Fact and dimension tables **[D4]**; surrogate keys and what a performant model needs **[D5]** |
| Lab (40 min) | Redesign a flat sales table into a star schema on paper, then in Power Query |

## M07 — Data Modeling II: Relationships, Integration & Security

**Outcome:** students build and test a relationship model, and apply row-level security.

| Block | Content |
|---|---|
| Relationships (50 min) | Building them in Model view **[D6]**; cardinality *:1, 1:1, *:* **[D7]**; cross-filter direction **[D8]** |
| Advanced relationships (30 min) | Activating, deactivating, `USERELATIONSHIP` **[D9]** |
| Integration (30 min) | Consistency and conflicts between sources **[D10]**; duplicates and integrity **[D11]** |
| Security (40 min) | Integrity and security measures **[D12]**; governance practices **[D13]** (ties to the Data Governance block); **row-level security** with static and dynamic roles, tested with "View as" **[X2]** |
| Lab (30 min) | Build the model, add a role, and write the model documentation **[X10]** |

- **Assignment:** a hands-on modeling exercise **[D14]**.

---

## M08 — Introduction to DAX

**Outcome:** students write basic measures and can explain filter context.

| Block | Content |
|---|---|
| Foundations (40 min) | Purpose and syntax **[E1]**; measures vs. calculated columns **[E3, E2]** |
| Context (50 min) | Row context vs. filter context **[E4]** |
| Functions (40 min) | SUM, COUNT, AVERAGE, MIN, MAX, DISTINCTCOUNT **[E5]**; other common functions **[E6]** |
| Lab (50 min) | Create, format, test and save measures **[E7]**; organise them in a measures table with folders and naming standards **[X9]** |

## M09 — Advanced DAX: Context, CALCULATE & Iterators

**Outcome:** students use `CALCULATE` to change filter context and avoid common performance traps.

| Block | Content |
|---|---|
| Logic (30 min) | IF, SWITCH, AND, OR **[E8]** |
| Core (60 min) | `FILTER`, `ALL`, `CALCULATE` **[E10]**; `ALLEXCEPT`, `SELECTEDVALUE`, `RELATED`, `RELATEDTABLE` **[X5]** |
| Iterators and variables (40 min) | `SUMX`, `AVERAGEX` **[E9]**; `VAR` **[E11]**; `RANKX` and nested row contexts **[E12]** |
| Quality (20 min) | Measure update workflow and performance pitfalls **[E13]**; optimisation scenarios **[E14]** |
| Lab (30 min) | Build percentage-of-total, ranking and conditional measures |

- **Notes:** this is the densest session in the module. If it runs long, `RANKX` can move to M10.

## M10 — DAX III: Time Intelligence & Business Case Study *(new)*

**Outcome:** students build a Date table and period-over-period measures, then solve a business problem with DAX.

| Block | Content |
|---|---|
| Date table (40 min) | `CALENDAR`, marking a Date table, relationships to facts **[X1]** |
| Time functions (50 min) | YTD, MTD, year-over-year, `DATEADD`, `SAMEPERIODLASTYEAR` **[X1]** |
| Tools (20 min) | Profile a slow measure with DAX Studio **[X12]** |
| Case study (70 min) | Solve a business problem and write up the process and results as a case study **[E15]** |

---

## M11 — Data Storytelling & Requirements

**Outcome:** students define the audience, question and KPIs before building, and plan a narrative.

| Block | Content |
|---|---|
| Requirements (40 min) | Gathering requirements and defining KPIs with a business owner **[X7]** |
| Storytelling (60 min) | Purpose, audience and focus **[F5]**; beginning–middle–end structure **[F6]**; colour for emphasis and meaning **[F7]** |
| Visual choice (30 min) | Summary, comparison, trend and distribution visuals **[F8]**; directing attention **[F9]**; presenting data effectively **[F3]** |
| Dashboard vs. report (20 min) | Purpose, scope and philosophy **[G1]**; building a report with a narrative **[G11]** |
| Lab (30 min) | Write a one-page brief and sketch a wireframe for a dashboard |

## M12 — Dashboard & Report Design

**Outcome:** students build a clear, accessible, consistent report using a theme and a grid.

| Block | Content |
|---|---|
| Layout (40 min) | Design principles and visual hierarchy **[G2]**; sketching and grid alignment **[G3]**; adding, sizing and formatting visuals **[G4]** |
| Formatting (30 min) | Conditional formatting: rules, icons, data bars **[G5]** |
| Visuals (40 min) | Advanced charts: heat maps, waterfall and others **[F1, F2, A10]**; custom visuals from AppSource **[G6]** |
| Standards (30 min) | Accessibility and user experience **[G12]**; themes (JSON) **[X13]**; mobile layout and tooltip pages **[X14]** |
| Lab (40 min) | Rebuild a poorly designed report using a theme, a grid and accessibility checks |

## M13 — Interactive Reports & Performance

**Outcome:** students add interactivity and navigation, and use Performance Analyzer to fix a slow report.

| Block | Content |
|---|---|
| Interactivity (50 min) | Visual interactions **[G7]**; drill-down and drill-through **[G8]**; slicers, filter pane and sorting **[G10]** |
| Navigation (30 min) | Buttons, bookmarks and page navigation **[G9]** |
| Performance (50 min) | Performance Analyzer **[G13]**; optimisation for large datasets **[G14]** |
| Iteration (20 min) | Gathering user feedback and refining a dashboard **[G15]** |
| Lab (30 min) | Add drill-through and bookmarks to the M12 report, then profile it and fix the slowest visual |

---

## M14 — Mini-Project 3: Power BI End-to-End Dashboard

**Outcome:** a complete, multi-page, tested dashboard saved as `.pbip` in Git.

- **Brief:** load and clean a multi-table dataset in Power Query, build a star schema, write DAX measures for core KPIs and comparisons, and design a multi-page dashboard with drill-through and bookmarks **[I1]**.
- **Applies:** M03–M13, including a written KPI brief from M11.
- **QA step (required):** reconcile dashboard totals to the source data before submitting **[X8]**.
- **Practice built in:** analysis and dashboard practice **[F10, G16]**.
- **Deliverable:** `.pbip` project committed to Git, a one-page KPI brief, and a short reconciliation note.
- **Format:** a 3-hour workshop, with finishing work as homework if needed.

## M15 — Publishing, Sharing & Workspace Security

**Outcome:** students publish a report, share it safely, and apply roles and labels.

| Block | Content |
|---|---|
| Publishing (40 min) | Publish from Desktop to the Service **[H1]**; options and implications **[H2]**; **first task: publish the Mini-Project 3 file**; reports vs. datasets and dataset reuse **[H3]** |
| Workspaces (30 min) | Creating and managing workspaces **[H4]**; collaboration settings **[H7]** |
| Sharing (40 min) | Direct sharing, mobile app, Publish to Web, app packages **[H5]** |
| Security (50 min) | Access permissions and role-based security **[H6]**; assign the RLS roles from M07 in the Service; security best practices **[H8]**; compliance and sensitivity labels **[H9]**; workspace permissions as applied governance **[J1]** |
| Lab (20 min) | Share a report with a classmate under a role and confirm they only see their rows |

- **Notes:** needs a Service account and, for sharing, Pro or equivalent licences. Confirm access before the session.

## M16 — Data Refresh, Gateway & Troubleshooting *(restored from the original)*

**Outcome:** students keep a published report up to date and diagnose a failed refresh.

| Block | Content |
|---|---|
| Refresh basics (40 min) | Scheduled and on-demand refresh **[H11]**; limits and licensing **[H12]**; DirectQuery options and effect of refresh strategy on accuracy and performance **[H13]** |
| Gateway (40 min) | Setup for on-premises sources **[H10]** |
| Advanced (30 min) | Incremental refresh **[X11]**; optional demo: a refresh button linked to Power Automate **[H14]** |
| Troubleshooting (50 min) | Connectivity, credential and performance failures, and how to read refresh errors **[H15]** |
| Lab (20 min) | Diagnose and fix a deliberately broken refresh **[H16]** |

- **Notes:** the gateway needs an on-premises source to practise on. Incremental refresh needs Pro or higher.

## M17 — Mini-Project 4: Full-Stack Analytics Project

**Outcome:** students deliver a pipeline from raw data to a refreshed, published dashboard.

- **Brief:** source and clean a multi-table dataset with Python (Pandas, SQLAlchemy) and document it in a notebook; build and query a SQL database with joins, CTEs and a stored procedure; import into Power BI and build a star schema and DAX measures; design a multi-page dashboard; publish to the Service, set permissions and schedule a refresh **[I2]**.
- **Presentation:** a storytelling-focused executive summary **[I5]**.
- **Portfolio:** package everything in a public Git repo with a README **[X22]**.
- **Deliverable:** `.pbip`, notebook, SQL scripts, published report link, executive summary.

---

## Where the other topics went

**Placed in other blocks** (kept, but not taught in the Power BI sessions):

| Topic | Home |
|---|---|
| Prompts for DAX and Power Query help **[J2]**, KPI explanations **[J3]**, Copilot in Power BI **[X16]** | Prompt Engineering block (S39) |
| Capstone **[I3]** and peer critique **[I4]** | Capstone (S40) |

**Parked (Optional, not placed):**

| Topic | Note |
|---|---|
| Exploring new visualisation trends **[F4]** | Could be a reading list |
| Analyze in Excel, subscriptions, alerts, Q&A **[X15]** | Possible demo in M15 if time allows |
| Deployment pipelines and Fabric Git integration **[X17]** | Licence-dependent |
| Endorsement, lineage view, impact analysis **[X18]** | Fits M15 if there's time |
| Paginated reports **[X20]** | Awareness only |
| PL-300 exam orientation **[X21]** | Could close M17 |

All other topics in the consolidated plan are placed above.

## Decisions I need from you

1. **Session count.** Keep 17, or hold to 15? To hold to 15, merge M11 into M12, and fold M16 into M15, dropping gateway and troubleshooting detail. I wouldn't recommend that, because both lose topics the original course had.
2. **Numbering.** Use decimals (S33.01, S34.02) as you did for S34.01, or renumber everything after S33?
3. **Time intelligence and RLS.** They're new content and take two of the extra hours. Keep both?
4. **Running dataset.** AdventureWorks for lessons, or something else?
5. **Licences.** Do your students have Pro (or trial) access to the Service? M15 and M16 depend on it.
6. **Format of the next deliverable.** Do you want a Word version of this outline, or lesson-by-lesson materials next?
