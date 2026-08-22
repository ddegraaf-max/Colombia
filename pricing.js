// Rekenmodel voor het bemiddelingstarief richting het partnerbureau.
// Alleen voor intern gebruik in het beheerportaal. De marktreferentie komt uit
// openbare bronnen: werving en selectie in Nederland ligt op 20-30% van het
// bruto jaarsalaris, gemiddeld rond 25%.

const VELDEN = [
  { n: 'werving', l: 'Werving en selectie', h: 'Advertenties, screening, gesprekken, reiskosten', d: 1200 },
  { n: 'taal', l: 'Taalopleiding tot B1/B2', h: 'Cursus, examentraining en begeleiding', d: 2500 },
  { n: 'erkenning', l: 'Diploma-erkenning en BIG', h: 'Documenten, vertalingen, registratiekosten', d: 600 },
  { n: 'begeleiding', l: 'Begeleiding en coördinatie', h: 'Uren van je coördinator over het hele traject', d: 2000 },
  { n: 'huisvesting', l: 'Huisvestingscoördinatie', h: 'Zoeken, inrichten en regelen; niet de huur zelf', d: 800 },
  { n: 'overig', l: 'Overige kosten', h: 'Reizen, examengeld, onvoorzien', d: 500 }
];

const AANNAMES = [
  { n: 'uitval', l: 'Uitval vóór plaatsing', h: 'Percentage kandidaten dat afhaakt na gemaakte kosten', d: 30, suffix: '%' },
  { n: 'marge', l: 'Gewenste marge', h: 'Opslag op je kostprijs', d: 35, suffix: '%' },
  { n: 'salaris', l: 'Bruto maandsalaris kandidaat', h: 'Voor de vergelijking met de marktnorm', d: 3400, suffix: '€' }
];

function renderPricing(esc) {
  const veld = (v) => `<div class="tf-row">
<label for="p_${v.n}">${esc(v.l)}<span>${esc(v.h)}</span></label>
<div class="tf-input"><i>€</i><input id="p_${v.n}" data-kost type="number" min="0" step="50" value="${v.d}"></div></div>`;
  const aanname = (v) => `<div class="tf-row">
<label for="p_${v.n}">${esc(v.l)}<span>${esc(v.h)}</span></label>
<div class="tf-input"><i>${v.suffix === '%' ? '%' : '€'}</i><input id="p_${v.n}" data-aanname="${v.n}" type="number" min="0" step="${v.suffix === '%' ? 1 : 50}" value="${v.d}"></div></div>`;

  return `<p class="hint">Vul je werkelijke kosten per kandidaat in. Het model rekent door wat een geplaatste kandidaat je kost als een deel onderweg afhaakt, en wat je dan minimaal moet vragen. Alles rekent direct mee — niets wordt opgeslagen.</p>

<div class="tf-grid">
<div class="rcard"><h2>Kosten per kandidaat</h2>${VELDEN.map(veld).join('')}
<div class="tf-total"><span>Directe kosten per kandidaat</span><b data-uit="direct">—</b></div></div>

<div class="rcard"><h2>Aannames</h2>${AANNAMES.map(aanname).join('')}
<p class="hint">Uitval is je grootste risico: kandidaten die afhaken kosten geld maar leveren niets op. Die kosten moeten worden goedgemaakt door de kandidaten die wél geplaatst worden.</p></div>
</div>

<div class="rcard tf-uitkomst"><h2>Uitkomst</h2>
<div class="tf-cards">
<div class="tf-card"><span>Kostprijs per geplaatste kandidaat</span><b data-uit="kostprijs">—</b><i>inclusief uitval</i></div>
<div class="tf-card tf-break"><span>Break-even tarief</span><b data-uit="breakeven">—</b><i>hieronder verlies je geld</i></div>
<div class="tf-card tf-advies"><span>Geadviseerd tarief</span><b data-uit="advies">—</b><i>met jouw marge</i></div>
</div>
<p class="tf-uitleg" data-uit="uitleg"></p>
</div>

<div class="rcard"><h2>Vergelijking met de marktnorm</h2>
<p class="hint">Werving en selectie in Nederland ligt doorgaans op 20 tot 30 procent van het bruto jaarsalaris, gemiddeld rond 25 procent. Jaarsalaris hieronder is inclusief 8,33% vakantiegeld en 8,33% eindejaarsuitkering.</p>
<div class="tablewrap"><table class="rtable"><thead><tr><th>Grondslag</th><th>Bedrag</th></tr></thead><tbody>
<tr><td>Bruto jaarsalaris (incl. toeslagen)</td><td data-uit="jaar">—</td></tr>
<tr><td>Marktnorm 20%</td><td data-uit="m20">—</td></tr>
<tr><td>Marktnorm 25%</td><td data-uit="m25">—</td></tr>
<tr><td>Marktnorm 30%</td><td data-uit="m30">—</td></tr>
<tr><td><b>Jouw geadviseerde tarief</b></td><td><b data-uit="advies2">—</b></td></tr>
</tbody></table></div>
<p class="hint">Ligt jouw tarief boven de marktnorm, dan is dat te verdedigen: je levert een kandidaat die de taal beheerst, BIG-geregistreerd is en gehuisvest wordt. Leg dat verschil wel uit aan tafel.</p></div>

<div class="rcard"><h2>Afspraken die je hoort te maken</h2>
<ul class="tf-tips">
<li><b>Betaal in fasen.</b> Een deel bij overdracht aan het bureau, een deel bij contractondertekening, een deel na de proeftijd. Zo draagt het bureau een stuk van het uitvalrisico.</li>
<li><b>Leg een terugbetalingsregeling vast.</b> Gebruikelijk is een aflopende regeling bij vertrek binnen twee tot drie maanden — die werkt twee kanten op.</li>
<li><b>Regel wie subsidies aanvraagt.</b> Het partnerbureau is juridisch de werkgever en kan daardoor aanspraak maken op regelingen zoals EURES TMS voor taalcursus en diploma-erkenning. Maak jij de kosten, dan hoort die opbrengst bij jou te landen.</li>
<li><b>Spreek af wat er gebeurt bij afwijzing door het BIG-register.</b> Dat is geen wanprestatie van jou, maar het kost je wel het hele voortraject.</li>
</ul></div>

<script src="/js/tarief.js"></script>`;
}

module.exports = { renderPricing, VELDEN, AANNAMES };
