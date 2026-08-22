// Pagina "Nederland": vergrijzing, personeelstekort en een eerlijk verhaal over wonen.
// Alle cijfers komen uit openbare bronnen; de bronnenlijst staat onderaan de pagina.
// Cijfers staan bewust apart van de vertalingen, zodat ze op één plek bijgewerkt worden.

const DATA = {
  // CBS Bevolkingsprognose (december 2025)
  pop65Now: '3,8 mln', pop65Y2040: '4,8 mln',
  pop80Now: '0,9 mln', pop80Y2070: '2,1 mln',
  workNow: '58,6%', workY2040: '55%',
  // Bevolkingsopbouw 2040 (CBS): 65-plussers 25%, 20 t/m 64 jaar 55%, jonger dan 20 jaar 20%
  donut: [
    { key: 'senior', pct: 25, color: '#3178c6' },
    { key: 'work', pct: 55, color: '#c8962f' },
    { key: 'young', pct: 20, color: '#7d5ba6' }
  ],
  // AZW Arbeidsmarktprognose 2025–2035 (scenario Referentie + Beleid)
  gap2025: 72600, gap2035: 261800,
  workforce: '1,5 mln', jobShare: '1 op de 6',
  // ABF Research / Rijksoverheid (juli 2026) en Pararius Huurmonitor Q2 2026
  housingGapPct: '4,6%', housingGapAbs: '± 384.000', housingBuild: '± 100.000', housingY2034: '± 2%',
  rentFree: '€ 1.882', rentAbove2000: '42%', rentReactions: '27',
  socialWait: '7 tot 11 jaar', socialLimit: '€ 932,93',
  salaryLow: '€ 3.100', salaryHigh: '€ 4.200', snfM2: '12 m²'
};

const T = {
  nl: {
    navHint: 'Nederland',
    intro: 'Nederland vergrijst snel en de zorg loopt daardoor tegen een structureel personeelstekort aan. Dat is de reden dat wij internationaal werven. Hieronder de cijfers uit openbare bronnen — inclusief het eerlijke verhaal over wonen, want dat is in Nederland een serieus punt.',
    aging: {
      eyebrow: 'VERGRIJZING', h2: 'Meer ouderen, minder werkenden',
      p: 'Sinds 2025 telt Nederland voor het eerst meer 65-plussers dan jongeren onder de 20. De groep 80-plussers — die de meeste zorg nodig heeft — groeit het hardst. Tegelijk krimpt het aandeel mensen in de werkende leeftijd. Er komen dus meer zorgvragers bij terwijl er verhoudingsgewijs minder handen zijn.',
      tiles: [
        ['65-plussers nu', DATA.pop65Now, 'ruim 1 op de 5 inwoners'],
        ['65-plussers in 2040', DATA.pop65Y2040, 'een kwart van de bevolking'],
        ['80-plussers nu', DATA.pop80Now, 'groeit naar ' + DATA.pop80Y2070 + ' in 2070'],
        ['Werkende leeftijd', DATA.workNow, 'daalt naar ' + DATA.workY2040 + ' in 2040']
      ],
      chartTitle: 'Bevolkingsopbouw in 2040',
      chartNote: 'Verdeling van de Nederlandse bevolking naar leeftijd, volgens de CBS-prognose.',
      legend: { senior: '65 jaar en ouder', work: '20 tot 65 jaar', young: 'jonger dan 20 jaar' }
    },
    gap: {
      eyebrow: 'PERSONEELSTEKORT', h2: 'Van 73 duizend naar 262 duizend',
      p: 'In zorg en welzijn werken ongeveer ' + DATA.workforce + ' mensen — bijna ' + DATA.jobShare + ' banen in Nederland. Toch is er nu al een tekort, en dat loopt de komende tien jaar hard op. Het onderzoeksprogramma Arbeidsmarkt Zorg en Welzijn rekende het door: zelfs mét de maatregelen uit de zorgakkoorden blijft er een fors gat.',
      chartTitle: 'Verwacht tekort aan medewerkers in zorg en welzijn',
      chartNote: 'Scenario Referentie + Beleid, dus inclusief het effect van de zorgakkoorden. Zonder die maatregelen ligt het tekort in 2035 rond de 300.000.',
      labels: ['2025', '2035'],
      unit: 'medewerkers',
      concl: 'Dit tekort is niet op te lossen met alleen meer opleiden in Nederland: de groep die kan werken wordt juist kleiner. Daarom kijken zorginstellingen naar gekwalificeerde professionals uit het buitenland.'
    },
    housing: {
      eyebrow: 'WONEN IN NEDERLAND', h2: 'Het eerlijke verhaal over huisvesting',
      p: 'Wij vertellen dit liever vooraf dan achteraf: wonen is in Nederland lastig. Er is een structureel woningtekort en zelf iets huren op de vrije markt is voor een startende zorgprofessional niet realistisch. Daarom regelen wij de huisvesting — maar het is goed dat je weet hoe de markt eruitziet.',
      facts: [
        ['Woningtekort', DATA.housingGapPct + ' van alle woningen (' + DATA.housingGapAbs + ' woningen). Het daalt langzaam: bij ' + DATA.housingBuild + ' nieuwe woningen per jaar zakt het tekort rond 2034 naar ' + DATA.housingY2034 + '.'],
        ['Sociale huur is geen optie voor nieuwkomers', 'De wachttijd loopt in veel gemeenten op tot ' + DATA.socialWait + '. Inschrijven kan wel, maar reken er niet op voor je start.'],
        ['Vrije sector is duur', 'Een vrijesectorwoning kost gemiddeld ' + DATA.rentFree + ' kale huur per maand; ' + DATA.rentAbove2000 + ' van het aanbod zit boven € 2.000. Op één woning komen gemiddeld ' + DATA.rentReactions + ' reacties.'],
        ['Wat verdien je?', 'Een mbo-verpleegkundige verdient ongeveer ' + DATA.salaryLow + ' tot ' + DATA.salaryHigh + ' bruto per maand, plus vakantiegeld, eindejaarsuitkering en onregelmatigheidstoeslag. Reken zelf uit: een vrijesectorwoning alleen huren gaat aan het begin niet.']
      ],
      solutionTitle: 'Hoe wij het oplossen',
      solution: [
        'Wij regelen je woning samen met je werkgever, vóór je komt — je stapt niet op het vliegtuig zonder adres.',
        'Je werkt vanaf het begin in een ondersteunende functie, dus je hebt vanaf de eerste maand salaris om de huur van te betalen.',
        'In het begin is dat vaak gedeelde huisvesting met collega’s. Dat drukt de kosten en je staat er niet alleen voor.',
        'De huisvesting voldoet aan de landelijke norm: minimaal ' + DATA.snfM2 + ' woonoppervlak per persoon, met eisen aan privacy, sanitair, hygiëne en brandveiligheid.',
        'Je huur wordt vooraf duidelijk afgesproken — geen verrassingen achteraf.',
        'Na je inwerkperiode helpen we je op weg naar eigen woonruimte, en je kunt je meteen inschrijven voor sociale huur voor de langere termijn.'
      ],
      warn: 'Wees alert: wie je een baan in Nederland belooft en daar geld voor vraagt, deugt niet. Onze dienstverlening is voor kandidaten kosteloos.'
    },
    sources: { h: 'Bronnen', note: 'Laatst bijgewerkt in augustus 2026. Cijfers worden herzien zodra de bronnen nieuwe ramingen publiceren.' }
  },
  en: {
    navHint: 'Netherlands',
    intro: 'The Netherlands is ageing fast, and healthcare is running into a structural staff shortage as a result. That is why we recruit internationally. Below are the figures from public sources — including the honest story about housing, because in the Netherlands that is a serious issue.',
    aging: {
      eyebrow: 'AGEING POPULATION', h2: 'More older people, fewer workers',
      p: 'Since 2025 the Netherlands has, for the first time, more people over 65 than under 20. The over-80 group — which needs the most care — is growing fastest. At the same time the share of people of working age is shrinking. More people need care while there are proportionally fewer hands.',
      tiles: [
        ['Over-65s today', DATA.pop65Now, 'more than 1 in 5 residents'],
        ['Over-65s in 2040', DATA.pop65Y2040, 'a quarter of the population'],
        ['Over-80s today', DATA.pop80Now, 'growing to ' + DATA.pop80Y2070 + ' by 2070'],
        ['Working age', DATA.workNow, 'falling to ' + DATA.workY2040 + ' by 2040']
      ],
      chartTitle: 'Population by age in 2040',
      chartNote: 'Distribution of the Dutch population by age, according to the CBS projection.',
      legend: { senior: '65 and older', work: '20 to 65', young: 'under 20' }
    },
    gap: {
      eyebrow: 'STAFF SHORTAGE', h2: 'From 73 thousand to 262 thousand',
      p: 'Around ' + DATA.workforce + ' people work in care and welfare — nearly ' + DATA.jobShare + ' jobs in the Netherlands. Even so there is already a shortage, and it grows sharply over the next decade. The national labour-market programme for care and welfare calculated it: even with the measures from the care agreements, a large gap remains.',
      chartTitle: 'Projected shortage of care and welfare workers',
      chartNote: 'Reference + Policy scenario, so including the effect of the care agreements. Without those measures the 2035 shortage is around 300,000.',
      labels: ['2025', '2035'],
      unit: 'workers',
      concl: 'This gap cannot be closed by training more people in the Netherlands alone: the group able to work is itself shrinking. That is why healthcare institutions look to qualified professionals from abroad.'
    },
    housing: {
      eyebrow: 'LIVING IN THE NETHERLANDS', h2: 'The honest story about housing',
      p: 'We would rather tell you this beforehand than afterwards: housing in the Netherlands is difficult. There is a structural shortage, and renting on the open market is not realistic for a starting healthcare professional. That is why we arrange housing — but you should know what the market looks like.',
      facts: [
        ['Housing shortage', DATA.housingGapPct + ' of all homes (' + DATA.housingGapAbs + ' homes). It is falling slowly: at ' + DATA.housingBuild + ' new homes a year the shortage drops to about ' + DATA.housingY2034 + ' around 2034.'],
        ['Social housing is not an option for newcomers', 'Waiting lists run to ' + DATA.socialWait + ' in many municipalities. You can register, but do not count on it before you start.'],
        ['The private sector is expensive', 'A private-sector home costs on average ' + DATA.rentFree + ' base rent per month; ' + DATA.rentAbove2000 + ' of the offer is above € 2,000. On average ' + DATA.rentReactions + ' people respond to a single listing.'],
        ['What will you earn?', 'A vocationally trained nurse earns roughly ' + DATA.salaryLow + ' to ' + DATA.salaryHigh + ' gross per month, plus holiday pay, a year-end bonus and an allowance for irregular hours. Do the maths: renting a private-sector home on your own is not feasible at the start.']
      ],
      solutionTitle: 'How we solve it',
      solution: [
        'We arrange your home together with your employer, before you travel — you never board the plane without an address.',
        'You work in a supporting role from the start, so you have a salary to pay the rent from in your very first month.',
        'At first this is often shared housing with colleagues. It keeps costs down and you are not on your own.',
        'The housing meets the national standard: at least ' + DATA.snfM2 + ' of living space per person, with requirements for privacy, sanitation, hygiene and fire safety.',
        'Your rent is agreed in advance — no surprises afterwards.',
        'After your settling-in period we help you towards your own place, and you can register for social housing straight away for the longer term.'
      ],
      warn: 'Be alert: anyone who promises you a job in the Netherlands and asks for money is not to be trusted. Our services are free of charge for candidates.'
    },
    sources: { h: 'Sources', note: 'Last updated in August 2026. Figures are revised as soon as the sources publish new projections.' }
  },
  es: {
    navHint: 'Países Bajos',
    intro: 'Los Países Bajos envejecen rápidamente y, por ello, la sanidad se enfrenta a una escasez estructural de personal. Esa es la razón por la que captamos profesionales en el extranjero. Aquí tienes las cifras de fuentes públicas, incluida la verdad sobre la vivienda, porque en los Países Bajos es un asunto serio.',
    aging: {
      eyebrow: 'ENVEJECIMIENTO', h2: 'Más mayores, menos trabajadores',
      p: 'Desde 2025 hay por primera vez más personas mayores de 65 años que menores de 20. El grupo de mayores de 80 —el que más cuidados necesita— es el que más crece. Al mismo tiempo se reduce la proporción de población en edad de trabajar: más personas que necesitan cuidados y proporcionalmente menos manos.',
      tiles: [
        ['Mayores de 65 hoy', DATA.pop65Now, 'más de 1 de cada 5 habitantes'],
        ['Mayores de 65 en 2040', DATA.pop65Y2040, 'una cuarta parte de la población'],
        ['Mayores de 80 hoy', DATA.pop80Now, 'crece hasta ' + DATA.pop80Y2070 + ' en 2070'],
        ['Edad de trabajar', DATA.workNow, 'baja al ' + DATA.workY2040 + ' en 2040']
      ],
      chartTitle: 'Composición de la población en 2040',
      chartNote: 'Distribución de la población neerlandesa por edad, según la previsión del CBS.',
      legend: { senior: '65 años o más', work: 'de 20 a 65 años', young: 'menores de 20' }
    },
    gap: {
      eyebrow: 'ESCASEZ DE PERSONAL', h2: 'De 73 mil a 262 mil',
      p: 'En sanidad y bienestar trabajan unos ' + DATA.workforce + ' de personas: casi ' + DATA.jobShare + ' empleos del país. Aun así ya falta personal, y la brecha se dispara en la próxima década. El programa nacional de mercado laboral sanitario lo ha calculado: incluso con las medidas de los acuerdos sanitarios queda un hueco enorme.',
      chartTitle: 'Escasez prevista de personal sanitario y de bienestar',
      chartNote: 'Escenario Referencia + Política, es decir, incluyendo el efecto de los acuerdos sanitarios. Sin esas medidas la escasez en 2035 ronda los 300.000.',
      labels: ['2025', '2035'],
      unit: 'profesionales',
      concl: 'Esta brecha no se cierra formando a más gente solo en los Países Bajos: el grupo que puede trabajar se reduce. Por eso los centros sanitarios buscan profesionales cualificados en el extranjero.'
    },
    housing: {
      eyebrow: 'VIVIR EN LOS PAÍSES BAJOS', h2: 'La verdad sobre la vivienda',
      p: 'Preferimos contártelo antes que después: encontrar vivienda en los Países Bajos es difícil. Hay una escasez estructural y alquilar por tu cuenta en el mercado libre no es realista para quien empieza. Por eso nosotros organizamos el alojamiento, pero conviene que sepas cómo está el mercado.',
      facts: [
        ['Escasez de vivienda', DATA.housingGapPct + ' de todas las viviendas (' + DATA.housingGapAbs + ' viviendas). Baja despacio: con ' + DATA.housingBuild + ' viviendas nuevas al año la escasez cae a cerca del ' + DATA.housingY2034 + ' hacia 2034.'],
        ['La vivienda social no es una opción al llegar', 'La lista de espera llega a ' + DATA.socialWait + ' en muchos municipios. Puedes inscribirte, pero no cuentes con ella para empezar.'],
        ['El mercado libre es caro', 'Una vivienda del mercado libre cuesta de media ' + DATA.rentFree + ' de alquiler base al mes; el ' + DATA.rentAbove2000 + ' de la oferta supera los € 2.000. Cada anuncio recibe de media ' + DATA.rentReactions + ' respuestas.'],
        ['¿Cuánto vas a ganar?', 'Un enfermero de formación profesional gana entre ' + DATA.salaryLow + ' y ' + DATA.salaryHigh + ' brutos al mes, más paga de vacaciones, paga de fin de año y plus por turnos irregulares. Haz el cálculo: alquilar solo en el mercado libre no sale al principio.']
      ],
      solutionTitle: 'Cómo lo resolvemos',
      solution: [
        'Organizamos tu vivienda junto con tu empleador, antes de que viajes: nunca subes al avión sin dirección.',
        'Trabajas en un puesto de apoyo desde el principio, así que ya el primer mes tienes un salario con el que pagar el alquiler.',
        'Al principio suele ser vivienda compartida con compañeros. Abarata los costes y no estás solo.',
        'El alojamiento cumple la norma nacional: mínimo ' + DATA.snfM2 + ' de superficie habitable por persona, con exigencias de privacidad, sanitarios, higiene y seguridad contra incendios.',
        'El alquiler se acuerda por adelantado: sin sorpresas después.',
        'Tras el periodo de adaptación te ayudamos a buscar tu propia vivienda, y puedes inscribirte desde el primer día en la vivienda social para el largo plazo.'
      ],
      warn: 'Ojo: quien te promete un empleo en los Países Bajos y te pide dinero por ello no es de fiar. Nuestros servicios son gratuitos para los candidatos.'
    },
    sources: { h: 'Fuentes', note: 'Actualizado en agosto de 2026. Las cifras se revisan en cuanto las fuentes publican nuevas previsiones.' }
  },
  pl: {
    navHint: 'Holandia',
    intro: 'Holandia szybko się starzeje, przez co opieka zdrowotna zmaga się ze strukturalnym niedoborem personelu. To powód, dla którego rekrutujemy za granicą. Poniżej dane z otwartych źródeł — łącznie z uczciwą informacją o mieszkaniach, bo to w Holandii poważny temat.',
    aging: {
      eyebrow: 'STARZENIE SIĘ', h2: 'Więcej seniorów, mniej pracujących',
      p: 'Od 2025 roku w Holandii po raz pierwszy jest więcej osób po 65. roku życia niż osób poniżej 20 lat. Najszybciej rośnie grupa 80+, która potrzebuje najwięcej opieki. Jednocześnie maleje udział osób w wieku produkcyjnym: przybywa pacjentów, a rąk do pracy proporcjonalnie ubywa.',
      tiles: [
        ['Osoby 65+ dziś', DATA.pop65Now, 'ponad 1 na 5 mieszkańców'],
        ['Osoby 65+ w 2040', DATA.pop65Y2040, 'jedna czwarta ludności'],
        ['Osoby 80+ dziś', DATA.pop80Now, 'wzrost do ' + DATA.pop80Y2070 + ' w 2070'],
        ['Wiek produkcyjny', DATA.workNow, 'spadek do ' + DATA.workY2040 + ' w 2040']
      ],
      chartTitle: 'Struktura ludności w 2040 roku',
      chartNote: 'Podział ludności Holandii według wieku, zgodnie z prognozą CBS.',
      legend: { senior: '65 lat i więcej', work: 'od 20 do 65 lat', young: 'poniżej 20 lat' }
    },
    gap: {
      eyebrow: 'NIEDOBÓR KADR', h2: 'Z 73 tysięcy do 262 tysięcy',
      p: 'W opiece zdrowotnej i pomocy społecznej pracuje około ' + DATA.workforce + ' osób — prawie ' + DATA.jobShare + ' miejsc pracy w Holandii. Mimo to już teraz brakuje personelu, a luka gwałtownie rośnie. Krajowy program badania rynku pracy w opiece to policzył: nawet z działaniami z porozumień zdrowotnych pozostaje ogromna luka.',
      chartTitle: 'Prognozowany niedobór personelu w opiece i pomocy społecznej',
      chartNote: 'Scenariusz Referencyjny + Polityka, czyli z uwzględnieniem porozumień zdrowotnych. Bez tych działań niedobór w 2035 wynosi około 300 000.',
      labels: ['2025', '2035'],
      unit: 'pracowników',
      concl: 'Tej luki nie da się zamknąć samym kształceniem w Holandii: grupa zdolna do pracy sama się kurczy. Dlatego placówki medyczne szukają wykwalifikowanych profesjonalistów za granicą.'
    },
    housing: {
      eyebrow: 'MIESZKANIE W HOLANDII', h2: 'Uczciwie o mieszkaniach',
      p: 'Wolimy powiedzieć to wcześniej niż później: o mieszkanie w Holandii jest trudno. Występuje strukturalny niedobór, a samodzielny wynajem na wolnym rynku nie jest realny dla osoby zaczynającej pracę. Dlatego to my organizujemy zakwaterowanie — ale warto, żebyś znał realia.',
      facts: [
        ['Niedobór mieszkań', DATA.housingGapPct + ' całego zasobu (' + DATA.housingGapAbs + ' mieszkań). Spada powoli: przy ' + DATA.housingBuild + ' nowych mieszkaniach rocznie niedobór spadnie do około ' + DATA.housingY2034 + ' w okolicach 2034 roku.'],
        ['Mieszkania socjalne odpadają na starcie', 'Czas oczekiwania w wielu gminach sięga ' + DATA.socialWait + '. Możesz się zapisać, ale nie licz na to przed rozpoczęciem pracy.'],
        ['Wolny rynek jest drogi', 'Mieszkanie na wolnym rynku kosztuje średnio ' + DATA.rentFree + ' czynszu miesięcznie; ' + DATA.rentAbove2000 + ' oferty przekracza 2000 €. Na jedno ogłoszenie odpowiada średnio ' + DATA.rentReactions + ' osób.'],
        ['Ile zarobisz?', 'Pielęgniarka z wykształceniem średnim zarabia około ' + DATA.salaryLow + ' – ' + DATA.salaryHigh + ' brutto miesięcznie, plus dodatek urlopowy, roczny i za pracę zmianową. Policz sam: samodzielny wynajem na wolnym rynku na starcie się nie spina.']
      ],
      solutionTitle: 'Jak to rozwiązujemy',
      solution: [
        'Mieszkanie organizujemy razem z Twoim pracodawcą, jeszcze przed wyjazdem — nie wsiadasz do samolotu bez adresu.',
        'Od początku pracujesz na stanowisku wspierającym, więc już od pierwszego miesiąca masz pensję, z której płacisz czynsz.',
        'Na początku to zwykle mieszkanie dzielone z kolegami z pracy. Obniża koszty i nie jesteś sam.',
        'Zakwaterowanie spełnia normę krajową: minimum ' + DATA.snfM2 + ' powierzchni mieszkalnej na osobę, z wymogami prywatności, sanitariatów, higieny i ochrony przeciwpożarowej.',
        'Czynsz ustalamy z góry — żadnych niespodzianek później.',
        'Po okresie wdrożenia pomagamy znaleźć własne lokum, a na mieszkanie socjalne możesz zapisać się od pierwszego dnia.'
      ],
      warn: 'Uwaga: kto obiecuje pracę w Holandii i żąda za to pieniędzy, nie jest uczciwy. Nasze usługi są dla kandydatów bezpłatne.'
    },
    sources: { h: 'Źródła', note: 'Zaktualizowano w sierpniu 2026 r. Dane poprawiamy, gdy tylko źródła opublikują nowe prognozy.' }
  }
};

const BRONNEN = [
  ['CBS — Bevolkingsprognose 2025–2070', 'https://www.cbs.nl/nl-nl/nieuws/2025/51/bevolkingsprognose-vanaf-nu-meer-ouderen-dan-jongeren'],
  ['AZW — Arbeidsmarktprognose zorg en welzijn 2025–2035', 'https://www.azwinfo.nl/longread/de-staat-van-de-arbeidsmarkt-zorg-en-welzijn-2025-trendrapportage/'],
  ['CBS — De arbeidsmarkt in cijfers 2025', 'https://www.cbs.nl/-/media/_pdf/2026/17/de-arbeidsmarkt-in-cijfers-2025.pdf'],
  ['Rijksoverheid / ABF Research — Woningbouwprognose, juli 2026', 'https://www.rijksoverheid.nl/actueel/nieuws/2026/07/01/prognose-100-000-woningen-binnen-bereik-in-2027'],
  ['Pararius — Huurmonitor tweede kwartaal 2026', 'https://www.pararius.nl/nieuws/verkoop-van-huurwoningen-breidt-zich-uit-naar-hogere-segmenten'],
  ['Stichting Normering Flexwonen — huisvestingsnorm', 'https://www.normeringflexwonen.nl/faq']
];

// --- Ringdiagram: bevolkingsopbouw ---------------------------------------
// Kleuren gecontroleerd op onderscheidbaarheid, ook bij kleurenblindheid.
function donutSVG(t, esc) {
  const R = 70, CX = 110, CY = 110, C = 2 * Math.PI * R, GAP = 3;
  let offset = 0;
  const rings = DATA.donut.map(seg => {
    const len = (seg.pct / 100) * C;
    const el = `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${seg.color}" stroke-width="30" stroke-dasharray="${(len - GAP).toFixed(2)} ${(C - len + GAP).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 ${CX} ${CY})"></circle>`;
    offset += len;
    return el;
  }).join('');
  let mid = 0;
  const labels = DATA.donut.map(seg => {
    const angle = ((mid + seg.pct / 2) / 100) * 2 * Math.PI - Math.PI / 2;
    mid += seg.pct;
    const lx = CX + Math.cos(angle) * (R + 32), ly = CY + Math.sin(angle) * (R + 32);
    const anchor = Math.cos(angle) > 0.2 ? 'start' : (Math.cos(angle) < -0.2 ? 'end' : 'middle');
    return `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="${anchor}" class="dv-val">${seg.pct}%</text>`;
  }).join('');
  return `<svg viewBox="0 0 260 220" role="img" aria-label="${esc(t.aging.chartTitle)}" class="dv-donut">
<title>${esc(t.aging.chartTitle)}</title>${rings}${labels}</svg>`;
}

// --- Staafdiagram: tekort 2025 versus 2035 -------------------------------
function barsSVG(t, esc) {
  const max = DATA.gap2035, W = 430, H = 150, BH = 34, X0 = 56;
  const fmt = n => n.toLocaleString('nl-NL');
  const rows = [
    { label: t.gap.labels[0], v: DATA.gap2025, color: '#3178c6', y: 22 },
    { label: t.gap.labels[1], v: DATA.gap2035, color: '#c8962f', y: 82 }
  ];
  const bars = rows.map(r => {
    const w = Math.max(4, (r.v / max) * (W - X0 - 96));
    return `<text x="0" y="${r.y + BH / 2 + 5}" class="dv-cat">${esc(r.label)}</text>
<rect x="${X0}" y="${r.y}" width="${w.toFixed(1)}" height="${BH}" rx="4" fill="${r.color}"></rect>
<text x="${(X0 + w + 10).toFixed(1)}" y="${r.y + BH / 2 + 5}" class="dv-val">${fmt(r.v)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.gap.chartTitle)}" class="dv-bars">
<title>${esc(t.gap.chartTitle)}</title>${bars}
<text x="0" y="${H - 8}" class="dv-note">${esc(t.gap.unit)}</text></svg>`;
}

function renderNetherlands(lang, h) {
  const t = T[lang] || T.nl;
  const esc = h.esc;
  const a = t.aging, g = t.gap, w = t.housing;

  const tiles = a.tiles.map(x => `<div class="nl-tile"><span>${esc(x[0])}</span><b>${esc(x[1])}</b><i>${esc(x[2])}</i></div>`).join('');
  const legend = DATA.donut.map(s => `<li><span class="dv-swatch" style="background:${s.color}"></span>${esc(a.legend[s.key])} — <b>${s.pct}%</b></li>`).join('');
  const facts = w.facts.map(x => `<article class="nl-fact"><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`).join('');
  const oplossing = w.solution.map(x => `<li>${esc(x)}</li>`).join('');
  const bronnen = BRONNEN.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener noreferrer">${esc(b[0])}</a></li>`).join('');

  return `<section class="page has-hero">
<p class="contact-lead">${esc(t.intro)}</p>

<div class="nl-block">
<div class="eur-head"><span class="eyebrow">${esc(a.eyebrow)}</span><h2>${esc(a.h2)}</h2><p>${esc(a.p)}</p></div>
<div class="nl-tiles">${tiles}</div>
<figure class="dv-figure">
<figcaption class="dv-title">${esc(a.chartTitle)}</figcaption>
<div class="dv-row">${donutSVG(t, esc)}<ul class="dv-legend">${legend}</ul></div>
<p class="dv-note">${esc(a.chartNote)}</p>
</figure>
</div>

<div class="nl-block">
<div class="eur-head"><span class="eyebrow">${esc(g.eyebrow)}</span><h2>${esc(g.h2)}</h2><p>${esc(g.p)}</p></div>
<figure class="dv-figure">
<figcaption class="dv-title">${esc(g.chartTitle)}</figcaption>
${barsSVG(t, esc)}
<p class="dv-note">${esc(g.chartNote)}</p>
</figure>
<p class="nl-concl">${esc(g.concl)}</p>
</div>

<div class="nl-block nl-housing">
<div class="eur-head"><span class="eyebrow">${esc(w.eyebrow)}</span><h2>${esc(w.h2)}</h2><p>${esc(w.p)}</p></div>
<div class="nl-facts">${facts}</div>
<div class="nl-solution"><h3>${esc(w.solutionTitle)}</h3><ul>${oplossing}</ul><p class="nl-warn">${esc(w.warn)}</p></div>
</div>

<div class="nl-sources"><h3>${esc(t.sources.h)}</h3><ul>${bronnen}</ul><p>${esc(t.sources.note)}</p></div>
</section>`;
}

module.exports = { renderNetherlands, DATA };
