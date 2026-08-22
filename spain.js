// Spanje naast Nederland. De meeste bureaus laten alleen het Nederlandse bedrag zien.
// Wij zetten er het Spaanse salaris naast, corrigeren voor het duurdere leven hier en
// benoemen ook wat er tegenover staat. Dat is het verschil tussen werven en misleiden —
// en het scheelt uitval, want niemand komt aan met een verkeerd beeld.
//
// Alle Spaanse cijfers staan in ES; de Nederlandse bedragen worden berekend uit de
// CAO-tabel in salary.js, zodat een nieuwe CAO-tabel hier automatisch doorwerkt.

const ES = {
  // Publieke sector Spanje, 2026. Bruto per jaar inclusief de 14 pagas en complementos.
  tcae: { min: 20000, max: 25000 },
  enfermeroStart: { min: 25000, max: 30000 },
  enfermeroSenior: { min: 38000, max: 48000 },
  // Referentiepunt met naam en toenaam: SERMAS Madrid, A2-verpleegkundige.
  madridMaand: 2097, madridJaar: 28129,
  // Verschil tussen de best en slechtst betalende autonome regio.
  spreidingCCAA: 13000,
  // Arbeidsmarkt: 11.470 contracten voor 6.221 professionals in 2025.
  tijdelijkPct: '76,7%', deeltijd: '1 op de 3',
  // Verpleegkundigen per 1.000 inwoners (OESO / Eurostat).
  ratioES: '6,45', ratioEU: '8,12', ratioNL: '11,5',
  tekort: '100.000',
  // Kosten van levensonderhoud, Nederland ten opzichte van Spanje.
  duurderPct: 23, huurDuurderPct: 60,
  bronnen: [
    ['Sueldo enfermero/a España 2026 por CCAA', 'https://redopositor.com/blog/es-sueldo-enfermera-por-ccaa-2026/'],
    ['Sueldo TCAE / auxiliar de enfermería 2026', 'https://www.preparaoposiciones.com/blog/guias/sueldo-tcae-auxiliar-enfermeria-2026/'],
    ['Ratio de enfermeras en España frente a la media europea', 'https://gacetamedica.com/profesion/ratio-enfermeras-faltan-debajo-media-europa/'],
    ['OECD Health at a Glance: Europe — availability of nurses', 'https://www.oecd.org/en/publications/health-at-a-glance-europe-2024_b3704e14-en/full-report/component-61.html'],
    ['Comparación del coste de vida: Países Bajos y España', 'https://citycost.org/es/compare/netherlands-vs-spain/']
  ]
};

const V = {
  nl: {
    eyebrow: 'SPANJE NAAST NEDERLAND', h2: 'Wat verdien je nu, en wat verdien je hier?',
    sub: 'Andere bureaus laten alleen het Nederlandse bedrag zien. Wij zetten er het Spaanse salaris naast, rekenen het duurdere leven in Nederland eruit en benoemen ook wat je ervoor inlevert. Dan weet je waar je aan begint.',
    tCol: ['Functie', 'Spanje', 'Nederland', 'Verschil'],
    tRows: {
      tcae: 'Auxiliar de enfermería / ondersteunende functie',
      start: 'Verpleegkundige, aan het begin',
      senior: 'Verpleegkundige, 10 jaar of meer'
    },
    tNote: 'Bruto per jaar, voltijd. Spaanse bedragen: publieke sector 2026 inclusief de 14 pagas en de complementos. Nederlandse bedragen: CAO VVT bij 36 uur, inclusief 8% vakantiegeld en 8,33% eindejaarsuitkering. De onderkant van de Nederlandse marge is zonder onregelmatige diensten, de bovenkant met regelmatige avond-, nacht- en weekenduren.',
    kern: {
      h: 'Het punt dat de meeste mensen missen',
      p: 'Kijk naar de eerste regel. Je werkt in Nederland nog in een ondersteunende functie, je BIG-registratie is nog niet rond — en je verdient dan al meer dan een verpleegkundige aan het begin van haar loopbaan in Spanje. Je hoeft dus niet te wachten tot alles geregeld is voordat je erop vooruitgaat.'
    },
    koop: {
      h: 'Maar Nederland is duurder — dit blijft er echt over',
      p: 'Eerlijk is eerlijk: het leven hier kost gemiddeld ongeveer {duurder}% meer dan in Spanje en de huren liggen zo’n {huur}% hoger. Reken dat eruit en het verschil wordt kleiner, maar het blijft een verschil. En de grootste kostenpost pakt voor jou anders uit: je huur regelen wij samen met je werkgever, in het begin gedeeld en tegen een vooraf afgesproken bedrag. Je betaalt dus niet de Nederlandse marktprijs waar deze correctie op gebaseerd is.',
      col: ['Functie', 'Nederland, omgerekend naar Spaanse prijzen', 'Spanje', 'Verschil in koopkracht']
    },
    nietGeld: {
      h: 'Wat je niet op je loonstrook ziet',
      items: [
        ['Zekerheid in plaats van tijdelijke contracten', 'In Spanje was {tijdelijk} van de verpleegkundigencontracten in 2025 tijdelijk en is {deeltijd} in deeltijd. In Nederland begin je met een contract via ons geregistreerde partnerbureau, met zicht op een vast dienstverband bij de instelling.'],
        ['Minder patiënten per verpleegkundige', 'Spanje telt {ratioES} verpleegkundigen per 1.000 inwoners, tegen {ratioEU} gemiddeld in Europa en {ratioNL} in Nederland. Bijna twee keer zoveel collega’s op dezelfde groep patiënten. Dat merk je elke dienst.'],
        ['Je salaris blijft stijgen', 'Binnen je schaal klim je elk jaar een trede tot het eindbedrag. Je BIG-registratie houd je zolang je die vernieuwt, en die opent de deur naar specialisaties en doorgroei.'],
        ['Toeslagen die meetellen', 'Vakantiegeld, een dertiende maand en onregelmatigheidstoeslag tot 60% op zondagen en feestdagen. In de zorg werk je vrijwel altijd onregelmatig, dus dit is geen theorie.']
      ]
    },
    tegen: {
      h: 'En dit staat er tegenover',
      p: 'Wij vertellen dit liever nu dan als je er al bent.',
      items: [
        ['Je begint onder je niveau', 'Tot je BIG-registratie rond is, werk je in een ondersteunende functie. Je bent verpleegkundige, maar je mag hier pas zo werken als je geregistreerd staat.'],
        ['Nederlands is geen formaliteit', 'Het is een harde eis en het kost maanden. De basis tot A2 doe je zelf, op eigen kosten. Wie daar niet aan wil beginnen, redt de rest van het traject ook niet.'],
        ['In het begin deel je je woning', 'Meestal met collega’s. Dat drukt de kosten, maar het is geen eigen appartement.'],
        ['Je woont ver van huis', 'Het weer is anders, de omgangsvormen zijn directer en je familie zit op twee vlieguren afstand. Dat is voor veel mensen zwaarder dan het salarisverschil goedmaakt — denk daar eerlijk over na.']
      ]
    },
    bronH: 'Bronnen bij deze vergelijking'
  },

  en: {
    eyebrow: 'SPAIN NEXT TO THE NETHERLANDS', h2: 'What do you earn now, and what would you earn here?',
    sub: 'Other agencies only show you the Dutch figure. We put the Spanish salary next to it, strip out the higher cost of living here and name what you give up as well. Then you know what you are starting.',
    tCol: ['Role', 'Spain', 'Netherlands', 'Difference'],
    tRows: {
      tcae: 'Auxiliar de enfermería / supporting role',
      start: 'Nurse, at the start of your career',
      senior: 'Nurse, 10 years or more'
    },
    tNote: 'Gross per year, full time. Spanish figures: public sector 2026 including the 14 pagas and the complementos. Dutch figures: CAO VVT at 36 hours, including 8% holiday pay and an 8.33% year-end payment. The lower end of the Dutch range is without irregular shifts, the upper end with regular evening, night and weekend hours.',
    kern: {
      h: 'The point most people miss',
      p: 'Look at the first row. In the Netherlands you are still in a supporting role, your BIG registration is not yet complete — and you already earn more than a nurse at the start of her career in Spain. So you do not have to wait until everything is arranged before you are better off.'
    },
    koop: {
      h: 'But the Netherlands is more expensive — this is what really remains',
      p: 'Fair is fair: living here costs on average about {duurder}% more than in Spain and rents are some {huur}% higher. Strip that out and the gap narrows, but it remains a gap. And the biggest cost works out differently for you: we arrange your housing together with your employer, shared at first and at a price agreed in advance. So you are not paying the Dutch market rent this correction is based on.',
      col: ['Role', 'Netherlands, converted to Spanish prices', 'Spain', 'Difference in purchasing power']
    },
    nietGeld: {
      h: 'What your payslip does not show',
      items: [
        ['Security instead of temporary contracts', 'In Spain {tijdelijk} of nursing contracts in 2025 were temporary and {deeltijd} is part time. In the Netherlands you start on a contract through our registered partner agency, with a view to a permanent post at the institution.'],
        ['Fewer patients per nurse', 'Spain has {ratioES} nurses per 1,000 inhabitants, against {ratioEU} on average in Europe and {ratioNL} in the Netherlands. Almost twice as many colleagues for the same group of patients. You feel that on every shift.'],
        ['Your salary keeps rising', 'Within your scale you move up a step every year until you reach the top. You keep your BIG registration as long as you renew it, and it opens the door to specialisations and promotion.'],
        ['Allowances that actually count', 'Holiday pay, a thirteenth month and an irregular-hours allowance of up to 60% on Sundays and public holidays. In healthcare you almost always work irregular hours, so this is not theory.']
      ]
    },
    tegen: {
      h: 'And this is what stands against it',
      p: 'We would rather tell you this now than once you are here.',
      items: [
        ['You start below your level', 'Until your BIG registration is complete you work in a supporting role. You are a nurse, but here you may only work as one once you are registered.'],
        ['Dutch is not a formality', 'It is a hard requirement and it takes months. You do the basics up to A2 yourself, at your own expense. Anyone unwilling to start there will not make it through the rest either.'],
        ['At first you share your home', 'Usually with colleagues. It keeps costs down, but it is not your own apartment.'],
        ['You live far from home', 'The weather is different, people are more direct and your family is two flying hours away. For many people that weighs heavier than the salary difference makes up for — think about that honestly.']
      ]
    },
    bronH: 'Sources for this comparison'
  },

  es: {
    eyebrow: 'ESPAÑA FRENTE A LOS PAÍSES BAJOS', h2: '¿Cuánto ganas ahora y cuánto ganarías aquí?',
    sub: 'Otras agencias solo te enseñan la cifra neerlandesa. Nosotros ponemos al lado el salario español, descontamos lo que cuesta vivir aquí y decimos también a qué renuncias. Así sabes en qué te metes.',
    tCol: ['Puesto', 'España', 'Países Bajos', 'Diferencia'],
    tRows: {
      tcae: 'Auxiliar de enfermería / puesto de apoyo',
      start: 'Enfermero, al inicio de la carrera',
      senior: 'Enfermero, 10 años o más'
    },
    tNote: 'Bruto al año, jornada completa. Cifras españolas: sector público 2026, incluidas las 14 pagas y los complementos. Cifras neerlandesas: CAO VVT con 36 horas, incluidos el 8% de paga de vacaciones y el 8,33% de paga de fin de año. El extremo inferior del rango neerlandés es sin turnos irregulares; el superior, con turnos de tarde, noche y fin de semana con regularidad.',
    kern: {
      h: 'Lo que casi nadie ve',
      p: 'Mira la primera fila. En los Países Bajos todavía estás en un puesto de apoyo, tu registro BIG aún no está listo, y ya ganas más que una enfermera al principio de su carrera en España. No tienes que esperar a que todo esté arreglado para salir ganando.'
    },
    koop: {
      h: 'Pero aquí se vive más caro: esto es lo que queda de verdad',
      p: 'Seamos honestos: vivir aquí cuesta de media un {duurder}% más que en España y los alquileres son un {huur}% más altos. Si lo descuentas, la diferencia se reduce, pero sigue siendo una diferencia. Y el gasto más grande funciona distinto para ti: tu vivienda la organizamos junto con tu empleador, compartida al principio y a un precio acordado de antemano. No pagas el alquiler de mercado neerlandés en el que se basa esta corrección.',
      col: ['Puesto', 'Países Bajos, convertido a precios españoles', 'España', 'Diferencia en poder adquisitivo']
    },
    nietGeld: {
      h: 'Lo que no aparece en la nómina',
      items: [
        ['Estabilidad en vez de contratos temporales', 'En España el {tijdelijk} de los contratos de enfermería en 2025 fue temporal y {deeltijd} es a tiempo parcial. En los Países Bajos empiezas con un contrato a través de nuestra agencia asociada registrada, con vistas a un puesto fijo en el centro.'],
        ['Menos pacientes por enfermero', 'España tiene {ratioES} enfermeras por cada 1.000 habitantes, frente a {ratioEU} de media en Europa y {ratioNL} en los Países Bajos. Casi el doble de compañeros para el mismo grupo de pacientes. Eso se nota en cada turno.'],
        ['Tu salario sigue subiendo', 'Dentro de tu escala subes un escalón cada año hasta llegar al tope. Conservas tu registro BIG mientras lo renueves, y te abre la puerta a especialidades y ascensos.'],
        ['Complementos que pesan de verdad', 'Paga de vacaciones, una decimotercera y un complemento por horas irregulares de hasta el 60% en domingos y festivos. En sanidad casi siempre se trabaja en horario irregular, así que no es teoría.']
      ]
    },
    tegen: {
      h: 'Y esto es lo que hay al otro lado',
      p: 'Preferimos contártelo ahora y no cuando ya estés aquí.',
      items: [
        ['Empiezas por debajo de tu nivel', 'Hasta que tengas el registro BIG trabajas en un puesto de apoyo. Eres enfermero, pero aquí solo puedes ejercer como tal cuando estés registrado.'],
        ['El neerlandés no es un trámite', 'Es un requisito ineludible y lleva meses. La base hasta el A2 la haces tú, por tu cuenta y a tu cargo. Quien no quiera dar ese paso tampoco superará el resto.'],
        ['Al principio compartes vivienda', 'Normalmente con compañeros. Abarata costes, pero no es tu propio apartamento.'],
        ['Vives lejos de los tuyos', 'El clima es otro, el trato es más directo y tu familia queda a dos horas de vuelo. Para mucha gente eso pesa más de lo que compensa la diferencia salarial: piénsalo con sinceridad.']
      ]
    },
    bronH: 'Fuentes de esta comparación'
  },

  pl: {
    eyebrow: 'HISZPANIA OBOK HOLANDII', h2: 'Ile zarabiasz teraz, a ile zarabiałbyś tutaj?',
    sub: 'Inne biura pokazują tylko holenderską kwotę. My stawiamy obok hiszpańską pensję, odliczamy droższe życie w Holandii i mówimy też, z czego rezygnujesz. Wtedy wiesz, w co wchodzisz.',
    tCol: ['Stanowisko', 'Hiszpania', 'Holandia', 'Różnica'],
    tRows: {
      tcae: 'Auxiliar de enfermería / stanowisko wspierające',
      start: 'Pielęgniarka na początku kariery',
      senior: 'Pielęgniarka z 10-letnim stażem lub dłuższym'
    },
    tNote: 'Brutto rocznie, pełny etat. Dane hiszpańskie: sektor publiczny 2026 wraz z 14 pensjami i dodatkami. Dane holenderskie: CAO VVT przy 36 godzinach, z 8% dodatku urlopowego i 8,33% świadczenia rocznego. Dolna granica holenderskiego przedziału jest bez pracy zmianowej, górna z regularnymi godzinami wieczornymi, nocnymi i weekendowymi.',
    kern: {
      h: 'Rzecz, którą większość przeocza',
      p: 'Spójrz na pierwszy wiersz. W Holandii pracujesz jeszcze na stanowisku wspierającym, rejestracji BIG jeszcze nie masz — a już zarabiasz więcej niż pielęgniarka na starcie kariery w Hiszpanii. Nie musisz więc czekać, aż wszystko będzie załatwione, żeby wyjść na tym lepiej.'
    },
    koop: {
      h: 'Ale w Holandii jest drożej — tyle zostaje naprawdę',
      p: 'Uczciwie: życie tutaj kosztuje średnio około {duurder}% więcej niż w Hiszpanii, a czynsze są wyższe o jakieś {huur}%. Po odliczeniu tego różnica maleje, ale nadal jest różnicą. A największy wydatek wygląda u Ciebie inaczej: mieszkanie organizujemy razem z Twoim pracodawcą, na początku dzielone i po z góry ustalonej cenie. Nie płacisz więc holenderskiej stawki rynkowej, na której opiera się ta korekta.',
      col: ['Stanowisko', 'Holandia po przeliczeniu na ceny hiszpańskie', 'Hiszpania', 'Różnica w sile nabywczej']
    },
    nietGeld: {
      h: 'Czego nie widać na pasku wypłaty',
      items: [
        ['Stabilność zamiast umów tymczasowych', 'W Hiszpanii {tijdelijk} umów pielęgniarskich w 2025 roku było tymczasowych, a {deeltijd} to niepełny etat. W Holandii zaczynasz od umowy przez nasze zarejestrowane biuro partnerskie, z perspektywą stałego zatrudnienia w placówce.'],
        ['Mniej pacjentów na pielęgniarkę', 'Hiszpania ma {ratioES} pielęgniarek na 1000 mieszkańców, przy średniej europejskiej {ratioEU} i {ratioNL} w Holandii. Prawie dwa razy więcej rąk do tej samej grupy pacjentów. Czuć to na każdym dyżurze.'],
        ['Twoja pensja stale rośnie', 'W ramach skali co roku wchodzisz stopień wyżej, aż do maksimum. Rejestrację BIG zachowujesz, dopóki ją odnawiasz, a ona otwiera drogę do specjalizacji i awansu.'],
        ['Dodatki, które realnie ważą', 'Dodatek urlopowy, trzynasta pensja i dodatek za porę nietypową do 60% w niedziele i święta. W opiece niemal zawsze pracuje się nieregularnie, więc to nie teoria.']
      ]
    },
    tegen: {
      h: 'A to jest druga strona',
      p: 'Wolimy powiedzieć to teraz niż wtedy, gdy już tu będziesz.',
      items: [
        ['Zaczynasz poniżej swoich kwalifikacji', 'Do czasu rejestracji BIG pracujesz na stanowisku wspierającym. Jesteś pielęgniarką, ale tutaj możesz tak pracować dopiero po rejestracji.'],
        ['Niderlandzki to nie formalność', 'To twardy warunek i zajmuje miesiące. Podstawę do A2 robisz sam, na własny koszt. Kto nie chce zrobić tego kroku, nie przejdzie też reszty ścieżki.'],
        ['Na początku dzielisz mieszkanie', 'Zwykle z kolegami. Obniża to koszty, ale to nie własne mieszkanie.'],
        ['Mieszkasz daleko od domu', 'Inna pogoda, bardziej bezpośredni sposób bycia, a rodzina dwie godziny lotu stąd. Dla wielu osób waży to więcej, niż rekompensuje różnica w pensji — pomyśl o tym uczciwie.']
      ]
    },
    bronH: 'Źródła tego porównania'
  }
};

// Bruto per jaar in Nederland, berekend uit de CAO-tabel: salaris, vakantiegeld
// (over salaris en ORT) en eindejaarsuitkering (over salaris).
function jaarNL(D, fwg, tredeF, ortF) {
  const s = D.scales.find(x => x.fwg === fwg);
  const bruto = s.min + (s.max - s.min) * tredeF;
  const ort = bruto * ortF;
  return (bruto + ort) * 12 + (bruto + ort) * 12 * (D.vakantiegeld / 100) + bruto * 12 * (D.eindejaar / 100);
}

function renderVergelijk(lang, h, D) {
  const esc = h.esc;
  const t = V[lang] || V.nl;
  const nf = n => Math.round(n / 100) * 100;
  const eur = n => '&euro; ' + Math.round(n).toLocaleString('nl-NL');
  const band = (a, b) => eur(nf(a)) + ' – ' + eur(nf(b));
  const vul = (s) => s.replace('{duurder}', ES.duurderPct).replace('{huur}', ES.huurDuurderPct)
    .replace('{tijdelijk}', ES.tijdelijkPct).replace('{deeltijd}', ES.deeltijd)
    .replace('{ratioES}', ES.ratioES).replace('{ratioEU}', ES.ratioEU).replace('{ratioNL}', ES.ratioNL);

  // Ondersteunende functie FWG 25, verpleegkundige FWG 45 aan het begin en na circa tien jaar.
  const rijen = [
    { k: 'tcae', es: ES.tcae, nl: [jaarNL(D, 25, 0, 0), jaarNL(D, 25, 0, 0.12)] },
    { k: 'start', es: ES.enfermeroStart, nl: [jaarNL(D, 45, 0, 0), jaarNL(D, 45, 0, 0.12)] },
    { k: 'senior', es: ES.enfermeroSenior, nl: [jaarNL(D, 45, 0.7, 0), jaarNL(D, 45, 0.7, 0.12)] }
  ];

  const tRijen = rijen.map(r => {
    const esGem = (r.es.min + r.es.max) / 2, nlGem = (r.nl[0] + r.nl[1]) / 2;
    return `<tr><td>${esc(t.tRows[r.k])}</td><td class="sal-num">${band(r.es.min, r.es.max)}</td>`
      + `<td class="sal-num sal-nlcel">${band(r.nl[0], r.nl[1])}</td>`
      + `<td class="sal-num sal-plus">+ ${eur(nf(nlGem - esGem))}</td></tr>`;
  }).join('');

  // Koopkracht: het Nederlandse bedrag omgerekend naar Spaans prijsniveau.
  const factor = 1 + ES.duurderPct / 100;
  const kRijen = rijen.map(r => {
    const esGem = (r.es.min + r.es.max) / 2, nlGem = (r.nl[0] + r.nl[1]) / 2, nlCorr = nlGem / factor;
    const pct = Math.round((nlCorr / esGem - 1) * 100);
    return `<tr><td>${esc(t.tRows[r.k])}</td><td class="sal-num sal-nlcel">${eur(nf(nlCorr))}</td>`
      + `<td class="sal-num">${eur(nf(esGem))}</td><td class="sal-num sal-plus">+ ${pct}%</td></tr>`;
  }).join('');

  const panels = arr => arr.map(([kop, tekst]) =>
    `<article class="panel"><h3>${esc(kop)}</h3><p>${esc(vul(tekst))}</p></article>`).join('');

  const bronnen = ES.bronnen
    .map(([naam, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(naam)}</a></li>`).join('');

  return `<div class="sal-block sal-verg" id="vergelijking">
<div class="sal-head"><span class="eyebrow">${esc(t.eyebrow)}</span><h2>${esc(t.h2)}</h2><p>${esc(t.sub)}</p></div>

<div class="sal-tablewrap"><table class="sal-table"><thead><tr><th>${esc(t.tCol[0])}</th><th class="sal-num">${esc(t.tCol[1])}</th><th class="sal-num">${esc(t.tCol[2])}</th><th class="sal-num">${esc(t.tCol[3])}</th></tr></thead><tbody>${tRijen}</tbody></table></div>
<p class="sal-note">${esc(t.tNote)}</p>

<div class="sal-kern"><h3>${esc(t.kern.h)}</h3><p>${esc(t.kern.p)}</p></div>

<h3 class="sal-orth">${esc(t.koop.h)}</h3>
<p class="sal-koopp">${esc(vul(t.koop.p))}</p>
<div class="sal-tablewrap"><table class="sal-table"><thead><tr><th>${esc(t.koop.col[0])}</th><th class="sal-num">${esc(t.koop.col[1])}</th><th class="sal-num">${esc(t.koop.col[2])}</th><th class="sal-num">${esc(t.koop.col[3])}</th></tr></thead><tbody>${kRijen}</tbody></table></div>

<h3 class="sal-orth">${esc(t.nietGeld.h)}</h3>
<div class="grid">${panels(t.nietGeld.items)}</div>

<div class="sal-tegen"><h3>${esc(t.tegen.h)}</h3><p class="sal-tegenp">${esc(t.tegen.p)}</p><div class="grid">${panels(t.tegen.items)}</div></div>

<div class="sal-bronnen sal-vergbron"><h3>${esc(t.bronH)}</h3><ul>${bronnen}</ul></div>
</div>`;
}

module.exports = { ES, V, renderVergelijk };
