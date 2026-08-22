// Aanvullingen op de inhoudspagina's: veelgestelde vragen en een duidelijke vervolgstap.
// Bewust kort en eerlijk gehouden — liever een onprettig antwoord vooraf dan een
// teleurstelling achteraf. De huisvestingspagina sluit aan op de cijfers op /poland.

const EXTRAS = {
  nl: {
    faqTitle: 'Veelgestelde vragen',
    ctaLabels: { plan: 'PLAN EEN GESPREK', ask: 'STEL EEN VRAAG', route: 'BEKIJK DE EU-ROUTE', numbers: 'BEKIJK DE CIJFERS', account: 'MAAK JE PROFIEL AAN' },
    cta: {
      about: ['Meer weten over hoe wij werken?', 'We leggen graag uit hoe het traject loopt en waar onze rol ophoudt.'],
      institutions: ['Personeelsvraag bespreken?', 'Vertel ons welke functies openstaan; wij kijken of internationale werving past bij uw situatie.'],
      candidates: ['Klaar voor de eerste stap?', 'Maak een profiel aan, dan weten wij wie je bent en wat je zoekt. Je hoort van ons zodra er een passende functie is.'],
      academy: ['Wil je weten waar je nu staat?', 'Maak een profiel aan met je huidige taalniveau; dan bepalen we samen wat er nog nodig is.'],
      housing: ['Vragen over wonen?', 'Stel ze gerust — we vertellen liever vooraf hoe het zit.']
    },
    faq: {
      about: [
        ['Zijn jullie een uitzendbureau?', 'Nee. Wij werven, leiden op en begeleiden. De officiële bemiddeling, het contract en het werkgeverschap lopen via ons geregistreerde partnerbureau. Die scheiding is wettelijk vereist en houden wij strikt aan.'],
        ['Uit welke landen werven jullie?', 'Op dit moment richten wij ons vooral op Spanje en andere EU-landen, omdat daar geen visum of tewerkstellingsvergunning nodig is. Daarnaast werven wij in Colombia; dat traject duurt langer.'],
        ['Wat kost het een kandidaat?', 'Niets. Onze voorbereiding, taalopleiding en begeleiding zijn voor kandidaten kosteloos. Wie geld vraagt in ruil voor werk in Nederland, deugt niet.'],
        ['Hoe waarborgen jullie eerlijke werving?', 'Wij volgen de WHO-gedragscode voor internationale werving van zorgpersoneel, werken met transparante afspraken en leggen vooraf vast wat je huur en arbeidsvoorwaarden worden.']
      ],
      institutions: [
        ['Hoe snel kan een kandidaat starten?', 'Sneller dan u gewend bent, omdat wij in twee fasen werken. Zodra iemand genoeg Nederlands spreekt voor de dagelijkse praktijk start hij bij u in een ondersteunende functie — u heeft dan al extra handen. De doorgroei naar de verpleegkundige functie volgt zodra het taalniveau en de BIG-registratie rond zijn. Bij EU-kandidaten vervalt bovendien de visumprocedure, wat maanden scheelt.'],
        ['Wie is juridisch de werkgever?', 'Ons geregistreerde partnerbureau. Zij sluiten het contract, betalen het loon en dragen de werkgeversverplichtingen. U heeft daarmee één aanspreekpunt dat voldoet aan de Waadi/Wtta.'],
        ['Welk taalniveau hebben kandidaten bij start?', 'Wij leiden op naar minimaal B1, en naar B2 waar de functie daarom vraagt. Aantoonbare taalbeheersing is bovendien een voorwaarde voor BIG-registratie.'],
        ['Wat als een kandidaat toch niet past?', 'Dat bespreken we open en tijdig. Wij hebben er niets aan om iemand te plaatsen die niet op zijn plek is — begeleiding na aankomst is juist bedoeld om dat te voorkomen.']
      ],
      candidates: [
        ['Wat kost dit mij?', 'Niets. Onze begeleiding en opleiding zijn voor jou kosteloos. Je betaalt wel gewoon huur zodra je hier woont; dat bedrag spreken we vooraf met je af.'],
        ['Hoe lang duurt het hele traject?', 'De taal bepaalt het tempo. Reken op enkele maanden intensief studeren naar B1/B2, met de diploma-erkenning die daarnaast loopt. Wij zijn eerlijk over de planning zodra we je niveau kennen.'],
        ['Moet ik al Nederlands spreken?', 'Nee, je kunt op nul beginnen. Maar je moet wel bereid zijn er stevig voor te gaan zitten: zonder aantoonbaar Nederlands is BIG-registratie niet mogelijk.'],
        ['Kan mijn gezin meekomen?', 'Als EU-burger heb je vrij verkeer, dus je gezin mag meeverhuizen. Houd er rekening mee dat passende gezinswoningen schaars zijn; bespreek dit daarom vroeg in het traject.'],
        ['Kan ik werken terwijl ik de taal leer?', 'Ja, en dat is juist de bedoeling. Zodra je Nederlands voldoende is voor de dagelijkse praktijk, start je in een ondersteunende functie in de zorg — met salaris. Je mag dan nog niet als verpleegkundige werken; dat mag pas na je BIG-registratie. Maar je verdient wel, je leert de taal veel sneller en je kent je team al voordat je doorgroeit.'],
        ['Wie wordt mijn werkgever?', 'Niet Honor Care, maar ons geregistreerde partnerbureau. Zij sluiten het arbeidscontract met je en betalen je loon. Wij blijven je begeleiden.']
      ],
      academy: [
        ['Wat is NT2 precies?', 'Het Staatsexamen Nederlands als tweede taal. Er zijn twee programma’s: Programma I leidt naar niveau B1 (werk of opleiding op mbo-niveau) en Programma II naar B2 (hbo- of universitair niveau). Beide bestaan uit vier onderdelen: lezen, luisteren, spreken en schrijven.'],
        ['Welk niveau heb ik nodig?', 'Voor de meeste zorgfuncties minimaal B1; voor functies op hbo-niveau vaak B2. Aantoonbare taalbeheersing hoort bij elke route naar BIG-registratie.'],
        ['Kan ik vanuit Spanje leren?', 'Ja. De lessen zijn online te volgen naast je huidige werk. Dat is ook precies de bedoeling: je begint met de taal vóórdat je verhuist.'],
        ['Wat kost de opleiding mij?', 'Niets. De taalopleiding en de voorbereiding zijn onderdeel van onze begeleiding en voor jou als kandidaat kosteloos.']
      ],
      housing: [
        ['Krijg ik een eigen woning?', 'In het begin meestal niet. Je start vaak in gedeelde huisvesting met collega’s — dat drukt de kosten en je staat er niet alleen voor. Na je inwerkperiode helpen we je op weg naar eigen woonruimte.'],
        ['Wat betaal ik aan huur?', 'Dat spreken we vooraf met je af, vóórdat je naar Nederland komt. Geen verrassingen achteraf.'],
        ['Kan ik zelf iets huren op de vrije markt?', 'Mag altijd, maar wees realistisch: een vrijesectorwoning kost gemiddeld ruim € 1.800 kale huur per maand en op één advertentie reageren tientallen mensen. Voor een startsalaris in de zorg is dat alleen niet op te brengen.'],
        ['Kan ik me inschrijven voor sociale huur?', 'Ja, en doe dat meteen bij aankomst. Maar reken er niet op voor de korte termijn: in veel gemeenten is de wachttijd zeven tot elf jaar.'],
        ['Voldoet de huisvesting aan normen?', 'Ja. Minimaal 12 m² woonoppervlak per persoon, met eisen aan privacy, sanitair, hygiëne en brandveiligheid.']
      ]
    },
    housingNote: 'Wonen is in Nederland een serieus punt. Wij regelen je huisvesting, maar we vinden het belangrijk dat je vooraf weet hoe de woningmarkt eruitziet.',
    housingLink: 'Bekijk de cijfers over de Nederlandse woningmarkt'
  },
  en: {
    faqTitle: 'Frequently asked questions',
    ctaLabels: { plan: 'BOOK A MEETING', ask: 'ASK A QUESTION', route: 'SEE THE EU ROUTE', numbers: 'SEE THE FIGURES', account: 'CREATE YOUR PROFILE' },
    cta: {
      about: ['Want to know how we work?', 'We are happy to explain how the journey runs and where our role ends.'],
      institutions: ['Discuss your staffing needs?', 'Tell us which roles are open; we will see whether international recruitment fits your situation.'],
      candidates: ['Ready for the first step?', 'Create a profile so we know who you are and what you are looking for. You will hear from us as soon as a suitable position comes up.'],
      academy: ['Want to know where you stand?', 'Create a profile with your current language level; together we determine what is still needed.'],
      housing: ['Questions about housing?', 'Ask away — we would rather explain it beforehand.']
    },
    faq: {
      about: [
        ['Are you a staffing agency?', 'No. We recruit, train and guide. The official placement, the contract and the employer role run through our registered partner agency. That separation is required by law and we keep to it strictly.'],
        ['Which countries do you recruit from?', 'Right now we focus mainly on Spain and other EU countries, because no visa or work permit is needed there. We also recruit in Colombia; that route takes longer.'],
        ['What does it cost a candidate?', 'Nothing. Our preparation, language training and guidance are free of charge for candidates. Anyone asking for money in exchange for work in the Netherlands is not to be trusted.'],
        ['How do you ensure ethical recruitment?', 'We follow the WHO code of practice on international recruitment of health personnel, work with transparent agreements and set out your rent and terms of employment in advance.']
      ],
      institutions: [
        ['How quickly can a candidate start?', 'Faster than you are used to, because we work in two phases. As soon as someone speaks enough Dutch for daily practice they start with you in a supporting role — so you already gain extra hands. The move up to the nursing role follows once the language level and BIG registration are in place. For EU candidates the visa procedure also disappears, saving months.'],
        ['Who is the legal employer?', 'Our registered partner agency. They sign the contract, pay the salary and carry the employer obligations, giving you one point of contact that complies with the Waadi/Wtta.'],
        ['What language level do candidates have on arrival?', 'We train to at least B1, and to B2 where the role requires it. Demonstrable language proficiency is also a condition for BIG registration.'],
        ['What if a candidate turns out not to fit?', 'We discuss that openly and early. Placing someone who is not in the right place helps nobody — post-arrival guidance exists precisely to prevent it.']
      ],
      candidates: [
        ['What does this cost me?', 'Nothing. Our guidance and training are free for you. You do of course pay rent once you live here; we agree that amount with you in advance.'],
        ['How long does the whole journey take?', 'The language sets the pace. Expect several months of intensive study towards B1/B2, with diploma recognition running alongside. We are honest about the planning as soon as we know your level.'],
        ['Do I need to speak Dutch already?', 'No, you can start from zero. But you must be willing to work hard at it: without demonstrable Dutch, BIG registration is not possible.'],
        ['Can my family come along?', 'As an EU citizen you have free movement, so your family may move with you. Do bear in mind that suitable family homes are scarce, so raise this early in the process.'],
        ['Can I work while I learn the language?', 'Yes, and that is exactly the idea. As soon as your Dutch is good enough for daily practice you start in a supporting role in healthcare — with a salary. You may not yet work as a nurse; that is only allowed after your BIG registration. But you do earn, you learn the language far faster and you already know your team before you move up.'],
        ['Who will be my employer?', 'Not Honor Care, but our registered partner agency. They sign your employment contract and pay your salary. We continue to support you.']
      ],
      academy: [
        ['What exactly is NT2?', 'The state examination in Dutch as a second language. There are two programmes: Programme I leads to level B1 (work or study at vocational level) and Programme II to B2 (higher professional or university level). Both consist of four parts: reading, listening, speaking and writing.'],
        ['Which level do I need?', 'For most care roles at least B1; for roles at higher professional level often B2. Demonstrable language proficiency is part of every route to BIG registration.'],
        ['Can I study from Spain?', 'Yes. Lessons are available online alongside your current job. That is exactly the intention: you start with the language before you move.'],
        ['What does the training cost me?', 'Nothing. The language training and preparation are part of our guidance and free of charge for you as a candidate.']
      ],
      housing: [
        ['Will I get my own home?', 'Usually not at first. You often start in shared housing with colleagues — it keeps costs down and you are not on your own. After your settling-in period we help you towards your own place.'],
        ['What will I pay in rent?', 'We agree that with you in advance, before you travel to the Netherlands. No surprises afterwards.'],
        ['Can I rent something myself on the open market?', 'You always may, but be realistic: a private-sector home costs on average over € 1,800 base rent per month and dozens of people respond to a single listing. On a starting salary in care that is not affordable on your own.'],
        ['Can I register for social housing?', 'Yes, and do so as soon as you arrive. But do not count on it in the short term: in many municipalities the waiting time is seven to eleven years.'],
        ['Does the housing meet standards?', 'Yes. At least 12 m² of living space per person, with requirements for privacy, sanitation, hygiene and fire safety.']
      ]
    },
    housingNote: 'Housing is a serious issue in the Netherlands. We arrange yours, but we think it matters that you know beforehand what the housing market looks like.',
    housingLink: 'See the figures on the Dutch housing market'
  },
  es: {
    faqTitle: 'Preguntas frecuentes',
    ctaLabels: { plan: 'RESERVAR UNA REUNIÓN', ask: 'HACER UNA PREGUNTA', route: 'VER LA RUTA UE', numbers: 'VER LAS CIFRAS', account: 'CREA TU PERFIL' },
    cta: {
      about: ['¿Quieres saber cómo trabajamos?', 'Te explicamos con gusto cómo funciona el recorrido y dónde termina nuestro papel.'],
      institutions: ['¿Hablamos de sus necesidades de personal?', 'Cuéntenos qué puestos tiene abiertos y veremos si la captación internacional encaja.'],
      candidates: ['¿Listo para el primer paso?', 'Crea un perfil para que sepamos quién eres y qué buscas. Te avisaremos en cuanto surja un puesto adecuado.'],
      academy: ['¿Quieres saber en qué punto estás?', 'Crea un perfil con tu nivel actual; juntos determinamos lo que aún hace falta.'],
      housing: ['¿Dudas sobre la vivienda?', 'Pregunta sin problema: preferimos explicarlo antes.']
    },
    faq: {
      about: [
        ['¿Sois una empresa de trabajo temporal?', 'No. Nosotros captamos, formamos y acompañamos. La intermediación oficial, el contrato y la condición de empleador corresponden a nuestra agencia asociada registrada. Esa separación la exige la ley y la respetamos estrictamente.'],
        ['¿En qué países captáis?', 'Ahora nos centramos sobre todo en España y otros países de la UE, porque allí no hace falta visado ni permiso de trabajo. También captamos en Colombia; ese recorrido es más largo.'],
        ['¿Cuánto le cuesta al candidato?', 'Nada. Nuestra preparación, formación lingüística y acompañamiento son gratuitos para los candidatos. Quien pide dinero a cambio de trabajo en los Países Bajos no es de fiar.'],
        ['¿Cómo garantizáis una captación ética?', 'Seguimos el código de la OMS sobre contratación internacional de personal sanitario, trabajamos con acuerdos transparentes y fijamos de antemano tu alquiler y tus condiciones laborales.']
      ],
      institutions: [
        ['¿Con qué rapidez puede incorporarse un candidato?', 'Antes de lo habitual, porque trabajamos en dos fases. En cuanto la persona domina el neerlandés suficiente para el día a día, empieza con usted en un puesto de apoyo: ya gana manos. El paso al puesto de enfermero llega cuando el nivel de idioma y el registro BIG están listos. Con candidatos de la UE, además, desaparece el visado, lo que ahorra meses.'],
        ['¿Quién es el empleador legal?', 'Nuestra agencia asociada registrada. Firma el contrato, paga el salario y asume las obligaciones del empleador, de modo que usted tiene un único interlocutor conforme a la Waadi/Wtta.'],
        ['¿Con qué nivel de idioma llegan los candidatos?', 'Formamos hasta B1 como mínimo, y hasta B2 cuando el puesto lo exige. Además, acreditar el idioma es condición para el registro BIG.'],
        ['¿Y si un candidato no encaja?', 'Lo hablamos abiertamente y a tiempo. Colocar a alguien que no está en su sitio no beneficia a nadie; el acompañamiento tras la llegada existe justamente para evitarlo.']
      ],
      candidates: [
        ['¿Cuánto me cuesta?', 'Nada. Nuestro acompañamiento y formación son gratuitos para ti. Sí pagarás alquiler cuando vivas aquí; ese importe lo acordamos contigo de antemano.'],
        ['¿Cuánto dura todo el recorrido?', 'El idioma marca el ritmo. Cuenta con varios meses de estudio intensivo hasta B1/B2, con la homologación en paralelo. Somos honestos con la planificación en cuanto conocemos tu nivel.'],
        ['¿Tengo que hablar ya neerlandés?', 'No, puedes empezar de cero. Pero debes estar dispuesto a dedicarle esfuerzo: sin neerlandés acreditado no es posible el registro BIG.'],
        ['¿Puede venir mi familia?', 'Como ciudadano de la UE tienes libre circulación, así que tu familia puede mudarse contigo. Ten en cuenta que las viviendas familiares adecuadas son escasas: coméntalo pronto en el proceso.'],
        ['¿Puedo trabajar mientras aprendo el idioma?', 'Sí, y esa es justamente la idea. En cuanto tu neerlandés basta para el día a día, empiezas en un puesto de apoyo en sanidad, con salario. Todavía no puedes ejercer como enfermero: eso solo es posible tras el registro BIG. Pero cobras, aprendes el idioma mucho más rápido y ya conoces a tu equipo antes de promocionar.'],
        ['¿Quién será mi empleador?', 'No Honor Care, sino nuestra agencia asociada registrada. Ella firma tu contrato y paga tu salario. Nosotros seguimos acompañándote.']
      ],
      academy: [
        ['¿Qué es exactamente el NT2?', 'El examen estatal de neerlandés como segunda lengua. Hay dos programas: el Programa I lleva al nivel B1 (trabajo o estudios de formación profesional) y el Programa II al B2 (nivel universitario o equivalente). Ambos constan de cuatro partes: lectura, comprensión oral, expresión oral y escritura.'],
        ['¿Qué nivel necesito?', 'Para la mayoría de puestos sanitarios, B1 como mínimo; para puestos de nivel superior, a menudo B2. Acreditar el idioma forma parte de todas las vías hacia el registro BIG.'],
        ['¿Puedo estudiar desde España?', 'Sí. Las clases son online y compatibles con tu trabajo actual. Esa es justamente la idea: empiezas con el idioma antes de mudarte.'],
        ['¿Cuánto me cuesta la formación?', 'Nada. La formación lingüística y la preparación forman parte de nuestro acompañamiento y son gratuitas para ti.']
      ],
      housing: [
        ['¿Tendré vivienda propia?', 'Al principio normalmente no. Sueles empezar en vivienda compartida con compañeros: abarata costes y no estás solo. Tras el periodo de adaptación te ayudamos a buscar tu propio hogar.'],
        ['¿Cuánto pagaré de alquiler?', 'Lo acordamos contigo por adelantado, antes de que viajes a los Países Bajos. Sin sorpresas después.'],
        ['¿Puedo alquilar algo por mi cuenta?', 'Siempre puedes, pero sé realista: una vivienda del mercado libre cuesta de media más de 1.800 € de alquiler base al mes y decenas de personas responden a cada anuncio. Con un salario inicial en sanidad no sale por tu cuenta.'],
        ['¿Puedo inscribirme en vivienda social?', 'Sí, y hazlo nada más llegar. Pero no cuentes con ella a corto plazo: en muchos municipios la espera es de siete a once años.'],
        ['¿La vivienda cumple normas?', 'Sí. Mínimo 12 m² de superficie habitable por persona, con exigencias de privacidad, sanitarios, higiene y seguridad contra incendios.']
      ]
    },
    housingNote: 'La vivienda es un asunto serio en los Países Bajos. Nosotros organizamos la tuya, pero creemos importante que sepas de antemano cómo está el mercado.',
    housingLink: 'Ver las cifras del mercado de vivienda neerlandés'
  },
  pl: {
    faqTitle: 'Najczęstsze pytania',
    ctaLabels: { plan: 'UMÓW ROZMOWĘ', ask: 'ZADAJ PYTANIE', route: 'ZOBACZ ŚCIEŻKĘ UE', numbers: 'ZOBACZ DANE', account: 'ZAŁÓŻ PROFIL' },
    cta: {
      about: ['Chcesz wiedzieć, jak pracujemy?', 'Chętnie wyjaśnimy przebieg ścieżki i to, gdzie kończy się nasza rola.'],
      institutions: ['Porozmawiajmy o potrzebach kadrowych', 'Powiedz nam, jakie stanowiska są wolne; sprawdzimy, czy rekrutacja międzynarodowa pasuje do Twojej sytuacji.'],
      candidates: ['Gotowy na pierwszy krok?', 'Załóż profil, żebyśmy wiedzieli, kim jesteś i czego szukasz. Odezwiemy się, gdy pojawi się odpowiednie stanowisko.'],
      academy: ['Chcesz wiedzieć, na jakim jesteś etapie?', 'Załóż profil z obecnym poziomem językowym; wspólnie ustalimy, czego jeszcze brakuje.'],
      housing: ['Pytania o mieszkanie?', 'Śmiało pytaj — wolimy wyjaśnić to wcześniej.']
    },
    faq: {
      about: [
        ['Czy jesteście agencją pracy tymczasowej?', 'Nie. My rekrutujemy, szkolimy i wspieramy. Oficjalne pośrednictwo, umowa i rola pracodawcy należą do naszego zarejestrowanego biura partnerskiego. Ten podział wynika z prawa i ściśle go przestrzegamy.'],
        ['Z jakich krajów rekrutujecie?', 'Obecnie skupiamy się głównie na Hiszpanii i innych krajach UE, bo tam nie potrzeba wizy ani zezwolenia na pracę. Rekrutujemy też w Kolumbii; ta ścieżka trwa dłużej.'],
        ['Ile to kosztuje kandydata?', 'Nic. Przygotowanie, kurs językowy i opieka są dla kandydatów bezpłatne. Kto żąda pieniędzy w zamian za pracę w Holandii, nie jest uczciwy.'],
        ['Jak zapewniacie etyczną rekrutację?', 'Stosujemy kodeks WHO dotyczący międzynarodowej rekrutacji personelu medycznego, działamy na przejrzystych zasadach i z góry ustalamy czynsz oraz warunki pracy.']
      ],
      institutions: [
        ['Jak szybko kandydat może zacząć?', 'Szybciej, niż Państwo przywykli, bo pracujemy w dwóch etapach. Gdy ktoś zna niderlandzki na poziomie codziennej praktyki, zaczyna u Państwa na stanowisku wspierającym — macie już ręce do pracy. Awans na stanowisko pielęgniarki następuje po osiągnięciu poziomu językowego i rejestracji BIG. Przy kandydatach z UE odpada też procedura wizowa, co oszczędza miesiące.'],
        ['Kto jest prawnym pracodawcą?', 'Nasze zarejestrowane biuro partnerskie. Ono zawiera umowę, wypłaca wynagrodzenie i ponosi obowiązki pracodawcy, więc masz jeden punkt kontaktu zgodny z Waadi/Wtta.'],
        ['Z jakim poziomem języka przyjeżdżają kandydaci?', 'Szkolimy co najmniej do B1, a do B2 tam, gdzie wymaga tego stanowisko. Udokumentowana znajomość języka jest też warunkiem rejestracji BIG.'],
        ['A jeśli kandydat jednak nie pasuje?', 'Rozmawiamy o tym otwarcie i w porę. Umieszczanie kogoś w niewłaściwym miejscu nikomu nie służy — opieka po przyjeździe ma temu właśnie zapobiegać.']
      ],
      candidates: [
        ['Ile mnie to kosztuje?', 'Nic. Nasza opieka i szkolenie są dla Ciebie bezpłatne. Czynsz oczywiście płacisz, gdy już tu mieszkasz; kwotę ustalamy z góry.'],
        ['Ile trwa cała ścieżka?', 'Tempo wyznacza język. Licz na kilka miesięcy intensywnej nauki do B1/B2, przy równoległym uznaniu dyplomu. Uczciwie przedstawiamy harmonogram, gdy poznamy Twój poziom.'],
        ['Czy muszę już znać niderlandzki?', 'Nie, możesz zacząć od zera. Musisz jednak być gotów solidnie się przyłożyć: bez udokumentowanego niderlandzkiego rejestracja BIG nie jest możliwa.'],
        ['Czy rodzina może przyjechać ze mną?', 'Jako obywatel UE masz swobodę przemieszczania się, więc rodzina może się przeprowadzić. Pamiętaj, że mieszkań rodzinnych brakuje — zgłoś to wcześnie w procesie.'],
        ['Czy mogę pracować, ucząc się języka?', 'Tak, i o to właśnie chodzi. Gdy Twój niderlandzki wystarcza do codziennej praktyki, zaczynasz na stanowisku wspierającym w opiece — z wynagrodzeniem. Jako pielęgniarka możesz pracować dopiero po rejestracji BIG. Ale zarabiasz, znacznie szybciej uczysz się języka i znasz już zespół, zanim awansujesz.'],
        ['Kto będzie moim pracodawcą?', 'Nie Honor Care, lecz nasze zarejestrowane biuro partnerskie. To ono zawiera z Tobą umowę i wypłaca wynagrodzenie. My nadal Cię wspieramy.']
      ],
      academy: [
        ['Czym dokładnie jest NT2?', 'To egzamin państwowy z niderlandzkiego jako drugiego języka. Są dwa programy: Program I prowadzi do poziomu B1 (praca lub nauka na poziomie średnim), a Program II do B2 (poziom wyższy). Oba składają się z czterech części: czytanie, słuchanie, mówienie i pisanie.'],
        ['Jakiego poziomu potrzebuję?', 'Do większości stanowisk w opiece co najmniej B1; do stanowisk wyższego szczebla często B2. Udokumentowana znajomość języka należy do każdej ścieżki rejestracji BIG.'],
        ['Czy mogę uczyć się z Hiszpanii?', 'Tak. Zajęcia są online i można je łączyć z obecną pracą. O to właśnie chodzi: zaczynasz od języka, zanim się przeprowadzisz.'],
        ['Ile kosztuje mnie szkolenie?', 'Nic. Kurs językowy i przygotowanie są częścią naszej opieki i bezpłatne dla Ciebie.']
      ],
      housing: [
        ['Czy dostanę własne mieszkanie?', 'Na początku zwykle nie. Zaczynasz zwykle w mieszkaniu dzielonym z kolegami — to obniża koszty i nie jesteś sam. Po okresie wdrożenia pomagamy znaleźć własne lokum.'],
        ['Ile zapłacę czynszu?', 'Ustalamy to z Tobą z góry, zanim przyjedziesz do Holandii. Bez niespodzianek później.'],
        ['Czy mogę wynająć coś sam na wolnym rynku?', 'Zawsze możesz, ale bądź realistą: mieszkanie na wolnym rynku kosztuje średnio ponad 1800 € czynszu miesięcznie, a na jedno ogłoszenie odpowiadają dziesiątki osób. Przy początkowej pensji w opiece samodzielnie to się nie spina.'],
        ['Czy mogę zapisać się na mieszkanie socjalne?', 'Tak, i zrób to zaraz po przyjeździe. Ale nie licz na nie krótkoterminowo: w wielu gminach czeka się od siedmiu do jedenastu lat.'],
        ['Czy zakwaterowanie spełnia normy?', 'Tak. Minimum 12 m² powierzchni mieszkalnej na osobę, z wymogami prywatności, sanitariatów, higieny i ochrony przeciwpożarowej.']
      ]
    },
    housingNote: 'Mieszkanie to w Holandii poważny temat. Organizujemy je dla Ciebie, ale uważamy, że powinieneś wcześniej wiedzieć, jak wygląda rynek.',
    housingLink: 'Zobacz dane o holenderskim rynku mieszkaniowym'
  }
};

// Welke knoppen onder welke pagina.
const CTA_BUTTONS = {
  about: [['plan', '/plan', 'gold'], ['route', '/eu-route', 'light']],
  institutions: [['plan', '/plan', 'gold'], ['ask', '/contact#kontakt', 'light']],
  candidates: [['account', '/portal', 'gold'], ['route', '/eu-route', 'light']],
  academy: [['account', '/portal', 'gold'], ['plan', '/plan', 'light']],
  housing: [['numbers', '/poland', 'gold'], ['ask', '/contact#kontakt', 'light']]
};

function renderExtras(key, lang, esc) {
  const e = EXTRAS[lang] || EXTRAS.nl;
  const faq = (e.faq[key] || []).map(([q, a]) =>
    `<details class="faq-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const cta = e.cta[key];
  const buttons = (CTA_BUTTONS[key] || []).map(([labelKey, href, style]) =>
    `<a class="btn ${style}" href="${href}">${esc(e.ctaLabels[labelKey])}</a>`).join('');

  const housingNote = key === 'housing'
    ? `<p class="housing-note">${esc(e.housingNote)} <a href="/poland">${esc(e.housingLink)} →</a></p>`
    : '';

  return `${housingNote}
${faq ? `<section class="faq"><h2>${esc(e.faqTitle)}</h2><div class="faq-list">${faq}</div></section>` : ''}
${cta ? `<section class="page-cta"><h2>${esc(cta[0])}</h2><p>${esc(cta[1])}</p><div class="page-cta-btns">${buttons}</div></section>` : ''}`;
}

module.exports = { renderExtras };
