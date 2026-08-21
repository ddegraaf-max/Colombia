// Privacybeleid en algemene voorwaarden. De inhoud beschrijft wat de site
// daadwerkelijk verwerkt — niet een algemeen sjabloon. Wijzigt de site, dan
// moet dit mee. Bedrijfsgegevens komen uit de omgeving zodat ze op één plek staan.

// Honor Care International is een handelsnaam; de rechtspersoon is Creditline B.V.
// In juridische documenten moet de rechtspersoon genoemd worden, niet alleen de handelsnaam.
const KVK = String(process.env.COMPANY_KVK || '59683198').trim();
const COMPANY = String(process.env.COMPANY_NAME || 'Honor Care International').trim();
const ENTITY = String(process.env.COMPANY_ENTITY || 'Creditline B.V.').trim();
const UPDATED = '21-08-2026';
// Documentversie: hoog dit op bij elke inhoudelijke wijziging van de tekst,
// los van het versienummer van de applicatie.
const DOC_VERSION = { privacy: '1.1', terms: '1.1' };

const L = {
  nl: {
    privacy: {
      title: 'Privacybeleid',
      intro: 'Wij verwerken persoonsgegevens van kandidaten, zorginstellingen en bezoekers van deze website. Hieronder leggen wij precies uit welke gegevens dat zijn, waarom wij ze verwerken en welke rechten je hebt. Wij houden ons daarbij aan de Algemene verordening gegevensbescherming (AVG).',
      sections: [
        ['Wie is verantwoordelijk?', [
          COMPANY + ' is een handelsnaam van ' + ENTITY + ', die verwerkingsverantwoordelijke is voor de gegevens die via deze website worden verzameld.',
          'Nederland — Torenlaan 5A, 1402 BN Bussum. Polen — Białka 15, 09-550 Szczawin Kościelny.',
          'E-mail: info@honorcareinternational.com · Telefoon: +31 6 46 15 01 60' + (KVK ? ' · Kamer van Koophandel: ' + KVK : '')
        ]],
        ['Welke gegevens verwerken wij?', [
          'Contactformulier: je naam, e-mailadres, onderwerp, de inhoud van je bericht en de taal waarin je de site gebruikt.',
          'Gespreksaanvraag: je naam, e-mailadres, gewenste datum en tijd, onderwerp en de vorm van het gesprek.',
          'Nieuwsbrief: je e-mailadres en taalvoorkeur.',
          'Kandidaatprofiel in het portaal: je naam, e-mailadres, versleuteld wachtwoord, telefoonnummer, land en woonplaats, beroep en specialisatie, jaren werkervaring, niveau Nederlands en Engels, of je een EU-nationaliteit hebt, de status van je BIG-registratie, vanaf wanneer je beschikbaar bent en je motivatie.',
          'Als je tweestapsverificatie inschakelt, bewaren wij daarvoor een sleutel.',
          'Interne aantekeningen: wij noteren de status van je traject en kunnen interne notities vastleggen die relevant zijn voor de begeleiding.',
          'Technische gegevens: je IP-adres wordt kortstondig gebruikt om misbruik van formulieren te beperken. Wij gebruiken geen tracking- of advertentiecookies en houden geen bezoekersstatistieken bij.'
        ]],
        ['Waarom en op welke grondslag?', [
          'Om je vraag te beantwoorden en contact met je te houden — omdat dit nodig is voor de uitvoering van of de voorbereiding op een overeenkomst met jou, of op basis van ons gerechtvaardigd belang om op een bericht te reageren.',
          'Om je te begeleiden richting werk in de Nederlandse zorg: opleiding, diploma-erkenning, voorbereiding en huisvesting — uitvoering van de overeenkomst met jou.',
          'Om je te benaderen zodra er een passende functie is — uitvoering van de overeenkomst, dan wel je toestemming als je alleen een profiel hebt aangemaakt.',
          'Nieuwsbrief — je toestemming. Je kunt die op elk moment intrekken.',
          'Beveiliging en het tegengaan van misbruik — ons gerechtvaardigd belang.'
        ]],
        ['Met wie delen wij gegevens?', [
          'Met ons geregistreerde partnerbureau, zodra jij die stap zet. Zij verzorgen de officiële bemiddeling en het werkgeverschap en zijn vanaf dat moment zelf verantwoordelijk voor de gegevens die zij verwerken.',
          'Met een zorginstelling, alleen wanneer jij daarmee instemt en er een concrete kennismaking speelt.',
          'Met leveranciers die voor ons werken (verwerkers): Railway (hosting en database, EU), Resend (verzending van e-mail) en Cloudflare (bescherming van formulieren tegen misbruik).',
          'Deze website laadt lettertypen van Google Fonts en enkele afbeeldingen van Unsplash. Daarbij wordt je IP-adres aan die partijen doorgegeven.',
          'Wij verkopen je gegevens niet en gebruiken ze niet voor advertenties.'
        ]],
        ['Hoe lang bewaren wij gegevens?', [
          'Berichten via het contactformulier en gespreksaanvragen: zolang dat nodig is om je vraag af te handelen en daarna maximaal twee jaar.',
          'Kandidaatprofielen: zolang je account bestaat. Verwijder je je account of vraag je daarom, dan verwijderen wij je profiel.',
          'Nieuwsbrief: tot je je afmeldt.',
          'Wij hebben deze termijnen als beleid vastgelegd; verwijdering gebeurt momenteel op verzoek en bij periodieke opschoning.'
        ]],
        ['Cookies', [
          'Wij plaatsen twee functionele cookies. Een taalcookie onthoudt in welke taal je de site bekijkt en blijft een jaar staan. Een sessiecookie houdt je ingelogd in het portaal en verloopt na acht uur of bij uitloggen.',
          'Cloudflare kan een cookie plaatsen om te bepalen of je een echte bezoeker bent wanneer je een formulier verstuurt.',
          'Wij gebruiken geen analytische of advertentiecookies. Daarom vragen wij ook geen cookietoestemming.'
        ]],
        ['Beveiliging', [
          'De website werkt uitsluitend via een beveiligde verbinding. Wachtwoorden worden versleuteld opgeslagen en zijn voor ons niet leesbaar. Beheerders werken verplicht met tweestapsverificatie; voor kandidaten is dat mogelijk en aanbevolen.',
          'Toegang tot kandidaatgegevens is beperkt tot medewerkers die deze nodig hebben voor de begeleiding.'
        ]],
        ['Jouw rechten', [
          'Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen verwerking, om beperking vragen en je gegevens in een overdraagbaar bestand opvragen.',
          'Veel gegevens beheer je zelf in het portaal onder Mijn kandidaatprofiel.',
          'Wil je iets anders geregeld hebben, stuur dan een bericht naar info@honorcareinternational.com. Wij reageren binnen vier weken.',
          'Ben je het niet eens met hoe wij met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.'
        ]],
        ['Wijzigingen', [
          'Verandert onze dienstverlening of de website, dan passen wij dit beleid aan. De datum van de laatste wijziging staat onderaan deze pagina.'
        ]]
      ]
    },
    terms: {
      title: 'Algemene voorwaarden',
      intro: 'Deze voorwaarden gelden voor het gebruik van deze website en voor onze dienstverlening aan kandidaten en zorginstellingen. Lees ze door voordat je van onze diensten gebruikmaakt.',
      sections: [
        ['Wie wij zijn en wat wij doen', [
          COMPANY + ' is een handelsnaam van ' + ENTITY + ', ingeschreven bij de Kamer van Koophandel onder nummer ' + KVK + '. Onder die naam werven wij zorgprofessionals in Spanje, andere EU-landen en Colombia, bereidt hen voor op werken in de Nederlandse zorg en begeleidt hen tijdens en na dat traject.',
          'Onze dienstverlening bestaat uit werving en selectie, screening en documentcontrole, taalopleiding Nederlands, begeleiding bij diploma-erkenning en BIG-registratie, het regelen van huisvesting en begeleiding na aankomst.'
        ]],
        ['Wat wij uitdrukkelijk niet doen', [
          'Wij zijn geen uitzendbureau en geen werkgever. Wij stellen zelf geen arbeidskrachten ter beschikking.',
          'De officiële arbeidsbemiddeling, de terbeschikkingstelling en het dienstverband worden verzorgd door ons geregistreerde partnerbureau. Dat bureau sluit het arbeidscontract, betaalt het loon en draagt de werkgeversverplichtingen.',
          'Afspraken over loon, arbeidsvoorwaarden en de duur van het contract maak je met dat partnerbureau, niet met ons.'
        ]],
        ['Kosteloos voor kandidaten', [
          'Aan onze werving, voorbereiding, taalopleiding en begeleiding zijn voor jou als kandidaat geen kosten verbonden.',
          'Wij vragen je nooit om een vergoeding in ruil voor werk of bemiddeling. Vraagt iemand je daar wél om, neem dan contact met ons op.',
          'Kosten die je zelf draagt zijn wel: je huur zodra je in Nederland woont, het examengeld voor het Staatsexamen NT2, de kosten van je BIG-registratie en het opvragen van officiële documenten in je eigen land. Wij maken die kosten vooraf inzichtelijk.'
        ]],
        ['Wat wij van jou verwachten', [
          'Dat je juiste en volledige informatie aanlevert en wijzigingen in je situatie direct doorgeeft.',
          'Dat je actief deelneemt aan de taalopleiding en bereikbaar blijft voor je coördinator.',
          'Dat je bereid bent daadwerkelijk naar Nederland te verhuizen.',
          'Blijkt informatie onjuist of doe je structureel niet mee aan het traject, dan kunnen wij de begeleiding beëindigen.'
        ]],
        ['Geen garantie op plaatsing', [
          'Wij spannen ons in om je traject te laten slagen, maar wij kunnen geen baan garanderen.',
          'Of je in Nederland mag werken in een beschermd beroep hangt af van de erkenning van je diploma en je BIG-registratie. Die beslissingen worden genomen door het BIG-register en de commissie CBGV, niet door ons.',
          'Ook je taalniveau is bepalend: zonder aantoonbare beheersing van het Nederlands is BIG-registratie niet mogelijk.'
        ]],
        ['Huisvesting', [
          'Wij regelen huisvesting voordat je naar Nederland komt. In de eerste periode is dat vaak gedeelde huisvesting met collega’s.',
          'De huisvesting voldoet aan de landelijke norm van minimaal 12 m² woonoppervlak per persoon, met eisen aan privacy, sanitair, hygiëne en brandveiligheid.',
          'De huurprijs spreken wij vooraf met je af. Je gaat een eigen huurovereenkomst aan met de verhuurder of huisvester.'
        ]],
        ['Aansprakelijkheid', [
          'Wij doen ons best de informatie op deze website juist en actueel te houden. Cijfers over de arbeidsmarkt, de woningmarkt en wet- en regelgeving zijn afkomstig uit openbare bronnen en kunnen verouderen; aan die informatie kun je geen rechten ontlenen.',
          'Wij zijn niet aansprakelijk voor beslissingen van derden, waaronder het BIG-register, de commissie CBGV, het partnerbureau, een werkgever of een verhuurder.',
          'Onze aansprakelijkheid is beperkt tot schade die het directe gevolg is van een toerekenbare tekortkoming van onze kant.'
        ]],
        ['Vragen en klachten', [
          'Ben je ergens ontevreden over, laat het ons weten via info@honorcareinternational.com. Wij nemen elke klacht serieus en reageren binnen vier weken.',
          'Gaat je klacht over je arbeidscontract of je loon, dan is het partnerbureau je aanspreekpunt. Wij helpen je de weg te vinden.'
        ]],
        ['Toepasselijk recht', [
          'Op onze dienstverlening is Nederlands recht van toepassing.'
        ]]
      ]
    },
    updatedLabel: 'Laatst bijgewerkt op', versionLabel: 'Versie'
  },

  en: {
    privacy: {
      title: 'Privacy policy',
      intro: 'We process personal data of candidates, healthcare institutions and visitors to this website. Below we explain exactly which data that is, why we process it and what rights you have. In doing so we comply with the General Data Protection Regulation (GDPR).',
      sections: [
        ['Who is responsible?', [
          COMPANY + ' is a trade name of ' + ENTITY + ', which is the data controller for the data collected through this website.',
          'Netherlands — Torenlaan 5A, 1402 BN Bussum. Poland — Białka 15, 09-550 Szczawin Kościelny.',
          'Email: info@honorcareinternational.com · Phone: +31 6 46 15 01 60' + (KVK ? ' · Dutch Chamber of Commerce: ' + KVK : '')
        ]],
        ['Which data do we process?', [
          'Contact form: your name, email address, subject, the content of your message and the language you use the site in.',
          'Meeting request: your name, email address, preferred date and time, topic and the format of the conversation.',
          'Newsletter: your email address and language preference.',
          'Candidate profile in the portal: your name, email address, encrypted password, phone number, country and city, profession and specialisation, years of experience, level of Dutch and English, whether you hold an EU nationality, the status of your BIG registration, your availability date and your motivation.',
          'If you enable two-factor authentication, we store a key for that purpose.',
          'Internal notes: we record the status of your journey and may add internal notes relevant to your guidance.',
          'Technical data: your IP address is used briefly to limit abuse of forms. We use no tracking or advertising cookies and keep no visitor statistics.'
        ]],
        ['Why, and on what legal basis?', [
          'To answer your question and stay in touch — because this is necessary to perform or prepare a contract with you, or on the basis of our legitimate interest in responding to a message.',
          'To guide you towards work in Dutch healthcare: training, diploma recognition, preparation and housing — performance of the contract with you.',
          'To approach you once a suitable position arises — performance of the contract, or your consent if you have only created a profile.',
          'Newsletter — your consent, which you may withdraw at any time.',
          'Security and prevention of abuse — our legitimate interest.'
        ]],
        ['Who do we share data with?', [
          'With our registered partner agency, once you take that step. They handle the official placement and the employer role and are from that moment responsible for the data they process.',
          'With a healthcare institution, only when you agree and an actual introduction is being arranged.',
          'With suppliers who work for us (processors): Railway (hosting and database, EU), Resend (email delivery) and Cloudflare (protecting forms against abuse).',
          'This website loads fonts from Google Fonts and some images from Unsplash. Your IP address is passed to those parties in the process.',
          'We do not sell your data and do not use it for advertising.'
        ]],
        ['How long do we keep data?', [
          'Contact form messages and meeting requests: as long as needed to handle your question, and no more than two years afterwards.',
          'Candidate profiles: for as long as your account exists. If you delete your account or ask us to, we remove your profile.',
          'Newsletter: until you unsubscribe.',
          'We have set these periods as policy; deletion currently takes place on request and during periodic clean-ups.'
        ]],
        ['Cookies', [
          'We place two functional cookies. A language cookie remembers which language you view the site in and lasts one year. A session cookie keeps you logged in to the portal and expires after eight hours or when you log out.',
          'Cloudflare may place a cookie to determine whether you are a genuine visitor when you submit a form.',
          'We use no analytics or advertising cookies. That is why we do not ask for cookie consent.'
        ]],
        ['Security', [
          'The website works exclusively over a secure connection. Passwords are stored encrypted and cannot be read by us. Administrators must use two-factor authentication; for candidates it is available and recommended.',
          'Access to candidate data is limited to staff who need it for guidance.'
        ]],
        ['Your rights', [
          'You have the right to access your data, have it corrected or deleted. You may also object to processing, request restriction and obtain your data in a portable file.',
          'You manage much of your data yourself in the portal under My candidate profile.',
          'For anything else, send a message to info@honorcareinternational.com. We respond within four weeks.',
          'If you disagree with how we handle your data, you may lodge a complaint with the Dutch Data Protection Authority.'
        ]],
        ['Changes', [
          'If our services or this website change, we will update this policy. The date of the last change appears at the bottom of this page.'
        ]]
      ]
    },
    terms: {
      title: 'Terms and conditions',
      intro: 'These terms apply to the use of this website and to our services for candidates and healthcare institutions. Please read them before using our services.',
      sections: [
        ['Who we are and what we do', [
          COMPANY + ' is a trade name of ' + ENTITY + ', registered with the Dutch Chamber of Commerce under number ' + KVK + '. Under that name we recruit healthcare professionals in Spain, other EU countries and Colombia, prepares them for work in Dutch healthcare and supports them during and after that journey.',
          'Our services consist of recruitment and selection, screening and document checks, Dutch language training, support with diploma recognition and BIG registration, arranging housing and guidance after arrival.'
        ]],
        ['What we expressly do not do', [
          'We are not a staffing agency and not an employer. We do not supply workers ourselves.',
          'The official placement, the supply of workers and the employment contract are handled by our registered partner agency. That agency signs the employment contract, pays the salary and carries the employer obligations.',
          'Agreements on salary, terms of employment and contract duration are made with that partner agency, not with us.'
        ]],
        ['Free of charge for candidates', [
          'Our recruitment, preparation, language training and guidance are free of charge for you as a candidate.',
          'We never ask you for a fee in exchange for work or placement. If anyone does ask you for that, please contact us.',
          'Costs you do bear yourself: your rent once you live in the Netherlands, the examination fee for the Staatsexamen NT2, the cost of your BIG registration and obtaining official documents in your own country. We make those costs clear in advance.'
        ]],
        ['What we expect from you', [
          'That you provide accurate and complete information and report changes in your situation immediately.',
          'That you take an active part in the language training and remain reachable for your coordinator.',
          'That you are genuinely prepared to move to the Netherlands.',
          'If information proves incorrect or you structurally do not take part, we may end the guidance.'
        ]],
        ['No guarantee of placement', [
          'We do our utmost to make your journey succeed, but we cannot guarantee a job.',
          'Whether you may work in a regulated profession in the Netherlands depends on the recognition of your diploma and your BIG registration. Those decisions are taken by the BIG register and the CBGV committee, not by us.',
          'Your language level is decisive too: without demonstrable command of Dutch, BIG registration is not possible.'
        ]],
        ['Housing', [
          'We arrange housing before you travel to the Netherlands. In the first period this is often shared housing with colleagues.',
          'The housing meets the national standard of at least 12 m² of living space per person, with requirements for privacy, sanitation, hygiene and fire safety.',
          'We agree the rent with you in advance. You enter into your own rental agreement with the landlord or housing provider.'
        ]],
        ['Liability', [
          'We do our best to keep the information on this website correct and current. Figures on the labour market, the housing market and legislation come from public sources and may become outdated; no rights can be derived from that information.',
          'We are not liable for decisions by third parties, including the BIG register, the CBGV committee, the partner agency, an employer or a landlord.',
          'Our liability is limited to damage that is the direct result of an attributable failure on our part.'
        ]],
        ['Questions and complaints', [
          'If you are dissatisfied with something, let us know at info@honorcareinternational.com. We take every complaint seriously and respond within four weeks.',
          'If your complaint concerns your employment contract or your salary, the partner agency is your point of contact. We will help you find your way.'
        ]],
        ['Applicable law', [
          'Dutch law applies to our services.'
        ]]
      ]
    },
    updatedLabel: 'Last updated on', versionLabel: 'Version'
  },

  es: {
    privacy: {
      title: 'Política de privacidad',
      intro: 'Tratamos datos personales de candidatos, centros sanitarios y visitantes de esta web. A continuación explicamos exactamente qué datos son, por qué los tratamos y qué derechos tienes. Cumplimos con el Reglamento General de Protección de Datos (RGPD).',
      sections: [
        ['¿Quién es responsable?', [
          COMPANY + ' es un nombre comercial de ' + ENTITY + ', que es el responsable del tratamiento de los datos recogidos a través de esta web.',
          'Países Bajos — Torenlaan 5A, 1402 BN Bussum. Polonia — Białka 15, 09-550 Szczawin Kościelny.',
          'Correo: info@honorcareinternational.com · Teléfono: +31 6 46 15 01 60' + (KVK ? ' · Registro mercantil neerlandés: ' + KVK : '')
        ]],
        ['¿Qué datos tratamos?', [
          'Formulario de contacto: tu nombre, correo electrónico, asunto, el contenido de tu mensaje y el idioma en el que usas la web.',
          'Solicitud de reunión: tu nombre, correo, fecha y hora deseadas, tema y formato de la conversación.',
          'Boletín: tu correo electrónico y preferencia de idioma.',
          'Perfil de candidato en el portal: nombre, correo, contraseña cifrada, teléfono, país y ciudad, profesión y especialidad, años de experiencia, nivel de neerlandés e inglés, si tienes nacionalidad de la UE, el estado de tu registro BIG, tu disponibilidad y tu motivación.',
          'Si activas la verificación en dos pasos, guardamos una clave para ello.',
          'Notas internas: registramos el estado de tu recorrido y podemos añadir notas internas relevantes para el acompañamiento.',
          'Datos técnicos: tu dirección IP se usa brevemente para limitar el abuso de los formularios. No usamos cookies de seguimiento ni publicitarias y no llevamos estadísticas de visitas.'
        ]],
        ['¿Por qué y con qué base legal?', [
          'Para responder a tu consulta y mantener el contacto: porque es necesario para ejecutar o preparar un contrato contigo, o por nuestro interés legítimo en responder a un mensaje.',
          'Para acompañarte hacia un empleo en la sanidad neerlandesa: formación, homologación, preparación y alojamiento — ejecución del contrato contigo.',
          'Para contactarte cuando surja un puesto adecuado — ejecución del contrato o tu consentimiento si solo has creado un perfil.',
          'Boletín — tu consentimiento, que puedes retirar en cualquier momento.',
          'Seguridad y prevención del abuso — nuestro interés legítimo.'
        ]],
        ['¿Con quién compartimos los datos?', [
          'Con nuestra agencia asociada registrada, cuando des ese paso. Ella gestiona la colocación oficial y la condición de empleador y, a partir de entonces, es responsable de los datos que trata.',
          'Con un centro sanitario, solo si estás de acuerdo y hay una presentación concreta.',
          'Con proveedores que trabajan para nosotros (encargados): Railway (alojamiento y base de datos, UE), Resend (envío de correo) y Cloudflare (protección de formularios frente al abuso).',
          'Esta web carga tipografías de Google Fonts y algunas imágenes de Unsplash. En ese proceso se transmite tu dirección IP a esas partes.',
          'No vendemos tus datos ni los usamos con fines publicitarios.'
        ]],
        ['¿Cuánto tiempo conservamos los datos?', [
          'Mensajes del formulario y solicitudes de reunión: mientras sea necesario para atender tu consulta y, como máximo, dos años después.',
          'Perfiles de candidato: mientras exista tu cuenta. Si la eliminas o nos lo pides, borramos tu perfil.',
          'Boletín: hasta que te des de baja.',
          'Hemos fijado estos plazos como política; la eliminación se realiza actualmente a petición y en limpiezas periódicas.'
        ]],
        ['Cookies', [
          'Usamos dos cookies funcionales. Una cookie de idioma recuerda en qué idioma ves la web y dura un año. Una cookie de sesión te mantiene conectado al portal y caduca a las ocho horas o al cerrar sesión.',
          'Cloudflare puede colocar una cookie para determinar si eres un visitante real cuando envías un formulario.',
          'No usamos cookies analíticas ni publicitarias. Por eso tampoco pedimos consentimiento de cookies.'
        ]],
        ['Seguridad', [
          'La web funciona exclusivamente mediante conexión segura. Las contraseñas se almacenan cifradas y no podemos leerlas. Los administradores usan obligatoriamente verificación en dos pasos; para candidatos está disponible y es recomendable.',
          'El acceso a los datos de candidatos se limita al personal que los necesita para el acompañamiento.'
        ]],
        ['Tus derechos', [
          'Tienes derecho a acceder a tus datos, rectificarlos o suprimirlos. También puedes oponerte al tratamiento, solicitar su limitación y obtener tus datos en un archivo portátil.',
          'Muchos datos los gestionas tú mismo en el portal, en Mi perfil de candidato.',
          'Para cualquier otra cosa, escribe a info@honorcareinternational.com. Respondemos en un plazo de cuatro semanas.',
          'Si no estás de acuerdo con cómo tratamos tus datos, puedes presentar una reclamación ante la autoridad de protección de datos neerlandesa.'
        ]],
        ['Cambios', [
          'Si cambian nuestros servicios o esta web, actualizaremos esta política. La fecha del último cambio figura al final de esta página.'
        ]]
      ]
    },
    terms: {
      title: 'Términos y condiciones',
      intro: 'Estas condiciones se aplican al uso de esta web y a nuestros servicios para candidatos y centros sanitarios. Léelas antes de usar nuestros servicios.',
      sections: [
        ['Quiénes somos y qué hacemos', [
          COMPANY + ' es un nombre comercial de ' + ENTITY + ', inscrita en el registro mercantil neerlandés con el número ' + KVK + '. Bajo ese nombre captamos profesionales sanitarios en España, otros países de la UE y Colombia, los prepara para trabajar en la sanidad neerlandesa y los acompaña durante y después de ese recorrido.',
          'Nuestros servicios incluyen captación y selección, evaluación y verificación de documentos, formación en neerlandés, apoyo con la homologación y el registro BIG, la gestión del alojamiento y el acompañamiento tras la llegada.'
        ]],
        ['Lo que expresamente no hacemos', [
          'No somos una empresa de trabajo temporal ni un empleador. No cedemos trabajadores por nuestra cuenta.',
          'La intermediación laboral oficial, la cesión de personal y el contrato de trabajo los gestiona nuestra agencia asociada registrada. Esa agencia firma el contrato, paga el salario y asume las obligaciones del empleador.',
          'Los acuerdos sobre salario, condiciones laborales y duración del contrato se pactan con esa agencia, no con nosotros.'
        ]],
        ['Gratuito para los candidatos', [
          'Nuestra captación, preparación, formación lingüística y acompañamiento son gratuitos para ti como candidato.',
          'Nunca te pedimos una compensación a cambio de trabajo o intermediación. Si alguien lo hace, ponte en contacto con nosotros.',
          'Sí corren por tu cuenta: el alquiler cuando vivas en los Países Bajos, la tasa del Staatsexamen NT2, el coste de tu registro BIG y la obtención de documentos oficiales en tu país. Te informamos de esos costes por adelantado.'
        ]],
        ['Qué esperamos de ti', [
          'Que facilites información correcta y completa y comuniques de inmediato los cambios en tu situación.',
          'Que participes activamente en la formación lingüística y sigas localizable para tu coordinador.',
          'Que estés realmente dispuesto a mudarte a los Países Bajos.',
          'Si la información resulta incorrecta o no participas de forma estructural, podemos poner fin al acompañamiento.'
        ]],
        ['Sin garantía de colocación', [
          'Nos esforzamos al máximo para que tu recorrido tenga éxito, pero no podemos garantizar un empleo.',
          'Que puedas ejercer una profesión regulada en los Países Bajos depende del reconocimiento de tu título y de tu registro BIG. Esas decisiones las toman el registro BIG y la comisión CBGV, no nosotros.',
          'Tu nivel de idioma también es determinante: sin un dominio acreditado del neerlandés no es posible el registro BIG.'
        ]],
        ['Alojamiento', [
          'Organizamos el alojamiento antes de que viajes a los Países Bajos. En la primera etapa suele ser vivienda compartida con compañeros.',
          'El alojamiento cumple la norma nacional de un mínimo de 12 m² de superficie habitable por persona, con exigencias de privacidad, sanitarios, higiene y seguridad contra incendios.',
          'El alquiler se acuerda contigo de antemano. Firmas tu propio contrato de arrendamiento con el arrendador o la empresa de alojamiento.'
        ]],
        ['Responsabilidad', [
          'Procuramos mantener la información de esta web correcta y actualizada. Las cifras sobre el mercado laboral, el mercado de vivienda y la normativa proceden de fuentes públicas y pueden quedar desfasadas; de esa información no se derivan derechos.',
          'No somos responsables de las decisiones de terceros, incluidos el registro BIG, la comisión CBGV, la agencia asociada, un empleador o un arrendador.',
          'Nuestra responsabilidad se limita a los daños que sean consecuencia directa de un incumplimiento imputable por nuestra parte.'
        ]],
        ['Preguntas y reclamaciones', [
          'Si algo no te satisface, háznoslo saber en info@honorcareinternational.com. Tomamos en serio cada reclamación y respondemos en cuatro semanas.',
          'Si tu reclamación se refiere a tu contrato o tu salario, tu interlocutor es la agencia asociada. Te ayudamos a orientarte.'
        ]],
        ['Legislación aplicable', [
          'A nuestros servicios se les aplica el derecho neerlandés.'
        ]]
      ]
    },
    updatedLabel: 'Última actualización', versionLabel: 'Versión'
  },

  pl: {
    privacy: {
      title: 'Polityka prywatności',
      intro: 'Przetwarzamy dane osobowe kandydatów, placówek medycznych i odwiedzających tę stronę. Poniżej wyjaśniamy dokładnie, jakie to dane, dlaczego je przetwarzamy i jakie masz prawa. Działamy zgodnie z RODO.',
      sections: [
        ['Kto jest administratorem?', [
          COMPANY + ' jest nazwą handlową spółki ' + ENTITY + ', która jest administratorem danych zbieranych za pośrednictwem tej strony.',
          'Holandia — Torenlaan 5A, 1402 BN Bussum. Polska — Białka 15, 09-550 Szczawin Kościelny.',
          'E-mail: info@honorcareinternational.com · Telefon: +31 6 46 15 01 60' + (KVK ? ' · Holenderski rejestr handlowy: ' + KVK : '')
        ]],
        ['Jakie dane przetwarzamy?', [
          'Formularz kontaktowy: imię i nazwisko, adres e-mail, temat, treść wiadomości oraz język, w którym korzystasz ze strony.',
          'Prośba o rozmowę: imię i nazwisko, e-mail, preferowana data i godzina, temat oraz forma rozmowy.',
          'Newsletter: adres e-mail i preferencja językowa.',
          'Profil kandydata w portalu: imię i nazwisko, e-mail, zaszyfrowane hasło, telefon, kraj i miasto, zawód i specjalizacja, lata doświadczenia, poziom niderlandzkiego i angielskiego, obywatelstwo UE, status rejestracji BIG, dostępność i motywacja.',
          'Jeśli włączysz weryfikację dwuetapową, przechowujemy odpowiedni klucz.',
          'Notatki wewnętrzne: zapisujemy status Twojej ścieżki i możemy dodawać notatki istotne dla opieki.',
          'Dane techniczne: adres IP jest używany krótkotrwale, aby ograniczyć nadużycia formularzy. Nie stosujemy plików śledzących ani reklamowych i nie prowadzimy statystyk odwiedzin.'
        ]],
        ['Dlaczego i na jakiej podstawie?', [
          'Aby odpowiedzieć na Twoje pytanie i utrzymać kontakt — ponieważ jest to niezbędne do wykonania lub przygotowania umowy z Tobą, albo w naszym uzasadnionym interesie odpowiedzi na wiadomość.',
          'Aby poprowadzić Cię do pracy w holenderskiej opiece: szkolenie, uznanie dyplomu, przygotowanie i zakwaterowanie — wykonanie umowy z Tobą.',
          'Aby skontaktować się z Tobą, gdy pojawi się odpowiednie stanowisko — wykonanie umowy albo Twoja zgoda, jeśli utworzyłeś jedynie profil.',
          'Newsletter — Twoja zgoda, którą możesz w każdej chwili wycofać.',
          'Bezpieczeństwo i przeciwdziałanie nadużyciom — nasz uzasadniony interes.'
        ]],
        ['Komu przekazujemy dane?', [
          'Naszemu zarejestrowanemu biuru partnerskiemu, gdy zdecydujesz się na ten krok. Realizuje ono oficjalne pośrednictwo i rolę pracodawcy i od tego momentu samo odpowiada za przetwarzane dane.',
          'Placówce medycznej — wyłącznie za Twoją zgodą i przy konkretnym spotkaniu rekrutacyjnym.',
          'Dostawcom pracującym na nasze zlecenie (podmiotom przetwarzającym): Railway (hosting i baza danych, UE), Resend (wysyłka poczty) i Cloudflare (ochrona formularzy przed nadużyciami).',
          'Ta strona ładuje czcionki z Google Fonts oraz część zdjęć z Unsplash. Twój adres IP jest przy tym przekazywany tym podmiotom.',
          'Nie sprzedajemy Twoich danych i nie wykorzystujemy ich do reklam.'
        ]],
        ['Jak długo przechowujemy dane?', [
          'Wiadomości z formularza i prośby o rozmowę: tak długo, jak to potrzebne do obsługi sprawy, i maksymalnie dwa lata później.',
          'Profile kandydatów: dopóki istnieje Twoje konto. Gdy je usuniesz lub o to poprosisz, kasujemy profil.',
          'Newsletter: do momentu wypisania się.',
          'Terminy te przyjęliśmy jako politykę; usuwanie odbywa się obecnie na żądanie oraz przy okresowych porządkach.'
        ]],
        ['Pliki cookie', [
          'Stosujemy dwa funkcjonalne pliki cookie. Językowy zapamiętuje wersję językową strony i działa rok. Sesyjny utrzymuje zalogowanie w portalu i wygasa po ośmiu godzinach lub przy wylogowaniu.',
          'Cloudflare może umieścić plik cookie, aby przy wysyłce formularza ustalić, czy jesteś prawdziwym użytkownikiem.',
          'Nie stosujemy plików analitycznych ani reklamowych. Dlatego nie prosimy o zgodę na cookies.'
        ]],
        ['Bezpieczeństwo', [
          'Strona działa wyłącznie przez bezpieczne połączenie. Hasła przechowujemy w postaci zaszyfrowanej i nie możemy ich odczytać. Administratorzy obowiązkowo korzystają z weryfikacji dwuetapowej; kandydaci mogą ją włączyć i jest to zalecane.',
          'Dostęp do danych kandydatów mają wyłącznie pracownicy, którzy potrzebują ich do prowadzenia opieki.'
        ]],
        ['Twoje prawa', [
          'Masz prawo wglądu w swoje dane, ich sprostowania lub usunięcia. Możesz też wnieść sprzeciw, żądać ograniczenia przetwarzania i otrzymać dane w formacie przenośnym.',
          'Wiele danych kontrolujesz sam w portalu, w sekcji Mój profil kandydata.',
          'W pozostałych sprawach napisz na info@honorcareinternational.com. Odpowiadamy w ciągu czterech tygodni.',
          'Jeśli nie zgadzasz się ze sposobem przetwarzania danych, możesz złożyć skargę do holenderskiego organu ochrony danych.'
        ]],
        ['Zmiany', [
          'Gdy zmienią się nasze usługi lub strona, zaktualizujemy tę politykę. Data ostatniej zmiany znajduje się na dole strony.'
        ]]
      ]
    },
    terms: {
      title: 'Regulamin',
      intro: 'Niniejszy regulamin dotyczy korzystania z tej strony oraz naszych usług dla kandydatów i placówek medycznych. Zapoznaj się z nim przed skorzystaniem z naszych usług.',
      sections: [
        ['Kim jesteśmy i co robimy', [
          COMPANY + ' jest nazwą handlową spółki ' + ENTITY + ', wpisanej do holenderskiego rejestru handlowego pod numerem ' + KVK + '. Pod tą nazwą rekrutujemy profesjonalistów medycznych w Hiszpanii, innych krajach UE i Kolumbii, przygotowuje ich do pracy w holenderskiej opiece zdrowotnej i wspiera w trakcie oraz po tej ścieżce.',
          'Nasze usługi obejmują rekrutację i selekcję, weryfikację i sprawdzenie dokumentów, kurs niderlandzkiego, wsparcie przy uznaniu dyplomu i rejestracji BIG, organizację zakwaterowania oraz opiekę po przyjeździe.'
        ]],
        ['Czego wyraźnie nie robimy', [
          'Nie jesteśmy agencją pracy tymczasowej ani pracodawcą. Sami nie udostępniamy pracowników.',
          'Oficjalne pośrednictwo pracy, udostępnianie pracowników i zatrudnienie realizuje nasze zarejestrowane biuro partnerskie. To ono zawiera umowę o pracę, wypłaca wynagrodzenie i ponosi obowiązki pracodawcy.',
          'Ustalenia dotyczące wynagrodzenia, warunków pracy i czasu trwania umowy zawierasz z tym biurem, a nie z nami.'
        ]],
        ['Bezpłatnie dla kandydatów', [
          'Nasza rekrutacja, przygotowanie, kurs językowy i opieka są dla Ciebie jako kandydata bezpłatne.',
          'Nigdy nie żądamy od Ciebie opłaty w zamian za pracę czy pośrednictwo. Jeśli ktokolwiek tego żąda, skontaktuj się z nami.',
          'Koszty, które ponosisz sam: czynsz po zamieszkaniu w Holandii, opłata egzaminacyjna Staatsexamen NT2, koszt rejestracji BIG oraz uzyskanie oficjalnych dokumentów w swoim kraju. Informujemy o nich z góry.'
        ]],
        ['Czego oczekujemy od Ciebie', [
          'Że podasz prawdziwe i kompletne informacje oraz niezwłocznie zgłosisz zmiany w swojej sytuacji.',
          'Że będziesz aktywnie uczestniczyć w kursie językowym i pozostaniesz dostępny dla koordynatora.',
          'Że jesteś rzeczywiście gotów przeprowadzić się do Holandii.',
          'Jeśli informacje okażą się nieprawdziwe albo systematycznie nie uczestniczysz w ścieżce, możemy zakończyć opiekę.'
        ]],
        ['Brak gwarancji zatrudnienia', [
          'Dokładamy starań, aby Twoja ścieżka się powiodła, ale nie możemy zagwarantować pracy.',
          'To, czy możesz wykonywać zawód regulowany w Holandii, zależy od uznania dyplomu i rejestracji BIG. Decyzje podejmuje rejestr BIG i komisja CBGV, a nie my.',
          'Decydujący jest też poziom językowy: bez udokumentowanej znajomości niderlandzkiego rejestracja BIG nie jest możliwa.'
        ]],
        ['Zakwaterowanie', [
          'Zakwaterowanie organizujemy przed Twoim przyjazdem do Holandii. W pierwszym okresie jest to zwykle mieszkanie dzielone z kolegami.',
          'Zakwaterowanie spełnia normę krajową: minimum 12 m² powierzchni mieszkalnej na osobę, z wymogami prywatności, sanitariatów, higieny i ochrony przeciwpożarowej.',
          'Czynsz ustalamy z Tobą z góry. Zawierasz własną umowę najmu z wynajmującym lub firmą kwaterunkową.'
        ]],
        ['Odpowiedzialność', [
          'Staramy się, aby informacje na tej stronie były poprawne i aktualne. Dane o rynku pracy, rynku mieszkaniowym i przepisach pochodzą ze źródeł publicznych i mogą się zdezaktualizować; nie stanowią podstawy roszczeń.',
          'Nie odpowiadamy za decyzje osób trzecich, w tym rejestru BIG, komisji CBGV, biura partnerskiego, pracodawcy czy wynajmującego.',
          'Nasza odpowiedzialność ogranicza się do szkody będącej bezpośrednim skutkiem zawinionego uchybienia po naszej stronie.'
        ]],
        ['Pytania i skargi', [
          'Jeśli coś Ci nie odpowiada, napisz na info@honorcareinternational.com. Każdą skargę traktujemy poważnie i odpowiadamy w ciągu czterech tygodni.',
          'Jeśli skarga dotyczy umowy o pracę lub wynagrodzenia, punktem kontaktu jest biuro partnerskie. Pomożemy Ci się zorientować.'
        ]],
        ['Prawo właściwe', [
          'Do naszych usług stosuje się prawo holenderskie.'
        ]]
      ]
    },
    updatedLabel: 'Ostatnia aktualizacja', versionLabel: 'Wersja'
  }
};

function renderLegal(kind, lang, esc) {
  const t = (L[lang] || L.nl)[kind];
  const meta = L[lang] || L.nl;
  const secties = t.sections.map(([kop, regels], i) => `<section class="lg-sec">
<h2><span class="lg-n">${i + 1}</span>${esc(kop)}</h2>
${regels.map(r => `<p>${esc(r)}</p>`).join('')}
</section>`).join('');
  return `<section class="page has-hero"><div class="lg-doc">
<p class="lg-intro">${esc(t.intro)}</p>
${secties}
<p class="lg-updated">${esc(meta.versionLabel)} ${DOC_VERSION[kind]} &middot; ${esc(meta.updatedLabel)} ${UPDATED}</p>
</div></section>`;
}

function legalTitle(kind, lang) { return ((L[lang] || L.nl)[kind]).title; }

module.exports = { renderLegal, legalTitle };
