// Koppeling met de ZorgScan-service (aparte app + eigen database).
// Wij halen alleen gegevens op via de API; ZorgScan blijft de eigenaar van de data.
const ZS_URL = String(process.env.ZORGSCAN_URL || '').replace(/\/+$/, '');
const ZS_KEY = String(process.env.ZORGSCAN_API_KEY || '').trim();
const configured = () => !!(ZS_URL && ZS_KEY);

async function zsFetch(path, timeoutMs = 8000) {
  if (!configured()) return { error: 'not_configured' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(ZS_URL + path, { headers: { 'X-API-Key': ZS_KEY, Accept: 'application/json' }, signal: ctrl.signal });
    if (!r.ok) return { error: 'http_' + r.status };
    return { data: await r.json() };
  } catch (e) {
    return { error: e.name === 'AbortError' ? 'timeout' : 'network' };
  } finally { clearTimeout(t); }
}

const PROFESSIONS = ['verpleegkundige', 'verzorgende', 'helpende', 'begeleider', 'arts', 'overig'];
const PROVINCES = ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland', 'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland'];

function foutTekst(code) {
  if (code === 'not_configured') return 'ZorgScan is nog niet gekoppeld. Zet <code>ZORGSCAN_URL</code> en <code>ZORGSCAN_API_KEY</code> in de variabelen van deze service.';
  if (code === 'timeout') return 'ZorgScan reageerde niet binnen 8 seconden. Waarschijnlijk start de service net op — probeer het zo opnieuw.';
  if (code === 'network') return 'Geen verbinding met ZorgScan. Draait de service nog?';
  if (String(code).startsWith('http_401') || String(code).startsWith('http_403')) return 'ZorgScan weigert de API-sleutel. Controleer <code>ZORGSCAN_API_KEY</code>.';
  return 'ZorgScan gaf een fout terug (' + code + ').';
}

function renderPanel(stats, vac, f, h) {
  const esc = h.esc;
  const url = ZS_URL;
  if (!stats.data) return `<p class="error">${foutTekst(stats.error)}</p>${url ? `<p><a class="btn navy small" href="${esc(url)}" target="_blank" rel="noopener">ZorgScan openen ↗</a></p>` : ''}`;

  const t = stats.data.totals || {};
  const sh = stats.data.sourceHealth || {};
  const run = stats.data.lastRun || null;
  const tegel = (label, waarde, extra) => `<div class="zs-tile"><b>${esc(waarde == null ? '—' : waarde)}</b><span>${esc(label)}</span>${extra ? `<i>${esc(extra)}</i>` : ''}</div>`;

  const tiles = [
    tegel('Open vacatures', t.open_total),
    tegel('Relevant voor ons', t.hc_relevant, 'HC-score 60+'),
    tegel('Nieuw vandaag', t.new_today),
    tegel('Nieuw deze week', t.new_week),
    tegel('BIG-plicht', t.big_required),
    tegel('Werkgevers', t.employers)
  ].join('');

  const runInfo = run
    ? `Laatste scan: ${esc(run.status || '?')}${run.inserted != null ? ` · ${esc(run.inserted)} nieuw` : ''}${run.found != null ? ` · ${esc(run.found)} gevonden` : ''}${run.finished_at ? ` · ${esc(new Date(run.finished_at).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' }))}` : ''}`
    : 'Nog geen scan uitgevoerd.';
  const bronInfo = sh.total != null ? `Bronnen: ${esc(sh.ok || 0)} in orde · ${esc(sh.failing || 0)} met fouten · ${esc(sh.empty || 0)} leeg · ${esc(sh.total)} totaal` : '';

  const opt = (naam, lijst, huidig, leeg) => `<select name="${naam}"><option value="">${leeg}</option>${lijst.map(x => `<option value="${esc(x)}"${huidig === x ? ' selected' : ''}>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</option>`).join('')}</select>`;
  const filters = `<form class="tp-filters" method="get" action="/zorgscan">
${opt('profession', PROFESSIONS, f.profession, 'Alle beroepsgroepen')}
${opt('province', PROVINCES, f.province, 'Alle provincies')}
<select name="hc_min"><option value="">Elke HC-score</option>${[40, 60, 75, 85].map(n => `<option value="${n}"${String(f.hc_min) === String(n) ? ' selected' : ''}>HC ${n}+</option>`).join('')}</select>
<input type="search" name="q" value="${esc(f.q || '')}" placeholder="Zoek op functie of werkgever">
<button class="btn navy small">Filteren</button>
<a class="btn light small" href="/zorgscan">Wissen</a>
<a class="btn gold small" href="${esc(url)}" target="_blank" rel="noopener">ZorgScan openen ↗</a></form>`;

  let lijst;
  if (!vac.data) {
    lijst = `<p class="error">${foutTekst(vac.error)}</p>`;
  } else {
    const rows = (vac.data.results || []).map(v => {
      const score = Number(v.hc_score || 0);
      const cls = score >= 75 ? ' good' : (score >= 60 ? ' mid' : '');
      const link = v.url ? `<a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.title || '(zonder titel)')}</a>` : esc(v.title || '(zonder titel)');
      return `<tr><td class="tname">${link}<br><span class="tp-sub">${esc(v.employer || '')}</span></td>
<td>${esc(v.profession_label || v.profession || '—')}</td>
<td>${esc(v.city || '—')}${v.province ? `<br><span class="tp-sub">${esc(v.province)}</span>` : ''}</td>
<td>${v.big_required ? 'Ja' : 'Nee'}</td>
<td><span class="tp-pct${cls}">${esc(score)}</span></td>
<td>${esc(v.first_seen_at ? new Date(v.first_seen_at).toLocaleDateString('nl-NL') : '—')}</td></tr>`;
    }).join('');
    lijst = `<div class="tablewrap"><table class="rtable"><thead><tr><th>Functie / werkgever</th><th>Beroepsgroep</th><th>Plaats</th><th>BIG</th><th>HC</th><th>Gezien</th></tr></thead>
<tbody>${rows || '<tr><td colspan="6" class="empty">Geen vacatures gevonden met deze filters.</td></tr>'}</tbody></table></div>
<p class="hint">${esc(vac.data.total || 0)} resultaten in totaal — hier de eerste ${esc((vac.data.results || []).length)}. Volledige lijst en export in ZorgScan zelf.</p>`;
  }

  return `<p class="hint">Live gegevens uit ZorgScan, de vacaturemonitor die dagelijks de werkenbij-sites van Nederlandse zorgwerkgevers scant. De HC-score geeft aan hoe kansrijk een vacature is voor internationale plaatsing.</p>
<div class="zs-tiles">${tiles}</div>
<p class="zs-run">${runInfo}${bronInfo ? ' · ' + bronInfo : ''}</p>
<h2>Relevante vacatures</h2>
${filters}
${lijst}`;
}

module.exports = { configured, zsFetch, renderPanel, PROFESSIONS, PROVINCES, ZS_URL };
