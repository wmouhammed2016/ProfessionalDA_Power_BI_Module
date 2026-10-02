/* Browser tests for powerbi_lecture1_activities.html
 *
 * Run:  NODE_PATH=/opt/node-tools/node_modules node tests/run.js
 *
 * The shipped file is not modified. A temporary copy gets `window.__T = {...}` injected just
 * before the final `})();` so the tests can read the data. Google Fonts requests are blocked.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

const SRC = path.join(__dirname, '..', 'powerbi_lecture1_activities.html');
const EXPECT = { units: 5, scored: 4, stations: 5 };   // update when activities change
const PIN = 'insight';

let failures = 0, checks = 0;
function ok(cond, msg) { checks++; if (!cond) { failures++; console.log('  ✗ FAIL: ' + msg); } }
function section(t) { console.log('\n' + t); }

function buildTestCopy() {
  let html = fs.readFileSync(SRC, 'utf8');
  const marker = '})();\n</script>';
  const i = html.lastIndexOf(marker);
  if (i < 0) throw new Error('could not find the end of the script');
  const hook = 'window.__T = { UNITS, STAGES, state: () => state, uOf, unitScore, labTotals, overallProgress, stepDone, unitProgress, AGENDA, LABS, okAns, save };\n';
  html = html.slice(0, i) + hook + html.slice(i);
  const f = path.join(os.tmpdir(), 'pbi-l1-test.html');
  fs.writeFileSync(f, html);
  return f;
}

(async () => {
  const file = buildTestCopy();
  const url = 'file://' + file;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\./.test(m.text()) && !/ERR_FAILED|Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(url);
  await page.waitForFunction(() => !!window.__T);

  /* ---------------------------------------------------------------- 1. content integrity */
  section('1. Content integrity');
  const integrity = await page.evaluate(() => {
    const T = window.__T, out = [];
    const ids = T.UNITS.map(u => u.id);
    if (new Set(ids).size !== ids.length) out.push('duplicate unit ids');
    T.UNITS.forEach(u => {
      const st = u.steps(T.uOf(u.id));
      let pts = 0;
      const keys = new Set();
      st.forEach(s => s.blocks.forEach(b => {
        if (b.k) { if (keys.has(b.k)) out.push(u.id + ': duplicate block key ' + b.k); keys.add(b.k); }
        if (b.pts) pts += b.pts;
        if (b.t === 'single') {
          const n = b.opts.filter(o => o.ok).length;
          if (n !== 1) out.push(u.id + '/' + b.k + ': single has ' + n + ' correct options');
          if (new Set(b.opts.map(o => o.v)).size !== b.opts.length) out.push(u.id + '/' + b.k + ': duplicate option values');
        }
        if (b.t === 'grid') {
          const vals = b.choices.map(c => c.v);
          b.items.forEach(it => { [].concat(it.ans).forEach(a => { if (!vals.includes(a)) out.push(u.id + '/' + b.k + '/' + it.v + ': answer not in choices'); }); });
          if (new Set(b.items.map(i => i.v)).size !== b.items.length) out.push(u.id + '/' + b.k + ': duplicate item keys');
        }
        if (b.t === 'order') {
          const vs = b.cards.map(c => c.v);
          if (new Set(vs).size !== vs.length) out.push(u.id + '/' + b.k + ': duplicate card values');
          if (b.answer.length !== b.cards.length || !b.answer.every(a => vs.includes(a))) out.push(u.id + '/' + b.k + ': answer does not match cards');
        }
      }));
      if (!u.noScore && pts !== 100) out.push(u.id + ': points sum to ' + pts);
      if (u.noScore && pts !== 0) out.push(u.id + ': unscored unit has points');
      if (!u.prompts.length || !u.fac.length) out.push(u.id + ': missing prompts or facilitator notes');
    });
    const stationNums = new Set(T.UNITS.map(u => u.station));
    return { out, units: T.UNITS.length, scored: T.UNITS.filter(u => !u.noScore).length, stations: stationNums.size, labStations: T.LABS.pbi.stations.length };
  });
  integrity.out.forEach(m => ok(false, m));
  ok(integrity.units === EXPECT.units, `unit count ${integrity.units} (expected ${EXPECT.units})`);
  ok(integrity.scored === EXPECT.scored, `scored unit count ${integrity.scored} (expected ${EXPECT.scored})`);
  ok(integrity.labStations === EXPECT.stations, `station count ${integrity.labStations} (expected ${EXPECT.stations})`);
  ok(integrity.stations === integrity.labStations, 'every station has a unit');
  const agenda = await page.evaluate(() => ({ total: window.__T.AGENDA.reduce((a, s) => a + s.min, 0), brk: window.__T.AGENDA.filter(s => s.brk).reduce((a, s) => a + s.min, 0) }));
  ok(agenda.total === 180, 'agenda minutes sum to 180 (got ' + agenda.total + ')');
  ok(agenda.brk === 15, 'agenda has a 15-minute break (got ' + agenda.brk + ')');
  const clock = await page.evaluate(() => { let t = 0, bad = []; window.__T.AGENDA.forEach(s => { const [h, m] = s.time.split(':').map(Number); if (h * 60 + m !== t) bad.push(s.t + ' starts ' + s.time + ' but running total is ' + t); t += s.min; }); return bad; });
  clock.forEach(m => ok(false, 'agenda clock: ' + m));
  console.log(`  ${integrity.units} units, ${agenda.total}-minute agenda`);

  /* ---------------------------------------------------------------- 2. scoring */
  section('2. Scoring (perfect = 100, all wrong = 0)');
  const scoring = await page.evaluate(() => {
    const T = window.__T, res = {};
    T.UNITS.filter(u => !u.noScore).forEach(u => {
      const q = T.uOf(u.id); q.a = {}; q.o = {};
      const steps = u.steps(q);
      steps.forEach(s => s.blocks.forEach(b => {
        if (b.t === 'single') q.a[b.k] = b.opts.find(o => o.ok).v;
        if (b.t === 'grid') q.a[b.k] = Object.fromEntries(b.items.map(it => [it.v, [].concat(it.ans)[0]]));
        if (b.t === 'order') q.a[b.k] = b.answer.slice();
      }));
      const perfect = T.unitScore(u, q).total;
      steps.forEach(s => s.blocks.forEach(b => {
        if (b.t === 'single') q.a[b.k] = b.opts.find(o => !o.ok).v;
        if (b.t === 'grid') q.a[b.k] = Object.fromEntries(b.items.map(it => { const c = b.choices.find(c => ![].concat(it.ans).includes(c.v)); return [it.v, c.v]; }));
        if (b.t === 'order') q.a[b.k] = b.answer.slice().reverse();
      }));
      res[u.id] = { perfect, wrong: T.unitScore(u, q).total };
      q.a = {};
    });
    return res;
  });
  Object.entries(scoring).forEach(([id, r]) => {
    ok(r.perfect === 100, id + ' perfect answers score ' + r.perfect);
    // The reversed order of 5 cards keeps the middle card in place, so p2 can retain 10 of 50 order points.
    ok(r.wrong <= 10, id + ' all-wrong answers score ' + r.wrong);
  });
  console.log('  ' + Object.entries(scoring).map(([k, v]) => `${k}: ${v.perfect}/${v.wrong}`).join('  '));

  /* ---------------------------------------------------------------- 3. leak guard on all routes */
  section('3. Leak guard (no ${, undefined, NaN, [object in any route)');
  const routes = ['#/', '#/agenda', '#/wrapup', '#/pbi'];
  const unitIds = await page.evaluate(() => window.__T.UNITS.map(u => ({ id: u.id, n: u.steps(window.__T.uOf(u.id)).length })));
  unitIds.forEach(u => { for (let s = 1; s <= u.n + 1; s++) routes.push(`#/pbi/${u.id}/${s}`); });
  const bad = /\$\{|undefined|NaN|\[object/;
  async function visit(r) { await page.evaluate(h => { location.hash = '#/__nav'; }, r); await page.evaluate(h => { location.hash = h; }, r); await page.waitForTimeout(30); }
  for (const r of routes) {
    await visit(r);
    const txt = await page.evaluate(() => document.body.innerText + ' ' + document.title);
    ok(!bad.test(txt), 'leak on ' + r + ': ' + (txt.match(bad) || [''])[0]);
  }
  console.log('  checked ' + routes.length + ' routes (before answers)');

  /* ---------------------------------------------------------------- 4. real UI drive */
  section('4. Real UI drive: play, submit, reveal');
  await visit('#/pbi');
  await page.fill('#team', 'Test Team');

  async function answerUnitViaUI(unitId) {
    const info = await page.evaluate(id => { const T = window.__T, u = T.UNITS.find(x => x.id === id), q = T.uOf(id); return { n: u.steps(q).length }; }, unitId);
    for (let s = 1; s <= info.n; s++) {
      await visit(`#/pbi/${unitId}/${s}`);
      const blocks = await page.evaluate(([id, s]) => { const T = window.__T, u = T.UNITS.find(x => x.id === id); return u.steps(T.uOf(id))[s - 1].blocks.map(b => ({ t: b.t, k: b.k, items: b.items && b.items.map(i => ({ v: i.v, ans: [].concat(i.ans)[0] })), ok: b.opts && b.opts.filter(o => o.ok).map(o => o.v)[0], answer: b.answer, nCards: b.cards && b.cards.length })); }, [unitId, s]);
      for (const b of blocks) {
        if (b.t === 'single') await page.click(`[data-k="o-${b.k}-${b.ok}"]`, { force: true });
        if (b.t === 'grid') for (const it of b.items) await page.click(`[data-k="g-${b.k}-${it.v}-${it.ans}"]`, { force: true });
        if (b.t === 'order') {
          for (let i = 0; i < b.answer.length; i++) {
            await page.click(`[data-k="card-${b.k}-${b.answer[i]}"]`);
            await page.click(`[data-k="slot-${b.k}-${i}"]`);
          }
        }
        if (b.t === 'text') await page.fill(`#t-${b.k}`, 'Team answer for ' + b.k);
        if (b.t === 'map') { await page.click('[data-k="stop-2"]'); }
      }
    }
    await visit(`#/pbi/${unitId}/${info.n + 1}`);
    await page.click('[data-act="pbi-submit"]');
    await page.click('[data-act="modal-ok"]');
    await page.waitForFunction(id => location.hash.endsWith(id + '/results'), unitId);
    await page.waitForSelector('.locked');   // the hashchange render is asynchronous
  }
  for (const u of unitIds) await answerUnitViaUI(u.id);
  const progress = await page.evaluate(() => window.__T.overallProgress());
  ok(progress.d === progress.n && progress.n === EXPECT.units - 1, `all required activities submitted (${progress.d}/${progress.n})`);
  const locked = await page.evaluate(() => document.body.innerText);
  ok(/Answers locked in/.test(locked), 'results page is locked before the reveal');
  ok(!/Best answer/.test(locked), 'no answers leak before the reveal');

  // map panel interaction
  await visit('#/pbi/p2/1'); // submitted → redirects to results; open map via reopen path instead
  await page.evaluate(() => { const u = window.__T.uOf('p2'); u.submitted = false; window.__T.save(); });
  await visit('#/pbi/p2/1');
  await page.click('[data-k="stop-0"]');
  ok(/Power Query/.test(await page.innerText('.stagepanel')), 'map stop shows the component card');
  await page.focus('[data-k="stop-3"]'); await page.keyboard.press('Enter');
  ok(/Visuals/.test(await page.innerText('.stagepanel')), 'map stop is keyboard operable');
  await page.evaluate(() => { const u = window.__T.uOf('p2'); u.submitted = true; window.__T.save(); });

  // facilitator mode
  await visit('#/pbi/p1/results');
  await page.click('[data-act="fac"]');
  await page.fill('#pin', 'wrong'); await page.press('#pin', 'Enter');
  ok(/isn’t right/.test(await page.innerText('#pinerr')), 'wrong facilitator code is rejected');
  await page.fill('#pin', PIN); await page.press('#pin', 'Enter');
  await page.waitForSelector('[data-act="pbi-reveal"]');
  await page.click('[data-act="pbi-reveal"]');
  await page.waitForSelector('.score .num');
  ok(/100\s*\/ 100/.test(await page.innerText('.score .num').then(t => t.replace(/\s+/g, ' '))), 'p1 shows 100 / 100 after the reveal');
  await visit('#/pbi');
  await page.click('[data-act="pbi-reveal-all"]');
  const tot = await page.evaluate(() => window.__T.labTotals('pbi'));
  ok(tot.n === EXPECT.scored && tot.got === EXPECT.scored * 100, `lab total ${tot.got}/${tot.max} after reveal-all`);
  await visit('#/pbi/p4/results');
  ok(/Not scored/.test(await page.innerText('main')), 'unscored fit check says it is not scored');
  ok(/Peer review/.test(await page.innerText('main')), 'unscored fit check shows the peer-review card');

  /* leak guard again, with answers and results showing */
  section('5. Leak guard with answers revealed');
  for (const r of routes) {
    await visit(r);
    const txt = await page.evaluate(() => document.body.innerText + ' ' + document.title);
    ok(!bad.test(txt), 'leak on ' + r + ' (revealed): ' + (txt.match(bad) || [''])[0]);
  }

  /* ---------------------------------------------------------------- 6. navigation + layout */
  section('6. Navigation and layout');
  await visit('#/pbi/p3/results');
  ok(await page.locator('main a.btn', { hasText: 'Back to Power BI Ecosystem Lab' }).count() > 0, 'results page offers a way back to the lab');
  await visit('#/wrapup');
  ok(await page.locator('main a.btn', { hasText: 'Back to the agenda' }).count() > 0, 'wrap-up links back to the agenda');
  // browser Back works through hash routes
  await visit('#/pbi');
  await page.evaluate(() => { location.hash = '#/pbi/p5/results'; });
  await page.waitForSelector('h1');
  await page.goBack();
  ok(/#\/pbi$/.test(await page.evaluate(() => location.hash)), 'browser Back returns to the previous route');
  // 390px: no horizontal scroll on every route
  await page.setViewportSize({ width: 390, height: 800 });
  const overflow = [];
  for (const r of routes) {
    await visit(r);
    const w = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    if (w.sw > w.cw + 1) overflow.push(r + ' (' + w.sw + ' > ' + w.cw + ')');
  }
  overflow.forEach(m => ok(false, 'horizontal scroll at 390px on ' + m));
  console.log('  390px: ' + (overflow.length ? overflow.length + ' route(s) overflow' : 'no horizontal scroll on ' + routes.length + ' routes'));
  await page.setViewportSize({ width: 1200, height: 900 });

  /* ---------------------------------------------------------------- 7. persistence */
  section('7. Persistence');
  await visit('#/wrapup');
  await page.check('[data-k="hw-h2"]');
  await page.fill('#rem', 'Five components in order');
  await page.waitForTimeout(500);
  await page.reload();
  await page.waitForFunction(() => !!window.__T);
  await visit('#/wrapup');
  ok(await page.isChecked('[data-k="hw-h2"]'), 'homework checkbox survives a reload');
  ok((await page.inputValue('#rem')) === 'Five components in order', 'notes survive a reload');
  const after = await page.evaluate(() => ({ team: window.__T.state().team, sub: window.__T.overallProgress().d }));
  ok(after.team === 'Test Team', 'team name survives a reload');
  ok(after.sub === EXPECT.units - 1, 'submitted activities survive a reload');
  const ordKept = await page.evaluate(() => window.__T.uOf('p2').a.flow);
  ok(Array.isArray(ordKept) && ordKept.length === 5 && ordKept.every(Boolean), 'card-game placement survives a reload');

  // storage blocked: the app must still render and warn
  const ctx2 = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx2.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx2.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
  const page2 = await ctx2.newPage();
  await page2.goto(url);
  await page2.waitForSelector('#main h1');
  ok(/blocking storage/.test(await page2.innerText('#saved')), 'blocked storage shows a clear warning');
  await ctx2.close();

  /* ---------------------------------------------------------------- 8. card game: take-back and replace */
  section('8. Card game mechanics');
  await visit('#/pbi/p2/2');
  await page.evaluate(() => { const T = window.__T, u = T.uOf('p2'); u.submitted = false; delete u.a.flow; T.save(); });
  await visit('#/pbi/p2/2');
  await page.click('[data-k="card-flow-pq"]');
  await page.click('[data-k="slot-flow-2"]');
  ok((await page.getAttribute('[data-k="slot-flow-2"]', 'aria-label')).includes('Power Query'), 'placing a card fills the chosen slot');
  await page.click('[data-k="card-flow-dm"]');
  await page.click('[data-k="slot-flow-2"]');
  ok((await page.getAttribute('[data-k="slot-flow-2"]', 'aria-label')).includes('Data model'), 'placing a second card replaces the first');
  ok(await page.locator('[data-k="card-flow-pq"]').count() === 1, 'the replaced card returns to the hand');
  await page.click('[data-k="slot-flow-2"]');
  ok(await page.locator('[data-k="card-flow-dm"]').count() === 1, 'tapping a filled slot returns its card to the hand');
  await page.evaluate(() => { const T = window.__T, u = T.uOf('p2'); u.a.flow = ['pq', 'dm', 'dx', 'vz', 'sh']; u.submitted = true; T.save(); });

  ok(errors.length === 0, 'no page or console errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));

  await browser.close();
  console.log(`\n${checks - failures} of ${checks} checks passed`);
  if (failures) { console.log(failures + ' FAILED'); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
