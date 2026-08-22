// Berichtenbak. Doel: in een paar klikken tientallen spamberichten weg.
// Daarom: aanvinken in de lijst, bulkacties bovenaan, en het bericht zelf
// direct leesbaar zodat je niets hoeft te openen om te kunnen beoordelen.

const STATUS = ['Nieuw', 'Beantwoord', 'Gearchiveerd'];

// Spamsignalen. Bewust conservatief: dit selecteert alleen voor, verwijdert nooit
// zelf. De beheerder ziet de selectie en bevestigt.
const SPAMWOORDEN = /\b(seo|backlink|ranking|casino|crypto|bitcoin|forex|viagra|cialis|loan|payday|escort|porn|nude|webcam|traffic|guest post|link building|marketing offer|cheap|discount code|click here|earn money|make money|work from home|investment opportunity)\b/i;
const URL_PATROON = /(https?:\/\/|www\.)/i;
const NIET_LATIJN = /[Ѐ-ӿ؀-ۿ一-鿿฀-๿]/;

function spamScore(m) {
  let score = 0;
  const tekst = String(m.message || '');
  const naam = String(m.name || '');
  const onderwerp = String(m.subject || '');
  const alles = naam + ' ' + onderwerp + ' ' + tekst;

  const urls = (tekst.match(/(https?:\/\/|www\.)/gi) || []).length;
  if (urls >= 2) score += 3; else if (urls === 1) score += 2;
  if (SPAMWOORDEN.test(alles)) score += 3;
  if (NIET_LATIJN.test(alles)) score += 2;
  if (tekst.length < 12) score += 1;
  if (tekst.length > 1500) score += 1;
  if (!/\s/.test(naam.trim()) && /\d/.test(naam)) score += 1; // naam als "user1234"
  if (/^[A-Z\s!]{15,}$/.test(onderwerp)) score += 1;          // ONDERWERP IN KAPITALEN
  return score;
}
const isVerdacht = (m) => spamScore(m) >= 3;

function knip(t, n) {
  const s = String(t || '').replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n) + '…' : s;
}

function renderMessages(items, f, h) {
  const esc = h.esc, badge = h.badge;
  const verdacht = items.filter(isVerdacht).length;

  const filterKnop = (waarde, label, actief) =>
    `<a class="btn ${actief ? 'navy' : 'light'} small" href="/messages?status=${encodeURIComponent(waarde)}${f.q ? '&q=' + encodeURIComponent(f.q) : ''}">${esc(label)}</a>`;

  const rijen = items.map(m => {
    const sp = isVerdacht(m);
    return `<tr class="${sp ? 'msg-spam' : ''}">
<td class="msg-check"><input type="checkbox" name="ids" value="${m._id}" data-rij${sp ? ' data-verdacht' : ''} aria-label="Selecteer bericht van ${esc(m.name || '')}"></td>
<td class="msg-van"><b>${esc(m.name || '(geen naam)')}</b>${sp ? '<span class="msg-flag">mogelijk spam</span>' : ''}<br><a href="mailto:${esc(m.email || '')}">${esc(m.email || '')}</a></td>
<td class="msg-inhoud">${m.subject ? '<b>' + esc(m.subject) + '</b><br>' : ''}<span>${esc(knip(m.message, 220))}</span></td>
<td class="msg-datum">${esc(m.createdAt ? new Date(m.createdAt).toLocaleDateString('nl-NL') : '')}<br><span class="tp-sub">${esc(m.lang ? m.lang.toUpperCase() : '')}</span></td>
<td>${badge(m.status)}</td>
<td class="tact"><a class="btn navy small" href="/messages/${m._id}">Open</a></td></tr>`;
  }).join('');

  return `<p class="hint">Vink berichten aan en verwijder ze in één keer. Berichten met een spamvermoeden zijn gemarkeerd; met de knop hieronder selecteer je ze allemaal tegelijk. Er wordt nooit iets automatisch verwijderd.</p>

<form class="tp-filters" method="get" action="/messages">
<input type="search" name="q" value="${esc(f.q || '')}" placeholder="Zoek op naam, e-mail of inhoud">
<button class="btn navy small">Zoeken</button>
<a class="btn light small" href="/messages">Wissen</a>
</form>
<div class="msg-filters">
${filterKnop('', 'Alles', !f.status)}
${STATUS.map(s => filterKnop(s, s, f.status === s)).join('')}
</div>

<form method="post" action="/messages/bulk" id="msgform">
<div class="msg-balk">
<label class="msg-alles"><input type="checkbox" data-alles> Alles selecteren</label>
<button type="button" class="btn light small" data-selecteer-spam>Selecteer mogelijke spam${verdacht ? ' (' + verdacht + ')' : ''}</button>
<span class="msg-teller" data-teller>0 geselecteerd</span>
<span class="msg-acties">
<button class="btn navy small" name="actie" value="archiveren">Archiveren</button>
<button class="btn danger small" name="actie" value="verwijderen" data-bevestig>Verwijderen</button>
</span>
</div>
<div class="tablewrap"><table class="rtable msg-tabel"><thead><tr>
<th class="msg-check"></th><th>Afzender</th><th>Bericht</th><th>Datum</th><th>Status</th><th></th>
</tr></thead><tbody>${rijen || '<tr><td colspan="6" class="empty">Geen berichten gevonden.</td></tr>'}</tbody></table></div>
</form>
<p class="hint">${items.length} bericht${items.length === 1 ? '' : 'en'} in deze selectie${verdacht ? `, waarvan ${verdacht} met een spamvermoeden` : ''}.</p>
<script src="/js/berichten.js"></script>`;
}

function renderMessageDetail(m, h) {
  const esc = h.esc;
  const statusOpts = STATUS.map(s => `<option value="${esc(s)}"${m.status === s ? ' selected' : ''}>${esc(s)}</option>`).join('');
  const sp = isVerdacht(m);
  return `<p><a class="btn navy small" href="/messages">← Terug naar berichten</a></p>
${sp ? '<p class="warn">Dit bericht heeft kenmerken van spam. Beoordeel zelf voordat je reageert.</p>' : ''}
<div class="rcard">
<h2>${esc(m.name || '(geen naam)')}</h2>
<p><a class="btn gold small" href="mailto:${esc(m.email || '')}?subject=${encodeURIComponent('Re: ' + (m.subject || 'je bericht aan Honor Care'))}">Beantwoorden</a></p>
<div class="tablewrap"><table class="rtable"><tbody>
<tr><td class="tp-k">E-mail</td><td>${esc(m.email || '—')}</td></tr>
<tr><td class="tp-k">Onderwerp</td><td>${esc(m.subject || '—')}</td></tr>
<tr><td class="tp-k">Taal</td><td>${esc(m.lang ? m.lang.toUpperCase() : '—')}</td></tr>
<tr><td class="tp-k">Ontvangen</td><td>${esc(m.createdAt ? new Date(m.createdAt).toLocaleString('nl-NL') : '—')}</td></tr>
</tbody></table></div>
<h3>Bericht</h3><p class="tp-motiv">${esc(m.message || '')}</p>
</div>
<div class="rcard"><h2>Afhandeling</h2>
<form class="rform" method="post" action="/messages/${m._id}">
<div class="ff"><label for="st">Status</label><select id="st" name="status">${statusOpts}</select></div>
<div class="rform-actions"><button class="btn gold">Opslaan</button></div></form>
<form method="post" action="/messages/${m._id}/delete" class="delform"><button class="btn danger small">Verwijderen</button></form>
</div>`;
}

module.exports = { STATUS, spamScore, isVerdacht, renderMessages, renderMessageDetail };
