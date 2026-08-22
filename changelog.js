// Versieoverzicht. Elke deploy krijgt een nummer en een regel hier, zodat
// achteraf te zien is wat er wanneer is gewijzigd. Het nummer moet gelijk
// lopen met "version" in package.json.

const VERSIONS = [
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
