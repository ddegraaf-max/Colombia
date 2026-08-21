// EU-route (focus: Spanje). Traject, wederzijdse verwachtingen en de juridische rolverdeling:
// Honor Care bereidt voor en begeleidt; de plaatsing en het dienstverband lopen via het
// geregistreerde partnerbureau. Die scheiding moet op elke pagina expliciet blijven.
const EUROUTE = {
  nl: {
    navLabel: 'EU-route',
    title: 'Werken in de Nederlandse zorg — de EU-route',
    intro: 'Kom je uit Spanje of een ander EU-land? Dan is de weg naar de Nederlandse zorg korter dan je denkt. Geen visum, geen tewerkstellingsvergunning — binnen de EU tellen jouw diploma en werkervaring gewoon mee. Wat overblijft is de taal, je BIG-registratie en een goede voorbereiding. Daarin begeleiden wij je, van het eerste gesprek tot je eerste werkdag.',
    ask: {
      eyebrow: 'WAT WIJ VRAGEN', h2: 'Wat wij van jou vragen',
      sub: 'Wij investeren in jouw opleiding, begeleiding en huisvesting. Daar staat een serieuze inzet van jouw kant tegenover. Dit verwachten wij:',
      items: [
        ['EU-nationaliteit', 'Je hebt de nationaliteit van Spanje of een ander EU/EER-land. Daardoor heb je geen visum of tewerkstellingsvergunning nodig om in Nederland te werken.'],
        ['Een erkend zorgdiploma', 'Je bent gediplomeerd zorgprofessional — bijvoorbeeld verpleegkundige, arts of tandarts — met een diploma dat binnen de EU is afgegeven.'],
        ['Motivatie om Nederlands te leren', 'Dit is verreweg de grootste stap. Je leert tot minimaal B1, voor veel functies B2 (NT2). Reken op enkele maanden intensief studeren, vaak naast je huidige werk.'],
        ['Bereidheid om te verhuizen', 'Je bent bereid daadwerkelijk naar Nederland te verhuizen en hier te wonen en werken. De huisvesting regelen wij.'],
        ['Volledige en eerlijke documenten', 'Diploma’s, werkervaring, identiteitsbewijs en referenties — compleet, geldig en op tijd aangeleverd.'],
        ['Actieve deelname', 'Je volgt de lessen trouw, blijft bereikbaar voor je coördinator en geeft wijzigingen in je situatie direct door.']
      ]
    },
    give: {
      eyebrow: 'WAT WIJ BIEDEN', h2: 'Wat jij van ons krijgt',
      items: [
        ['Nederlandse taalopleiding', 'Van A1 tot B1/B2 (NT2), inclusief medische terminologie. Online te volgen vanuit Spanje, naast je werk.'],
        ['Begeleiding bij erkenning en BIG', 'Wij helpen je bij de erkenning van je EU-diploma en je inschrijving in het BIG-register. Voor een deel van de EU-diploma’s geldt een verkorte route; anders beoordeelt de commissie CBGV je dossier — dat duurt maximaal 13 weken na een compleet dossier. Aantoonbare kennis van het Nederlands hoort bij elke route.'],
        ['Voorbereiding op de Nederlandse zorg', 'Hoe het zorgstelsel werkt, wat een Nederlandse werkgever verwacht en hoe de omgang met patiënten en collega’s is.'],
        ['Huisvesting', 'Een gemeubileerde woning, klaar bij aankomst en dicht bij je werk.'],
        ['Een vast aanspreekpunt', 'Eén coördinator die jouw dossier kent en je begeleidt — ook ná aankomst in Nederland.'],
        ['Kosteloos voor jou', 'Aan onze voorbereiding, opleiding en begeleiding zijn voor jou als kandidaat geen kosten verbonden.']
      ]
    },
    steps: {
      eyebrow: 'HET TRAJECT', h2: 'Stap voor stap naar je eerste werkdag',
      list: [
        ['Kennismaking', 'Een open gesprek over je achtergrond, je wensen en wat het traject van je vraagt. Vrijblijvend.'],
        ['Screening en documentcheck', 'We controleren diploma, werkervaring en documenten en bepalen samen welk beroep en niveau bij je passen.'],
        ['Taalopleiding Nederlands', 'Je start met NT2, online vanuit Spanje. Dit is de langste en bepalende fase van het traject.'],
        ['Erkenning en BIG-registratie', 'Parallel aan de taalopleiding regelen we de erkenning van je EU-diploma en je BIG-registratie.'],
        ['Kennismaking met de werkgever', 'Het geregistreerde partnerbureau brengt je in contact met een passende zorginstelling.'],
        ['Officiële plaatsing en contract', 'Het partnerbureau sluit het arbeidscontract met je. Zij zijn de erkende bemiddelaar en werkgever — niet Honor Care.'],
        ['Verhuizing en start', 'Wij regelen huisvesting en praktische zaken en begeleiden je in de eerste periode in Nederland.']
      ]
    },
    roles: {
      eyebrow: 'DUIDELIJKE ROLVERDELING', h2: 'Wie doet wat — en waarom dat belangrijk is',
      sub: 'Honor Care International bemiddelt niet zelf en is geen werkgever of uitzendbureau. Wij werven, leiden op en begeleiden; de officiële plaatsing en het dienstverband lopen via ons geregistreerde partnerbureau. Zo blijft het traject volledig in lijn met de Nederlandse wetgeving (Waadi/Wtta).',
      us: { h: 'Honor Care International doet', items: ['Werving en selectie in Spanje en andere EU-landen', 'Screening, documentcheck en advies', 'Taalopleiding Nederlands (NT2) en medische terminologie', 'Begeleiding bij diploma-erkenning en BIG-registratie', 'Huisvesting, integratie en nazorg', 'Eén vast aanspreekpunt gedurende het hele traject'] },
      partner: { h: 'Het geregistreerde partnerbureau doet', items: ['De bemiddeling en matching met de zorginstelling', 'Het arbeidscontract en het werkgeverschap', 'Loon, arbeidsvoorwaarden en werkgeversverplichtingen', 'Naleving van de Waadi/Wtta als erkende bemiddelaar'] },
      note: 'Wij vragen jou als kandidaat nooit om geld voor bemiddeling of plaatsing. Word je door iemand anders wél om betaling gevraagd — vraag dan altijd om opheldering.'
    },
    cta: { h2: 'Klaar voor de eerste stap?', p: 'Plan een vrijblijvend gesprek. We vertellen je eerlijk wat het traject vraagt en wat het je oplevert.', btn1: 'PLAN EEN GESPREK', btn2: 'STEL EEN VRAAG' }
  },
  en: {
    navLabel: 'EU route',
    title: 'Working in Dutch healthcare — the EU route',
    intro: 'Are you from Spain or another EU country? Then the road into Dutch healthcare is shorter than you might think. No visa, no work permit — within the EU your diploma and experience simply count. What remains is the language, your BIG registration and solid preparation. We guide you through all of it, from the first conversation to your first working day.',
    ask: {
      eyebrow: 'WHAT WE ASK', h2: 'What we ask of you',
      sub: 'We invest in your training, guidance and housing. In return we expect a serious commitment from you:',
      items: [
        ['EU nationality', 'You hold the nationality of Spain or another EU/EEA country, so you need no visa or work permit to work in the Netherlands.'],
        ['A recognised healthcare diploma', 'You are a qualified healthcare professional — for example a nurse, doctor or dentist — with a diploma issued within the EU.'],
        ['Motivation to learn Dutch', 'By far the biggest step. You study to at least B1, and B2 (NT2) for many roles. Expect several months of intensive study, often alongside your current job.'],
        ['Willingness to relocate', 'You are genuinely prepared to move to the Netherlands and live and work here. We arrange the housing.'],
        ['Complete and honest documents', 'Diplomas, work experience, identity documents and references — complete, valid and submitted on time.'],
        ['Active participation', 'You attend your lessons, stay reachable for your coordinator and report any change in your situation straight away.']
      ]
    },
    give: {
      eyebrow: 'WHAT WE OFFER', h2: 'What you get from us',
      items: [
        ['Dutch language training', 'From A1 to B1/B2 (NT2), including medical terminology. Available online from Spain, alongside your work.'],
        ['Support with recognition and BIG', 'We help you with the recognition of your EU diploma and your registration in the BIG register. Some EU diplomas follow a shortened route; otherwise the CBGV committee assesses your file, which takes up to 13 weeks once it is complete. Demonstrable Dutch proficiency is part of every route.'],
        ['Preparation for Dutch healthcare', 'How the healthcare system works, what a Dutch employer expects, and how people interact with patients and colleagues.'],
        ['Housing', 'A furnished home, ready on arrival and close to your workplace.'],
        ['One point of contact', 'A single coordinator who knows your file and supports you — including after you arrive.'],
        ['Free of charge for you', 'Our preparation, training and guidance come at no cost to you as a candidate.']
      ]
    },
    steps: {
      eyebrow: 'THE JOURNEY', h2: 'Step by step to your first working day',
      list: [
        ['Introduction', 'An open conversation about your background, your goals and what the journey asks of you. No obligations.'],
        ['Screening and document check', 'We verify your diploma, experience and documents and determine together which role and level suit you.'],
        ['Dutch language training', 'You start NT2 online from Spain. This is the longest and most decisive phase of the journey.'],
        ['Recognition and BIG registration', 'Alongside the language training we arrange recognition of your EU diploma and your BIG registration.'],
        ['Meeting the employer', 'The registered partner agency introduces you to a suitable healthcare institution.'],
        ['Official placement and contract', 'The partner agency signs the employment contract with you. They are the authorised intermediary and employer — not Honor Care.'],
        ['Relocation and start', 'We arrange housing and practical matters and support you through your first period in the Netherlands.']
      ]
    },
    roles: {
      eyebrow: 'CLEAR DIVISION OF ROLES', h2: 'Who does what — and why that matters',
      sub: 'Honor Care International does not place workers itself and is neither an employer nor a temporary employment agency. We recruit, train and guide; the official placement and the employment contract run through our registered partner agency. This keeps the entire journey compliant with Dutch law (Waadi/Wtta).',
      us: { h: 'Honor Care International does', items: ['Recruitment and selection in Spain and other EU countries', 'Screening, document checks and advice', 'Dutch language training (NT2) and medical terminology', 'Support with diploma recognition and BIG registration', 'Housing, integration and aftercare', 'One dedicated point of contact throughout the journey'] },
      partner: { h: 'The registered partner agency does', items: ['The placement and matching with the healthcare institution', 'The employment contract and employer responsibility', 'Salary, terms of employment and employer obligations', 'Compliance with the Waadi/Wtta as authorised intermediary'] },
      note: 'We never ask you as a candidate for money in exchange for placement or mediation. If anyone else does ask you to pay, always ask for clarification.'
    },
    cta: { h2: 'Ready for the first step?', p: 'Book a no-obligation conversation. We will tell you honestly what the journey asks and what it gives you.', btn1: 'BOOK A MEETING', btn2: 'ASK A QUESTION' }
  },
  pl: {
    navLabel: 'Ścieżka UE',
    title: 'Praca w holenderskiej ochronie zdrowia — ścieżka UE',
    intro: 'Pochodzisz z Hiszpanii lub innego kraju UE? Droga do holenderskiej ochrony zdrowia jest krótsza, niż myślisz. Bez wizy i bez zezwolenia na pracę — w UE Twój dyplom i doświadczenie liczą się w pełni. Zostaje język, rejestracja BIG i dobre przygotowanie. W tym wszystkim Cię prowadzimy — od pierwszej rozmowy do pierwszego dnia pracy.',
    ask: {
      eyebrow: 'CZEGO OCZEKUJEMY', h2: 'Czego oczekujemy od Ciebie',
      sub: 'Inwestujemy w Twoje szkolenie, opiekę i zakwaterowanie. W zamian oczekujemy poważnego zaangażowania:',
      items: [
        ['Obywatelstwo UE', 'Masz obywatelstwo Hiszpanii lub innego kraju UE/EOG, dzięki czemu nie potrzebujesz wizy ani zezwolenia na pracę w Holandii.'],
        ['Uznany dyplom medyczny', 'Jesteś wykwalifikowanym profesjonalistą medycznym — np. pielęgniarką, lekarzem lub stomatologiem — z dyplomem wydanym w UE.'],
        ['Motywacja do nauki niderlandzkiego', 'To zdecydowanie największy krok. Uczysz się co najmniej do B1, a przy wielu stanowiskach do B2 (NT2). Licz się z kilkoma miesiącami intensywnej nauki, często obok obecnej pracy.'],
        ['Gotowość do przeprowadzki', 'Jesteś realnie gotowy przeprowadzić się do Holandii oraz tu mieszkać i pracować. Zakwaterowanie organizujemy my.'],
        ['Kompletne i rzetelne dokumenty', 'Dyplomy, doświadczenie zawodowe, dokument tożsamości i referencje — kompletne, ważne i dostarczone na czas.'],
        ['Aktywny udział', 'Regularnie uczestniczysz w zajęciach, jesteś dostępny dla koordynatora i od razu zgłaszasz zmiany w swojej sytuacji.']
      ]
    },
    give: {
      eyebrow: 'CO OFERUJEMY', h2: 'Co otrzymujesz od nas',
      items: [
        ['Kurs języka niderlandzkiego', 'Od A1 do B1/B2 (NT2) wraz z terminologią medyczną. Online z Hiszpanii, obok Twojej pracy.'],
        ['Wsparcie przy uznaniu dyplomu i BIG', 'Pomagamy w uznaniu dyplomu z UE i rejestracji w rejestrze BIG. Część dyplomów z UE idzie drogą skróconą; w pozostałych przypadkach dokumentację ocenia komisja CBGV — do 13 tygodni od kompletnego wniosku. Udokumentowana znajomość niderlandzkiego jest wymagana w każdej ścieżce.'],
        ['Przygotowanie do pracy w Holandii', 'Jak działa system opieki zdrowotnej, czego oczekuje holenderski pracodawca i jak wygląda kontakt z pacjentem i zespołem.'],
        ['Zakwaterowanie', 'Umeblowane mieszkanie, gotowe na przyjazd i blisko miejsca pracy.'],
        ['Stały opiekun', 'Jeden koordynator, który zna Twoją sprawę i prowadzi Cię — również po przyjeździe.'],
        ['Bezpłatnie dla Ciebie', 'Za nasze przygotowanie, szkolenie i opiekę nie ponosisz jako kandydat żadnych kosztów.']
      ]
    },
    steps: {
      eyebrow: 'ŚCIEŻKA', h2: 'Krok po kroku do pierwszego dnia pracy',
      list: [
        ['Rozmowa wstępna', 'Otwarta rozmowa o Twoim doświadczeniu, oczekiwaniach i tym, czego wymaga cała ścieżka. Bez zobowiązań.'],
        ['Weryfikacja i dokumenty', 'Sprawdzamy dyplom, doświadczenie i dokumenty oraz wspólnie ustalamy odpowiedni zawód i poziom.'],
        ['Nauka niderlandzkiego', 'Zaczynasz kurs NT2 online z Hiszpanii. To najdłuższy i decydujący etap.'],
        ['Uznanie dyplomu i rejestracja BIG', 'Równolegle do nauki załatwiamy uznanie dyplomu z UE i rejestrację BIG.'],
        ['Poznanie pracodawcy', 'Zarejestrowane biuro partnerskie kontaktuje Cię z odpowiednią placówką medyczną.'],
        ['Oficjalne zatrudnienie i umowa', 'Umowę o pracę zawiera z Tobą biuro partnerskie. To ono jest uprawnionym pośrednikiem i pracodawcą — nie Honor Care.'],
        ['Przeprowadzka i start', 'Organizujemy zakwaterowanie i sprawy praktyczne oraz wspieramy Cię w pierwszym okresie w Holandii.']
      ]
    },
    roles: {
      eyebrow: 'JASNY PODZIAŁ RÓL', h2: 'Kto co robi — i dlaczego to ważne',
      sub: 'Honor Care International nie prowadzi pośrednictwa samodzielnie i nie jest pracodawcą ani agencją pracy tymczasowej. Rekrutujemy, szkolimy i wspieramy; oficjalne zatrudnienie realizuje nasze zarejestrowane biuro partnerskie. Dzięki temu cała ścieżka pozostaje zgodna z holenderskim prawem (Waadi/Wtta).',
      us: { h: 'Honor Care International robi', items: ['Rekrutację i selekcję w Hiszpanii i innych krajach UE', 'Weryfikację, sprawdzenie dokumentów i doradztwo', 'Kurs niderlandzkiego (NT2) i terminologii medycznej', 'Wsparcie przy uznaniu dyplomu i rejestracji BIG', 'Zakwaterowanie, integrację i opiekę po przyjeździe', 'Jeden stały punkt kontaktu przez całą ścieżkę'] },
      partner: { h: 'Zarejestrowane biuro partnerskie robi', items: ['Pośrednictwo i dopasowanie do placówki medycznej', 'Umowę o pracę i rolę pracodawcy', 'Wynagrodzenie, warunki pracy i obowiązki pracodawcy', 'Przestrzeganie Waadi/Wtta jako uprawniony pośrednik'] },
      note: 'Nigdy nie pobieramy od Ciebie jako kandydata opłat za pośrednictwo ani zatrudnienie. Jeśli ktokolwiek prosi Cię o zapłatę — zawsze żądaj wyjaśnień.'
    },
    cta: { h2: 'Gotowy na pierwszy krok?', p: 'Umów niezobowiązującą rozmowę. Uczciwie powiemy, czego wymaga ta droga i co Ci daje.', btn1: 'UMÓW ROZMOWĘ', btn2: 'ZADAJ PYTANIE' }
  },
  es: {
    navLabel: 'Ruta UE',
    title: 'Trabajar en la sanidad neerlandesa — la ruta UE',
    intro: '¿Eres de España o de otro país de la UE? El camino hacia la sanidad neerlandesa es más corto de lo que imaginas. Sin visado ni permiso de trabajo: dentro de la UE tu título y tu experiencia cuentan plenamente. Queda el idioma, tu registro BIG y una buena preparación. Te acompañamos en todo ello, desde la primera conversación hasta tu primer día de trabajo.',
    ask: {
      eyebrow: 'QUÉ TE PEDIMOS', h2: 'Qué te pedimos',
      sub: 'Invertimos en tu formación, tu acompañamiento y tu alojamiento. A cambio esperamos un compromiso serio por tu parte:',
      items: [
        ['Nacionalidad de la UE', 'Tienes la nacionalidad de España o de otro país de la UE/EEE, por lo que no necesitas visado ni permiso de trabajo para trabajar en los Países Bajos.'],
        ['Un título sanitario reconocido', 'Eres profesional sanitario titulado —por ejemplo enfermero, médico o dentista— con un título expedido en la UE.'],
        ['Motivación para aprender neerlandés', 'Es con diferencia el paso más grande. Estudias hasta B1 como mínimo y hasta B2 (NT2) para muchos puestos. Cuenta con varios meses de estudio intensivo, a menudo compaginado con tu trabajo actual.'],
        ['Disposición a mudarte', 'Estás realmente dispuesto a mudarte a los Países Bajos y vivir y trabajar aquí. Del alojamiento nos encargamos nosotros.'],
        ['Documentación completa y veraz', 'Títulos, experiencia laboral, documento de identidad y referencias: completos, válidos y entregados a tiempo.'],
        ['Participación activa', 'Asistes a las clases con constancia, estás localizable para tu coordinador y comunicas de inmediato cualquier cambio en tu situación.']
      ]
    },
    give: {
      eyebrow: 'QUÉ OFRECEMOS', h2: 'Qué recibes de nosotros',
      items: [
        ['Formación en neerlandés', 'De A1 a B1/B2 (NT2), con terminología médica. Online desde España, compatible con tu trabajo.'],
        ['Apoyo con la homologación y el BIG', 'Te ayudamos con el reconocimiento de tu título de la UE y tu inscripción en el registro BIG. Algunos títulos de la UE siguen una vía abreviada; en el resto, la comisión CBGV evalúa tu expediente, con un máximo de 13 semanas desde que está completo. Acreditar el neerlandés forma parte de todas las vías.'],
        ['Preparación para la sanidad neerlandesa', 'Cómo funciona el sistema sanitario, qué espera un empleador neerlandés y cómo es el trato con pacientes y compañeros.'],
        ['Alojamiento', 'Una vivienda amueblada, lista a tu llegada y cerca de tu puesto de trabajo.'],
        ['Un único interlocutor', 'Un coordinador que conoce tu expediente y te acompaña, también después de tu llegada.'],
        ['Gratuito para ti', 'Nuestra preparación, formación y acompañamiento no tienen ningún coste para ti como candidato.']
      ]
    },
    steps: {
      eyebrow: 'EL RECORRIDO', h2: 'Paso a paso hasta tu primer día de trabajo',
      list: [
        ['Primer contacto', 'Una conversación abierta sobre tu trayectoria, tus objetivos y lo que exige el recorrido. Sin compromiso.'],
        ['Evaluación y documentación', 'Verificamos tu título, tu experiencia y tus documentos y decidimos juntos qué profesión y nivel encajan contigo.'],
        ['Formación en neerlandés', 'Empiezas el NT2 online desde España. Es la fase más larga y decisiva del recorrido.'],
        ['Homologación y registro BIG', 'En paralelo a la formación gestionamos el reconocimiento de tu título de la UE y tu registro BIG.'],
        ['Conocer al empleador', 'La agencia asociada registrada te pone en contacto con un centro sanitario adecuado.'],
        ['Colocación oficial y contrato', 'La agencia asociada firma contigo el contrato de trabajo. Ella es el intermediario autorizado y el empleador, no Honor Care.'],
        ['Mudanza e incorporación', 'Organizamos el alojamiento y los trámites prácticos y te acompañamos durante tu primer periodo en los Países Bajos.']
      ]
    },
    roles: {
      eyebrow: 'REPARTO CLARO DE FUNCIONES', h2: 'Quién hace qué, y por qué importa',
      sub: 'Honor Care International no realiza la intermediación ni es empleador o empresa de trabajo temporal. Nosotros captamos, formamos y acompañamos; la colocación oficial y el contrato de trabajo se gestionan a través de nuestra agencia asociada registrada. Así todo el recorrido cumple la legislación neerlandesa (Waadi/Wtta).',
      us: { h: 'Honor Care International hace', items: ['Captación y selección en España y otros países de la UE', 'Evaluación, verificación de documentos y asesoramiento', 'Formación en neerlandés (NT2) y terminología médica', 'Apoyo con la homologación del título y el registro BIG', 'Alojamiento, integración y seguimiento', 'Un interlocutor fijo durante todo el recorrido'] },
      partner: { h: 'La agencia asociada registrada hace', items: ['La intermediación y el emparejamiento con el centro sanitario', 'El contrato de trabajo y la condición de empleador', 'El salario, las condiciones laborales y las obligaciones del empleador', 'El cumplimiento de la Waadi/Wtta como intermediario autorizado'] },
      note: 'Nunca te pedimos dinero como candidato a cambio de intermediación o colocación. Si alguien te pide un pago, pide siempre explicaciones.'
    },
    cta: { h2: '¿Listo para el primer paso?', p: 'Reserva una conversación sin compromiso. Te contamos con honestidad qué exige el recorrido y qué te aporta.', btn1: 'RESERVAR UNA REUNIÓN', btn2: 'HACER UNA PREGUNTA' }
  }
};

// Rendert de EU-routepagina. Helpers (esc, icon) komen uit server.js zodat de
// opmaak identiek blijft aan de rest van de site.
function renderEuRoute(lang, h) {
  const e = EUROUTE[lang] || EUROUTE.nl;
  const esc = h.esc, icon = h.icon;
  const check = '<path d="M20 6L9 17l-5-5"/>';
  const item = (cls, badge, t, d) => `<article class="eur-item ${cls}">${badge}<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></article>`;
  const ask = e.ask.items.map((it, i) => item('ask', `<span class="eur-n">${i + 1}</span>`, it[0], it[1])).join('');
  const give = e.give.items.map(it => item('give', `<span class="eur-ic">${icon(check)}</span>`, it[0], it[1])).join('');
  const steps = e.steps.list.map(st => `<li><h3>${esc(st[0])}</h3><p>${esc(st[1])}</p></li>`).join('');
  const roleList = arr => arr.map(x => `<li>${esc(x)}</li>`).join('');
  return `<section class="page-hero ph-euroute"><div class="page-hero-inner"><h1>${esc(e.title)}</h1><p>${esc(e.intro)}</p></div></section>
<section class="page has-hero">
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.ask.eyebrow)}</span><h2>${esc(e.ask.h2)}</h2><p>${esc(e.ask.sub)}</p></div><div class="eur-grid">${ask}</div></div>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.give.eyebrow)}</span><h2>${esc(e.give.h2)}</h2></div><div class="eur-grid">${give}</div></div>
<div class="eur-block"><div class="eur-head"><span class="eyebrow">${esc(e.steps.eyebrow)}</span><h2>${esc(e.steps.h2)}</h2></div><ol class="eur-timeline">${steps}</ol></div>
<div class="eur-roles"><div class="eur-head"><span class="eyebrow">${esc(e.roles.eyebrow)}</span><h2>${esc(e.roles.h2)}</h2><p>${esc(e.roles.sub)}</p></div>
<div class="eur-roles-grid"><article class="eur-role us"><h3>${esc(e.roles.us.h)}</h3><ul>${roleList(e.roles.us.items)}</ul></article><article class="eur-role partner"><h3>${esc(e.roles.partner.h)}</h3><ul>${roleList(e.roles.partner.items)}</ul></article></div>
<p class="eur-note">${esc(e.roles.note)}</p></div>
<div class="eur-cta"><h2>${esc(e.cta.h2)}</h2><p>${esc(e.cta.p)}</p><div class="eur-cta-btns"><a class="btn gold" href="/plan">${esc(e.cta.btn1)}</a><a class="btn light" href="/contact#kontakt">${esc(e.cta.btn2)}</a></div></div>
</section>`;
}

module.exports = { EUROUTE, renderEuRoute };
