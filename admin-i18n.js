// Vertalingen voor het beheerportaal. Elke beheerder kiest zijn eigen taal,
// zodat een collega die geen Nederlands leest toch met het systeem kan werken.
// Vrije tekst van kandidaten blijft uiteraard in de taal waarin die is geschreven.

const TAAL = {
  nl: {
    naam: 'Nederlands',
    nav: { dashboard: 'Dashboard', agenda: 'Agenda', candidates: 'Kandidaten', talentpool: 'Kandidatenbank', zorgscan: 'Zorgscan', vacatures: 'Vacatures', institutions: 'Instellingen', placements: 'Plaatsingen', housing: 'Woningen', messages: 'Berichten', documents: 'Documenten', subsidies: 'Subsidies', tarief: 'Tarief', versies: 'Versies', gebruikers: 'Gebruikers', assistant: 'AI-assistent', backup: 'Back-up' },
    logout: 'Uitloggen', welkom: 'Welkom', open: 'Openen', terug: 'Terug', opslaan: 'Opslaan', verwijderen: 'Verwijderen',
    toevoegen: 'Toevoegen', nieuwToevoegen: '+ Nieuw toevoegen', zoeken: 'Zoeken', filteren: 'Filteren', wissen: 'Wissen',
    status: 'Status', naamLabel: 'Naam', email: 'E-mail', datum: 'Datum', geenItems: 'Nog geen items. Voeg er een toe.',
    pijplijn: 'Kandidaten-pijplijn', sneltoegang: 'Sneltoegang',
    gebruikers: {
      h: 'Gebruikers van het beheerportaal', sub: 'Maak accounts aan voor collega’s. Iedereen kiest zijn eigen taal en stelt bij de eerste keer inloggen tweestapsverificatie in.',
      nieuw: 'Nieuwe gebruiker', taal: 'Taal van het beheerportaal', wachtwoord: 'Wachtwoord',
      wachtwoordHint: 'Minimaal 10 tekens. Geef dit persoonlijk door, niet per e-mail.',
      aangemaakt: 'Aangemaakt', laatsteLogin: 'Laatst ingelogd', nooit: 'nog niet', tweeFA: '2FA',
      aan: 'ingesteld', uit: 'nog niet ingesteld', jij: 'jij',
      maak: 'Gebruiker aanmaken', gemaakt: 'Gebruiker aangemaakt. Geef het wachtwoord persoonlijk door.',
      bestaat: 'Er bestaat al een gebruiker met dit e-mailadres.', zwak: 'Het wachtwoord moet minstens 10 tekens hebben.',
      verwijderd: 'Gebruiker verwijderd.', nietZelf: 'Je kunt je eigen account niet verwijderen.',
      resetFA: '2FA opnieuw instellen', resetGedaan: 'Tweestapsverificatie is gewist. Bij de volgende keer inloggen stelt deze gebruiker hem opnieuw in.',
      mijnTaal: 'Mijn taal', taalOpslaan: 'Taal opslaan'
    }
  },
  en: {
    naam: 'English',
    nav: { dashboard: 'Dashboard', agenda: 'Calendar', candidates: 'Candidates', talentpool: 'Talent pool', zorgscan: 'Care scan', vacatures: 'Vacancies', institutions: 'Institutions', placements: 'Placements', housing: 'Housing', messages: 'Messages', documents: 'Documents', subsidies: 'Subsidies', tarief: 'Fee model', versies: 'Versions', gebruikers: 'Users', assistant: 'AI assistant', backup: 'Backup' },
    logout: 'Log out', welkom: 'Welcome', open: 'Open', terug: 'Back', opslaan: 'Save', verwijderen: 'Delete',
    toevoegen: 'Add', nieuwToevoegen: '+ Add new', zoeken: 'Search', filteren: 'Filter', wissen: 'Clear',
    status: 'Status', naamLabel: 'Name', email: 'Email', datum: 'Date', geenItems: 'No items yet. Add one.',
    pijplijn: 'Candidate pipeline', sneltoegang: 'Quick access',
    gebruikers: {
      h: 'Admin portal users', sub: 'Create accounts for colleagues. Everyone picks their own language and sets up two-factor authentication on first login.',
      nieuw: 'New user', taal: 'Admin portal language', wachtwoord: 'Password',
      wachtwoordHint: 'At least 10 characters. Hand this over in person, not by email.',
      aangemaakt: 'Created', laatsteLogin: 'Last login', nooit: 'not yet', tweeFA: '2FA',
      aan: 'configured', uit: 'not set up yet', jij: 'you',
      maak: 'Create user', gemaakt: 'User created. Hand over the password in person.',
      bestaat: 'A user with this email address already exists.', zwak: 'The password must be at least 10 characters.',
      verwijderd: 'User deleted.', nietZelf: 'You cannot delete your own account.',
      resetFA: 'Reset 2FA', resetGedaan: 'Two-factor authentication has been cleared. This user will set it up again on next login.',
      mijnTaal: 'My language', taalOpslaan: 'Save language'
    }
  },
  es: {
    naam: 'Español',
    nav: { dashboard: 'Panel', agenda: 'Agenda', candidates: 'Candidatos', talentpool: 'Base de candidatos', zorgscan: 'Escáner de vacantes', vacatures: 'Vacantes', institutions: 'Centros', placements: 'Colocaciones', housing: 'Viviendas', messages: 'Mensajes', documents: 'Documentos', subsidies: 'Subvenciones', tarief: 'Modelo de tarifas', versies: 'Versiones', gebruikers: 'Usuarios', assistant: 'Asistente IA', backup: 'Copia de seguridad' },
    logout: 'Cerrar sesión', welkom: 'Bienvenido', open: 'Abrir', terug: 'Volver', opslaan: 'Guardar', verwijderen: 'Eliminar',
    toevoegen: 'Añadir', nieuwToevoegen: '+ Añadir nuevo', zoeken: 'Buscar', filteren: 'Filtrar', wissen: 'Limpiar',
    status: 'Estado', naamLabel: 'Nombre', email: 'Correo', datum: 'Fecha', geenItems: 'Aún no hay elementos. Añade uno.',
    pijplijn: 'Flujo de candidatos', sneltoegang: 'Acceso rápido',
    gebruikers: {
      h: 'Usuarios del portal de administración', sub: 'Crea cuentas para tus compañeros. Cada uno elige su idioma y configura la verificación en dos pasos en el primer inicio de sesión.',
      nieuw: 'Nuevo usuario', taal: 'Idioma del portal', wachtwoord: 'Contraseña',
      wachtwoordHint: 'Mínimo 10 caracteres. Entrégala en persona, no por correo.',
      aangemaakt: 'Creado', laatsteLogin: 'Último acceso', nooit: 'todavía no', tweeFA: '2FA',
      aan: 'configurada', uit: 'sin configurar', jij: 'tú',
      maak: 'Crear usuario', gemaakt: 'Usuario creado. Entrega la contraseña en persona.',
      bestaat: 'Ya existe un usuario con este correo.', zwak: 'La contraseña debe tener al menos 10 caracteres.',
      verwijderd: 'Usuario eliminado.', nietZelf: 'No puedes eliminar tu propia cuenta.',
      resetFA: 'Restablecer 2FA', resetGedaan: 'Se ha borrado la verificación en dos pasos. El usuario la configurará de nuevo al iniciar sesión.',
      mijnTaal: 'Mi idioma', taalOpslaan: 'Guardar idioma'
    }
  },
  pl: {
    naam: 'Polski',
    nav: { dashboard: 'Pulpit', agenda: 'Kalendarz', candidates: 'Kandydaci', talentpool: 'Baza kandydatów', zorgscan: 'Skaner ofert', vacatures: 'Oferty pracy', institutions: 'Placówki', placements: 'Umieszczenia', housing: 'Mieszkania', messages: 'Wiadomości', documents: 'Dokumenty', subsidies: 'Dotacje', tarief: 'Model stawek', versies: 'Wersje', gebruikers: 'Użytkownicy', assistant: 'Asystent AI', backup: 'Kopia zapasowa' },
    logout: 'Wyloguj', welkom: 'Witaj', open: 'Otwórz', terug: 'Wróć', opslaan: 'Zapisz', verwijderen: 'Usuń',
    toevoegen: 'Dodaj', nieuwToevoegen: '+ Dodaj nowy', zoeken: 'Szukaj', filteren: 'Filtruj', wissen: 'Wyczyść',
    status: 'Status', naamLabel: 'Imię i nazwisko', email: 'E-mail', datum: 'Data', geenItems: 'Brak pozycji. Dodaj pierwszą.',
    pijplijn: 'Ścieżka kandydatów', sneltoegang: 'Szybki dostęp',
    gebruikers: {
      h: 'Użytkownicy panelu administracyjnego', sub: 'Twórz konta dla współpracowników. Każdy wybiera swój język i przy pierwszym logowaniu ustawia weryfikację dwuetapową.',
      nieuw: 'Nowy użytkownik', taal: 'Język panelu', wachtwoord: 'Hasło',
      wachtwoordHint: 'Minimum 10 znaków. Przekaż je osobiście, nie e-mailem.',
      aangemaakt: 'Utworzono', laatsteLogin: 'Ostatnie logowanie', nooit: 'jeszcze nie', tweeFA: '2FA',
      aan: 'ustawiona', uit: 'jeszcze nieustawiona', jij: 'to Ty',
      maak: 'Utwórz użytkownika', gemaakt: 'Użytkownik utworzony. Przekaż hasło osobiście.',
      bestaat: 'Użytkownik z tym adresem e-mail już istnieje.', zwak: 'Hasło musi mieć co najmniej 10 znaków.',
      verwijderd: 'Użytkownik usunięty.', nietZelf: 'Nie możesz usunąć własnego konta.',
      resetFA: 'Zresetuj 2FA', resetGedaan: 'Weryfikacja dwuetapowa została wyczyszczona. Użytkownik ustawi ją ponownie przy następnym logowaniu.',
      mijnTaal: 'Mój język', taalOpslaan: 'Zapisz język'
    }
  }
};

const TALEN = Object.keys(TAAL);
function t(lang) { return TAAL[lang] || TAAL.nl; }

// ---------- pagina met beheerders ----------
function renderUsers(users, huidigeId, lang, esc, melding) {
  const T = t(lang), G = T.gebruikers;
  const taalOpties = (gekozen) => TALEN.map(l => `<option value="${l}"${l === gekozen ? ' selected' : ''}>${esc(TAAL[l].naam)}</option>`).join('');

  const rijen = users.map(u => {
    const zelf = String(u._id) === String(huidigeId);
    return `<tr>
<td class="tname">${esc(u.name || u.email)}${zelf ? ` <span class="tp-pct">${esc(G.jij)}</span>` : ''}<br><span class="tp-sub">${esc(u.email)}</span></td>
<td>${esc(TAAL[u.language] ? TAAL[u.language].naam : TAAL.nl.naam)}</td>
<td>${u.twoFASecret ? esc(G.aan) : `<span class="tp-pct mid">${esc(G.uit)}</span>`}</td>
<td>${esc(u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('nl-NL') : G.nooit)}</td>
<td>${esc(u.createdAt ? new Date(u.createdAt).toLocaleDateString('nl-NL') : '')}</td>
<td class="tact">
<form method="post" action="/gebruikers/${u._id}/reset-2fa" class="inlineform"><button class="btn light small">${esc(G.resetFA)}</button></form>
${zelf ? '' : `<form method="post" action="/gebruikers/${u._id}/delete" class="inlineform"><button class="btn danger small">${esc(T.verwijderen)}</button></form>`}
</td></tr>`;
  }).join('');

  const huidige = users.find(u => String(u._id) === String(huidigeId)) || {};

  return `<p class="hint">${esc(G.sub)}</p>
${melding ? `<p class="${melding.type}">${esc(melding.tekst)}</p>` : ''}

<div class="rcard"><h2>${esc(G.mijnTaal)}</h2>
<form class="rform" method="post" action="/gebruikers/taal">
<div class="ff"><label for="mt">${esc(G.taal)}</label><select id="mt" name="language">${taalOpties(huidige.language || 'nl')}</select></div>
<div class="rform-actions"><button class="btn gold">${esc(G.taalOpslaan)}</button></div></form></div>

<div class="tablewrap"><table class="rtable"><thead><tr>
<th>${esc(T.naamLabel)}</th><th>${esc(G.taal)}</th><th>${esc(G.tweeFA)}</th><th>${esc(G.laatsteLogin)}</th><th>${esc(G.aangemaakt)}</th><th></th>
</tr></thead><tbody>${rijen}</tbody></table></div>

<div class="rcard"><h2>${esc(G.nieuw)}</h2>
<form class="rform prof-form" method="post" action="/gebruikers">
<div class="ff"><label for="g_name">${esc(T.naamLabel)}</label><input id="g_name" name="name" maxlength="80" required></div>
<div class="ff"><label for="g_email">${esc(T.email)}</label><input id="g_email" name="email" type="email" maxlength="160" required></div>
<div class="ff"><label for="g_pw">${esc(G.wachtwoord)}</label><input id="g_pw" name="password" type="text" minlength="10" maxlength="120" required autocomplete="new-password"></div>
<div class="ff"><label for="g_lang">${esc(G.taal)}</label><select id="g_lang" name="language">${taalOpties('nl')}</select></div>
<div class="rform-actions"><button class="btn gold">${esc(G.maak)}</button></div>
</form>
<p class="hint">${esc(G.wachtwoordHint)}</p></div>`;
}

module.exports = { TAAL, TALEN, t, renderUsers };
