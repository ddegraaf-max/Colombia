// Vacatures. Zorginstellingen plaatsen zelf, de beheerder keurt goed, daarna
// staat de vacature openbaar. Kandidaten melden interesse; het daadwerkelijke
// contact en de plaatsing lopen via het geregistreerde partnerbureau. Wij
// publiceren dus wel, maar bemiddelen niet zelf — die grens blijft expliciet.

const STATUS = ['Concept', 'Ter beoordeling', 'Gepubliceerd', 'Afgewezen', 'Gesloten'];
const CONTRACT = ['onbepaalde tijd', 'bepaalde tijd', 'oproep'];

const T = {
  nl: {
    navLabel: 'Vacatures',
    title: 'Openstaande vacatures',
    intro: 'Zorginstellingen plaatsen hier zelf hun openstaande functies. Zie je iets dat past? Meld je interesse; wij nemen contact op en zetten de vervolgstappen in gang.',
    empty: 'Er staan op dit moment geen vacatures open. Maak een profiel aan, dan benaderen wij je zodra er iets past.',
    disclaimer: 'Honor Care International publiceert deze vacatures en begeleidt je voorbereiding. Het arbeidscontract sluit je met ons geregistreerde partnerbureau of rechtstreeks met de zorginstelling — niet met ons.',
    f: { profession: 'Beroepsgroep', city: 'Plaats', hours: 'Uren per week', contract: 'Contractvorm', salary: 'Salarisindicatie', start: 'Startdatum', language: 'Taalniveau', employer: 'Werkgever', published: 'Geplaatst op' },
    descHead: 'Over de functie', reqHead: 'Wat wordt er gevraagd?',
    interest: 'Ik heb interesse', interestIn: 'Meld je interesse',
    interestDone: 'Bedankt! Je interesse is doorgegeven. Wij nemen contact met je op.',
    loginFirst: 'Maak eerst een profiel aan of log in. Dan weten wij wie je bent en kunnen we je gericht helpen.',
    loginBtn: 'MAAK JE PROFIEL AAN', back: 'Alle vacatures',
    already: 'Je hebt je interesse al doorgegeven voor deze vacature.'
  },
  en: {
    navLabel: 'Vacancies',
    title: 'Open vacancies',
    intro: 'Healthcare institutions post their open positions here themselves. See something that fits? Register your interest; we will get in touch and set the next steps in motion.',
    empty: 'There are no open vacancies at the moment. Create a profile and we will approach you as soon as something fits.',
    disclaimer: 'Honor Care International publishes these vacancies and guides your preparation. You sign the employment contract with our registered partner agency or directly with the healthcare institution — not with us.',
    f: { profession: 'Profession', city: 'Location', hours: 'Hours per week', contract: 'Contract type', salary: 'Salary indication', start: 'Start date', language: 'Language level', employer: 'Employer', published: 'Posted on' },
    descHead: 'About the role', reqHead: 'What is required?',
    interest: 'I am interested', interestIn: 'Register your interest',
    interestDone: 'Thank you! Your interest has been passed on. We will contact you.',
    loginFirst: 'First create a profile or log in. Then we know who you are and can help you properly.',
    loginBtn: 'CREATE YOUR PROFILE', back: 'All vacancies',
    already: 'You have already registered your interest in this vacancy.'
  },
  es: {
    navLabel: 'Vacantes',
    title: 'Vacantes disponibles',
    intro: 'Los centros sanitarios publican aquí sus puestos vacantes. ¿Ves algo que encaja? Muestra tu interés; nos pondremos en contacto y activaremos los siguientes pasos.',
    empty: 'En este momento no hay vacantes. Crea un perfil y te avisaremos en cuanto surja algo adecuado.',
    disclaimer: 'Honor Care International publica estas vacantes y acompaña tu preparación. El contrato de trabajo lo firmas con nuestra agencia asociada registrada o directamente con el centro sanitario, no con nosotros.',
    f: { profession: 'Profesión', city: 'Localidad', hours: 'Horas semanales', contract: 'Tipo de contrato', salary: 'Salario orientativo', start: 'Fecha de inicio', language: 'Nivel de idioma', employer: 'Empleador', published: 'Publicada el' },
    descHead: 'Sobre el puesto', reqHead: '¿Qué se pide?',
    interest: 'Me interesa', interestIn: 'Muestra tu interés',
    interestDone: '¡Gracias! Hemos recibido tu interés. Nos pondremos en contacto contigo.',
    loginFirst: 'Primero crea un perfil o inicia sesión. Así sabemos quién eres y podemos ayudarte mejor.',
    loginBtn: 'CREA TU PERFIL', back: 'Todas las vacantes',
    already: 'Ya has mostrado tu interés por esta vacante.'
  },
  pl: {
    navLabel: 'Oferty pracy',
    title: 'Otwarte oferty pracy',
    intro: 'Placówki medyczne same publikują tu wolne stanowiska. Widzisz coś dla siebie? Zgłoś zainteresowanie; skontaktujemy się i uruchomimy kolejne kroki.',
    empty: 'Obecnie nie ma otwartych ofert. Załóż profil, a odezwiemy się, gdy pojawi się coś odpowiedniego.',
    disclaimer: 'Honor Care International publikuje te oferty i prowadzi Twoje przygotowanie. Umowę o pracę zawierasz z naszym zarejestrowanym biurem partnerskim albo bezpośrednio z placówką — nie z nami.',
    f: { profession: 'Zawód', city: 'Miejscowość', hours: 'Godziny tygodniowo', contract: 'Rodzaj umowy', salary: 'Orientacyjne wynagrodzenie', start: 'Data rozpoczęcia', language: 'Poziom językowy', employer: 'Pracodawca', published: 'Opublikowano' },
    descHead: 'O stanowisku', reqHead: 'Czego się oczekuje?',
    interest: 'Jestem zainteresowany', interestIn: 'Zgłoś zainteresowanie',
    interestDone: 'Dziękujemy! Przekazaliśmy Twoje zgłoszenie. Skontaktujemy się z Tobą.',
    loginFirst: 'Najpierw załóż profil lub zaloguj się. Wtedy wiemy, kim jesteś, i możemy pomóc trafniej.',
    loginBtn: 'ZAŁÓŻ PROFIL', back: 'Wszystkie oferty',
    already: 'Już zgłosiłeś zainteresowanie tą ofertą.'
  }
};

function tx(lang) { return T[lang] || T.nl; }

// ---------- openbaar: overzicht ----------
function renderList(items, lang, h) {
  const t = tx(lang), esc = h.esc, prof = h.professionLabel;
  if (!items.length) {
    return `<section class="page has-hero"><p class="contact-lead">${esc(t.intro)}</p>
<div class="vac-empty"><p>${esc(t.empty)}</p><a class="btn gold" href="/portal">${esc(t.loginBtn)}</a></div>
<p class="vac-disclaimer">${esc(t.disclaimer)}</p></section>`;
  }
  const cards = items.map(v => `<article class="vac-card">
<h2><a href="/vacatures/${v._id}">${esc(v.title)}</a></h2>
<p class="vac-employer">${esc(v.employer || '')}${v.city ? ' · ' + esc(v.city) : ''}</p>
<ul class="vac-meta">
${v.profession ? `<li><b>${esc(t.f.profession)}</b> ${esc(prof(v.profession))}</li>` : ''}
${v.hours ? `<li><b>${esc(t.f.hours)}</b> ${esc(v.hours)}</li>` : ''}
${v.languageLevel ? `<li><b>${esc(t.f.language)}</b> ${esc(v.languageLevel)}</li>` : ''}
${v.salary ? `<li><b>${esc(t.f.salary)}</b> ${esc(v.salary)}</li>` : ''}
</ul>
<a class="btn navy small" href="/vacatures/${v._id}">${esc(t.interest)} →</a></article>`).join('');
  return `<section class="page has-hero"><p class="contact-lead">${esc(t.intro)}</p>
<div class="vac-list">${cards}</div>
<p class="vac-disclaimer">${esc(t.disclaimer)}</p></section>`;
}

// ---------- openbaar: detail ----------
function renderDetail(v, lang, h, opts) {
  const t = tx(lang), esc = h.esc, prof = h.professionLabel;
  const o = opts || {};
  const rij = (k, val) => val ? `<tr><td>${esc(k)}</td><td>${esc(val)}</td></tr>` : '';
  let actie;
  if (o.done) actie = `<div class="contact-ok"><span>${esc(t.interestDone)}</span></div>`;
  else if (o.already) actie = `<p class="vac-note">${esc(t.already)}</p>`;
  else if (o.loggedIn) actie = `<form method="post" action="/vacatures/${v._id}/interesse"><button class="btn gold full">${esc(t.interestIn)}</button></form>`;
  else actie = `<p class="vac-note">${esc(t.loginFirst)}</p><a class="btn gold full" href="/portal">${esc(t.loginBtn)}</a>`;

  return `<section class="page has-hero"><div class="vac-detail">
<p><a class="btn navy small" href="/vacatures">← ${esc(t.back)}</a></p>
<div class="vac-doc">
<h1>${esc(v.title)}</h1>
<p class="vac-employer">${esc(v.employer || '')}${v.city ? ' · ' + esc(v.city) : ''}</p>
<div class="tablewrap"><table class="rtable vac-table"><tbody>
${rij(t.f.profession, v.profession ? prof(v.profession) : '')}
${rij(t.f.city, [v.city, v.province].filter(Boolean).join(', '))}
${rij(t.f.hours, v.hours)}
${rij(t.f.contract, v.contract)}
${rij(t.f.salary, v.salary)}
${rij(t.f.language, v.languageLevel)}
${rij(t.f.start, v.startDate)}
${rij(t.f.published, v.publishedAt ? new Date(v.publishedAt).toLocaleDateString('nl-NL') : '')}
</tbody></table></div>
${v.description ? `<h2>${esc(t.descHead)}</h2><p class="vac-text">${esc(v.description)}</p>` : ''}
${v.requirements ? `<h2>${esc(t.reqHead)}</h2><p class="vac-text">${esc(v.requirements)}</p>` : ''}
<div class="vac-actie">${actie}</div>
<p class="vac-disclaimer">${esc(t.disclaimer)}</p>
</div></div></section>`;
}

// ---------- portaal: formulier voor de instelling ----------
const PORTAL_NL = {
  h: 'Mijn vacatures', sub: 'Plaats hier je openstaande functies. Wij kijken ze na en publiceren ze daarna op de website.',
  add: 'Nieuwe vacature', none: 'Je hebt nog geen vacatures geplaatst.',
  f: { title: 'Functietitel', profession: 'Beroepsgroep', city: 'Plaats', province: 'Provincie', hours: 'Uren per week', contract: 'Contractvorm', salary: 'Salarisindicatie', languageLevel: 'Gewenst taalniveau', startDate: 'Gewenste startdatum', description: 'Over de functie', requirements: 'Wat vraag je van de kandidaat?' },
  save: 'Opslaan en ter beoordeling aanbieden', saved: 'Bedankt. Wij kijken je vacature na en publiceren hem daarna.',
  statusLabel: 'Status', note: 'Na goedkeuring verschijnt de vacature op de openbare vacaturepagina. Kandidaten melden interesse via ons; het contract sluit u met de kandidaat of via ons partnerbureau.'
};

function renderPortalVacancies(items, lang, h, saved) {
  const esc = h.esc, prof = h.professionLabel, professions = h.professions;
  const p = PORTAL_NL;
  const opts = professions.map(c => `<option value="${c}">${esc(prof(c))}</option>`).join('');
  const contractOpts = CONTRACT.map(c => `<option value="${c}">${esc(c)}</option>`).join('');
  const rows = items.map(v => `<tr>
<td class="tname">${esc(v.title)}</td>
<td>${esc(v.city || '—')}</td>
<td>${esc(v.profession ? prof(v.profession) : '—')}</td>
<td>${h.badge(v.status)}</td>
<td>${esc(v.createdAt ? new Date(v.createdAt).toLocaleDateString('nl-NL') : '')}</td></tr>`).join('');
  return `<div class="rcard"><h2>${esc(p.h)}</h2><p class="hint">${esc(p.sub)}</p>
${saved ? `<p class="ok">${esc(p.saved)}</p>` : ''}
<div class="tablewrap"><table class="rtable"><thead><tr><th>${esc(p.f.title)}</th><th>${esc(p.f.city)}</th><th>${esc(p.f.profession)}</th><th>${esc(p.statusLabel)}</th><th>Aangemaakt</th></tr></thead>
<tbody>${rows || `<tr><td colspan="5" class="empty">${esc(p.none)}</td></tr>`}</tbody></table></div></div>

<div class="rcard"><h2>${esc(p.add)}</h2>
<form class="rform prof-form" method="post" action="/portal/vacatures">
<div class="ff ff-wide"><label for="v_title">${esc(p.f.title)}</label><input id="v_title" name="title" maxlength="120" required></div>
<div class="ff"><label for="v_prof">${esc(p.f.profession)}</label><select id="v_prof" name="profession"><option value="">—</option>${opts}</select></div>
<div class="ff"><label for="v_city">${esc(p.f.city)}</label><input id="v_city" name="city" maxlength="80"></div>
<div class="ff"><label for="v_prov">${esc(p.f.province)}</label><input id="v_prov" name="province" maxlength="60"></div>
<div class="ff"><label for="v_hours">${esc(p.f.hours)}</label><input id="v_hours" name="hours" maxlength="40" placeholder="24-32"></div>
<div class="ff"><label for="v_contract">${esc(p.f.contract)}</label><select id="v_contract" name="contract"><option value="">—</option>${contractOpts}</select></div>
<div class="ff"><label for="v_salary">${esc(p.f.salary)}</label><input id="v_salary" name="salary" maxlength="80" placeholder="FWG 45"></div>
<div class="ff"><label for="v_lang">${esc(p.f.languageLevel)}</label><select id="v_lang" name="languageLevel"><option value="">—</option><option>B1</option><option>B2</option><option>B2+</option></select></div>
<div class="ff"><label for="v_start">${esc(p.f.startDate)}</label><input id="v_start" name="startDate" type="date"></div>
<div class="ff ff-wide"><label for="v_desc">${esc(p.f.description)}</label><textarea id="v_desc" name="description" rows="5" maxlength="4000"></textarea></div>
<div class="ff ff-wide"><label for="v_req">${esc(p.f.requirements)}</label><textarea id="v_req" name="requirements" rows="4" maxlength="2000"></textarea></div>
<div class="rform-actions"><button class="btn gold">${esc(p.save)}</button></div>
</form>
<p class="hint">${esc(p.note)}</p></div>`;
}

// ---------- beheer: moderatie ----------
function renderModeration(items, h) {
  const esc = h.esc, prof = h.professionLabel;
  const rows = items.map(v => `<tr>
<td class="tname"><a href="/vacatures-beheer/${v._id}">${esc(v.title)}</a><br><span class="tp-sub">${esc(v.employer || '')}</span></td>
<td>${esc(v.city || '—')}</td>
<td>${esc(v.profession ? prof(v.profession) : '—')}</td>
<td>${esc(v.interestCount || 0)}</td>
<td>${h.badge(v.status)}</td>
<td class="tact"><a class="btn navy small" href="/vacatures-beheer/${v._id}">Open</a></td></tr>`).join('');
  return `<p class="hint">Vacatures die zorginstellingen zelf hebben geplaatst. Keur ze goed om ze op de website te tonen. Kandidaten die interesse melden komen in de kolom Interesse te staan.</p>
<div class="tablewrap"><table class="rtable"><thead><tr><th>Functie / werkgever</th><th>Plaats</th><th>Beroepsgroep</th><th>Interesse</th><th>Status</th><th></th></tr></thead>
<tbody>${rows || '<tr><td colspan="6" class="empty">Nog geen vacatures geplaatst.</td></tr>'}</tbody></table></div>`;
}

function renderModerationDetail(v, interesses, h) {
  const esc = h.esc, prof = h.professionLabel;
  const rij = (k, val) => `<tr><td class="tp-k">${esc(k)}</td><td>${esc(val == null || val === '' ? '—' : val)}</td></tr>`;
  const statusOpts = STATUS.map(s => `<option value="${esc(s)}"${v.status === s ? ' selected' : ''}>${esc(s)}</option>`).join('');
  const lijst = interesses.length
    ? `<div class="tablewrap"><table class="rtable"><thead><tr><th>Kandidaat</th><th>E-mail</th><th>Gemeld op</th><th></th></tr></thead><tbody>${interesses.map(i => `<tr><td class="tname">${esc(i.name || '')}</td><td>${esc(i.email || '')}</td><td>${esc(i.createdAt ? new Date(i.createdAt).toLocaleDateString('nl-NL') : '')}</td><td class="tact">${i.portalUserId ? `<a class="btn navy small" href="/talentpool/${i.portalUserId}">Profiel</a>` : ''}</td></tr>`).join('')}</tbody></table></div>`
    : '<p class="hint">Nog geen kandidaten met interesse.</p>';
  return `<p><a class="btn navy small" href="/vacatures-beheer">← Terug</a></p>
<div class="rcard"><h2>${esc(v.title)}</h2>
<div class="tablewrap"><table class="rtable"><tbody>
${rij('Werkgever', v.employer)}${rij('Contactpersoon', v.contactEmail)}
${rij('Beroepsgroep', v.profession ? prof(v.profession) : '')}${rij('Plaats', [v.city, v.province].filter(Boolean).join(', '))}
${rij('Uren', v.hours)}${rij('Contractvorm', v.contract)}${rij('Salarisindicatie', v.salary)}
${rij('Taalniveau', v.languageLevel)}${rij('Startdatum', v.startDate)}
${rij('Aangemaakt', v.createdAt ? new Date(v.createdAt).toLocaleString('nl-NL') : '')}
</tbody></table></div>
${v.description ? '<h3>Over de functie</h3><p class="tp-motiv">' + esc(v.description) + '</p>' : ''}
${v.requirements ? '<h3>Gevraagd</h3><p class="tp-motiv">' + esc(v.requirements) + '</p>' : ''}
</div>
<div class="rcard"><h2>Beoordeling</h2>
<form class="rform" method="post" action="/vacatures-beheer/${v._id}">
<div class="ff"><label for="st">Status</label><select id="st" name="status">${statusOpts}</select></div>
<div class="ff ff-wide"><label for="an">Interne notitie</label><textarea id="an" name="adminNotes" rows="3">${esc(v.adminNotes || '')}</textarea></div>
<div class="rform-actions"><button class="btn gold">Opslaan</button></div></form>
<p class="hint">Zet op Gepubliceerd om de vacature op de website te tonen. Afgewezen en Gesloten verdwijnen van de site.</p></div>
<div class="rcard"><h2>Kandidaten met interesse</h2>${lijst}</div>`;
}

module.exports = { STATUS, CONTRACT, tx, renderList, renderDetail, renderPortalVacancies, renderModeration, renderModerationDetail, PORTAL_NL };
