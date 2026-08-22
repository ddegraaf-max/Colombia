// Versieoverzicht. Elke deploy krijgt een nummer en een regel hier, zodat
// achteraf te zien is wat er wanneer is gewijzigd. Het nummer moet gelijk
// lopen met "version" in package.json.

const VERSIONS = [
  {
    v: '62.0.0', date: '22-08-2026', title: 'Opmaakfouten op de salarispagina en in de titel verholpen',
    items: [
      'Kopjes in de kaarten stonden gecentreerd en te klein: de regel voor de blokkop raakte ook de kaarten eronder',
      'Vier kaarten in een rooster van drie gaven een weesje op de tweede regel; op de salarispagina staan ze nu twee bij twee',
      'Het blok met vakantiegeld, dertiende maand en toeslagen heeft drie kaarten en staat nu netjes naast elkaar',
      'De titel op de homepagina brak midden in het woord zorgoplossingen af; koppen breken nu alleen nog met een koppelteken en de titel krimpt mee met het scherm',
      'Vakbekwaamheidsverklaring hernoemd naar verklaring van vakbekwaamheid, want 25 letters passen niet in een kopje',
      'Alle pagina’s op acht schermbreedtes nagemeten: geen afgebroken woorden in koppen en geen losse kaarten meer'
    ]
  },
  {
    v: '61.0.0', date: '22-08-2026', title: 'Colombia naast Nederland, met een eerlijke doorlooptijd',
    items: [
      'Tweede vergelijkingsblok op de salarispagina: wat een auxiliar de enfermería en een enfermero profesional nu in Colombia verdienen, naast het Nederlandse bedrag',
      'Colombiaanse bedragen in pesos omgerekend tegen 3.566 peso per euro, gerekend met dertien betalingen per jaar inclusief de prima de servicios',
      'Wettelijk minimumloon 2026 van 1.750.905 peso plus 249.095 peso vervoerstoeslag als ijkpunt genoemd',
      'Koopkrachttabel corrigeert voor het 55,3% goedkopere leven in Colombia; ook daarna blijft het verschil 39 tot 127 procent',
      'Eigen blok over wat de route buiten de EU extra vraagt: visum en gecombineerde vergunning met arbeidsmarkttoets, vakbekwaamheidsverklaring, taalcertificaten en de BI-toets',
      'Doorlooptijd eerlijk benoemd: 18 tot 30 maanden of langer, en de wachtlijst voor de BI-toets zat in mei 2026 vol',
      'Status ROUTE IN OPBOUW bij het blok, zodat niemand denkt dat dit traject vandaag al loopt',
      'Ethische verantwoording erbij: Colombia staat niet op de WHO-lijst van kwetsbare landen; in de Amerika\u2019s staat daar alleen Haïti op',
      'Verpleegkundigen per 1.000 inwoners: 1,3 in Colombia tegen 9 in de OESO en 11,5 in Nederland',
      'Zeven bronnen bij dit blok, in vier talen'
    ]
  },
  {
    v: '60.0.0', date: '22-08-2026', title: 'Mobiel nagelopen: geen zijwaarts schuiven meer en grotere tikdoelen',
    items: [
      'De hele site gemeten in een echte mobiele browser op 375, 360 en 320 pixels breed, in alle vier de talen',
      'Homepagina schoof zijwaarts op de Nederlandse versie: de balk met specialisaties werd 438 pixels breed op een scherm van 375',
      'Contactpagina schoof zijwaarts in het Pools, Spaans en Engels door het lange e-mailadres',
      'De uitkomst van de keuzehulp schoof zijwaarts op de Nederlandse versie door de lange woorden in de labels',
      'Oorzaak van alle drie was dezelfde: kolommen in een rooster krimpen standaard niet onder de breedte van hun langste woord',
      'Tikdoelen vergroot naar 40 pixels: telefoonnummer en e-mailadres in de balk bovenaan en in de voettekst, bronlinks, taalkeuze en de taalknoppen in het portaal',
      'Kleine bijschriften bij de grafieken van 11,5 naar 12,5 pixels op mobiel',
      'Alle 81 interne links in vier talen gecontroleerd: geen gebroken link, elke pagina heeft een titel, een h1, het juiste taalattribuut en alt-teksten',
      'Taalkeuze bovenaan opende op mobiel 55 pixels buiten het scherm; die staat nu vast aan de bovenbalk'
    ]
  },
  {
    v: '59.0.0', date: '22-08-2026', title: 'Spanje naast Nederland: de vergelijking die de rest niet laat zien',
    items: [
      'Nieuw blok bovenaan de salarispagina: wat een Spaanse auxiliar en enfermero nu verdienen, naast het Nederlandse bedrag',
      'Kernpunt uitgelicht: al in de ondersteunende functie, nog voor de BIG-registratie, verdient een kandidaat meer dan een enfermero aan het begin van zijn loopbaan in Spanje',
      'Tweede tabel corrigeert voor het duurdere leven in Nederland, zodat het verschil in koopkracht zichtbaar wordt in plaats van alleen het brutobedrag',
      'Uitleg waarom die correctie voor onze kandidaten milder uitpakt: de huur loopt via de werkgever en is vooraf afgesproken, niet de Nederlandse marktprijs',
      'Argumenten buiten het geld: 76,7% tijdelijke contracten in Spanje in 2025, en 6,45 verpleegkundigen per 1.000 inwoners tegenover 11,5 in Nederland',
      'Eigen blok met wat er tegenover staat: je begint onder je niveau, de taal is een harde eis, je deelt eerst je woning en je woont ver van familie',
      'Vijf bronnen bij de vergelijking, zodat elk cijfer te controleren is',
      'De Nederlandse bedragen worden berekend uit de CAO-tabel, dus een nieuwe CAO werkt automatisch door in de vergelijking'
    ]
  },
  {
    v: '58.0.0', date: '22-08-2026', title: 'Salarispagina met keuzehulp',
    items: [
      'Nieuwe pagina /salaris in vier talen: wat je verdient in de Nederlandse zorg, met de CAO VVT-tabel per 1 juli 2026',
      'Uitleg dat de CAO ook geldt via het partnerbureau: sinds 1 januari 2026 eist de uitzend-CAO een gelijkwaardig arbeidsvoorwaardenpakket',
      'Volledige FWG-tabel van schaal 15 tot 50, met de startfuncties uitgelicht',
      'Onregelmatigheidstoeslag per tijdvak (22% tot 60%), vakantiegeld 8% en eindejaarsuitkering 8,33%',
      'Keuzehulp: vijf vragen over diploma, ervaring, taalniveau, uren en diensten, en je ziet wat je verdient tijdens het traject en na de BIG-registratie',
      'De keuzehulp rekent in de browser van de bezoeker; er wordt niets opgeslagen of verstuurd en er komt geen externe dienst aan te pas',
      'Per taalniveau een passend advies over de volgende stap, met knoppen naar het contactformulier en het profiel',
      'Bronvermelding onderaan de pagina, zodat elk bedrag te controleren is',
      'Salaris opgenomen in het menu en de voettekst, met knoppen op de kandidaten-, huisvestings- en instellingenpagina',
      'Academie-kaart noemde nog online training vanuit Colombia; dat is nu vanuit je eigen land'
    ]
  },
  {
    v: '57.0.0', date: '22-08-2026', title: 'Huisvesting eerlijk verwoord, werken tijdens het traject overal zichtbaar',
    items: [
      'Huisvesting stond op de site als iets wat wij alleen regelen; dat is nu overal: wij coordineren en toetsen, de werkgever of het partnerbureau levert de woning',
      'Aangepast in vier talen op de homepage, de kandidatenpagina, de huisvestingspagina, de EU-route, de instellingenpagina, de Nederland-pagina, de vragenlijsten en de voorwaarden',
      'Twee nieuwe vragen bij huisvesting: wie regelt mijn woning en betaal ik de huur zelf',
      'Werken met salaris tijdens het traject staat nu ook op de homepage, als eigen blok op de kandidatenpagina en als aparte stap in de EU-route',
      'Traject uitgebreid naar negen fasen: doorgroei naar de verpleegkundige functie is nu een eigen fase in het kandidaatportaal en in de kaartenbank',
      'Instellingen zien nu expliciet dat huisvesting of hulp daarbij van hen wordt gevraagd',
      'Academie: cursus A1-A2 staat als eigen instap van de kandidaat, in lijn met de kostenregel uit versie 56',
      'Vlakken op de site kregen echte opmaak: witte kaarten met gouden accent, schaduw en hover in plaats van kale tekstblokken',
      'Algemene voorwaarden naar documentversie 1.4'
    ]
  },
  {
    v: '56.0.0', date: '22-08-2026', title: 'Kosten kloppend gemaakt: basis tot A2 doet de kandidaat zelf',
    items: [
      'De site beloofde op acht plekken in vier talen dat het traject volledig kosteloos was; dat klopte niet meer',
      'Overal aangepast: de basiscursus tot A2 regelt en betaalt de kandidaat zelf bij een taalschool naar keuze, vanaf A2 is onze dienstverlening kosteloos',
      'De kandidaat betaalt die school rechtstreeks en nooit aan ons; dat blijft zo in verband met het betaalverbod in de Waadi',
      'Op de EU-route staat zelf beginnen met Nederlands nu als expliciete instapeis',
      'Instellingenpagina gebruikt het als kwaliteitssignaal: wie op eigen kracht A2 haalt, meent het',
      'Algemene voorwaarden naar documentversie 1.3; disclaimer op elke pagina en in elke e-mail aangepast'
    ]
  },
  {
    v: '55.0.0', date: '22-08-2026', title: 'Geen echte berichten meer kwijtraken',
    items: [
      'Een bericht dat Turnstile niet haalt wordt niet langer stilzwijgend weggegooid: het komt gewoon binnen, met [niet geverifieerd] in de onderwerpregel en een toelichting in de mail',
      'Turnstile ververst zijn token nu automatisch; anders verliep die na vijf minuten terwijl iemand nog aan het typen was',
      'Elke weigering wordt apart gelogd met de reden: verborgen veld, verlopen token of te veel berichten vanaf een IP-adres',
      'Logteksten van Pools naar Nederlands'
    ]
  },
  {
    v: '54.0.0', date: '22-08-2026', title: 'Nieuwe werkwijze: werken tijdens het leren',
    items: [
      'Instellingenpagina herbouwd rond twee fasen: de kandidaat start binnen enkele maanden in een ondersteunende functie en groeit door naar BIG-geregistreerd verpleegkundige',
      'Expliciete juridische regel op die pagina: tot de BIG-registratie rond is werkt de kandidaat niet als verpleegkundige en voert hij geen voorbehouden handelingen zelfstandig uit',
      'Drie kolommen met de rolverdeling: wat wij doen, wat het partnerbureau doet en wat wij van de instelling vragen',
      'EU-route en kandidaten-FAQ vertellen nu dat je met salaris kunt starten in plaats van maandenlang onbetaald thuis te studeren',
      'Carrousel aangepast: de laatste fase noemt de doorgroei naar de verpleegkundige functie',
      'Bewust geen tarieven op de site: dat is bij concurrenten ook nergens te vinden en hoort aan tafel thuis'
    ]
  },
  {
    v: '53.0.0', date: '22-08-2026', title: 'Mijlpaalbetalingen in het tariefmodel',
    items: [
      'Nieuw blok in het tariefmodel: vul per mijlpaal in hoeveel procent van je kosten je hebt gemaakt en hoeveel procent van de fee je hebt ontvangen',
      'Per mijlpaal zie je direct wat een afhakende kandidaat je op dat moment kost',
      'Vergelijking tussen het huidige risico (alles pas bij plaatsing betaald) en het risico met mijlpaalbetalingen',
      'Veld om met je werkelijk afgesproken tarief te rekenen in plaats van het geadviseerde',
      'Waarschuwing als de feepercentages niet optellen tot honderd'
    ]
  },
  {
    v: '52.0.0', date: '22-08-2026', title: 'Gebruikers met eigen taal, veldnamen en klokken',
    items: [
      'Gebruikersbeheer: maak accounts aan voor collega’s, elk met een eigen taal voor het beheerportaal (Nederlands, Engels, Spaans of Pools)',
      'Menu, knoppen en paginakoppen van het beheerportaal vertaald; vrije tekst van kandidaten blijft in de oorspronkelijke taal',
      'Je kunt 2FA van een collega resetten en je eigen account niet verwijderen',
      'Bij kandidaten heette het veld Taalniveau Pools; dat is nu Taalniveau Nederlands',
      'Standaardland bij nieuwe kandidaten van Kolumbia naar Spanje, en Visum in de pijplijn vervangen door BIG-registratie',
      'Klok voor Spanje toegevoegd naast Nederland en Colombia',
      'Postcode van het kantoor gecorrigeerd naar 1402 AT'
    ]
  },
  {
    v: '51.0.0', date: '22-08-2026', title: 'Automatisch opruimen, Pools kantoor weg, gespreksformulier',
    items: [
      'Berichten en gespreksaanvragen worden na 24 maanden automatisch verwijderd; de opruiming draait bij het opstarten en daarna dagelijks, en wordt gelogd',
      'Zandloper in de berichtenlijst laat per bericht zien hoelang het nog bewaard blijft; groen bij ruim de tijd, oranje binnen een half jaar, rood binnen een maand',
      'Het Poolse kantooradres is overal verwijderd — site, contactpagina, e-mails en juridische documenten — omdat het geen vestiging van Creditline B.V. is',
      'Op de contactpagina staat nu een WhatsApp-kaart in plaats van het Poolse adres',
      'Gespreksformulier: je kiest de taal waarin je het gesprek wilt voeren, en het onderwerp is verplicht geworden',
      'Documentversie van privacybeleid en voorwaarden naar 1.2: de bewaartermijn wordt nu automatisch afgedwongen'
    ]
  },
  {
    v: '50.0.0', date: '22-08-2026', title: 'Beveiligingscontrole',
    items: [
      'Alle 20 beheerpagina’s, schrijfacties en portaalpagina’s gecontroleerd: zonder login geen toegang',
      'Testdocumenten staan uit in productie',
      'HSTS-header toegevoegd: browsers gebruiken voortaan altijd https',
      'Nieuwsbriefformulier kreeg dezelfde antispam als de andere formulieren: verborgen veld en tijdgebonden token naast de limiet per IP'
    ]
  },
  {
    v: '49.0.0', date: '22-08-2026', title: 'Berichtenbak met bulkacties',
    items: [
      'Berichten aanvinken en in één keer verwijderen of archiveren, in plaats van elk bericht apart openen',
      'Knop die alle berichten met een spamvermoeden tegelijk selecteert; er wordt nooit automatisch iets verwijderd',
      'Spamvermoeden op basis van links, spamwoorden, schriftsoort en lengte — gemarkeerd in de lijst',
      'Bericht is direct leesbaar in de lijst, dus beoordelen kan zonder klikken',
      'Alles selecteren, shift-klik voor een reeks, en een bevestiging met het aantal vóór verwijderen',
      'Zoeken op naam, e-mail, onderwerp of inhoud en filteren op status'
    ]
  },
  {
    v: '48.0.0', date: '22-08-2026', title: 'Vacatures, tariefmodel en herstel beheerportaal',
    items: [
      'Opgelost: de klasse portal werd zowel voor de menuknop als voor de beheerpagina gebruikt, waardoor alle tekst in het beheerportaal wit op wit was en de achtergrond blauw kleurde bij hover. De menuregel is nu beperkt tot het hoofdmenu',
      'Beheerportaal opgepoetst: tegels met leesbare labels, nettere tabbladen en kaarten in de huisstijl',
      'Vacatures: zorginstellingen plaatsen zelf via het portaal, de beheerder keurt goed, daarna staan ze openbaar in vier talen',
      'Kandidaten melden interesse in een vacature; die meldingen komen bij de vacature in het beheer te staan',
      'Tariefmodel in het beheer: kosten per kandidaat, uitval en marge naar een break-even en geadviseerd tarief, met vergelijking tegen de marktnorm',
      'Nederland stond even niet in het hoofdmenu; teruggezet en het menu compacter gemaakt'
    ]
  },
  {
    v: '47.0.0', date: '21-08-2026', title: 'Rechtspersoon en KvK-nummer',
    items: [
      'Honor Care International is een handelsnaam van Creditline B.V. (KvK 59683198); dat staat nu correct in het privacybeleid en de algemene voorwaarden',
      'Creditline B.V. is benoemd als verwerkingsverantwoordelijke, in vier talen',
      'Rechtspersoon en KvK-nummer toegevoegd aan de footer van de site en van de e-mails',
      'Documentversie van privacybeleid en voorwaarden naar 1.1'
    ]
  },
  {
    v: '46.0.0', date: '21-08-2026', title: 'Versienummers en versieoverzicht',
    items: [
      'Versieoverzicht in het beheerportaal: per versie wat er is gewijzigd, met de actieve versie gemarkeerd',
      'Privacybeleid en algemene voorwaarden hebben nu een eigen documentversie, los van de applicatieversie',
      'De versieregel onderaan elke beheerpagina linkt naar het overzicht'
    ]
  },
  {
    v: '45.0.0', date: '21-08-2026', title: 'Route naar accountaanmaak',
    items: [
      'Menuknop heet nu Mijn account in plaats van Portal, in vier talen',
      'Maak je profiel aan toegevoegd als eerste vervolgstap op de EU-route, Voor professionals en Academie',
      'Portaalpagina legt uit waarvoor een account dient in plaats van alleen inloggen'
    ]
  },
  {
    v: '44.0.0', date: '21-08-2026', title: 'Privacy, voorwaarden en de carrousel',
    items: [
      'Privacybeleid en algemene voorwaarden toegevoegd in vier talen',
      'Footerlinks naar privacy en voorwaarden wezen naar de verkeerde pagina’s; hersteld',
      'Carrousel in het kandidaatportaal: acht fasen van aanmelding tot eerste werkdag',
      'De fase die de beheerder in de kaartenbank instelt, is nu zichtbaar voor de kandidaat'
    ]
  },
  {
    v: '43.0.0', date: '21-08-2026', title: 'E-mails in de huisstijl',
    items: [
      'Nieuw e-mailsjabloon met huisstijlkleuren, contactgegevens en de juridische regel',
      'Bevestigingsmail aan de afzender in diens eigen taal, met knop naar de EU-route',
      'Meldingsmail vermeldt de taal van de afzender en is direct beantwoordbaar'
    ]
  },
  {
    v: '42.0.0', date: '21-08-2026', title: 'Alle tabbladen nagelopen',
    items: [
      'Correctie: het BIG-register kent geen algemene automatische erkenning. Teksten op de homepage, EU-route en de pagina’s voor professionals en instellingen aangepast',
      'Veelgestelde vragen en een duidelijke vervolgstap onder elke inhoudspagina',
      'Huisvestingspagina belooft geen eigen woning meer: gedeeld wonen aan het begin, gezinswoningen schaars',
      'Academie legt Staatsexamen NT2 Programma I en II concreet uit'
    ]
  },
  {
    v: '41.0.0', date: '21-08-2026', title: 'Pagina Nederland, WhatsApp en klokken',
    items: [
      'Nederland-pagina herbouwd met cijfers over vergrijzing en personeelstekort, inclusief ring- en staafdiagram',
      'Eerlijk hoofdstuk over huisvesting: woningtekort, wachttijden sociale huur en vrijesectorhuren',
      'Bronnenlijst met links naar CBS, AZW, Rijksoverheid en Pararius',
      'WhatsApp in de bovenbalk, footer en als zwevende knop; live klokken Nederland en Colombia'
    ]
  },
  {
    v: '40.0.0', date: '21-08-2026', title: 'Zorgscan gekoppeld en versielabel',
    items: [
      'Tabblad Zorgscan in het beheerportaal met live cijfers en vacatures uit de ZorgScan-service',
      'Versie en starttijd zichtbaar onderaan elke beheerpagina',
      'Kantoren teruggebracht tot Nederland en Polen; echte contactgegevens doorgevoerd'
    ]
  },
  {
    v: '39.0.0', date: '21-08-2026', title: 'Kandidaatprofiel en kaartenbank',
    items: [
      'Kandidaten vullen hun eigen profiel in via het portaal, met voortgangsbalk',
      'Kaartenbank in het beheer met filters op land, beroep en taalniveau, plus CSV-export',
      'Tweestapsverificatie voor kandidaten niet langer verplicht vooraf, wel bij gevoelige stappen',
      'EU-route toegevoegd: traject, wederzijdse verwachtingen en de rolverdeling met het partnerbureau',
      'Spanje toegevoegd als tweede herkomstmarkt naast Colombia'
    ]
  },
  {
    v: '36.0.0', date: '11-08-2026', title: 'Antispam en contactformulier',
    items: [
      'Contactformulier op de site, gekoppeld aan e-mailverzending via Resend',
      'Cloudflare Turnstile, tijdgebonden token en een limiet per IP tegen spam',
      'Widget van Turnstile volgt de taal van de site'
    ]
  }
];

const UI = {
  h: 'Versieoverzicht',
  sub: 'Elke update krijgt een nummer. Zo is te zien welke versie draait en wat er is gewijzigd.',
  current: 'Draait nu',
  note: 'Het nummer onderaan elke beheerpagina geeft aan welke versie op dit moment actief is.'
};

function renderChangelog(currentVersion, esc) {
  const rows = VERSIONS.map(r => {
    const isNow = r.v === currentVersion;
    return `<article class="cl-item${isNow ? ' cl-now' : ''}">
<div class="cl-head"><span class="cl-v">v${esc(r.v)}</span><h3>${esc(r.title)}</h3>${isNow ? `<span class="cl-tag">${esc(UI.current)}</span>` : ''}<span class="cl-date">${esc(r.date)}</span></div>
<ul>${r.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></article>`;
  }).join('');
  return `<p class="hint">${esc(UI.sub)} ${esc(UI.note)}</p><div class="cl-list">${rows}</div>`;
}

module.exports = { VERSIONS, renderChangelog, UI };
