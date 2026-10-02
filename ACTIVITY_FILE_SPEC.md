# CLAUDE.md: interactive lecture-activity file (portable spec)

Save this file as `CLAUDE.md` in the root of the new repo. It describes how to build a single, self-contained HTML file of team activities for a live (Zoom) lecture, based on a proven build for a Tableau and KPIs lecture. Replace the topic; keep the philosophy, the UX rules and the engine.

The first topic for this repo is **Power BI**. Section 9 lists a suggested outline, to be confirmed with the instructor.

## 1. What you are building
One HTML file (inline CSS and JavaScript, no frameworks, no build step) that the instructor opens during a lecture. Teams work in Zoom breakout rooms, then return to the main room for a debrief. It contains:
- a **hub** that lists the activity groups ("labs") in lecture order,
- several **labs**, each made of short **activities** ("units"),
- an **agenda** page (timeline linking into every activity, with progress),
- a **wrap-up** page (takeaways, scoreboard, saved homework checklist, notes),
- a short **lecture checkpoint** quiz.

If a reference implementation is available at `reference/business_understanding_game.html`, read it first and reuse its engine, theme and UX. Replace all Tableau, KPI and Gartner content with the new topic. If it is not available, rebuild the engine from sections 4 and 5.

## 2. How to work with the instructor
- **Plan first.** For anything bigger than a small fix, describe what you will build and list the decisions you need. Then wait for the answer. Once decisions are approved, build without re-asking.
- Recommend a default for each decision; do not dump every option.
- **Ground everything in the instructor's material** (slides, exercise files, README). Ask for it before designing. Do not invent facts, figures, company scale numbers or product claims.
- Anything from general knowledge, and every practice scenario you write yourself, must be flagged as "to verify" or "written for this course" in the UI or the facilitator notes.
- Say clearly what is your wording, your estimate or your assumption. Report real limitations (for example, that progress lives in each team's own browser).
- Test in a real browser before every commit. Commit to the branch you are given. Do not open a pull request unless asked.

## 3. Philosophy (do not break without asking)
**Teaching format**
- Team play for breakout rooms: one driver shares their screen, the team discusses.
- Feedback stays hidden until the facilitator reveals it, so the main-room debrief is a discussion, not a leak.
- Every scored activity is out of **100** points. Scores appear only after the reveal.
- Open-ended work has no single right answer: reward consistency (fits the decision, can be calculated from the data, follows the rules taught, the chart fits the message). Accept several valid answers where the material allows.
- Free-text answers are **never scored**. They are shown in the debrief for peer review. Add a peer-review checklist wherever there is free text.
- Concept drills are short (about 10 minutes); applied activities are longer. Do not repeat an exercise another lab already covers.
- Every activity has discussion prompts and facilitator notes.
- Prefer realistic fictional companies and cases. Never invent scale numbers: use only descriptors the instructor supplied.

**Reusable activity patterns that worked**
- *Detective*: a messy stakeholder briefing; teams tag evidence, name the real problem, the opportunity, the stakeholders and the decision.
- *Card sort* (a `grid`): sort items into categories, for example "metric or KPI".
- *Builder* (`slots`): assemble a correct item from cards, for example metric + target + timeframe.
- *Fix the bad X*: diagnose what is wrong, choose the best rewrite, optionally write your own (unscored, peer-reviewed). Include one item that is already fine.
- *Workflow map* (SVG): tap stops to see where a concept fits, then place tasks on the right stop.
- *Case builders*: continue earlier cases so students build on what they learned.
- *Client decision with a debrief reveal*: profile and challenge up front; the "why" and the analog only after the reveal.
- *Photo upload*: teams photograph a paper sketch and upload it for the discussion.
- *Auto-assembled team brief or memo* from the team's own picks, with a copy button.
- *Checkpoint quiz* across the whole lecture, then a wrap-up.

## 4. UX and theme rules
- Easy navigation everywhere: Back buttons, breadcrumbs, a stepper, a review-and-submit step, and browser Back working through hash routes (`#/lab/unit/step` and `#/lab/unit/results`).
- Progress, scores and notes persist in the browser (`localStorage`), with a clear message if storage fails.
- A shared team name, a breakout **timer** (presets), and a **facilitator mode** unlocked by a constant code (a light guard against accidental peeking, not security).
- Accessible: real buttons and labels, visible focus, keyboard operable (including SVG groups), readable on a projector, no horizontal scroll at 390 px wide.
- **Light theme only.** Use CSS variables. Sample the palette from the instructor's slides (ask for them). Defaults from the original build, if the same academy applies: cream `#F2F0EC`, charcoal `#222222`, violet `#8236FF`, orange `#FF4A11`, Poppins with a system-font fallback. Use a darker orange for small text on white. No logos or brand marks. Third-party figures only with their attribution line, and flag licensing to the instructor.
- Prose uses the spelling of the instructor's slides (British in the original). Keep quoted product terms as written.

## 5. Architecture
One IIFE in one `<script>`. Order: CSS, config, helpers, state and persistence, scoring, timer, chrome (header, toolbar, modals), lab engine and lab content, agenda and wrap-up, router and render, delegated events.

**Units are declarative.** A unit is `{ id, lab, station, icon, title, tagline, stage, steps(u), prompts, fac, peer?, noScore?, debrief?, optional? }`. `steps(u)` returns `[{ label, blocks }]` and may depend on state. Labs are registered in a `LABS` map with `{ id, hash, title, word, stations, intro }`.

**Block types:** `html`, `single`, `multi`, `grid`, `slots`, `text`, `map`, `photo`, `quadrant`, `memo`, `brief`. Add new types in both the play and reveal renderers (and in the done-check and scoring if graded).
- Helpers: `O(v, text, ok, why)` for options and `G(v, text, ans, why)` for grid items. A grid `ans` may be an array when several answers are valid.
- `multi`: `pick` is the exact number to choose; `need` is how many correct picks count when more options are correct than the team chooses; `fixed: true` keeps option order. Wrong picks subtract.
- A block's `pts` count toward the unit's 100. `bonus: true` adds credit above 100 (total capped at 100). `noScore: true` makes a discussion workspace. `debrief()` adds a revealed-only card.
- Answers live in `state.kpi[unitId].a[blockKey]`, and `state.kpi` holds the units of every lab (rename it for the new topic if you wish, but keep one store).
- The unit's base points must sum to **exactly 100**.

**Stable ids.** Never rename a unit id once students may have saved progress; stations can be renumbered. Use one localStorage key per file, versioned.

**Reveal mechanics.** Progress is per browser, so reveals happen on each team's own screen: the facilitator announces the code in the main room, teams unlock facilitator mode, tap "Reveal all submitted", and one or two teams share their screen for discussion. Students can reveal only what they have already submitted.

**Adding things:** a new activity needs a unique id, the next station number, points that sum to 100, prompts, facilitator notes, and updated hub, agenda and test counts. A new lab needs a `LABS` entry, its units pushed into the unit list, a hub card in lecture order, an agenda stop, a wrap-up scoreboard row and the copy-summary line.

## 6. Testing and quality bar
Verify in a real browser (Chromium via Playwright; block font requests). Copy the HTML to a temp file and inject `window.__T = { UNITS, state, uOf, unitScore, ... }` just before the final `})();` so tests can read the data without changing the shipped file. Run, before every commit:
1. **Content integrity:** points sum to 100; each `single` has exactly one correct option; each slot at least one; `multi` pick counts match the number of correct options (or `need`); grid answers exist in the choices; keys and values are unique.
2. **Scoring:** perfect answers score 100; all-wrong answers score 0.
3. **Real UI drive:** click through every step of every unit, submit, enter the facilitator code, reveal, and check the result.
4. **Leak guard:** visit every route and fail on `${`, `undefined`, `NaN` or `[object` in the text (so never write the word "undefined" in student-facing copy).
5. **Navigation and layout:** Back links work, results pages offer a way back, no horizontal scroll at 390 px.
6. **Persistence:** reload keeps progress, notes and the checklist; uploads, captions, zoom, delete and the storage-full message work.
Update the expected counts whenever activities change. Keep the tests in the repo (for example `tests/`).

**Pitfalls already hit**
- `${...}` inside plain quoted strings renders literally.
- Do not re-render on a textarea `change` event: blur fires first and swallows the click that caused it. Save text on `input`.
- `uOf` and `getCS`-style getters must return the live state object, never a copy.
- SVG stops and dots need a transparent hit rectangle.
- A hash-only navigation to the same URL does not re-render; tests that change state must navigate away and back.

## 7. Workflow for a new topic
1. Read this file and the reference implementation. Ask for the slides, exercise files and README; request the palette if it differs.
2. Propose the lab list, activities per lab and the decisions you need. Wait for approval.
3. Build the engine and theme from the reference (or section 5), then add content one lab at a time, testing each.
4. Add the agenda, wrap-up and checkpoint. Update counts everywhere.
5. Commit often, with descriptive messages. List open items for the instructor.

## 8. Do not carry over from the original build
The Tableau-, KPI-, avocado- and Gartner-specific content, the vendor positions and the Magic Quadrant figure (copyrighted), and any answer keys. Keep only the engine, the patterns and the conventions.

## 9. Suggested outline for Power BI (confirm with the instructor; all of it is a proposal)
Do not treat any of these as facts. Check each against the instructor's slides and exercises before building, and flag general-knowledge content "to verify".
- **The Power BI family:** the products and what each is for (for example Desktop, the online service, mobile, report server), and which to use in a scenario. Card match plus scenarios.
- **From connect to share:** an end-to-end workflow map (connect, transform, model, visualise, publish, share, govern) with a "place the task" game.
- **Power Query and data preparation:** a "fix the messy table" diagnose-and-repair activity.
- **The data model:** relationships, star-schema thinking and cardinality. A sort and a build-the-model activity.
- **DAX basics:** measures vs. calculated columns, and a builder that assembles a measure from cards.
- **Visual design and report critique:** chart-fit scenarios, fix-the-bad-report, and a photo or screenshot upload critique.
- **Publishing, workspaces, access and governance:** scenario matching for who can see what, and a "which setup do we need" decision game.
- **Exam practice:** if the course targets a certification, a checkpoint quiz modelled on its objectives.
- **Agenda, wrap-up and checkpoint**, as in section 1.
The "which BI tool do we hire" client-decision pattern can be reused for choosing a Power BI setup, but needs its own sourced content.
