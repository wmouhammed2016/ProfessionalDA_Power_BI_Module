# Starter prompt for the new repo

How to use this kit in the new Power BI repo:

1. Save `ACTIVITY_FILE_SPEC.md` as `CLAUDE.md` in the root of the new repo.
2. Copy the reference file into the new repo as `reference/business_understanding_game.html`. It is the working engine, theme and UX to reuse. Claude must remove its Tableau, KPI, avocado and Gartner content.
3. Add your Power BI lecture material (slides, exercises, README) to the repo, or attach it in the conversation.
4. Paste the prompt below into the first conversation.

---

```text
I teach a data analytics bootcamp and I want an interactive, self-contained HTML activity file for my Power BI lecture, built the same way as the reference file in reference/business_understanding_game.html.

Before you do anything:
1. Read CLAUDE.md (the full spec) and skim the reference file: its theme, its lab/unit/block engine, its agenda and wrap-up pages.
2. Read my Power BI lecture material in this repo. Ask me for anything missing: slides, exercise files, the palette from my slides, and how long the session is.

Then DO NOT build yet. First send me a plan:
- the labs and activities you propose, in lecture order, with rough timings and which parts are live teaching;
- which proven activity patterns you will reuse (card sorts, builders, fix-the-bad-X, workflow map, case builders, client decision, photo upload, team brief, checkpoint);
- what comes from my material and what you would write yourself (flag that as "to verify");
- the decisions you need from me, with a recommendation for each.

Rules that apply throughout: team play for Zoom breakout rooms; feedback hidden until the facilitator reveals it; every scored activity out of 100; free text is never scored and is peer-reviewed; progress saved in the browser; Back buttons and breadcrumbs everywhere; light theme using my slide palette; no logos; no invented facts or numbers; test in a real browser before every commit; commit to the branch I give you and open no pull request.

When I approve the plan, build one lab at a time, test each, and tell me what to verify.
```
