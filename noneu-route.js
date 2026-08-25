// Route buiten de EU (focus: Colombia). Zelfde opbouw als de EU-route, met één verschil
// dat overal doorwerkt: er komt een verblijfs- en werkvergunning bij, en het BIG-register
// beoordeelt een diploma van buiten de EU zwaarder. Daarom staat de doorlooptijd hier als
// een eigen blok op de pagina, met de fases en het aantal maanden erbij.
//
// De scheiding blijft dezelfde als op de EU-route: Honor Care bereidt voor en begeleidt,
// de plaatsing en het dienstverband lopen via het geregistreerde partnerbureau.

const NONEU = {
  nl: {
    navLabel: 'Route buiten de EU',
    title: 'Werken in de Nederlandse zorg — de route van buiten de EU',
    intro: 'Kom je uit Colombia of een ander land buiten de EU? Dan kan het, maar dan duurt het langer. Je hebt een verblijfs- en werkvergunning nodig, en het BIG-register beoordeelt je diploma zwaarder dan dat van een EU-collega. Hieronder staat precies wat er van je gevraagd wordt, wat je van ons krijgt en hoeveel maanden elke fase kost. Wij bouwen deze route op dit moment op.',
    status: 'ROUTE IN OPBOUW',
    switchTxt: 'Heb je de nationaliteit van een EU-land?', switchLink: 'Bekijk dan de EU-route',
    ask: {
      eyebrow: 'WAT WIJ VRAGEN', h2: 'Wat wij van jou vragen',
      sub: 'Deze route vraagt meer geduld dan de EU-route. Wij investeren in jouw opleiding en begeleiding; daar staat een serieuze inzet van jouw kant tegenover.',
      items: [
        ['Een erkend zorgdiploma', 'Je bent gediplomeerd zorgprofessional — bijvoorbeeld enfermero profesional, arts of tandarts — met een afgeronde opleiding en aantoonbare werkervaring.'],
        ['Zelf beginnen met Nederlands', 'Je haalt op eigen kracht niveau A2 bij een taalschool naar keuze, op eigen kosten. Vanaf dat punt nemen wij de opleiding over tot B1 of B2 (NT2). Zonder die eerste stap begint het traject niet.'],
        ['Een lange adem', 'Reken op anderhalf tot tweeënhalf jaar van eerste gesprek tot BIG-registratie, en het kan uitlopen. Je moet dat kunnen volhouden, ook financieel.'],
        ['Volledige en legaliseerbare documenten', 'Diploma’s, cijferlijsten, werkervaring en identiteitsbewijs. Voor een land buiten de EU moeten die vaak gelegaliseerd of voorzien van een apostille worden en beëdigd vertaald.'],
        ['Bereidheid om te verhuizen', 'Je bent bereid daadwerkelijk naar Nederland te verhuizen en hier te wonen en werken. De huisvesting regelen wij samen met je werkgever.'],
        ['Actieve deelname', 'Je volgt de lessen trouw, blijft bereikbaar voor je coördinator en geeft wijzigingen in je situatie direct door. Bij deze route lopen procedures parallel; één stilstaand dossier vertraagt de rest.']
      ]
    },
    give: {
      eyebrow: 'WAT WIJ BIEDEN', h2: 'Wat jij van ons krijgt',
      items: [
        ['Nederlandse taalopleiding', 'Van A2 tot B1/B2 (NT2), inclusief medische terminologie. Online te volgen vanuit Colombia, naast je werk.'],
        ['Begeleiding bij de vakbekwaamheidsverklaring', 'Wij helpen je door de aanvraag bij het BIG-register, waarin je Colombiaanse diploma wordt vergeleken met de Nederlandse opleiding, en bij de voorbereiding op de BI-toets.'],
        ['Hulp bij de vergunningsaanvraag', 'De werkgever of het partnerbureau vraagt de gecombineerde vergunning voor verblijf en arbeid (GVVA) aan. Wij zorgen dat jouw dossier compleet is en houden de termijnen in de gaten.'],
        ['Huisvesting', 'Samen met je werkgever zorgen wij dat er een ingerichte woning klaarstaat bij aankomst, dicht bij je werk. Wij controleren of die aan de norm voldoet en spreken de huur vooraf met je af.'],
        ['Een vast aanspreekpunt', 'Eén coördinator die jouw dossier kent en je begeleidt — ook ná aankomst in Nederland.'],
        ['Kosteloos vanaf A2', 'De basis tot A2 regel je zelf. Alles wat daarna komt — het vervolgtraject, de begeleiding bij erkenning en BIG, je huisvesting en de nazorg — kost jou niets. Aan ons betaal je nooit iets.'],
        ['Werken en leren tegelijk', 'Zodra je in Nederland bent en je Nederlands goed genoeg is voor de dagelijkse praktijk, start je met salaris in een ondersteunende functie in de zorg. Je groeit door naar verpleegkundige zodra je BIG-registratie rond is.']
      ]
    },
    steps: {
      eyebrow: 'HET TRAJECT', h2: 'Stap voor stap, van eerste gesprek tot eerste werkdag',
      list: [
        ['Kennismaking', 'Een open gesprek over je achtergrond, je wensen en wat dit traject van je vraagt. Vrijblijvend, en we zijn eerlijk over de doorlooptijd.'],
        ['Screening en documentcheck', 'We controleren diploma, cijferlijsten en werkervaring en bepalen samen welk beroep en niveau bij je passen. Ook kijken we of je documenten te legaliseren zijn.'],
        ['Taalopleiding Nederlands', 'Je bent zelf begonnen tot A2; vanaf daar nemen wij het over richting B1 of B2, online vanuit Colombia. Dit is de langste fase van het traject.'],
        ['Verklaring van vakbekwaamheid aanvragen', 'Bij het BIG-register vraag je een verklaring van vakbekwaamheid aan. Je diploma wordt vergeleken met de Nederlandse opleiding. Deze aanvraag start parallel aan de taalopleiding.'],
        ['Taalcertificaten indienen', 'Sinds 1 januari 2024 is de AKV-toets vervangen door taalcertificaten. Die lever je aan als onderdeel van de procedure.'],
        ['De BI-toets', 'De vakinhoudelijke toets waarin je laat zien dat je op het eindniveau van de Nederlandse opleiding zit. Hier zit de grootste onzekerheid: de wachtlijst zat in mei 2026 vol.'],
        ['Kennismaking met de werkgever', 'Het geregistreerde partnerbureau brengt je in contact met een passende zorginstelling. Zonder werkgever kan er geen vergunning worden aangevraagd.'],
        ['Vergunning en visum', 'De werkgever vraagt de GVVA aan. De IND beslist in beginsel binnen 90 dagen en vraagt daarbij advies aan het UWV. Daarna volgt je inreisvisum.'],
        ['Verhuizing en start', 'Samen met je werkgever regelen wij de huisvesting en de praktische zaken. Je begint met salaris in een ondersteunende functie.'],
        ['Doorgroei naar de verpleegkundige functie', 'Zodra je BIG-registratie rond is, ga je over naar de verpleegkundige functie bij dezelfde werkgever. Je kent de organisatie dan al.']
      ]
    },
    duur: {
      eyebrow: 'DOORLOOPTIJD', h2: 'Hoe lang duurt elke fase?',
      sub: 'Een eerlijke indicatie. Sommige stappen lopen parallel, dus het totaal is minder dan de som. Wie je een kortere termijn belooft, weet het niet of vertelt het niet.',
      col: ['Fase', 'Duur'],
      rows: [
        ['Kennismaking, screening en documentcheck', '2 tot 6 weken'],
        ['Nederlands van nul tot A2 (doe je zelf)', '4 tot 8 maanden'],
        ['Nederlands van A2 tot B1 of B2 (doen wij)', '8 tot 14 maanden'],
        ['Vakbekwaamheidsverklaring bij het BIG-register', 'loopt parallel, meerdere maanden'],
        ['Wachten op en afleggen van de BI-toets', 'onvoorspelbaar; wachtlijst zat in mei 2026 vol'],
        ['Werkgever vinden en GVVA aanvragen', 'de IND beslist in beginsel binnen 90 dagen'],
        ['Visum, reis en verhuizing', '1 tot 3 maanden'],
        ['Totaal, van eerste gesprek tot BIG-registratie', '18 tot 30 maanden of langer']
      ],
      note: 'Je hoeft niet al die tijd te wachten voordat je begint te verdienen. Zodra je in Nederland bent met een geldige vergunning en je Nederlands toereikend is, werk je met salaris in een ondersteunende functie terwijl de laatste stappen lopen.'
    },
    roles: {
      eyebrow: 'DUIDELIJKE ROLVERDELING', h2: 'Wie doet wat — en waarom dat belangrijk is',
      sub: 'Honor Care International bemiddelt niet zelf en is geen werkgever of uitzendbureau. Wij werven, leiden op en begeleiden; de officiële plaatsing, het dienstverband en de vergunningsaanvraag lopen via ons geregistreerde partnerbureau en de werkgever. Zo blijft het traject in lijn met de Nederlandse wetgeving (Waadi/Wtta en de Wet arbeid vreemdelingen).',
      us: { h: 'Honor Care International doet', items: ['Werving en selectie in Colombia en andere landen buiten de EU', 'Screening, documentcheck en advies over legalisatie', 'Taalopleiding Nederlands (NT2) en medische terminologie', 'Begeleiding bij de vakbekwaamheidsverklaring en de BI-toets', 'Coördinatie en toetsing van de huisvesting, integratie en nazorg', 'Eén vast aanspreekpunt gedurende het hele traject'] },
      partner: { h: 'Het partnerbureau en de werkgever doen', items: ['De bemiddeling en matching met de zorginstelling', 'De aanvraag van de gecombineerde vergunning (GVVA) bij de IND', 'Het arbeidscontract en het werkgeverschap', 'Loon, arbeidsvoorwaarden en werkgeversverplichtingen', 'Naleving van de Waadi/Wtta en de Wet arbeid vreemdelingen'] },
      note: 'Wij vragen jou als kandidaat nooit om geld voor bemiddeling of plaatsing. Word je door iemand anders wél om betaling gevraagd — vraag dan altijd om opheldering. Colombia staat niet op de WHO-lijst van landen waar internationale werving de zorg zou aantasten; uit landen die er wél op staan werven wij niet.'
    },
    cta: { h2: 'Wil je weten of deze route bij jou past?', p: 'Een open gesprek, vrijblijvend, in het Spaans of Nederlands. We zeggen eerlijk of het kansrijk is.', btn1: 'Maak je profiel aan', btn2: 'Plan een gesprek', btn3: 'Bekijk de bedragen' }
  },

  en: {
    navLabel: 'Non-EU route',
    title: 'Working in Dutch healthcare — the route from outside the EU',
    intro: 'Are you from Colombia or another country outside the EU? It is possible, but it takes longer. You need a residence and work permit, and the BIG register assesses your diploma more strictly than that of an EU colleague. Below is exactly what is asked of you, what you get from us and how many months each phase takes. We are building this route right now.',
    status: 'ROUTE IN PREPARATION',
    switchTxt: 'Do you hold the nationality of an EU country?', switchLink: 'Then see the EU route',
    ask: {
      eyebrow: 'WHAT WE ASK', h2: 'What we ask of you',
      sub: 'This route asks for more patience than the EU route. We invest in your training and guidance; in return we expect a serious commitment from you.',
      items: [
        ['A recognised healthcare diploma', 'You are a qualified healthcare professional — for example a registered nurse, doctor or dentist — with a completed qualification and demonstrable work experience.'],
        ['Starting with Dutch yourself', 'You reach level A2 under your own steam, at a language school of your choice and at your own expense. From that point we take over the training up to B1 or B2 (NT2). Without that first step the journey does not begin.'],
        ['Staying power', 'Count on one and a half to two and a half years from first conversation to BIG registration, and it can run over. You have to be able to sustain that, financially as well.'],
        ['Complete and legalisable documents', 'Diplomas, transcripts, work experience and identity documents. For a country outside the EU these often have to be legalised or apostilled and officially translated.'],
        ['Willingness to relocate', 'You are genuinely prepared to move to the Netherlands and live and work here. We arrange the housing together with your employer.'],
        ['Active participation', 'You attend your lessons, stay reachable for your coordinator and report any change in your situation straight away. On this route procedures run in parallel; one stalled file delays the rest.']
      ]
    },
    give: {
      eyebrow: 'WHAT WE OFFER', h2: 'What you get from us',
      items: [
        ['Dutch language training', 'From A2 to B1/B2 (NT2), including medical terminology. Available online from Colombia, alongside your work.'],
        ['Guidance on the statement of professional competence', 'We guide you through the application to the BIG register, in which your Colombian diploma is compared with the Dutch qualification, and through preparing for the BI-toets.'],
        ['Help with the permit application', 'The employer or the partner agency applies for the single permit for residence and work (GVVA). We make sure your file is complete and keep an eye on the deadlines.'],
        ['Housing', 'Together with your employer we make sure a furnished home is ready on arrival, close to your workplace. We check that it meets the standard and agree the rent with you in advance.'],
        ['One point of contact', 'One coordinator who knows your file and guides you — including after your arrival in the Netherlands.'],
        ['Free of charge from A2', 'You arrange the basics up to A2 yourself. Everything after that — the continued training, guidance on recognition and BIG, your housing and aftercare — costs you nothing. You never pay us anything.'],
        ['Working and learning at the same time', 'Once you are in the Netherlands and your Dutch is good enough for daily practice, you start on a salary in a supporting role in healthcare. You move up to nurse once your BIG registration is complete.']
      ]
    },
    steps: {
      eyebrow: 'THE JOURNEY', h2: 'Step by step, from first conversation to first working day',
      list: [
        ['Getting to know each other', 'An open conversation about your background, your wishes and what this route asks of you. No obligation, and we are honest about the timeline.'],
        ['Screening and document check', 'We check your diploma, transcripts and work experience and decide together which profession and level suit you. We also check whether your documents can be legalised.'],
        ['Dutch language training', 'You have started up to A2 yourself; from there we take over towards B1 or B2, online from Colombia. This is the longest phase of the journey.'],
        ['Applying for the statement of professional competence', 'You apply to the BIG register for a statement of professional competence. Your diploma is compared with the Dutch qualification. This application starts in parallel with the language training.'],
        ['Submitting language certificates', 'Since 1 January 2024 the AKV test has been replaced by language certificates. You submit these as part of the procedure.'],
        ['The BI-toets', 'The professional test in which you show you are at the final level of the Dutch qualification. This holds the greatest uncertainty: in May 2026 the waiting list was full.'],
        ['Meeting the employer', 'The registered partner agency puts you in touch with a suitable healthcare institution. Without an employer no permit can be applied for.'],
        ['Permit and visa', 'The employer applies for the GVVA. The IND decides in principle within 90 days and asks the UWV for advice. Your entry visa follows.'],
        ['Relocation and start', 'Together with your employer we arrange the housing and the practical matters. You start on a salary in a supporting role.'],
        ['Moving up to the nursing role', 'Once your BIG registration is complete you move into the nursing role with the same employer. By then you already know the organisation.']
      ]
    },
    duur: {
      eyebrow: 'TIMELINE', h2: 'How long does each phase take?',
      sub: 'An honest indication. Some steps run in parallel, so the total is less than the sum. Anyone promising you a shorter timeline either does not know or is not telling you.',
      col: ['Phase', 'Duration'],
      rows: [
        ['Getting acquainted, screening and document check', '2 to 6 weeks'],
        ['Dutch from zero to A2 (you do this yourself)', '4 to 8 months'],
        ['Dutch from A2 to B1 or B2 (we do this)', '8 to 14 months'],
        ['Statement of professional competence at the BIG register', 'runs in parallel, several months'],
        ['Waiting for and sitting the BI-toets', 'unpredictable; waiting list was full in May 2026'],
        ['Finding an employer and applying for the GVVA', 'the IND decides in principle within 90 days'],
        ['Visa, travel and relocation', '1 to 3 months'],
        ['Total, from first conversation to BIG registration', '18 to 30 months or longer']
      ],
      note: 'You do not have to wait all that time before you start earning. Once you are in the Netherlands with a valid permit and your Dutch is sufficient, you work on a salary in a supporting role while the final steps run.'
    },
    roles: {
      eyebrow: 'CLEAR DIVISION OF ROLES', h2: 'Who does what — and why that matters',
      sub: 'Honor Care International does not place people itself and is not an employer or staffing agency. We recruit, train and guide; the official placement, the employment and the permit application run through our registered partner agency and the employer. That keeps the route in line with Dutch law (Waadi/Wtta and the Foreign Nationals Employment Act).',
      us: { h: 'Honor Care International does', items: ['Recruitment and selection in Colombia and other non-EU countries', 'Screening, document checks and advice on legalisation', 'Dutch language training (NT2) and medical terminology', 'Guidance on the statement of professional competence and the BI-toets', 'Coordinating and checking the housing, integration and aftercare', 'One point of contact throughout the whole journey'] },
      partner: { h: 'The partner agency and the employer do', items: ['The placement and matching with the healthcare institution', 'The application for the single permit (GVVA) at the IND', 'The employment contract and being the employer', 'Pay, terms of employment and employer obligations', 'Compliance with the Waadi/Wtta and the Foreign Nationals Employment Act'] },
      note: 'We never ask you as a candidate for money for placement or mediation. If someone else does ask you to pay, always ask for an explanation. Colombia is not on the WHO list of countries where international recruitment would damage healthcare; we do not recruit from countries that are.'
    },
    cta: { h2: 'Want to know whether this route suits you?', p: 'An open conversation, no obligation, in Spanish or Dutch. We will tell you honestly whether it looks promising.', btn1: 'Create your profile', btn2: 'Book a conversation', btn3: 'See the figures' }
  },

  es: {
    navLabel: 'Ruta fuera de la UE',
    title: 'Trabajar en la sanidad neerlandesa: la ruta desde fuera de la UE',
    intro: '¿Vienes de Colombia o de otro país fuera de la UE? Se puede, pero tarda más. Necesitas un permiso de residencia y trabajo, y el registro BIG evalúa tu título con más exigencia que el de un colega de la UE. Abajo está exactamente lo que se te pide, lo que recibes de nosotros y cuántos meses dura cada fase. Estamos construyendo esta ruta ahora mismo.',
    status: 'RUTA EN CONSTRUCCIÓN',
    switchTxt: '¿Tienes la nacionalidad de un país de la UE?', switchLink: 'Consulta entonces la ruta UE',
    ask: {
      eyebrow: 'LO QUE PEDIMOS', h2: 'Lo que te pedimos',
      sub: 'Esta ruta exige más paciencia que la ruta UE. Nosotros invertimos en tu formación y acompañamiento; a cambio esperamos un compromiso serio por tu parte.',
      items: [
        ['Un título sanitario reconocido', 'Eres profesional sanitario titulado —por ejemplo enfermero profesional, médico u odontólogo— con formación completada y experiencia demostrable.'],
        ['Empezar el neerlandés por tu cuenta', 'Alcanzas el nivel A2 por tus propios medios, en la escuela que elijas y a tu cargo. A partir de ahí asumimos la formación hasta el B1 o B2 (NT2). Sin ese primer paso el proceso no empieza.'],
        ['Aguante', 'Cuenta con año y medio a dos años y medio desde la primera conversación hasta el registro BIG, y puede alargarse. Tienes que poder sostenerlo, también económicamente.'],
        ['Documentos completos y legalizables', 'Títulos, certificados de notas, experiencia laboral y documento de identidad. Para un país fuera de la UE suelen tener que legalizarse o apostillarse y traducirse de forma jurada.'],
        ['Disposición a mudarte', 'Estás realmente dispuesto a mudarte a los Países Bajos y vivir y trabajar aquí. Del alojamiento nos encargamos junto con tu empleador.'],
        ['Participación activa', 'Asistes a las clases, estás localizable para tu coordinador y comunicas de inmediato cualquier cambio en tu situación. En esta ruta los trámites van en paralelo; un expediente parado retrasa el resto.']
      ]
    },
    give: {
      eyebrow: 'LO QUE OFRECEMOS', h2: 'Lo que recibes de nosotros',
      items: [
        ['Formación en neerlandés', 'Del A2 al B1/B2 (NT2), con terminología médica. Se puede seguir en línea desde Colombia, compaginándolo con tu trabajo.'],
        ['Acompañamiento con la declaración de competencia', 'Te guiamos en la solicitud ante el registro BIG, donde se compara tu título colombiano con la formación neerlandesa, y en la preparación de la BI-toets.'],
        ['Ayuda con la solicitud del permiso', 'El empleador o la agencia asociada solicita el permiso único de residencia y trabajo (GVVA). Nosotros nos ocupamos de que tu expediente esté completo y vigilamos los plazos.'],
        ['Alojamiento', 'Junto con tu empleador nos aseguramos de que a tu llegada haya una vivienda amueblada cerca de tu trabajo. Comprobamos que cumple la norma y acordamos el alquiler contigo por adelantado.'],
        ['Un interlocutor fijo', 'Un coordinador que conoce tu expediente y te acompaña, también tras tu llegada a los Países Bajos.'],
        ['Gratuito a partir del A2', 'La base hasta el A2 la organizas tú. Todo lo que viene después —la continuación, el acompañamiento con la homologación y el BIG, tu alojamiento y el seguimiento— no te cuesta nada. A nosotros nunca nos pagas nada.'],
        ['Trabajar y aprender a la vez', 'En cuanto estés en los Países Bajos y tu neerlandés baste para el día a día, empiezas con salario en un puesto de apoyo en sanidad. Pasas a enfermero en cuanto tengas el registro BIG.']
      ]
    },
    steps: {
      eyebrow: 'EL RECORRIDO', h2: 'Paso a paso, de la primera conversación al primer día de trabajo',
      list: [
        ['Primer contacto', 'Una conversación abierta sobre tu perfil, tus deseos y lo que esta ruta te exige. Sin compromiso, y somos honestos con los plazos.'],
        ['Evaluación y revisión de documentos', 'Revisamos título, notas y experiencia y decidimos juntos qué profesión y nivel encajan contigo. También comprobamos si tus documentos se pueden legalizar.'],
        ['Formación en neerlandés', 'Has empezado tú hasta el A2; desde ahí lo asumimos nosotros hacia el B1 o B2, en línea desde Colombia. Es la fase más larga del recorrido.'],
        ['Solicitar la declaración de competencia', 'Solicitas al registro BIG una declaración de competencia profesional. Tu título se compara con la formación neerlandesa. Esta solicitud arranca en paralelo a la formación de idioma.'],
        ['Presentar los certificados de idioma', 'Desde el 1 de enero de 2024 la prueba AKV se sustituyó por certificados de idioma. Los presentas como parte del procedimiento.'],
        ['La BI-toets', 'La prueba profesional en la que demuestras que estás al nivel final de la formación neerlandesa. Aquí está la mayor incertidumbre: en mayo de 2026 la lista de espera estaba llena.'],
        ['Conocer al empleador', 'La agencia asociada registrada te pone en contacto con un centro sanitario adecuado. Sin empleador no se puede solicitar el permiso.'],
        ['Permiso y visado', 'El empleador solicita el GVVA. La IND resuelve en principio en 90 días y pide informe al UWV. Después llega tu visado de entrada.'],
        ['Mudanza e incorporación', 'Junto con tu empleador organizamos el alojamiento y los trámites prácticos. Empiezas con salario en un puesto de apoyo.'],
        ['Promoción al puesto de enfermero', 'En cuanto tengas el registro BIG pasas al puesto de enfermero con el mismo empleador. Para entonces ya conoces la organización.']
      ]
    },
    duur: {
      eyebrow: 'PLAZOS', h2: '¿Cuánto dura cada fase?',
      sub: 'Una indicación honesta. Algunos pasos van en paralelo, así que el total es menor que la suma. Quien te prometa un plazo más corto, o no lo sabe o no te lo está contando.',
      col: ['Fase', 'Duración'],
      rows: [
        ['Primer contacto, evaluación y revisión de documentos', 'de 2 a 6 semanas'],
        ['Neerlandés de cero al A2 (lo haces tú)', 'de 4 a 8 meses'],
        ['Neerlandés del A2 al B1 o B2 (lo hacemos nosotros)', 'de 8 a 14 meses'],
        ['Declaración de competencia ante el registro BIG', 'en paralelo, varios meses'],
        ['Espera y realización de la BI-toets', 'impredecible; la lista estaba llena en mayo de 2026'],
        ['Encontrar empleador y solicitar el GVVA', 'la IND resuelve en principio en 90 días'],
        ['Visado, viaje y mudanza', 'de 1 a 3 meses'],
        ['Total, de la primera conversación al registro BIG', 'de 18 a 30 meses o más']
      ],
      note: 'No tienes que esperar todo ese tiempo para empezar a ganar. En cuanto estés en los Países Bajos con un permiso válido y tu neerlandés sea suficiente, trabajas con salario en un puesto de apoyo mientras se completan los últimos pasos.'
    },
    roles: {
      eyebrow: 'REPARTO DE FUNCIONES CLARO', h2: 'Quién hace qué, y por qué importa',
      sub: 'Honor Care International no realiza la intermediación ni es empleador ni empresa de trabajo temporal. Nosotros captamos, formamos y acompañamos; la colocación oficial, el empleo y la solicitud del permiso van a través de nuestra agencia asociada registrada y del empleador. Así el proceso se mantiene conforme a la legislación neerlandesa (Waadi/Wtta y la Ley de empleo de extranjeros).',
      us: { h: 'Honor Care International hace', items: ['Captación y selección en Colombia y otros países fuera de la UE', 'Evaluación, revisión de documentos y asesoramiento sobre legalización', 'Formación en neerlandés (NT2) y terminología médica', 'Acompañamiento con la declaración de competencia y la BI-toets', 'Coordinación y verificación del alojamiento, integración y seguimiento', 'Un interlocutor fijo durante todo el recorrido'] },
      partner: { h: 'La agencia asociada y el empleador hacen', items: ['La intermediación y el emparejamiento con el centro sanitario', 'La solicitud del permiso único (GVVA) ante la IND', 'El contrato de trabajo y la condición de empleador', 'El salario, las condiciones y las obligaciones del empleador', 'El cumplimiento de la Waadi/Wtta y de la Ley de empleo de extranjeros'] },
      note: 'Nunca te pedimos dinero como candidato por la intermediación o la colocación. Si alguien te pide un pago, pide siempre explicaciones. Colombia no está en la lista de la OMS de países donde la captación internacional dañaría la sanidad; de los países que sí están no captamos.'
    },
    cta: { h2: '¿Quieres saber si esta ruta encaja contigo?', p: 'Una conversación abierta y sin compromiso, en español o neerlandés. Te decimos con honestidad si es viable.', btn1: 'Crea tu perfil', btn2: 'Reserva una conversación', btn3: 'Ver las cifras' }
  },

  pl: {
    navLabel: 'Ścieżka spoza UE',
    title: 'Praca w holenderskiej opiece zdrowotnej — ścieżka spoza UE',
    intro: 'Pochodzisz z Kolumbii lub innego kraju spoza UE? To możliwe, ale trwa dłużej. Potrzebujesz zezwolenia na pobyt i pracę, a rejestr BIG ocenia Twój dyplom surowiej niż dyplom kolegi z UE. Poniżej znajdziesz dokładnie to, czego od Ciebie oczekujemy, co dostajesz od nas i ile miesięcy trwa każda faza. Tę ścieżkę budujemy właśnie teraz.',
    status: 'ŚCIEŻKA W BUDOWIE',
    switchTxt: 'Masz obywatelstwo kraju UE?', switchLink: 'Zobacz wtedy ścieżkę UE',
    ask: {
      eyebrow: 'CZEGO OCZEKUJEMY', h2: 'Czego oczekujemy od Ciebie',
      sub: 'Ta ścieżka wymaga więcej cierpliwości niż ścieżka UE. Inwestujemy w Twoje szkolenie i opiekę; w zamian oczekujemy poważnego zaangażowania.',
      items: [
        ['Uznany dyplom medyczny', 'Jesteś dyplomowanym pracownikiem opieki — na przykład pielęgniarką dyplomowaną, lekarzem lub dentystą — z ukończonym kształceniem i udokumentowanym doświadczeniem.'],
        ['Samodzielny start z niderlandzkim', 'Poziom A2 osiągasz własnymi siłami, w wybranej szkole i na własny koszt. Od tego momentu przejmujemy naukę do B1 lub B2 (NT2). Bez tego kroku ścieżka się nie zaczyna.'],
        ['Wytrwałość', 'Licz się z półtora do dwóch i pół roku od pierwszej rozmowy do rejestracji BIG, a może się przeciągnąć. Musisz to wytrzymać, także finansowo.'],
        ['Komplet dokumentów do legalizacji', 'Dyplomy, wykazy ocen, doświadczenie i dokument tożsamości. Dla kraju spoza UE zwykle wymagają legalizacji lub apostille oraz tłumaczenia przysięgłego.'],
        ['Gotowość do przeprowadzki', 'Jesteś realnie gotowy przeprowadzić się do Holandii oraz tu mieszkać i pracować. Zakwaterowanie organizujemy razem z Twoim pracodawcą.'],
        ['Aktywny udział', 'Chodzisz na zajęcia, jesteś dostępny dla koordynatora i od razu zgłaszasz zmiany w swojej sytuacji. Na tej ścieżce procedury biegną równolegle; jedna zatrzymana sprawa opóźnia resztę.']
      ]
    },
    give: {
      eyebrow: 'CO OFERUJEMY', h2: 'Co dostajesz od nas',
      items: [
        ['Kurs niderlandzkiego', 'Od A2 do B1/B2 (NT2) wraz z terminologią medyczną. Online z Kolumbii, obok Twojej pracy.'],
        ['Wsparcie przy zaświadczeniu o kwalifikacjach', 'Prowadzimy Cię przez wniosek do rejestru BIG, w którym Twój kolumbijski dyplom porównuje się z holenderskim kształceniem, oraz przy przygotowaniu do BI-toets.'],
        ['Pomoc przy wniosku o zezwolenie', 'Pracodawca lub biuro partnerskie występuje o połączone zezwolenie na pobyt i pracę (GVVA). My dbamy o kompletność Twojej dokumentacji i pilnujemy terminów.'],
        ['Zakwaterowanie', 'Razem z Twoim pracodawcą dbamy o to, by na przyjazd czekało umeblowane mieszkanie blisko pracy. Sprawdzamy, czy spełnia normę, i z góry ustalamy z Tobą czynsz.'],
        ['Stały punkt kontaktu', 'Jeden koordynator, który zna Twoją sprawę i wspiera Cię — również po przyjeździe do Holandii.'],
        ['Bezpłatnie od poziomu A2', 'Podstawę do A2 organizujesz sam. Wszystko, co potem — dalsza nauka, wsparcie przy uznaniu dyplomu i BIG, zakwaterowanie i opieka — nic Cię nie kosztuje. Nam nigdy nic nie płacisz.'],
        ['Praca i nauka jednocześnie', 'Gdy będziesz w Holandii, a Twój niderlandzki wystarczy do codziennej praktyki, zaczynasz z wynagrodzeniem na stanowisku wspierającym. Awansujesz na pielęgniarkę po rejestracji BIG.']
      ]
    },
    steps: {
      eyebrow: 'ŚCIEŻKA', h2: 'Krok po kroku, od pierwszej rozmowy do pierwszego dnia pracy',
      list: [
        ['Poznanie się', 'Otwarta rozmowa o Twoim doświadczeniu, oczekiwaniach i o tym, czego ta ścieżka wymaga. Bez zobowiązań i uczciwie o terminach.'],
        ['Weryfikacja i sprawdzenie dokumentów', 'Sprawdzamy dyplom, wykazy ocen i doświadczenie oraz wspólnie ustalamy zawód i poziom. Sprawdzamy też, czy dokumenty da się zalegalizować.'],
        ['Kurs niderlandzkiego', 'Do A2 doszedłeś sam; stamtąd przejmujemy naukę do B1 lub B2, online z Kolumbii. To najdłuższa faza ścieżki.'],
        ['Wniosek o zaświadczenie o kwalifikacjach', 'W rejestrze BIG składasz wniosek o zaświadczenie o kwalifikacjach. Twój dyplom porównuje się z holenderskim kształceniem. Wniosek startuje równolegle z nauką języka.'],
        ['Złożenie certyfikatów językowych', 'Od 1 stycznia 2024 egzamin AKV zastąpiły certyfikaty językowe. Składasz je w ramach procedury.'],
        ['BI-toets', 'Egzamin zawodowy, w którym wykazujesz, że jesteś na poziomie końcowym holenderskiego kształcenia. Tu jest największa niepewność: w maju 2026 lista oczekujących była pełna.'],
        ['Poznanie pracodawcy', 'Zarejestrowane biuro partnerskie kontaktuje Cię z odpowiednią placówką. Bez pracodawcy nie można wystąpić o zezwolenie.'],
        ['Zezwolenie i wiza', 'Pracodawca występuje o GVVA. IND co do zasady decyduje w ciągu 90 dni i zasięga opinii UWV. Potem otrzymujesz wizę wjazdową.'],
        ['Przeprowadzka i start', 'Razem z Twoim pracodawcą organizujemy zakwaterowanie i sprawy praktyczne. Zaczynasz z wynagrodzeniem na stanowisku wspierającym.'],
        ['Awans na stanowisko pielęgniarki', 'Po uzyskaniu rejestracji BIG przechodzisz na stanowisko pielęgniarki u tego samego pracodawcy. Znasz już wtedy organizację.']
      ]
    },
    duur: {
      eyebrow: 'CZAS TRWANIA', h2: 'Ile trwa każda faza?',
      sub: 'Uczciwa wskazówka. Część kroków biegnie równolegle, więc suma jest mniejsza niż dodane fazy. Kto obiecuje krótszy termin, albo tego nie wie, albo Ci tego nie mówi.',
      col: ['Faza', 'Czas'],
      rows: [
        ['Poznanie się, weryfikacja i sprawdzenie dokumentów', 'od 2 do 6 tygodni'],
        ['Niderlandzki od zera do A2 (robisz sam)', 'od 4 do 8 miesięcy'],
        ['Niderlandzki od A2 do B1 lub B2 (robimy my)', 'od 8 do 14 miesięcy'],
        ['Zaświadczenie o kwalifikacjach w rejestrze BIG', 'równolegle, kilka miesięcy'],
        ['Oczekiwanie na BI-toets i zdawanie egzaminu', 'nieprzewidywalne; w maju 2026 lista była pełna'],
        ['Znalezienie pracodawcy i wniosek o GVVA', 'IND co do zasady decyduje w 90 dni'],
        ['Wiza, podróż i przeprowadzka', 'od 1 do 3 miesięcy'],
        ['Łącznie, od pierwszej rozmowy do rejestracji BIG', 'od 18 do 30 miesięcy lub dłużej']
      ],
      note: 'Nie musisz czekać przez cały ten czas, zanim zaczniesz zarabiać. Gdy będziesz w Holandii z ważnym zezwoleniem, a Twój niderlandzki będzie wystarczający, pracujesz z wynagrodzeniem na stanowisku wspierającym, podczas gdy ostatnie kroki jeszcze trwają.'
    },
    roles: {
      eyebrow: 'JASNY PODZIAŁ RÓL', h2: 'Kto co robi — i dlaczego to ważne',
      sub: 'Honor Care International nie prowadzi pośrednictwa i nie jest pracodawcą ani agencją pracy tymczasowej. My rekrutujemy, szkolimy i wspieramy; oficjalne zatrudnienie i wniosek o zezwolenie prowadzi nasze zarejestrowane biuro partnerskie oraz pracodawca. Dzięki temu ścieżka pozostaje zgodna z holenderskim prawem (Waadi/Wtta oraz ustawa o zatrudnianiu cudzoziemców).',
      us: { h: 'Honor Care International robi', items: ['Rekrutację i selekcję w Kolumbii i innych krajach spoza UE', 'Weryfikację, sprawdzenie dokumentów i doradztwo przy legalizacji', 'Kurs niderlandzkiego (NT2) i terminologii medycznej', 'Wsparcie przy zaświadczeniu o kwalifikacjach i BI-toets', 'Koordynację i weryfikację zakwaterowania, integrację i opiekę', 'Jeden stały punkt kontaktu przez całą ścieżkę'] },
      partner: { h: 'Biuro partnerskie i pracodawca robią', items: ['Pośrednictwo i dopasowanie do placówki', 'Wniosek o połączone zezwolenie (GVVA) do IND', 'Umowę o pracę i rolę pracodawcy', 'Wynagrodzenie, warunki pracy i obowiązki pracodawcy', 'Przestrzeganie Waadi/Wtta i ustawy o zatrudnianiu cudzoziemców'] },
      note: 'Nigdy nie żądamy od Ciebie pieniędzy za pośrednictwo ani zatrudnienie. Jeśli ktoś inny prosi Cię o zapłatę, zawsze żądaj wyjaśnień. Kolumbii nie ma na liście WHO krajów, w których międzynarodowa rekrutacja szkodziłaby opiece; z krajów, które są na tej liście, nie rekrutujemy.'
    },
    cta: { h2: 'Chcesz wiedzieć, czy ta ścieżka jest dla Ciebie?', p: 'Otwarta, niezobowiązująca rozmowa po hiszpańsku lub niderlandzku. Uczciwie powiemy, czy jest szansa.', btn1: 'Załóż profil', btn2: 'Umów rozmowę', btn3: 'Zobacz kwoty' }
  }
};

function renderNonEuRoute(lang, h) {
  const e = NONEU[lang] || NONEU.nl;
  const esc = h.esc, icon = h.icon;
  const check = '<path d="M20 6L9 17l-5-5"/>';
  const item = (cls, badge, t, d) => `<article class="eur-item ${cls}">${badge}<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></article>`;
  const ask = e.ask.items.map((it, i) => item('ask', `<span class="eur-n">${i + 1}</span>`, it[0], it[1])).join('');
  const give = e.give.items.map(it => item('give', `<span class="eur-ic">${icon(check)}</span>`, it[0], it[1])).join('');
  const steps = e.steps.list.map(st => `<li><h3>${esc(st[0])}</h3><p>${esc(st[1])}</p></li>`).join('');
  const roleList = arr => arr.map(x => `<li>${esc(x)}</li>`).join('');
  const duurRijen = e.duur.rows.map((r, i) => {
    const laatste = i === e.duur.rows.length - 1;
    return `<tr${laatste ? ' class="sal-hi"' : ''}><td>${esc(r[0])}</td><td class="sal-num">${esc(r[1])}</td></tr>`;
  }).join('');

  return `<section class="page-hero ph-noneu"><div class="page-hero-inner"><h1>${esc(e.title)}</h1><p>${esc(e.intro)}</p></div></section>
<section class="page has-hero">
<p class="eur-switch"><span class="sal-status">${esc(e.status)}</span> ${esc(e.switchTxt)} <a href="/eu-route">${esc(e.switchLink)} &rarr;</a></p>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.ask.eyebrow)}</span><h2>${esc(e.ask.h2)}</h2><p>${esc(e.ask.sub)}</p></div><div class="eur-grid">${ask}</div></div>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.give.eyebrow)}</span><h2>${esc(e.give.h2)}</h2></div><div class="eur-grid">${give}</div></div>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.steps.eyebrow)}</span><h2>${esc(e.steps.h2)}</h2></div><ol class="eur-timeline">${steps}</ol></div>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.duur.eyebrow)}</span><h2>${esc(e.duur.h2)}</h2><p>${esc(e.duur.sub)}</p></div>
<div class="sal-tablewrap"><table class="sal-table sal-ort"><thead><tr><th>${esc(e.duur.col[0])}</th><th class="sal-num">${esc(e.duur.col[1])}</th></tr></thead><tbody>${duurRijen}</tbody></table></div>
<p class="sal-note">${esc(e.duur.note)}</p></div>
<div class="eur-roles"><div class="eur-head"><span class="eyebrow">${esc(e.roles.eyebrow)}</span><h2>${esc(e.roles.h2)}</h2><p>${esc(e.roles.sub)}</p></div>
<div class="eur-roles-grid"><article class="eur-role us"><h3>${esc(e.roles.us.h)}</h3><ul>${roleList(e.roles.us.items)}</ul></article><article class="eur-role partner"><h3>${esc(e.roles.partner.h)}</h3><ul>${roleList(e.roles.partner.items)}</ul></article></div>
<p class="eur-note">${esc(e.roles.note)}</p></div>
<div class="eur-cta"><h2>${esc(e.cta.h2)}</h2><p>${esc(e.cta.p)}</p><div class="eur-cta-btns"><a class="btn gold" href="/portal">${esc(e.cta.btn1)}</a><a class="btn light" href="/plan">${esc(e.cta.btn2)}</a><a class="btn light" href="/salaris#colombia">${esc(e.cta.btn3)}</a></div></div>
</section>`;
}

module.exports = { NONEU, renderNonEuRoute };
