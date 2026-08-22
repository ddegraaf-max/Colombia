// Loonpagina met keuzehulp. Wat een kandidaat verdient is de meest gestelde vraag,
// en het antwoord is publiek: het staat in de CAO VVT. Door het gewoon op te schrijven
// hoeft niemand te gokken.
//
// Alle bedragen staan in DATA, zodat een nieuwe CAO-tabel op één plek wordt bijgewerkt.
// De keuzehulp rekent volledig in de browser (public/js/salaris.js); er gaat geen enkel
// gegeven naar de server en er komt geen externe dienst aan te pas.

const DATA = {
  // FWG-tabel CAO VVT per 1 juli 2026 (36 uur), inclusief de structurele verhoging
  // van 3,5% per die datum. Bron: mijninschaling.nl en salaristabel.nl, zie bronnenlijst.
  tableDate: '01-07-2026',
  hoursFull: 36,
  vakantiegeld: 8,      // % over salaris en ORT
  eindejaar: 8.33,      // % over salaris, exclusief vakantiegeld en toeslagen
  nettoLow: 0.76,       // ruwe bandbreedte netto/bruto bij deze inkomens
  nettoHigh: 0.80,
  scales: [
    { fwg: 15, min: 2402, max: 2897, key: 'zorghulp' },
    { fwg: 20, min: 2488, max: 3065, key: 'zorgassistent' },
    { fwg: 25, min: 2541, max: 3233, key: 'helpende' },
    { fwg: 30, min: 2599, max: 3410, key: 'helpendeplus' },
    { fwg: 35, min: 2664, max: 3593, key: 'verzorgende' },
    { fwg: 40, min: 2812, max: 3864, key: 'fwg40' },
    { fwg: 45, min: 2982, max: 4246, key: 'vpkmbo' },
    { fwg: 50, min: 3324, max: 4823, key: 'vpkhbo' }
  ],
  // Onregelmatigheidstoeslag CAO VVT per 1 januari 2026.
  ort: [
    { key: 'avond', pct: 22 },
    { key: 'zaterdag', pct: 38 },
    { key: 'nacht', pct: 47 },
    { key: 'zaterdagnacht', pct: 52 },
    { key: 'zondag', pct: 60 }
  ],
  // Startfunctie tijdens het traject en de functie na BIG-registratie.
  routes: {
    vpkmbo: { start: 25, doel: 45 },
    vpkhbo: { start: 25, doel: 50 },
    verzorgende: { start: 20, doel: 35 },
    anders: { start: 20, doel: 35 }
  },
  // Ervaring telt mee bij inschaling, maar je begint zelden bovenin de schaal.
  ervaring: [{ key: 'e0', f: 0 }, { key: 'e2', f: 0.25 }, { key: 'e5', f: 0.5 }, { key: 'e10', f: 0.7 }],
  uren: [24, 28, 32, 36],
  // Gemiddeld ORT-percentage over alle gewerkte uren.
  diensten: [{ key: 'd0', f: 0 }, { key: 'd1', f: 0.05 }, { key: 'd2', f: 0.12 }, { key: 'd3', f: 0.22 }],
  bronnen: [
    ['FWG-salarisschalen CAO VVT per 1 juli 2026', 'https://mijninschaling.nl/cao/vvt'],
    ['CAO VVT salarisschalen, volledige tabel', 'https://salaristabel.nl/salarisschalen/zorg/vvt'],
    ['Onregelmatig werken en de vergoeding daarvoor, ActiZ', 'https://www.actiz.nl/cao-vvt-2025-2026/hoofdstuk-4-wat-levert-het-op/44-onregelmatig-werken-en-de-vergoeding-die-je'],
    ['CAO VVT 2025–2026, volledige tekst (FNV)', 'https://www.fnv.nl/cao-sector/zorg-welzijn/verpleging-verzorging-thuiszorg'],
    ['Gelijkwaardige arbeidsvoorwaarden voor uitzendkrachten, ABU', 'https://www.abu.nl/kennisbank/cao-voor-uitzendkrachten/inlenersbeloning-voor-uitzendkrachten/']
  ]
};

const SALARY = {
  nl: {
    navLabel: 'Salaris',
    title: 'Wat verdien je in de Nederlandse zorg?',
    intro: 'Geen schattingen en geen mooie praatjes: wat je verdient staat in de CAO en is voor iedereen na te lezen. Hieronder de schalen, de toeslagen en een keuzehulp die uitrekent wat het voor jou betekent — tijdens je traject én daarna.',
    cao: {
      eyebrow: 'DE BASIS', h2: 'Ja, je werkt onder een CAO',
      sub: 'In de Nederlandse zorg wordt het loon niet per persoon onderhandeld. Het ligt vast in een collectieve arbeidsovereenkomst.',
      points: [
        ['De CAO VVT geldt', 'Verpleeg- en verzorgingshuizen en thuiszorg vallen onder de CAO VVT. Je functie wordt ingedeeld in een FWG-schaal en die schaal bepaalt je salaris. Werk je in een ziekenhuis of de gehandicaptenzorg, dan geldt een eigen CAO met eigen schalen.'],
        ['Ook via het partnerbureau', 'Je contract loopt via ons geregistreerde partnerbureau, maar dat verandert je loon niet. Sinds 1 januari 2026 schrijft de CAO voor Uitzendkrachten voor dat je arbeidsvoorwaardenpakket gelijkwaardig moet zijn aan dat van vast personeel in een vergelijkbare functie. In de praktijk: de schaal van de instelling.'],
        ['Je klimt in de schaal', 'Binnen een schaal ga je normaal elk jaar een trede omhoog tot je het eindbedrag bereikt. Werkervaring uit Spanje of een ander EU-land mag meetellen bij je startinschaling — vraag daar altijd naar.'],
        ['Toeslagen zijn geen extraatje', 'Vakantiegeld, eindejaarsuitkering en onregelmatigheidstoeslag zijn geen bonus maar onderdeel van je inkomen. In de zorg tellen ze fors mee; reken er dus mee als je je maandbedrag beoordeelt.']
      ]
    },
    table: {
      eyebrow: 'DE SCHALEN', h2: 'Bruto per maand bij 36 uur',
      sub: 'Tabel CAO VVT per 1 juli 2026, na de structurele verhoging van 3,5% op die datum. Het beginbedrag is trede 0; het eindbedrag bereik je na een aantal jaren.',
      cFunctie: 'Functie', cSchaal: 'Schaal', cMin: 'Begin', cMax: 'Eind',
      note: 'Werk je minder dan 36 uur, dan gaan de bedragen naar rato. Bij 32 uur is dat ongeveer 89% en bij 24 uur tweederde.',
      functies: {
        zorghulp: 'Zorghulp / huishoudelijk medewerker', zorgassistent: 'Zorgassistent', helpende: 'Helpende zorg en welzijn',
        helpendeplus: 'Helpende plus', verzorgende: 'Verzorgende IG', fwg40: 'Verzorgende / gespecialiseerd',
        vpkmbo: 'Verpleegkundige (mbo, niveau 4)', vpkhbo: 'Verpleegkundige (hbo) / wijkverpleegkundige'
      },
      hi: ['zorgassistent', 'helpende', 'vpkmbo']
    },
    extra: {
      eyebrow: 'WAT ER BOVENOP KOMT', h2: 'Vakantiegeld, dertiende maand en onregelmatige diensten',
      items: [
        ['8% vakantiegeld', 'Wordt jaarlijks uitbetaald, meestal in mei.'],
        ['8,33% eindejaarsuitkering', 'Feitelijk een dertiende maand, uitbetaald in december.'],
        ['Onregelmatigheidstoeslag', 'Voor avond-, nacht-, weekend- en feestdaguren. In de zorg werk je vrijwel altijd onregelmatig, dus dit is geen uitzondering maar de regel.']
      ],
      ortHead: 'Onregelmatigheidstoeslag per 1 januari 2026', ortCol1: 'Wanneer', ortCol2: 'Toeslag',
      ort: {
        avond: 'Maandag t/m vrijdag 06:00–07:00 en 20:00–22:00', nacht: 'Maandag t/m vrijdag 00:00–06:00 en 22:00–24:00',
        zaterdag: 'Zaterdag 06:00–08:00 en 12:00–22:00', zaterdagnacht: 'Zaterdag 00:00–06:00 en 22:00–24:00',
        zondag: 'Zondag en feestdagen, de hele dag'
      }
    },
    tool: {
      eyebrow: 'KEUZEHULP', h2: 'Reken uit wat jij zou verdienen',
      sub: 'Beantwoord vijf vragen en je ziet wat je verdient tijdens je traject en wat je verdient zodra je BIG-registratie rond is. De berekening gebeurt in je eigen browser; er wordt niets opgeslagen of verstuurd.',
      q: {
        beroep: 'Welk diploma heb je?', ervaring: 'Hoeveel jaar relevante werkervaring?',
        taal: 'Hoe goed is je Nederlands nu?', uren: 'Hoeveel uur per week wil je werken?',
        diensten: 'Werk je avond-, nacht- of weekenddiensten?'
      },
      beroep: { vpkmbo: 'Verpleegkundige (mbo-niveau)', vpkhbo: 'Verpleegkundige (hbo-niveau)', verzorgende: 'Verzorgende / auxiliar de enfermería', anders: 'Ander zorgdiploma' },
      ervaring: { e0: 'Minder dan 2 jaar', e2: '2 tot 4 jaar', e5: '5 tot 9 jaar', e10: '10 jaar of meer' },
      taal: { t0: 'Nog geen Nederlands of A1', t1: 'A2', t2: 'B1', t3: 'B2 of hoger' },
      diensten: { d0: 'Nee, alleen dagdiensten', d1: 'Af en toe', d2: 'Regelmatig', d3: 'Veel nacht- en weekenddiensten' },
      urenSuffix: 'uur',
      btn: 'Bereken mijn indicatie', reset: 'Opnieuw',
      res: {
        h: 'Jouw indicatie',
        now: 'Tijdens je traject', later: 'Na je BIG-registratie', gain: 'Verschil per jaar',
        fwg: 'Schaal', functie: 'Functie', bruto: 'Bruto per maand', ort: 'Onregelmatigheidstoeslag',
        vak: 'Vakantiegeld', eind: 'Eindejaarsuitkering', jaar: 'Bruto per jaar', netto: 'Netto per maand, ruwe indicatie',
        perMaand: 'per maand', perJaar: 'per jaar',
        nextH: 'Jouw volgende stap',
        next: {
          t0: 'Je eerste stap is de taal, en die zet je zelf. Haal niveau A2 bij een taalschool naar keuze; dat is onze instapeis. Zodra je daar bent, nemen wij de opleiding over tot B1 of B2 en gaat de erkenning van je diploma parallel lopen.',
          t1: 'Je hebt de instapeis gehaald. Vanaf hier nemen wij de taalopleiding over richting B1 of B2 en starten we de erkenning van je diploma en je BIG-aanvraag. Zodra je Nederlands genoeg is voor de dagelijkse praktijk, kun je met salaris starten in een ondersteunende functie.',
          t2: 'Met B1 kun je in de meeste gevallen starten in een ondersteunende functie, met salaris, terwijl je doorleert richting B2 en het Staatsexamen NT2. Dat is precies het moment waarop je inkomen begint.',
          t3: 'Je taal is op niveau. Nu draait alles om het Staatsexamen NT2 en je BIG-registratie. Je kunt direct starten in een ondersteunende functie en doorgroeien zodra je registratie rond is.'
        },
        cta: 'Bespreek jouw situatie', ctaHref: '/contact#kontakt', cta2: 'Maak een profiel aan', cta2Href: '/portal',
        note: 'Dit is een indicatie op basis van de CAO VVT-tabel per 1 juli 2026. Je werkelijke inschaling wordt bepaald door de werkgever en hangt af van de functie, je diploma en de ervaring die wordt meegeteld. Het nettobedrag is een ruwe bandbreedte vóór toeslagen zoals huur- en zorgtoeslag.'
      }
    },
    sources: { h: 'Bronnen', note: 'Wij werken deze pagina bij zodra er een nieuwe CAO-tabel is. Klopt er iets niet? Laat het ons weten.' },
    ctaBlock: { h: 'Wil je weten wat er in jouw situatie mogelijk is?', p: 'Een open gesprek, vrijblijvend, in het Spaans, Nederlands, Engels of Pools.', btn: 'Plan een gesprek', href: '/plan' }
  },

  en: {
    navLabel: 'Salary',
    title: 'What do you earn in Dutch healthcare?',
    intro: 'No estimates and no sales talk: what you earn is set out in the collective agreement and anyone can look it up. Below are the scales, the allowances and a calculator that works out what it means for you — during your journey and afterwards.',
    cao: {
      eyebrow: 'THE BASICS', h2: 'Yes, you work under a collective agreement',
      sub: 'In Dutch healthcare pay is not negotiated person by person. It is fixed in a collective labour agreement (CAO).',
      points: [
        ['The CAO VVT applies', 'Nursing homes, care homes and home care fall under the CAO VVT. Your role is graded into an FWG scale and that scale determines your salary. In a hospital or disability care a different CAO applies, with its own scales.'],
        ['Also through the partner agency', 'Your contract runs through our registered partner agency, but that does not change your pay. Since 1 January 2026 the collective agreement for agency workers requires your package to be equivalent to that of permanent staff in a comparable role. In practice: the institution’s scale.'],
        ['You move up the scale', 'Within a scale you normally move up one step each year until you reach the top of the scale. Work experience from Spain or another EU country may count towards your starting grade — always ask about it.'],
        ['Allowances are not a bonus', 'Holiday pay, the year-end payment and the irregular-hours allowance are part of your income, not an extra. In healthcare they add up substantially, so take them into account when you judge a monthly figure.']
      ]
    },
    table: {
      eyebrow: 'THE SCALES', h2: 'Gross per month at 36 hours',
      sub: 'CAO VVT table as of 1 July 2026, after the structural 3.5% increase on that date. The starting figure is step 0; you reach the end figure after a number of years.',
      cFunctie: 'Role', cSchaal: 'Scale', cMin: 'Start', cMax: 'Top',
      note: 'If you work fewer than 36 hours the amounts are pro rata. At 32 hours that is about 89% and at 24 hours two thirds.',
      functies: {
        zorghulp: 'Care helper / domestic staff', zorgassistent: 'Care assistant', helpende: 'Care and welfare assistant',
        helpendeplus: 'Senior care assistant', verzorgende: 'Certified carer (Verzorgende IG)', fwg40: 'Carer / specialised',
        vpkmbo: 'Nurse (vocational, level 4)', vpkhbo: 'Nurse (degree) / community nurse'
      },
      hi: ['zorgassistent', 'helpende', 'vpkmbo']
    },
    extra: {
      eyebrow: 'WHAT COMES ON TOP', h2: 'Holiday pay, a thirteenth month and irregular hours',
      items: [
        ['8% holiday pay', 'Paid once a year, usually in May.'],
        ['8.33% year-end payment', 'Effectively a thirteenth month, paid in December.'],
        ['Irregular-hours allowance', 'For evening, night, weekend and public-holiday hours. In healthcare you almost always work irregular hours, so this is the rule rather than the exception.']
      ],
      ortHead: 'Irregular-hours allowance as of 1 January 2026', ortCol1: 'When', ortCol2: 'Allowance',
      ort: {
        avond: 'Monday to Friday 06:00–07:00 and 20:00–22:00', nacht: 'Monday to Friday 00:00–06:00 and 22:00–24:00',
        zaterdag: 'Saturday 06:00–08:00 and 12:00–22:00', zaterdagnacht: 'Saturday 00:00–06:00 and 22:00–24:00',
        zondag: 'Sunday and public holidays, all day'
      }
    },
    tool: {
      eyebrow: 'CALCULATOR', h2: 'Work out what you would earn',
      sub: 'Answer five questions and you will see what you earn during your journey and what you earn once your BIG registration is complete. The calculation runs in your own browser; nothing is stored or sent.',
      q: {
        beroep: 'Which qualification do you hold?', ervaring: 'How many years of relevant experience?',
        taal: 'How good is your Dutch right now?', uren: 'How many hours a week do you want to work?',
        diensten: 'Will you work evening, night or weekend shifts?'
      },
      beroep: { vpkmbo: 'Nurse (vocational level)', vpkhbo: 'Nurse (degree level)', verzorgende: 'Carer / auxiliar de enfermería', anders: 'Another healthcare qualification' },
      ervaring: { e0: 'Less than 2 years', e2: '2 to 4 years', e5: '5 to 9 years', e10: '10 years or more' },
      taal: { t0: 'No Dutch yet, or A1', t1: 'A2', t2: 'B1', t3: 'B2 or higher' },
      diensten: { d0: 'No, day shifts only', d1: 'Occasionally', d2: 'Regularly', d3: 'Many nights and weekends' },
      urenSuffix: 'hours',
      btn: 'Calculate my indication', reset: 'Start over',
      res: {
        h: 'Your indication',
        now: 'During your journey', later: 'After BIG registration', gain: 'Difference per year',
        fwg: 'Scale', functie: 'Role', bruto: 'Gross per month', ort: 'Irregular-hours allowance',
        vak: 'Holiday pay', eind: 'Year-end payment', jaar: 'Gross per year', netto: 'Net per month, rough indication',
        perMaand: 'per month', perJaar: 'per year',
        nextH: 'Your next step',
        next: {
          t0: 'Your first step is the language, and you take it yourself. Reach level A2 at a language school of your choice; that is our entry requirement. Once you are there we take over the training up to B1 or B2 and the recognition of your diploma runs in parallel.',
          t1: 'You have met the entry requirement. From here we take over the language training towards B1 or B2 and start the recognition of your diploma and your BIG application. As soon as your Dutch is good enough for daily practice you can start on a salary in a supporting role.',
          t2: 'With B1 you can in most cases start in a supporting role, on a salary, while you continue towards B2 and the Staatsexamen NT2. That is exactly the point at which your income starts.',
          t3: 'Your language is where it needs to be. Now it is all about the Staatsexamen NT2 and your BIG registration. You can start in a supporting role straight away and move up once your registration is complete.'
        },
        cta: 'Discuss your situation', ctaHref: '/contact#kontakt', cta2: 'Create a profile', cta2Href: '/portal',
        note: 'This is an indication based on the CAO VVT table as of 1 July 2026. Your actual grading is decided by the employer and depends on the role, your diploma and the experience that is counted. The net figure is a rough range before benefits such as housing or healthcare allowance.'
      }
    },
    sources: { h: 'Sources', note: 'We update this page as soon as a new CAO table is published. Spotted something wrong? Let us know.' },
    ctaBlock: { h: 'Want to know what is possible in your situation?', p: 'An open conversation, no obligation, in Spanish, Dutch, English or Polish.', btn: 'Book a conversation', href: '/plan' }
  },

  es: {
    navLabel: 'Salario',
    title: '¿Cuánto se gana en la sanidad neerlandesa?',
    intro: 'Sin estimaciones ni promesas: lo que ganas está en el convenio colectivo y cualquiera puede consultarlo. Abajo tienes las escalas, los complementos y una calculadora que te dice qué significa para ti, durante tu recorrido y después.',
    cao: {
      eyebrow: 'LA BASE', h2: 'Sí, trabajas bajo convenio colectivo',
      sub: 'En la sanidad neerlandesa el salario no se negocia persona a persona. Está fijado en un convenio colectivo (CAO).',
      points: [
        ['Se aplica el CAO VVT', 'Las residencias y la atención domiciliaria se rigen por el CAO VVT. Tu puesto se clasifica en una escala FWG y esa escala determina tu salario. En un hospital o en atención a la discapacidad se aplica otro convenio, con sus propias escalas.'],
        ['También a través de la agencia asociada', 'Tu contrato va a través de nuestra agencia asociada registrada, pero eso no cambia tu salario. Desde el 1 de enero de 2026 el convenio de trabajo temporal exige que tu paquete de condiciones sea equivalente al del personal fijo en un puesto comparable. En la práctica: la escala del centro.'],
        ['Subes dentro de la escala', 'Dentro de una escala normalmente subes un escalón cada año hasta llegar al tope. La experiencia laboral de España u otro país de la UE puede computarse en tu clasificación inicial: pregúntalo siempre.'],
        ['Los complementos no son un extra', 'La paga de vacaciones, la paga de fin de año y el complemento por horas irregulares forman parte de tus ingresos. En sanidad suman bastante, así que tenlos en cuenta al valorar una cifra mensual.']
      ]
    },
    table: {
      eyebrow: 'LAS ESCALAS', h2: 'Bruto al mes con 36 horas',
      sub: 'Tabla CAO VVT a 1 de julio de 2026, tras la subida estructural del 3,5% en esa fecha. La cifra de inicio es el escalón 0; el tope se alcanza tras varios años.',
      cFunctie: 'Puesto', cSchaal: 'Escala', cMin: 'Inicio', cMax: 'Tope',
      note: 'Si trabajas menos de 36 horas los importes son proporcionales. Con 32 horas es alrededor del 89% y con 24 horas dos tercios.',
      functies: {
        zorghulp: 'Auxiliar de limpieza / apoyo', zorgassistent: 'Auxiliar de cuidados', helpende: 'Auxiliar de cuidados y bienestar',
        helpendeplus: 'Auxiliar de cuidados sénior', verzorgende: 'Cuidador titulado (Verzorgende IG)', fwg40: 'Cuidador / especializado',
        vpkmbo: 'Enfermero (formación profesional, nivel 4)', vpkhbo: 'Enfermero (grado) / enfermero comunitario'
      },
      hi: ['zorgassistent', 'helpende', 'vpkmbo']
    },
    extra: {
      eyebrow: 'LO QUE SE SUMA', h2: 'Paga de vacaciones, decimotercera y turnos irregulares',
      items: [
        ['8% de paga de vacaciones', 'Se abona una vez al año, normalmente en mayo.'],
        ['8,33% de paga de fin de año', 'En la práctica una decimotercera paga, abonada en diciembre.'],
        ['Complemento por horas irregulares', 'Por horas de tarde, noche, fin de semana y festivos. En sanidad casi siempre se trabaja en horario irregular, así que es la norma, no la excepción.']
      ],
      ortHead: 'Complemento por horas irregulares desde el 1 de enero de 2026', ortCol1: 'Cuándo', ortCol2: 'Complemento',
      ort: {
        avond: 'De lunes a viernes 06:00–07:00 y 20:00–22:00', nacht: 'De lunes a viernes 00:00–06:00 y 22:00–24:00',
        zaterdag: 'Sábado 06:00–08:00 y 12:00–22:00', zaterdagnacht: 'Sábado 00:00–06:00 y 22:00–24:00',
        zondag: 'Domingos y festivos, todo el día'
      }
    },
    tool: {
      eyebrow: 'CALCULADORA', h2: 'Calcula lo que ganarías',
      sub: 'Responde a cinco preguntas y verás lo que ganas durante tu recorrido y lo que ganas cuando tengas el registro BIG. El cálculo se hace en tu propio navegador; no se guarda ni se envía nada.',
      q: {
        beroep: '¿Qué titulación tienes?', ervaring: '¿Cuántos años de experiencia relevante?',
        taal: '¿Qué nivel de neerlandés tienes ahora?', uren: '¿Cuántas horas por semana quieres trabajar?',
        diensten: '¿Harás turnos de tarde, noche o fin de semana?'
      },
      beroep: { vpkmbo: 'Enfermero (nivel formación profesional)', vpkhbo: 'Enfermero (nivel grado)', verzorgende: 'Auxiliar de enfermería', anders: 'Otra titulación sanitaria' },
      ervaring: { e0: 'Menos de 2 años', e2: 'De 2 a 4 años', e5: 'De 5 a 9 años', e10: '10 años o más' },
      taal: { t0: 'Todavía nada o A1', t1: 'A2', t2: 'B1', t3: 'B2 o superior' },
      diensten: { d0: 'No, solo turnos de día', d1: 'De vez en cuando', d2: 'Con regularidad', d3: 'Muchas noches y fines de semana' },
      urenSuffix: 'horas',
      btn: 'Calcular mi indicación', reset: 'Empezar de nuevo',
      res: {
        h: 'Tu indicación',
        now: 'Durante tu recorrido', later: 'Tras el registro BIG', gain: 'Diferencia al año',
        fwg: 'Escala', functie: 'Puesto', bruto: 'Bruto al mes', ort: 'Complemento por horas irregulares',
        vak: 'Paga de vacaciones', eind: 'Paga de fin de año', jaar: 'Bruto al año', netto: 'Neto al mes, indicación aproximada',
        perMaand: 'al mes', perJaar: 'al año',
        nextH: 'Tu siguiente paso',
        next: {
          t0: 'Tu primer paso es el idioma, y lo das tú. Alcanza el nivel A2 en la escuela que elijas; es nuestro requisito de entrada. A partir de ahí asumimos nosotros la formación hasta B1 o B2 y la homologación de tu título va en paralelo.',
          t1: 'Has cumplido el requisito de entrada. Desde aquí asumimos la formación hacia B1 o B2 e iniciamos la homologación de tu título y tu solicitud BIG. En cuanto tu neerlandés baste para el día a día, puedes empezar con salario en un puesto de apoyo.',
          t2: 'Con B1 en la mayoría de los casos puedes empezar en un puesto de apoyo, con salario, mientras sigues hacia el B2 y el Staatsexamen NT2. Ese es justo el momento en que empiezan tus ingresos.',
          t3: 'Tu nivel de idioma está donde debe estar. Ahora todo gira en torno al Staatsexamen NT2 y tu registro BIG. Puedes empezar de inmediato en un puesto de apoyo y promocionar en cuanto tengas el registro.'
        },
        cta: 'Comenta tu situación', ctaHref: '/contact#kontakt', cta2: 'Crear un perfil', cta2Href: '/portal',
        note: 'Es una indicación basada en la tabla CAO VVT a 1 de julio de 2026. Tu clasificación real la decide el empleador y depende del puesto, tu título y la experiencia que se compute. La cifra neta es una franja aproximada antes de ayudas como la de vivienda o sanitaria.'
      }
    },
    sources: { h: 'Fuentes', note: 'Actualizamos esta página en cuanto se publica una nueva tabla del convenio. ¿Ves algo incorrecto? Dínoslo.' },
    ctaBlock: { h: '¿Quieres saber qué es posible en tu caso?', p: 'Una conversación abierta y sin compromiso, en español, neerlandés, inglés o polaco.', btn: 'Reserva una conversación', href: '/plan' }
  },

  pl: {
    navLabel: 'Wynagrodzenie',
    title: 'Ile zarabia się w holenderskiej opiece zdrowotnej?',
    intro: 'Bez szacunków i bez obiecanek: to, ile zarabiasz, jest zapisane w układzie zbiorowym i każdy może to sprawdzić. Poniżej znajdziesz siatkę płac, dodatki i kalkulator, który wyliczy, co to oznacza dla Ciebie — w trakcie ścieżki i po niej.',
    cao: {
      eyebrow: 'PODSTAWA', h2: 'Tak, pracujesz na układzie zbiorowym',
      sub: 'W holenderskiej opiece płaca nie jest negocjowana indywidualnie. Jest ustalona w układzie zbiorowym pracy (CAO).',
      points: [
        ['Obowiązuje CAO VVT', 'Domy opieki, domy seniora i opieka domowa podlegają układowi CAO VVT. Twoje stanowisko jest zaszeregowane do skali FWG i to ona wyznacza wynagrodzenie. W szpitalu lub w opiece nad osobami z niepełnosprawnościami obowiązuje odrębny układ z własnymi skalami.'],
        ['Także przez biuro partnerskie', 'Umowę zawierasz z naszym zarejestrowanym biurem partnerskim, ale to nie zmienia Twojej płacy. Od 1 stycznia 2026 układ zbiorowy dla pracowników tymczasowych wymaga, by Twój pakiet warunków był równoważny z pakietem pracowników etatowych na porównywalnym stanowisku. W praktyce: skala placówki.'],
        ['Awansujesz w skali', 'W ramach skali zwykle co roku przechodzisz o stopień wyżej, aż osiągniesz maksimum. Doświadczenie z Hiszpanii lub innego kraju UE może zostać uwzględnione przy zaszeregowaniu początkowym — zawsze o to pytaj.'],
        ['Dodatki to nie premia', 'Dodatek urlopowy, świadczenie roczne i dodatek za pracę w porze nietypowej to część Twojego dochodu, a nie bonus. W opiece stanowią sporą kwotę, więc uwzględnij je przy ocenie miesięcznej stawki.']
      ]
    },
    table: {
      eyebrow: 'SIATKA PŁAC', h2: 'Brutto miesięcznie przy 36 godzinach',
      sub: 'Tabela CAO VVT na 1 lipca 2026, po strukturalnej podwyżce o 3,5% w tym dniu. Kwota początkowa to stopień 0; kwotę maksymalną osiąga się po kilku latach.',
      cFunctie: 'Stanowisko', cSchaal: 'Skala', cMin: 'Start', cMax: 'Maksimum',
      note: 'Przy mniejszym wymiarze niż 36 godzin kwoty są proporcjonalne. Przy 32 godzinach to około 89%, a przy 24 godzinach dwie trzecie.',
      functies: {
        zorghulp: 'Pomoc opiekuńcza / gospodarcza', zorgassistent: 'Asystent opieki', helpende: 'Opiekun (helpende)',
        helpendeplus: 'Starszy opiekun', verzorgende: 'Opiekun dyplomowany (Verzorgende IG)', fwg40: 'Opiekun / specjalistyczny',
        vpkmbo: 'Pielęgniarka (poziom mbo 4)', vpkhbo: 'Pielęgniarka (studia) / pielęgniarka środowiskowa'
      },
      hi: ['zorgassistent', 'helpende', 'vpkmbo']
    },
    extra: {
      eyebrow: 'CO DOCHODZI DODATKOWO', h2: 'Dodatek urlopowy, trzynastka i praca zmianowa',
      items: [
        ['8% dodatku urlopowego', 'Wypłacane raz w roku, zwykle w maju.'],
        ['8,33% świadczenia rocznego', 'W praktyce trzynasta pensja, wypłacana w grudniu.'],
        ['Dodatek za porę nietypową', 'Za godziny wieczorne, nocne, weekendowe i świąteczne. W opiece niemal zawsze pracuje się nieregularnie, więc to reguła, a nie wyjątek.']
      ],
      ortHead: 'Dodatek za porę nietypową od 1 stycznia 2026', ortCol1: 'Kiedy', ortCol2: 'Dodatek',
      ort: {
        avond: 'Poniedziałek–piątek 06:00–07:00 i 20:00–22:00', nacht: 'Poniedziałek–piątek 00:00–06:00 i 22:00–24:00',
        zaterdag: 'Sobota 06:00–08:00 i 12:00–22:00', zaterdagnacht: 'Sobota 00:00–06:00 i 22:00–24:00',
        zondag: 'Niedziele i święta, cały dzień'
      }
    },
    tool: {
      eyebrow: 'KALKULATOR', h2: 'Wylicz, ile byś zarabiał',
      sub: 'Odpowiedz na pięć pytań, a zobaczysz, ile zarabiasz w trakcie ścieżki i ile po uzyskaniu rejestracji BIG. Obliczenia wykonuje Twoja przeglądarka; nic nie jest zapisywane ani wysyłane.',
      q: {
        beroep: 'Jaki masz dyplom?', ervaring: 'Ile masz lat odpowiedniego doświadczenia?',
        taal: 'Jak dobrze znasz teraz niderlandzki?', uren: 'Ile godzin tygodniowo chcesz pracować?',
        diensten: 'Czy będziesz pracować wieczorami, nocami lub w weekendy?'
      },
      beroep: { vpkmbo: 'Pielęgniarka (poziom mbo)', vpkhbo: 'Pielęgniarka (poziom studiów)', verzorgende: 'Opiekun / auxiliar de enfermería', anders: 'Inny dyplom medyczny' },
      ervaring: { e0: 'Mniej niż 2 lata', e2: 'Od 2 do 4 lat', e5: 'Od 5 do 9 lat', e10: '10 lat lub więcej' },
      taal: { t0: 'Jeszcze brak lub A1', t1: 'A2', t2: 'B1', t3: 'B2 lub wyżej' },
      diensten: { d0: 'Nie, tylko dzienne', d1: 'Od czasu do czasu', d2: 'Regularnie', d3: 'Dużo nocek i weekendów' },
      urenSuffix: 'godz.',
      btn: 'Oblicz moją wycenę', reset: 'Zacznij od nowa',
      res: {
        h: 'Twoja wycena',
        now: 'W trakcie ścieżki', later: 'Po rejestracji BIG', gain: 'Różnica w skali roku',
        fwg: 'Skala', functie: 'Stanowisko', bruto: 'Brutto miesięcznie', ort: 'Dodatek za porę nietypową',
        vak: 'Dodatek urlopowy', eind: 'Świadczenie roczne', jaar: 'Brutto rocznie', netto: 'Netto miesięcznie, wartość orientacyjna',
        perMaand: 'miesięcznie', perJaar: 'rocznie',
        nextH: 'Twój następny krok',
        next: {
          t0: 'Pierwszym krokiem jest język i ten krok robisz sam. Osiągnij poziom A2 w wybranej szkole językowej; to nasz warunek wstępny. Od tego momentu przejmujemy naukę do B1 lub B2, a uznanie dyplomu biegnie równolegle.',
          t1: 'Spełniasz warunek wstępny. Od tego miejsca przejmujemy naukę języka do B1 lub B2 i rozpoczynamy uznanie dyplomu oraz wniosek BIG. Gdy Twój niderlandzki wystarczy do codziennej praktyki, możesz zacząć z wynagrodzeniem na stanowisku wspierającym.',
          t2: 'Z poziomem B1 zwykle możesz już zacząć na stanowisku wspierającym, z wynagrodzeniem, ucząc się dalej do B2 i do Staatsexamen NT2. To dokładnie ten moment, w którym zaczyna się Twój dochód.',
          t3: 'Twój język jest na poziomie. Teraz liczy się Staatsexamen NT2 i rejestracja BIG. Możesz od razu zacząć na stanowisku wspierającym i awansować, gdy rejestracja będzie gotowa.'
        },
        cta: 'Omów swoją sytuację', ctaHref: '/contact#kontakt', cta2: 'Załóż profil', cta2Href: '/portal',
        note: 'To wycena orientacyjna na podstawie tabeli CAO VVT z 1 lipca 2026. Faktyczne zaszeregowanie ustala pracodawca i zależy od stanowiska, dyplomu oraz uwzględnionego doświadczenia. Kwota netto to przybliżony przedział przed dodatkami takimi jak dopłata do czynszu czy ubezpieczenia.'
      }
    },
    sources: { h: 'Źródła', note: 'Aktualizujemy tę stronę, gdy tylko pojawi się nowa tabela układu zbiorowego. Coś się nie zgadza? Daj nam znać.' },
    ctaBlock: { h: 'Chcesz wiedzieć, co jest możliwe w Twojej sytuacji?', p: 'Otwarta, niezobowiązująca rozmowa po hiszpańsku, niderlandzku, angielsku lub polsku.', btn: 'Umów rozmowę', href: '/plan' }
  }
};

// Alles wat de keuzehulp in de browser nodig heeft, in één JSON-blok.
// Geen inline script, zodat de Content-Security-Policy niet verruimd hoeft te worden.
function toolData(lang) {
  const t = SALARY[lang] || SALARY.nl;
  return {
    scales: DATA.scales, routes: DATA.routes, ervaring: DATA.ervaring, diensten: DATA.diensten,
    hoursFull: DATA.hoursFull, vakantiegeld: DATA.vakantiegeld, eindejaar: DATA.eindejaar,
    nettoLow: DATA.nettoLow, nettoHigh: DATA.nettoHigh,
    lang, functies: t.table.functies, res: t.tool.res
  };
}

function renderSalary(lang, h) {
  const esc = h.esc;
  const t = SALARY[lang] || SALARY.nl;

  const caoPoints = t.cao.points
    .map(([kop, tekst]) => `<article class="panel"><h3>${esc(kop)}</h3><p>${esc(tekst)}</p></article>`).join('');

  const rows = DATA.scales.map(s => {
    const hi = t.table.hi.includes(s.key) ? ' class="sal-hi"' : '';
    return `<tr${hi}><td>${esc(t.table.functies[s.key])}</td><td>FWG ${s.fwg}</td>`
      + `<td class="sal-num">&euro; ${fmt(s.min)}</td><td class="sal-num">&euro; ${fmt(s.max)}</td></tr>`;
  }).join('');

  const ortRows = DATA.ort
    .map(o => `<tr><td>${esc(t.extra.ort[o.key])}</td><td class="sal-num">${o.pct}%</td></tr>`).join('');

  const extraItems = t.extra.items
    .map(([kop, tekst]) => `<article class="panel"><h3>${esc(kop)}</h3><p>${esc(tekst)}</p></article>`).join('');

  const opts = (naam, obj, sel) => Object.keys(obj)
    .map((k, i) => `<option value="${esc(k)}"${i === 0 && !sel ? ' selected' : ''}>${esc(obj[k])}</option>`).join('');

  const urenOpts = DATA.uren
    .map(u => `<option value="${u}"${u === 32 ? ' selected' : ''}>${u} ${esc(t.tool.urenSuffix)}</option>`).join('');

  const veld = (id, label, inner) =>
    `<div class="sal-veld"><label for="${id}">${esc(label)}</label><select id="${id}">${inner}</select></div>`;

  const bronnen = DATA.bronnen
    .map(([naam, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(naam)}</a></li>`).join('');

  return `<section class="page sal">
<div class="sal-intro"><p>${esc(t.intro)}</p></div>

<div class="sal-block"><div class="sal-head"><span class="eyebrow">${esc(t.cao.eyebrow)}</span><h2>${esc(t.cao.h2)}</h2><p>${esc(t.cao.sub)}</p></div>
<div class="grid">${caoPoints}</div></div>

<div class="sal-block"><div class="sal-head"><span class="eyebrow">${esc(t.table.eyebrow)}</span><h2>${esc(t.table.h2)}</h2><p>${esc(t.table.sub)}</p></div>
<div class="sal-tablewrap"><table class="sal-table"><thead><tr><th>${esc(t.table.cFunctie)}</th><th>${esc(t.table.cSchaal)}</th><th class="sal-num">${esc(t.table.cMin)}</th><th class="sal-num">${esc(t.table.cMax)}</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="sal-note">${esc(t.table.note)}</p></div>

<div class="sal-block"><div class="sal-head"><span class="eyebrow">${esc(t.extra.eyebrow)}</span><h2>${esc(t.extra.h2)}</h2></div>
<div class="grid">${extraItems}</div>
<h3 class="sal-orth">${esc(t.extra.ortHead)}</h3>
<div class="sal-tablewrap"><table class="sal-table sal-ort"><thead><tr><th>${esc(t.extra.ortCol1)}</th><th class="sal-num">${esc(t.extra.ortCol2)}</th></tr></thead><tbody>${ortRows}</tbody></table></div></div>

<div class="sal-block sal-tool" id="keuzehulp"><div class="sal-head"><span class="eyebrow">${esc(t.tool.eyebrow)}</span><h2>${esc(t.tool.h2)}</h2><p>${esc(t.tool.sub)}</p></div>
<form class="sal-form" id="salform">
${veld('sal-beroep', t.tool.q.beroep, opts('beroep', t.tool.beroep))}
${veld('sal-ervaring', t.tool.q.ervaring, opts('ervaring', t.tool.ervaring))}
${veld('sal-taal', t.tool.q.taal, opts('taal', t.tool.taal))}
${veld('sal-uren', t.tool.q.uren, urenOpts)}
${veld('sal-diensten', t.tool.q.diensten, opts('diensten', t.tool.diensten))}
<div class="sal-acties"><button type="submit" class="btn gold">${esc(t.tool.btn)}</button><button type="reset" class="btn light">${esc(t.tool.reset)}</button></div>
</form>
<div class="sal-uitkomst" id="saluitkomst" hidden></div>
<div id="saldata" hidden>${esc(JSON.stringify(toolData(lang)))}</div>
</div>

<div class="sal-block sal-bronnen"><h3>${esc(t.sources.h)}</h3><ul>${bronnen}</ul><p>${esc(t.sources.note)}</p></div>

<div class="sal-cta"><h2>${esc(t.ctaBlock.h)}</h2><p>${esc(t.ctaBlock.p)}</p><a class="btn gold" href="${esc(t.ctaBlock.href)}">${esc(t.ctaBlock.btn)}</a></div>
</section>
<script src="/js/salaris.js"></script>`;
}

function fmt(n) {
  return Math.round(n).toLocaleString('nl-NL');
}

module.exports = { SALARY, DATA, renderSalary };
