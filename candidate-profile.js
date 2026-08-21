// Kandidaatprofiel: wat een kandidaat zelf invult in het portaal en wat de beheerder
// terugziet in de kaartenbak. Waarden worden neutraal opgeslagen (codes), labels zijn
// per taal vertaald zodat de kaartenbak altijd in één taal (NL) leesbaar blijft.

const PROFESSIONS = ['verpleegkundige', 'arts', 'tandarts', 'fysiotherapeut', 'psycholoog', 'apotheker', 'verloskundige', 'ambulance', 'verzorgende', 'anders'];
const COUNTRIES = ['ES', 'PL', 'CO', 'NL', 'OTHER'];
const LEVELS = ['none', 'A1', 'A2', 'B1', 'B2', 'C1'];
const BIG = ['not_started', 'in_progress', 'registered'];

// Beheerlabels (Nederlands) — gebruikt in de kaartenbak.
const ADMIN = {
  profession: { verpleegkundige: 'Verpleegkundige', arts: 'Arts', tandarts: 'Tandarts', fysiotherapeut: 'Fysiotherapeut', psycholoog: 'Psycholoog', apotheker: 'Apotheker', verloskundige: 'Verloskundige', ambulance: 'Ambulanceverpleegkundige', verzorgende: 'Verzorgende', anders: 'Anders' },
  country: { ES: 'Spanje', PL: 'Polen', CO: 'Colombia', NL: 'Nederland', OTHER: 'Anders' },
  level: { none: 'Geen', A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1' },
  big: { not_started: 'Nog niet gestart', in_progress: 'In aanvraag', registered: 'Geregistreerd' }
};

const PROF = {
  nl: {
    h: 'Mijn kandidaatprofiel', sub: 'Hoe vollediger je profiel, hoe gerichter wij je kunnen benaderen zodra er een passende plek is.',
    save: 'Profiel opslaan', saved: 'Profiel opgeslagen.', complete: 'Profiel ingevuld',
    f: { phone: 'Telefoonnummer', country: 'Land waar je nu woont', city: 'Stad', profession: 'Beroep', specialty: 'Specialisatie / afdeling', experienceYears: 'Jaren werkervaring', dutchLevel: 'Niveau Nederlands', englishLevel: 'Niveau Engels', euNational: 'Ik heb een EU/EER-nationaliteit', bigStatus: 'Status BIG-registratie', availableFrom: 'Beschikbaar vanaf', motivation: 'Motivatie — waarom Nederland?' },
    o: { profession: { verpleegkundige: 'Verpleegkundige', arts: 'Arts', tandarts: 'Tandarts', fysiotherapeut: 'Fysiotherapeut', psycholoog: 'Psycholoog', apotheker: 'Apotheker', verloskundige: 'Verloskundige', ambulance: 'Ambulanceverpleegkundige', verzorgende: 'Verzorgende', anders: 'Anders' }, country: { ES: 'Spanje', PL: 'Polen', CO: 'Colombia', NL: 'Nederland', OTHER: 'Anders' }, level: { none: 'Geen', A1: 'A1 — beginner', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1 — vloeiend' }, big: { not_started: 'Nog niet gestart', in_progress: 'In aanvraag', registered: 'Geregistreerd' } },
    note: 'Je gegevens worden vertrouwelijk behandeld en alleen gebruikt om je te benaderen voor passend werk. De officiële plaatsing verloopt via ons geregistreerde partnerbureau.'
  },
  en: {
    h: 'My candidate profile', sub: 'The more complete your profile, the better we can approach you when a suitable position comes up.',
    save: 'Save profile', saved: 'Profile saved.', complete: 'Profile completed',
    f: { phone: 'Phone number', country: 'Country you live in now', city: 'City', profession: 'Profession', specialty: 'Specialisation / department', experienceYears: 'Years of experience', dutchLevel: 'Dutch language level', englishLevel: 'English language level', euNational: 'I hold an EU/EEA nationality', bigStatus: 'BIG registration status', availableFrom: 'Available from', motivation: 'Motivation — why the Netherlands?' },
    o: { profession: { verpleegkundige: 'Nurse', arts: 'Doctor', tandarts: 'Dentist', fysiotherapeut: 'Physiotherapist', psycholoog: 'Psychologist', apotheker: 'Pharmacist', verloskundige: 'Midwife', ambulance: 'Paramedic', verzorgende: 'Caregiver', anders: 'Other' }, country: { ES: 'Spain', PL: 'Poland', CO: 'Colombia', NL: 'Netherlands', OTHER: 'Other' }, level: { none: 'None', A1: 'A1 — beginner', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1 — fluent' }, big: { not_started: 'Not started yet', in_progress: 'Application in progress', registered: 'Registered' } },
    note: 'Your data is treated confidentially and used only to approach you about suitable work. The official placement runs through our registered partner agency.'
  },
  es: {
    h: 'Mi perfil de candidato', sub: 'Cuanto más completo esté tu perfil, mejor podremos contactarte cuando surja un puesto adecuado.',
    save: 'Guardar perfil', saved: 'Perfil guardado.', complete: 'Perfil completado',
    f: { phone: 'Teléfono', country: 'País donde vives ahora', city: 'Ciudad', profession: 'Profesión', specialty: 'Especialidad / servicio', experienceYears: 'Años de experiencia', dutchLevel: 'Nivel de neerlandés', englishLevel: 'Nivel de inglés', euNational: 'Tengo nacionalidad de la UE/EEE', bigStatus: 'Estado del registro BIG', availableFrom: 'Disponible a partir de', motivation: 'Motivación: ¿por qué los Países Bajos?' },
    o: { profession: { verpleegkundige: 'Enfermero/a', arts: 'Médico/a', tandarts: 'Dentista', fysiotherapeut: 'Fisioterapeuta', psycholoog: 'Psicólogo/a', apotheker: 'Farmacéutico/a', verloskundige: 'Matrona', ambulance: 'Paramédico/a', verzorgende: 'Cuidador/a', anders: 'Otra' }, country: { ES: 'España', PL: 'Polonia', CO: 'Colombia', NL: 'Países Bajos', OTHER: 'Otro' }, level: { none: 'Ninguno', A1: 'A1 — principiante', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1 — fluido' }, big: { not_started: 'Aún no iniciado', in_progress: 'En trámite', registered: 'Registrado' } },
    note: 'Tus datos se tratan de forma confidencial y solo se usan para contactarte sobre trabajos adecuados. La colocación oficial se realiza a través de nuestra agencia asociada registrada.'
  },
  pl: {
    h: 'Mój profil kandydata', sub: 'Im pełniejszy profil, tym trafniej możemy się z Tobą skontaktować, gdy pojawi się odpowiednie miejsce.',
    save: 'Zapisz profil', saved: 'Profil zapisany.', complete: 'Profil uzupełniony',
    f: { phone: 'Numer telefonu', country: 'Kraj zamieszkania', city: 'Miasto', profession: 'Zawód', specialty: 'Specjalizacja / oddział', experienceYears: 'Lata doświadczenia', dutchLevel: 'Poziom niderlandzkiego', englishLevel: 'Poziom angielskiego', euNational: 'Mam obywatelstwo UE/EOG', bigStatus: 'Status rejestracji BIG', availableFrom: 'Dostępny od', motivation: 'Motywacja — dlaczego Holandia?' },
    o: { profession: { verpleegkundige: 'Pielęgniarka / pielęgniarz', arts: 'Lekarz', tandarts: 'Stomatolog', fysiotherapeut: 'Fizjoterapeuta', psycholoog: 'Psycholog', apotheker: 'Farmaceuta', verloskundige: 'Położna', ambulance: 'Ratownik medyczny', verzorgende: 'Opiekun medyczny', anders: 'Inny' }, country: { ES: 'Hiszpania', PL: 'Polska', CO: 'Kolumbia', NL: 'Holandia', OTHER: 'Inny' }, level: { none: 'Brak', A1: 'A1 — początkujący', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1 — biegły' }, big: { not_started: 'Jeszcze nie rozpoczęto', in_progress: 'W trakcie', registered: 'Zarejestrowany' } },
    note: 'Twoje dane są poufne i służą wyłącznie kontaktowi w sprawie odpowiedniej pracy. Oficjalne zatrudnienie realizuje nasze zarejestrowane biuro partnerskie.'
  }
};

// Velddefinities: name, type en (voor select) de lijst met codes.
const FIELDS = [
  { name: 'profession', type: 'select', opt: 'profession', list: PROFESSIONS },
  { name: 'specialty', type: 'text' },
  { name: 'country', type: 'select', opt: 'country', list: COUNTRIES },
  { name: 'city', type: 'text' },
  { name: 'phone', type: 'tel' },
  { name: 'experienceYears', type: 'number' },
  { name: 'dutchLevel', type: 'select', opt: 'level', list: LEVELS },
  { name: 'englishLevel', type: 'select', opt: 'level', list: LEVELS },
  { name: 'bigStatus', type: 'select', opt: 'big', list: BIG },
  { name: 'availableFrom', type: 'date' },
  { name: 'euNational', type: 'checkbox' },
  { name: 'motivation', type: 'textarea' }
];

function profileCompleteness(u) {
  const filled = FIELDS.filter(f => {
    const v = u ? u[f.name] : null;
    if (f.type === 'checkbox') return v === true;
    return v != null && String(v).trim() !== '';
  }).length;
  return Math.round((filled / FIELDS.length) * 100);
}

function coerceProfile(body) {
  const val = (n) => body[n] != null ? String(body[n]).trim() : '';
  const inList = (n, list) => list.includes(val(n)) ? val(n) : '';
  const yrs = parseInt(val('experienceYears'), 10);
  return {
    profession: inList('profession', PROFESSIONS),
    specialty: val('specialty').slice(0, 120),
    country: inList('country', COUNTRIES),
    city: val('city').slice(0, 80),
    phone: val('phone').slice(0, 40),
    experienceYears: Number.isFinite(yrs) && yrs >= 0 && yrs <= 60 ? yrs : null,
    dutchLevel: inList('dutchLevel', LEVELS),
    englishLevel: inList('englishLevel', LEVELS),
    bigStatus: inList('bigStatus', BIG),
    availableFrom: /^\d{4}-\d{2}-\d{2}$/.test(val('availableFrom')) ? val('availableFrom') : '',
    euNational: !!body.euNational,
    motivation: val('motivation').slice(0, 2000),
    profileUpdatedAt: new Date()
  };
}

// Formulier voor in het kandidaatportaal.
function renderProfileForm(u, lang, esc) {
  const p = PROF[lang] || PROF.nl;
  const pct = profileCompleteness(u);
  const field = (f) => {
    const label = esc(p.f[f.name]);
    const v = u && u[f.name] != null ? u[f.name] : '';
    if (f.type === 'checkbox') return `<div class="ff chkff"><label class="chk"><input type="checkbox" name="${f.name}" value="1"${v ? ' checked' : ''}> ${label}</label></div>`;
    if (f.type === 'textarea') return `<div class="ff ff-wide"><label for="p_${f.name}">${label}</label><textarea id="p_${f.name}" name="${f.name}" rows="4" maxlength="2000">${esc(v)}</textarea></div>`;
    if (f.type === 'select') {
      const opts = f.list.map(code => `<option value="${code}"${String(v) === code ? ' selected' : ''}>${esc(p.o[f.opt][code])}</option>`).join('');
      return `<div class="ff"><label for="p_${f.name}">${label}</label><select id="p_${f.name}" name="${f.name}"><option value="">—</option>${opts}</select></div>`;
    }
    const extra = f.type === 'number' ? ' min="0" max="60"' : '';
    return `<div class="ff"><label for="p_${f.name}">${label}</label><input id="p_${f.name}" name="${f.name}" type="${f.type}" value="${esc(v)}"${extra}></div>`;
  };
  return `<div class="rcard"><h2>${esc(p.h)}</h2><p class="hint">${esc(p.sub)}</p>
<div class="prof-bar"><div class="prof-bar-fill" style="width:${pct}%"></div></div><p class="prof-pct">${pct}% ${esc(p.complete)}</p>
<form class="rform prof-form" method="post" action="/portal/profile">${FIELDS.map(field).join('')}<div class="rform-actions"><button class="btn gold">${esc(p.save)}</button></div></form>
<p class="hint">🔒 ${esc(p.note)}</p></div>`;
}

// De fasen komen uit journey.js zodat kandidaat en beheerder hetzelfde zien.
const { ADMIN_PHASES } = require('./journey');
const ADMIN_STATUS = ADMIN_PHASES;

// ---------- Beheer: kaartenbak ----------
function renderTalentPool(items, f, h) {
  const esc = h.esc, badge = h.badge;
  const sel = (name, list, map, cur, leeg) => `<select name="${name}"><option value="">${leeg}</option>${list.map(c => `<option value="${c}"${cur === c ? ' selected' : ''}>${esc(map[c])}</option>`).join('')}</select>`;
  const filters = `<form class="tp-filters" method="get" action="/talentpool">
${sel('country', COUNTRIES, ADMIN.country, f.country, 'Alle landen')}
${sel('profession', PROFESSIONS, ADMIN.profession, f.profession, 'Alle beroepen')}
${sel('dutch', LEVELS, ADMIN.level, f.dutch, 'Elk NT2-niveau')}
<input type="search" name="q" value="${esc(f.q || '')}" placeholder="Zoek op naam, e-mail of stad">
<button class="btn navy small">Filteren</button>
<a class="btn light small" href="/talentpool">Wissen</a>
<a class="btn gold small" href="/talentpool.csv${f.qs ? '?' + f.qs : ''}">CSV exporteren</a></form>`;
  const rows = items.map(u => {
    const pct = profileCompleteness(u);
    return `<tr><td class="tname"><a href="/talentpool/${u._id}">${esc(u.name || '(zonder naam)')}</a><br><span class="tp-sub">${esc(u.email || '')}</span></td>
<td>${esc(ADMIN.country[u.country] || '—')}${u.city ? '<br><span class="tp-sub">' + esc(u.city) + '</span>' : ''}</td>
<td>${esc(ADMIN.profession[u.profession] || '—')}${u.specialty ? '<br><span class="tp-sub">' + esc(u.specialty) + '</span>' : ''}</td>
<td>${esc(ADMIN.level[u.dutchLevel] || '—')}</td>
<td>${esc(ADMIN.big[u.bigStatus] || '—')}</td>
<td>${esc(u.availableFrom || '—')}</td>
<td><span class="tp-pct${pct >= 80 ? ' good' : (pct >= 40 ? ' mid' : '')}">${pct}%</span></td>
<td>${badge(u.adminStatus || 'Nieuw')}</td>
<td class="tact"><a class="btn navy small" href="/talentpool/${u._id}">Open</a></td></tr>`;
  }).join('');
  return `<p class="hint">Kandidaten die zelf een account hebben aangemaakt en hun profiel invullen. Benader ze hiervandaan; de officiële plaatsing loopt via het partnerbureau.</p>
${filters}
<div class="tablewrap"><table class="rtable"><thead><tr><th>Naam</th><th>Land</th><th>Beroep</th><th>NT2</th><th>BIG</th><th>Beschikbaar</th><th>Profiel</th><th>Status</th><th></th></tr></thead>
<tbody>${rows || '<tr><td colspan="9" class="empty">Nog geen kandidaten gevonden.</td></tr>'}</tbody></table></div>
<p class="hint">${items.length} kandida${items.length === 1 ? 'at' : 'ten'} in deze selectie.</p>`;
}

function renderTalentDetail(u, h) {
  const esc = h.esc;
  const pct = profileCompleteness(u);
  const row = (k, v) => `<tr><td class="tp-k">${esc(k)}</td><td>${esc(v == null || v === '' ? '—' : v)}</td></tr>`;
  const statusOpts = ADMIN_STATUS.map(s => `<option value="${esc(s)}"${(u.adminStatus || 'Nieuw') === s ? ' selected' : ''}>${esc(s)}</option>`).join('');
  return `<p><a class="btn navy small" href="/talentpool">← Terug naar kaartenbak</a></p>
<div class="rcard"><h2>${esc(u.name || '(zonder naam)')}</h2>
<p><a class="btn gold small" href="mailto:${esc(u.email || '')}">E-mail sturen</a> ${u.phone ? '<a class="btn light small" href="tel:' + esc(u.phone) + '">Bellen</a>' : ''}</p>
<div class="tablewrap"><table class="rtable"><tbody>
${row('E-mail', u.email)}${row('Telefoon', u.phone)}
${row('Land', ADMIN.country[u.country])}${row('Stad', u.city)}
${row('Beroep', ADMIN.profession[u.profession])}${row('Specialisatie', u.specialty)}
${row('Werkervaring', u.experienceYears != null && u.experienceYears !== '' ? u.experienceYears + ' jaar' : '')}
${row('Nederlands', ADMIN.level[u.dutchLevel])}${row('Engels', ADMIN.level[u.englishLevel])}
${row('EU/EER-nationaliteit', u.euNational ? 'Ja' : 'Nee / niet opgegeven')}
${row('BIG-registratie', ADMIN.big[u.bigStatus])}${row('Beschikbaar vanaf', u.availableFrom)}
${row('Voorkeurstaal', u.language)}${row('Profiel ingevuld', pct + '%')}
${row('Aangemeld op', u.createdAt ? new Date(u.createdAt).toLocaleDateString('nl-NL') : '')}
${row('Profiel bijgewerkt', u.profileUpdatedAt ? new Date(u.profileUpdatedAt).toLocaleDateString('nl-NL') : 'nog niet')}
</tbody></table></div>
${u.motivation ? '<h3>Motivatie</h3><p class="tp-motiv">' + esc(u.motivation) + '</p>' : ''}
</div>
<div class="rcard"><h2>Opvolging</h2>
<form class="rform" method="post" action="/talentpool/${u._id}">
<div class="ff"><label for="st">Status</label><select id="st" name="adminStatus">${statusOpts}</select></div>
<div class="ff ff-wide"><label for="an">Interne notities</label><textarea id="an" name="adminNotes" rows="4">${esc(u.adminNotes || '')}</textarea></div>
<div class="rform-actions"><button class="btn gold">Opslaan</button></div></form></div>`;
}

function toCSV(items) {
  const cols = [['Naam', u => u.name], ['E-mail', u => u.email], ['Telefoon', u => u.phone], ['Land', u => ADMIN.country[u.country]], ['Stad', u => u.city], ['Beroep', u => ADMIN.profession[u.profession]], ['Specialisatie', u => u.specialty], ['Ervaring (jaar)', u => u.experienceYears], ['Nederlands', u => ADMIN.level[u.dutchLevel]], ['Engels', u => ADMIN.level[u.englishLevel]], ['EU-nationaliteit', u => u.euNational ? 'Ja' : 'Nee'], ['BIG', u => ADMIN.big[u.bigStatus]], ['Beschikbaar vanaf', u => u.availableFrom], ['Profiel %', u => profileCompleteness(u)], ['Status', u => u.adminStatus || 'Nieuw'], ['Aangemeld', u => u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : '']];
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const head = cols.map(c => q(c[0])).join(';');
  const body = items.map(u => cols.map(c => q(c[1](u))).join(';')).join('\r\n');
  return '﻿' + head + '\r\n' + body;
}

module.exports = { PROF, ADMIN, ADMIN_STATUS, FIELDS, PROFESSIONS, COUNTRIES, LEVELS, BIG, profileCompleteness, coerceProfile, renderProfileForm, renderTalentPool, renderTalentDetail, toCSV };
