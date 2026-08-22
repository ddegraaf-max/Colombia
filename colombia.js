// Colombia naast Nederland. Het verschil in inkomen is hier veel groter dan bij Spanje,
// maar de weg ernaartoe is een stuk langer: buiten de EU is een visum en een gecombineerde
// vergunning nodig, en het BIG-register vraagt een vakbekwaamheidsverklaring met de BI-toets.
// Wie dat verzwijgt, verkoopt een verwachting die niet uitkomt. Daarom staat de doorlooptijd
// hier net zo prominent als het bedrag.
//
// Bedragen staan in Colombiaanse pesos en worden omgerekend met KOERS, zodat er bij een
// nieuwe wisselkoers maar één getal aangepast hoeft te worden.

const { jaarNL } = require('./spain');

const CO = {
  koers: 3566,        // COP per euro, 20-08-2026
  betalingen: 13,     // twaalf maanden plus de prima de servicios
  minimumMaand: 1750905, auxilioTransporte: 249095,   // wettelijk minimum 2026
  // Bruto per maand in pesos.
  auxiliar: { min: 1750905, max: 2300000 },
  enfermeroStart: { min: 2500000, max: 3500000 },
  enfermeroSenior: { min: 4300000, max: 5750000 },
  gemEnfermero: 2861603, gemBogota: 4312500,
  // Kosten van levensonderhoud: Colombia ten opzichte van Nederland.
  goedkoperPct: 55.3, huurGoedkoperPct: 73.5,
  // Verpleegkundigen per 1.000 inwoners.
  ratioCO: '1,3', ratioNL: '11,5', ratioOESO: '9', normWHO: '3',
  // Doorlooptijd van de route buiten de EU.
  duurMin: 18, duurMax: 30,
  bronnen: [
    ['Salario enfermera profesional Colombia 2026', 'https://co.computrabajo.com/salarios/enfermero-profesional'],
    ['Salario mínimo Colombia 2026 y auxilio de transporte', 'https://www.buk.co/blog/salario-minimo-2026-en-colombia'],
    ['Densidad de enfermeras en Colombia frente a la OCDE', 'https://consultorsalud.com/colombia-en-alerta-por-talento-humano-ocde-2025/'],
    ['BIG-registratie met een diploma van buiten de EU', 'https://www.bigregister.nl/buitenlands-diploma'],
    ['Gecombineerde vergunning voor verblijf en arbeid (GVVA), IND', 'https://ind.nl/nl/verblijfsvergunningen/werk/gecombineerde-vergunning-verblijf-en-arbeid-gvva'],
    ['WHO health workforce support and safeguards list 2023', 'https://www.who.int/publications/i/item/9789240069787'],
    ['Kosten van levensonderhoud Colombia', 'https://wise.com/us/cost-of-living/colombia']
  ]
};

const V = {
  nl: {
    eyebrow: 'COLOMBIA NAAST NEDERLAND', status: 'ROUTE IN OPBOUW',
    h2: 'En wat verdien je nu in Colombia?',
    sub: 'Voor Colombiaanse zorgprofessionals is het verschil veel groter dan voor Spanje. De weg ernaartoe is ook langer, en dat vertellen we er meteen bij. Wij bouwen deze route op dit moment op; de bedragen hieronder zijn er alvast, zodat je weet waar je aan toe bent.',
    tCol: ['Functie', 'Colombia', 'Nederland', 'Verschil'],
    tRows: {
      auxiliar: 'Auxiliar de enfermería / ondersteunende functie',
      start: 'Enfermero profesional, aan het begin',
      senior: 'Enfermero profesional, 10 jaar of meer'
    },
    tNote: 'Bruto per jaar, voltijd. Colombiaanse bedragen omgerekend tegen {koers} peso per euro en gerekend met dertien betalingen per jaar, inclusief de prima de servicios. Het wettelijk minimumloon is in 2026 {min} peso per maand, plus {aux} peso vervoerstoeslag. Nederlandse bedragen: CAO VVT bij 36 uur, inclusief 8% vakantiegeld en 8,33% eindejaarsuitkering.',
    kern: {
      h: 'Wat dit in de praktijk betekent',
      p: 'Een auxiliar de enfermería verdient in Colombia rond het wettelijk minimum. In de ondersteunende functie in Nederland gaat diezelfde persoon in één maand ongeveer verdienen wat in Colombia vier tot vijf maanden kost. Ook na correctie voor het goedkopere leven daar blijft dat een groot verschil. Maar geld is niet het enige dat telt, en de weg ernaartoe duurt langer dan vanuit de EU.'
    },
    koop: {
      h: 'Omgerekend naar Colombiaanse prijzen',
      p: 'Het leven in Colombia is ongeveer {goedkoper}% goedkoper dan in Nederland en de huren liggen zo’n {huur}% lager. Reken dat eruit en het verschil wordt kleiner, maar het blijft fors. En je huur regelen wij samen met je werkgever, in het begin gedeeld en tegen een vooraf afgesproken bedrag.',
      col: ['Functie', 'Nederland, omgerekend naar Colombiaanse prijzen', 'Colombia', 'Verschil in koopkracht']
    },
    duur: {
      h: 'Wat deze route extra vraagt — en hoe lang die duurt',
      p: 'Vanuit Spanje geldt vrij verkeer binnen de EU. Vanuit Colombia niet. Dit komt er dan bij:',
      items: [
        ['Visum en werkvergunning', 'Je werkgever vraagt een gecombineerde vergunning voor verblijf en arbeid (GVVA) aan. Daarbij hoort een arbeidsmarkttoets, waarin het UWV meeweegt dat er in Nederland en de EU te weinig zorgpersoneel is.'],
        ['Verklaring van vakbekwaamheid', 'Het BIG-register vergelijkt je Colombiaanse diploma met de Nederlandse opleiding. Dat is een zwaardere beoordeling dan de erkenning van een EU-diploma.'],
        ['Taalcertificaten en de BI-toets', 'Sinds 1 januari 2024 is de AKV-toets vervangen door taalcertificaten. Daarna volgt de BI-toets, waarin je laat zien dat je op het eindniveau van de Nederlandse opleiding zit.'],
        ['Reken op {duurMin} tot {duurMax} maanden of langer', 'Dat is de realistische doorlooptijd van start tot volledige BIG-registratie. De wachtlijst voor de BI-toets zat in mei 2026 vol, met onvoorspelbare wachttijden. Wie belooft dat het sneller kan, weet het niet of vertelt het niet.']
      ]
    },
    nietGeld: {
      h: 'Wat je niet op je loonstrook ziet',
      items: [
        ['Minder patiënten per verpleegkundige', 'Colombia telt {ratioCO} verpleegkundigen per 1.000 inwoners, tegen {ratioOESO} gemiddeld in de OESO en {ratioNL} in Nederland. De WHO adviseert er minstens {normWHO}. Het verschil in werkdruk is enorm.'],
        ['Een contract en een cao', 'Je loon staat in een collectieve arbeidsovereenkomst en wordt niet per persoon onderhandeld. Vakantiegeld, een dertiende maand en onregelmatigheidstoeslag zitten er vast in.'],
        ['Je hele gezin mag mee', 'Met een geldige verblijfsvergunning kun je gezinshereniging aanvragen. Dat vraagt een eigen procedure en tijd, maar het kan.'],
        ['Ethisch geregeld', 'Colombia staat niet op de WHO-lijst van landen waar internationale werving de zorg zou aantasten; op die lijst staat in de Amerika’s alleen Haïti. Uit landen die er wél op staan werven wij niet.']
      ]
    },
    tegen: {
      h: 'En dit staat er tegenover',
      p: 'Wij vertellen dit liever nu dan als je er al aan begonnen bent.',
      items: [
        ['Het duurt lang', 'Anderhalf tot tweeënhalf jaar is normaal, en het kan uitlopen. Je moet dat kunnen volhouden, ook financieel.'],
        ['Nederlands vanaf nul', 'Je begint verder van de taal af dan een Spaanstalige Europeaan met een EU-diploma. De basis tot A2 doe je zelf, op eigen kosten.'],
        ['Je begint onder je niveau', 'Tot je BIG-registratie rond is, werk je in een ondersteunende functie. Je bent verpleegkundige, maar je mag hier pas zo werken als je geregistreerd staat.'],
        ['Ver van huis, ander klimaat', 'Colombia ligt op ruim negen vlieguren. Familiebezoek is duur en het weer hier is voor de meeste mensen een tegenvaller. Weeg dat eerlijk mee.']
      ]
    },
    bronH: 'Bronnen bij deze vergelijking'
  },

  en: {
    eyebrow: 'COLOMBIA NEXT TO THE NETHERLANDS', status: 'ROUTE IN PREPARATION',
    h2: 'And what do you earn in Colombia today?',
    sub: 'For Colombian healthcare professionals the gap is far larger than for Spain. The road there is also longer, and we say so up front. We are building this route right now; the figures below are already here so you know what you are looking at.',
    tCol: ['Role', 'Colombia', 'Netherlands', 'Difference'],
    tRows: {
      auxiliar: 'Auxiliar de enfermería / supporting role',
      start: 'Registered nurse, at the start of your career',
      senior: 'Registered nurse, 10 years or more'
    },
    tNote: 'Gross per year, full time. Colombian figures converted at {koers} pesos to the euro and calculated on thirteen payments a year, including the prima de servicios. The statutory minimum wage in 2026 is {min} pesos a month, plus {aux} pesos transport allowance. Dutch figures: CAO VVT at 36 hours, including 8% holiday pay and an 8.33% year-end payment.',
    kern: {
      h: 'What this means in practice',
      p: 'An auxiliar de enfermería in Colombia earns around the statutory minimum. In a supporting role in the Netherlands that same person earns in one month roughly what takes four to five months at home. Even after correcting for the cheaper cost of living there, the gap stays large. But money is not the only thing that counts, and the road there takes longer than from within the EU.'
    },
    koop: {
      h: 'Converted to Colombian prices',
      p: 'Living in Colombia costs about {goedkoper}% less than in the Netherlands and rents are some {huur}% lower. Strip that out and the gap narrows, but it stays substantial. And we arrange your housing together with your employer, shared at first and at a price agreed in advance.',
      col: ['Role', 'Netherlands, converted to Colombian prices', 'Colombia', 'Difference in purchasing power']
    },
    duur: {
      h: 'What this route asks on top — and how long it takes',
      p: 'From Spain there is free movement within the EU. From Colombia there is not. This is what comes on top:',
      items: [
        ['Visa and work permit', 'Your employer applies for a single permit for residence and work (GVVA). That includes a labour market test, in which the UWV takes into account that there is not enough healthcare staff in the Netherlands and the EU.'],
        ['Statement of professional competence', 'The BIG register compares your Colombian diploma with the Dutch qualification. That is a heavier assessment than the recognition of an EU diploma.'],
        ['Language certificates and the BI-toets', 'Since 1 January 2024 the AKV test has been replaced by language certificates. After that comes the BI-toets, in which you show you are at the final level of the Dutch nursing qualification.'],
        ['Count on {duurMin} to {duurMax} months or longer', 'That is the realistic time from start to full BIG registration. In May 2026 the waiting list for the BI-toets was full, with unpredictable waiting times. Anyone promising it can be done faster either does not know or is not telling you.']
      ]
    },
    nietGeld: {
      h: 'What your payslip does not show',
      items: [
        ['Fewer patients per nurse', 'Colombia has {ratioCO} nurses per 1,000 inhabitants, against {ratioOESO} on average in the OECD and {ratioNL} in the Netherlands. The WHO advises at least {normWHO}. The difference in workload is enormous.'],
        ['A contract and a collective agreement', 'Your pay is set in a collective labour agreement, not negotiated person by person. Holiday pay, a thirteenth month and the irregular-hours allowance are built in.'],
        ['Your family can follow', 'With a valid residence permit you can apply for family reunification. That is a separate procedure and takes time, but it is possible.'],
        ['Ethically sound', 'Colombia is not on the WHO list of countries where international recruitment would damage healthcare; in the Americas only Haiti is on that list. We do not recruit from countries that are.']
      ]
    },
    tegen: {
      h: 'And this is what stands against it',
      p: 'We would rather tell you this now than once you have started.',
      items: [
        ['It takes a long time', 'One and a half to two and a half years is normal, and it can run over. You have to be able to sustain that, financially as well.'],
        ['Dutch from zero', 'You start further from the language than a Spanish speaker from Europe with an EU diploma. You do the basics up to A2 yourself, at your own expense.'],
        ['You start below your level', 'Until your BIG registration is complete you work in a supporting role. You are a nurse, but here you may only work as one once you are registered.'],
        ['Far from home, different climate', 'Colombia is more than nine flying hours away. Visiting family is expensive and the weather here disappoints most people. Weigh that honestly.']
      ]
    },
    bronH: 'Sources for this comparison'
  },

  es: {
    eyebrow: 'COLOMBIA FRENTE A LOS PAÍSES BAJOS', status: 'RUTA EN CONSTRUCCIÓN',
    h2: '¿Y cuánto ganas hoy en Colombia?',
    sub: 'Para los profesionales sanitarios colombianos la diferencia es mucho mayor que para España. El camino también es más largo, y lo decimos de entrada. Estamos construyendo esta ruta ahora mismo; las cifras de abajo ya están aquí para que sepas a qué atenerte.',
    tCol: ['Puesto', 'Colombia', 'Países Bajos', 'Diferencia'],
    tRows: {
      auxiliar: 'Auxiliar de enfermería / puesto de apoyo',
      start: 'Enfermero profesional, al inicio de la carrera',
      senior: 'Enfermero profesional, 10 años o más'
    },
    tNote: 'Bruto al año, jornada completa. Cifras colombianas convertidas a {koers} pesos por euro y calculadas con trece pagos al año, incluida la prima de servicios. El salario mínimo legal en 2026 es de {min} pesos al mes, más {aux} pesos de auxilio de transporte. Cifras neerlandesas: CAO VVT con 36 horas, incluidos el 8% de paga de vacaciones y el 8,33% de paga de fin de año.',
    kern: {
      h: 'Lo que significa en la práctica',
      p: 'Un auxiliar de enfermería en Colombia gana en torno al mínimo legal. En un puesto de apoyo en los Países Bajos esa misma persona gana en un mes aproximadamente lo que allá cuesta cuatro o cinco meses. Incluso corrigiendo por lo más barato que es vivir allí, la diferencia sigue siendo grande. Pero el dinero no es lo único que cuenta, y el camino es más largo que desde la UE.'
    },
    koop: {
      h: 'Convertido a precios colombianos',
      p: 'Vivir en Colombia cuesta alrededor de un {goedkoper}% menos que en los Países Bajos y los alquileres son un {huur}% más bajos. Si lo descuentas, la diferencia se reduce, pero sigue siendo considerable. Y tu vivienda la organizamos junto con tu empleador, compartida al principio y a un precio acordado de antemano.',
      col: ['Puesto', 'Países Bajos, convertido a precios colombianos', 'Colombia', 'Diferencia en poder adquisitivo']
    },
    duur: {
      h: 'Lo que esta ruta exige además, y cuánto tarda',
      p: 'Desde España hay libre circulación dentro de la UE. Desde Colombia no. Esto es lo que se añade:',
      items: [
        ['Visado y permiso de trabajo', 'Tu empleador solicita un permiso único de residencia y trabajo (GVVA). Incluye una prueba de mercado laboral en la que el UWV tiene en cuenta que faltan sanitarios en los Países Bajos y en la UE.'],
        ['Declaración de competencia profesional', 'El registro BIG compara tu título colombiano con la formación neerlandesa. Es una evaluación más exigente que el reconocimiento de un título de la UE.'],
        ['Certificados de idioma y la BI-toets', 'Desde el 1 de enero de 2024 la prueba AKV se sustituyó por certificados de idioma. Después viene la BI-toets, en la que demuestras que estás al nivel final de la formación neerlandesa.'],
        ['Cuenta con {duurMin} a {duurMax} meses o más', 'Ese es el plazo realista desde el inicio hasta el registro BIG completo. En mayo de 2026 la lista de espera de la BI-toets estaba llena, con tiempos impredecibles. Quien te prometa que se puede más rápido, o no lo sabe o no te lo está contando.']
      ]
    },
    nietGeld: {
      h: 'Lo que no aparece en la nómina',
      items: [
        ['Menos pacientes por enfermero', 'Colombia tiene {ratioCO} enfermeras por cada 1.000 habitantes, frente a {ratioOESO} de media en la OCDE y {ratioNL} en los Países Bajos. La OMS recomienda al menos {normWHO}. La diferencia de carga de trabajo es enorme.'],
        ['Un contrato y un convenio', 'Tu salario está fijado en un convenio colectivo, no se negocia persona a persona. La paga de vacaciones, la decimotercera y el complemento por horas irregulares van incluidos.'],
        ['Tu familia puede venir', 'Con un permiso de residencia válido puedes solicitar la reagrupación familiar. Es un trámite aparte y lleva tiempo, pero es posible.'],
        ['Éticamente en regla', 'Colombia no está en la lista de la OMS de países donde la captación internacional dañaría la sanidad; en las Américas solo figura Haití. De los países que sí están en esa lista no captamos.']
      ]
    },
    tegen: {
      h: 'Y esto es lo que hay al otro lado',
      p: 'Preferimos contártelo ahora y no cuando ya hayas empezado.',
      items: [
        ['Lleva mucho tiempo', 'Entre año y medio y dos años y medio es lo normal, y puede alargarse. Tienes que poder sostenerlo, también económicamente.'],
        ['Neerlandés desde cero', 'Partes más lejos del idioma que un hispanohablante europeo con título de la UE. La base hasta el A2 la haces tú, a tu cargo.'],
        ['Empiezas por debajo de tu nivel', 'Hasta que tengas el registro BIG trabajas en un puesto de apoyo. Eres enfermero, pero aquí solo puedes ejercer como tal cuando estés registrado.'],
        ['Lejos de casa, otro clima', 'Colombia queda a más de nueve horas de vuelo. Visitar a la familia es caro y el clima de aquí decepciona a casi todo el mundo. Tenlo en cuenta con sinceridad.']
      ]
    },
    bronH: 'Fuentes de esta comparación'
  },

  pl: {
    eyebrow: 'KOLUMBIA OBOK HOLANDII', status: 'ŚCIEŻKA W BUDOWIE',
    h2: 'A ile zarabiasz dziś w Kolumbii?',
    sub: 'Dla kolumbijskich pracowników opieki różnica jest znacznie większa niż dla Hiszpanii. Droga jest jednak dłuższa i mówimy o tym od razu. Tę ścieżkę budujemy właśnie teraz; kwoty poniżej są już dostępne, żebyś wiedział, na czym stoisz.',
    tCol: ['Stanowisko', 'Kolumbia', 'Holandia', 'Różnica'],
    tRows: {
      auxiliar: 'Auxiliar de enfermería / stanowisko wspierające',
      start: 'Pielęgniarka dyplomowana na początku kariery',
      senior: 'Pielęgniarka dyplomowana z 10-letnim stażem lub dłuższym'
    },
    tNote: 'Brutto rocznie, pełny etat. Kwoty kolumbijskie przeliczone po {koers} peso za euro i policzone przy trzynastu wypłatach rocznie, wraz z prima de servicios. Ustawowa płaca minimalna w 2026 roku to {min} peso miesięcznie plus {aux} peso dodatku transportowego. Kwoty holenderskie: CAO VVT przy 36 godzinach, z 8% dodatku urlopowego i 8,33% świadczenia rocznego.',
    kern: {
      h: 'Co to znaczy w praktyce',
      p: 'Auxiliar de enfermería zarabia w Kolumbii mniej więcej ustawowe minimum. Na stanowisku wspierającym w Holandii ta sama osoba zarabia w miesiąc mniej więcej tyle, ile w Kolumbii przez cztery do pięciu miesięcy. Nawet po korekcie o tańsze życie tam różnica pozostaje duża. Ale pieniądze to nie wszystko, a droga jest dłuższa niż z UE.'
    },
    koop: {
      h: 'Po przeliczeniu na kolumbijskie ceny',
      p: 'Życie w Kolumbii kosztuje około {goedkoper}% mniej niż w Holandii, a czynsze są niższe o jakieś {huur}%. Po odliczeniu tego różnica maleje, ale nadal jest znaczna. A mieszkanie organizujemy razem z Twoim pracodawcą, na początku dzielone i po z góry ustalonej cenie.',
      col: ['Stanowisko', 'Holandia po przeliczeniu na ceny kolumbijskie', 'Kolumbia', 'Różnica w sile nabywczej']
    },
    duur: {
      h: 'Czego ta ścieżka wymaga dodatkowo i ile trwa',
      p: 'Z Hiszpanii obowiązuje swobodny przepływ w UE. Z Kolumbii nie. Dochodzi do tego:',
      items: [
        ['Wiza i zezwolenie na pracę', 'Pracodawca występuje o połączone zezwolenie na pobyt i pracę (GVVA). Wiąże się z testem rynku pracy, w którym UWV bierze pod uwagę, że w Holandii i UE brakuje personelu opieki.'],
        ['Zaświadczenie o kwalifikacjach', 'Rejestr BIG porównuje Twój kolumbijski dyplom z holenderskim wykształceniem. To surowsza ocena niż uznanie dyplomu z UE.'],
        ['Certyfikaty językowe i BI-toets', 'Od 1 stycznia 2024 egzamin AKV zastąpiły certyfikaty językowe. Potem czeka Cię BI-toets, w którym wykazujesz, że jesteś na poziomie końcowym holenderskiego kształcenia.'],
        ['Licz się z {duurMin} do {duurMax} miesiącami lub dłużej', 'To realny czas od startu do pełnej rejestracji BIG. W maju 2026 lista oczekujących na BI-toets była pełna, z nieprzewidywalnym czasem oczekiwania. Kto obiecuje, że pójdzie szybciej, albo tego nie wie, albo Ci tego nie mówi.']
      ]
    },
    nietGeld: {
      h: 'Czego nie widać na pasku wypłaty',
      items: [
        ['Mniej pacjentów na pielęgniarkę', 'Kolumbia ma {ratioCO} pielęgniarki na 1000 mieszkańców, wobec {ratioOESO} średnio w OECD i {ratioNL} w Holandii. WHO zaleca co najmniej {normWHO}. Różnica w obciążeniu pracą jest ogromna.'],
        ['Umowa i układ zbiorowy', 'Twoja płaca wynika z układu zbiorowego, a nie z indywidualnych negocjacji. Dodatek urlopowy, trzynasta pensja i dodatek za porę nietypową są w nim zapisane.'],
        ['Rodzina może przyjechać', 'Z ważnym zezwoleniem na pobyt możesz wystąpić o łączenie rodzin. To osobna procedura i zajmuje czas, ale jest możliwa.'],
        ['Etycznie w porządku', 'Kolumbii nie ma na liście WHO krajów, w których międzynarodowa rekrutacja szkodziłaby opiece zdrowotnej; w obu Amerykach jest na niej tylko Haiti. Z krajów, które się na niej znajdują, nie rekrutujemy.']
      ]
    },
    tegen: {
      h: 'A to jest druga strona',
      p: 'Wolimy powiedzieć to teraz niż wtedy, gdy już zaczniesz.',
      items: [
        ['To trwa długo', 'Półtora do dwóch i pół roku to norma, a może się przeciągnąć. Musisz to wytrzymać, także finansowo.'],
        ['Niderlandzki od zera', 'Startujesz dalej od języka niż hiszpańskojęzyczny Europejczyk z dyplomem UE. Podstawę do A2 robisz sam, na własny koszt.'],
        ['Zaczynasz poniżej swoich kwalifikacji', 'Do czasu rejestracji BIG pracujesz na stanowisku wspierającym. Jesteś pielęgniarką, ale tutaj możesz tak pracować dopiero po rejestracji.'],
        ['Daleko od domu, inny klimat', 'Kolumbia leży ponad dziewięć godzin lotu stąd. Odwiedziny u rodziny są drogie, a tutejsza pogoda rozczarowuje niemal każdego. Weź to uczciwie pod uwagę.']
      ]
    },
    bronH: 'Źródła tego porównania'
  }
};

function renderVergelijkCO(lang, h, D) {
  const esc = h.esc;
  const t = V[lang] || V.nl;
  const nf = n => Math.round(n / 100) * 100;
  const eur = n => '&euro; ' + Math.round(n).toLocaleString('nl-NL');
  const pesos = n => Math.round(n).toLocaleString('nl-NL');
  const band = (a, b) => eur(nf(a)) + ' – ' + eur(nf(b));
  // Pesos per maand naar euro per jaar.
  const jaarCO = cop => cop * CO.betalingen / CO.koers;
  const vul = s => s.replace('{koers}', pesos(CO.koers)).replace('{min}', pesos(CO.minimumMaand))
    .replace('{aux}', pesos(CO.auxilioTransporte)).replace('{goedkoper}', String(CO.goedkoperPct).replace('.', ','))
    .replace('{huur}', String(CO.huurGoedkoperPct).replace('.', ',')).replace('{ratioCO}', CO.ratioCO)
    .replace('{ratioNL}', CO.ratioNL).replace('{ratioOESO}', CO.ratioOESO).replace('{normWHO}', CO.normWHO)
    .replace('{duurMin}', CO.duurMin).replace('{duurMax}', CO.duurMax);

  const rijen = [
    { k: 'auxiliar', co: CO.auxiliar, nl: [jaarNL(D, 25, 0, 0), jaarNL(D, 25, 0, 0.12)] },
    { k: 'start', co: CO.enfermeroStart, nl: [jaarNL(D, 45, 0, 0), jaarNL(D, 45, 0, 0.12)] },
    { k: 'senior', co: CO.enfermeroSenior, nl: [jaarNL(D, 45, 0.7, 0), jaarNL(D, 45, 0.7, 0.12)] }
  ].map(r => ({ ...r, coJaar: [jaarCO(r.co.min), jaarCO(r.co.max)] }));

  const tRijen = rijen.map(r => {
    const coGem = (r.coJaar[0] + r.coJaar[1]) / 2, nlGem = (r.nl[0] + r.nl[1]) / 2;
    return `<tr><td>${esc(t.tRows[r.k])}</td><td class="sal-num">${band(r.coJaar[0], r.coJaar[1])}</td>`
      + `<td class="sal-num sal-nlcel">${band(r.nl[0], r.nl[1])}</td>`
      + `<td class="sal-num sal-plus">+ ${eur(nf(nlGem - coGem))}</td></tr>`;
  }).join('');

  // Colombia is goedkoper; het Nederlandse bedrag omgerekend naar dat prijsniveau.
  const factor = 1 - CO.goedkoperPct / 100;
  const kRijen = rijen.map(r => {
    const coGem = (r.coJaar[0] + r.coJaar[1]) / 2, nlGem = (r.nl[0] + r.nl[1]) / 2, nlCorr = nlGem * factor;
    const pct = Math.round((nlCorr / coGem - 1) * 100);
    return `<tr><td>${esc(t.tRows[r.k])}</td><td class="sal-num sal-nlcel">${eur(nf(nlCorr))}</td>`
      + `<td class="sal-num">${eur(nf(coGem))}</td><td class="sal-num sal-plus">+ ${pct}%</td></tr>`;
  }).join('');

  const panels = arr => arr.map(([kop, tekst]) =>
    `<article class="panel"><h3>${esc(vul(kop))}</h3><p>${esc(vul(tekst))}</p></article>`).join('');

  const bronnen = CO.bronnen
    .map(([naam, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(naam)}</a></li>`).join('');

  return `<div class="sal-block sal-verg sal-verg-co" id="colombia">
<div class="sal-head"><span class="eyebrow">${esc(t.eyebrow)}</span><span class="sal-status">${esc(t.status)}</span><h2>${esc(t.h2)}</h2><p>${esc(t.sub)}</p></div>

<div class="sal-tablewrap"><table class="sal-table"><thead><tr><th>${esc(t.tCol[0])}</th><th class="sal-num">${esc(t.tCol[1])}</th><th class="sal-num">${esc(t.tCol[2])}</th><th class="sal-num">${esc(t.tCol[3])}</th></tr></thead><tbody>${tRijen}</tbody></table></div>
<p class="sal-note">${esc(vul(t.tNote))}</p>

<div class="sal-kern"><h3>${esc(t.kern.h)}</h3><p>${esc(t.kern.p)}</p></div>

<h3 class="sal-orth">${esc(t.koop.h)}</h3>
<p class="sal-koopp">${esc(vul(t.koop.p))}</p>
<div class="sal-tablewrap"><table class="sal-table"><thead><tr><th>${esc(t.koop.col[0])}</th><th class="sal-num">${esc(t.koop.col[1])}</th><th class="sal-num">${esc(t.koop.col[2])}</th><th class="sal-num">${esc(t.koop.col[3])}</th></tr></thead><tbody>${kRijen}</tbody></table></div>

<div class="sal-duur"><h3>${esc(t.duur.h)}</h3><p class="sal-tegenp">${esc(t.duur.p)}</p><div class="grid">${panels(t.duur.items)}</div></div>

<h3 class="sal-orth">${esc(t.nietGeld.h)}</h3>
<div class="grid">${panels(t.nietGeld.items)}</div>

<div class="sal-tegen"><h3>${esc(t.tegen.h)}</h3><p class="sal-tegenp">${esc(t.tegen.p)}</p><div class="grid">${panels(t.tegen.items)}</div></div>

<div class="sal-bronnen sal-vergbron"><h3>${esc(t.bronH)}</h3><ul>${bronnen}</ul></div>
</div>`;
}

module.exports = { CO, renderVergelijkCO };
