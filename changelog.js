// Versieoverzicht. Elke deploy krijgt een nummer en een regel hier, zodat
// achteraf te zien is wat er wanneer is gewijzigd. Het nummer moet gelijk
// lopen met "version" in package.json.

const VERSIONS = [
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
