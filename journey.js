// De carrousel: het traject van aanmelding tot eerste werkdag.
// Eén bron van waarheid — de kandidaat ziet dezelfde fasen als de beheerder
// in de kaartenbank instelt. Inhoud sluit aan op de officiële BIG-procedure.

const PHASES = [
  {
    key: 'aanmelding',
    nl: { t: 'Aanmelding en profiel', w: 'Je hebt een account aangemaakt. Vul je profiel zo volledig mogelijk in — beroep, taalniveau, beschikbaarheid en motivatie.', y: 'Profiel invullen' },
    en: { t: 'Registration and profile', w: 'You have created an account. Complete your profile as fully as you can — profession, language level, availability and motivation.', y: 'Complete your profile' },
    es: { t: 'Registro y perfil', w: 'Has creado una cuenta. Completa tu perfil lo máximo posible: profesión, nivel de idioma, disponibilidad y motivación.', y: 'Completar el perfil' },
    pl: { t: 'Rejestracja i profil', w: 'Masz już konto. Uzupełnij profil możliwie najpełniej — zawód, poziom językowy, dostępność i motywację.', y: 'Uzupełnij profil' }
  },
  {
    key: 'screening',
    nl: { t: 'Screening en documentcheck', w: 'Wij controleren je diploma, werkervaring en documenten en bepalen via de advieswijzer van het BIG-register welke erkenningsroute voor jou geldt.', y: 'Diploma, cv en identiteitsbewijs aanleveren' },
    en: { t: 'Screening and document check', w: 'We verify your diploma, experience and documents and determine through the BIG register advice tool which recognition route applies to you.', y: 'Provide diploma, CV and ID' },
    es: { t: 'Evaluación y documentos', w: 'Verificamos tu título, experiencia y documentos y determinamos, mediante la herramienta de orientación del registro BIG, qué vía de reconocimiento te corresponde.', y: 'Aportar título, CV y documento de identidad' },
    pl: { t: 'Weryfikacja i dokumenty', w: 'Sprawdzamy dyplom, doświadczenie i dokumenty oraz ustalamy przez doradcę rejestru BIG, która ścieżka uznania Cię dotyczy.', y: 'Dostarcz dyplom, CV i dowód tożsamości' }
  },
  {
    key: 'taal',
    nl: { t: 'Taalopleiding Nederlands', w: 'De langste en bepalende fase. Tot A2 heb je het zelf gedaan; vanaf daar verzorgen wij de opleiding tot het niveau dat jouw beroep vraagt: B1 bij mbo, B2 bij hbo en B2+ bij een universitaire opleiding.', y: 'Lessen volgen en oefenen' },
    en: { t: 'Dutch language training', w: 'The longest and decisive phase. You reached A2 on your own; from there we provide the training up to the level your profession requires: B1 for vocational, B2 for higher professional and B2+ for university level.', y: 'Attend lessons and practise' },
    es: { t: 'Formación en neerlandés', w: 'La fase más larga y decisiva. Hasta A2 lo has hecho tú; a partir de ahí nosotros damos la formación hasta el nivel que exige tu profesión: B1 para FP, B2 para grado superior y B2+ para nivel universitario.', y: 'Asistir a clase y practicar' },
    pl: { t: 'Nauka niderlandzkiego', w: 'Najdłuższy i decydujący etap. Do A2 doszedłeś sam; od tego miejsca my prowadzimy naukę do poziomu wymaganego w Twoim zawodzie: B1 przy średnim, B2 przy wyższym zawodowym i B2+ przy uniwersyteckim.', y: 'Uczestnicz w zajęciach i ćwicz' }
  },
  {
    key: 'erkenning',
    nl: { t: 'Erkenning van je diploma', w: 'Wij dienen je aanvraag in bij het BIG-register. De commissie CBGV beoordeelt je dossier; dat duurt maximaal 13 weken nadat alles compleet is. Deze fase loopt naast je taalopleiding.', y: 'Documenten compleet en op tijd aanleveren' },
    en: { t: 'Recognition of your diploma', w: 'We submit your application to the BIG register. The CBGV committee assesses your file, which takes up to 13 weeks once everything is complete. This phase runs alongside your language training.', y: 'Supply complete documents on time' },
    es: { t: 'Homologación de tu título', w: 'Presentamos tu solicitud al registro BIG. La comisión CBGV evalúa tu expediente, con un máximo de 13 semanas desde que está completo. Esta fase corre en paralelo a la formación.', y: 'Entregar documentación completa a tiempo' },
    pl: { t: 'Uznanie dyplomu', w: 'Składamy wniosek w rejestrze BIG. Komisja CBGV ocenia dokumentację — do 13 tygodni od skompletowania. Ten etap biegnie równolegle z nauką języka.', y: 'Dostarcz komplet dokumentów na czas' }
  },
  {
    key: 'examen',
    nl: { t: 'Staatsexamen NT2 en BIG-registratie', w: 'Je legt het Staatsexamen NT2 af — dat kan alleen in Nederland, in zes examensteden. Met je taalcertificaat en de erkenning schrijven we je in het BIG-register in (€ 85 voor vijf jaar).', y: 'Examen doen en certificaat aanleveren' },
    en: { t: 'Staatsexamen NT2 and BIG registration', w: 'You sit the Staatsexamen NT2 — possible only in the Netherlands, in six exam cities. With your language certificate and the recognition we register you in the BIG register (€85 for five years).', y: 'Sit the exam and supply the certificate' },
    es: { t: 'Staatsexamen NT2 y registro BIG', w: 'Realizas el Staatsexamen NT2, que solo puede hacerse en los Países Bajos, en seis ciudades. Con tu certificado y el reconocimiento te inscribimos en el registro BIG (85 € por cinco años).', y: 'Presentarte al examen y aportar el certificado' },
    pl: { t: 'Staatsexamen NT2 i rejestracja BIG', w: 'Zdajesz Staatsexamen NT2 — wyłącznie w Holandii, w sześciu miastach egzaminacyjnych. Z certyfikatem i uznaniem rejestrujemy Cię w rejestrze BIG (85 € na pięć lat).', y: 'Zdaj egzamin i dostarcz certyfikat' }
  },
  {
    key: 'werkgever',
    nl: { t: 'Kennismaking met de werkgever', w: 'Het geregistreerde partnerbureau brengt je in contact met een passende zorginstelling. Je maakt kennis en bespreekt de functie.', y: 'Kennismakingsgesprek voeren' },
    en: { t: 'Meeting the employer', w: 'The registered partner agency introduces you to a suitable healthcare institution. You meet and discuss the role.', y: 'Attend the introduction meeting' },
    es: { t: 'Conocer al empleador', w: 'La agencia asociada registrada te pone en contacto con un centro sanitario adecuado. Os conocéis y habláis del puesto.', y: 'Asistir a la entrevista' },
    pl: { t: 'Poznanie pracodawcy', w: 'Zarejestrowane biuro partnerskie kontaktuje Cię z odpowiednią placówką. Poznajecie się i omawiacie stanowisko.', y: 'Weź udział w rozmowie' }
  },
  {
    key: 'contract',
    nl: { t: 'Contract via het partnerbureau', w: 'Het partnerbureau sluit het arbeidscontract met je en regelt de formaliteiten. Zij zijn je werkgever — niet Honor Care.', y: 'Contract doornemen en ondertekenen' },
    en: { t: 'Contract through the partner agency', w: 'The partner agency signs the employment contract with you and handles the formalities. They are your employer — not Honor Care.', y: 'Review and sign the contract' },
    es: { t: 'Contrato con la agencia asociada', w: 'La agencia asociada firma contigo el contrato y gestiona los trámites. Ella es tu empleador, no Honor Care.', y: 'Revisar y firmar el contrato' },
    pl: { t: 'Umowa przez biuro partnerskie', w: 'Biuro partnerskie zawiera z Tobą umowę o pracę i załatwia formalności. To ono jest Twoim pracodawcą, nie Honor Care.', y: 'Przeczytaj i podpisz umowę' }
  },
  {
    key: 'start',
    nl: { t: 'Verhuizing en start', w: 'Je woning is samen met je werkgever geregeld voordat je komt. Je begint in een ondersteunende functie en gaat over naar de verpleegkundige functie zodra je BIG-registratie rond is. Wij begeleiden je bij de verhuizing, de inschrijving en je eerste periode.', y: 'Verhuizen en beginnen' },
    en: { t: 'Relocation and start', w: 'Your home is arranged together with your employer before you travel. You begin in a supporting role and move into the nursing role once your BIG registration is complete. We support you with the move, the registration and your first period.', y: 'Move and start work' },
    es: { t: 'Mudanza e incorporación', w: 'Tu vivienda está organizada junto con tu empleador antes de viajar. Empiezas en un puesto de apoyo y pasas al puesto de enfermero cuando tengas el registro BIG. Te acompañamos en la mudanza, el empadronamiento y tu primera etapa.', y: 'Mudarte y empezar' },
    pl: { t: 'Przeprowadzka i start', w: 'Mieszkanie jest przygotowane razem z Twoim pracodawcą przed Twoim przyjazdem. Zaczynasz na stanowisku wspierającym i przechodzisz na stanowisko pielęgniarki po uzyskaniu rejestracji BIG. Wspieramy Cię przy przeprowadzce, meldunku i pierwszym okresie.', y: 'Przeprowadź się i zacznij pracę' }
  },
  {
    key: 'doorgroei',
    nl: { t: 'Doorgroei naar de verpleegkundige functie', w: 'Je hebt het Staatsexamen NT2 gehaald en je BIG-registratie is rond. Je gaat over naar de verpleegkundige functie bij dezelfde werkgever, die je organisatie en bewoners inmiddels kent. Wij blijven bereikbaar voor de nazorg.', y: 'Overstap bespreken met je werkgever' },
    en: { t: 'Moving up to the nursing role', w: 'You have passed the Staatsexamen NT2 and your BIG registration is complete. You move into the nursing role with the same employer, whose organisation and residents you already know. We stay available for aftercare.', y: 'Discuss the move with your employer' },
    es: { t: 'Promoción al puesto de enfermero', w: 'Has aprobado el Staatsexamen NT2 y tienes el registro BIG. Pasas al puesto de enfermero con el mismo empleador, cuya organización y residentes ya conoces. Seguimos disponibles para el seguimiento.', y: 'Hablar del cambio con tu empleador' },
    pl: { t: 'Awans na stanowisko pielęgniarki', w: 'Zdałeś Staatsexamen NT2 i masz rejestrację BIG. Przechodzisz na stanowisko pielęgniarki u tego samego pracodawcy, którego organizację i podopiecznych już znasz. Pozostajemy dostępni w ramach opieki powdrożeniowej.', y: 'Omów przejście z pracodawcą' }
  }
];

// Statussen buiten het traject om.
const OFF_TRACK = ['Gepauzeerd', 'Niet passend'];
// Wat de beheerder in de kaartenbank kan kiezen.
const ADMIN_PHASES = PHASES.map(p => p.nl.t).concat(OFF_TRACK);

const UI = {
  nl: { h: 'Jouw traject', sub: 'Zo ziet de weg naar je eerste werkdag eruit. Wij werken je fase bij zodra er iets verandert.', now: 'Je bent hier', done: 'Afgerond', todo: 'Volgt nog', yours: 'Wat jij doet', paused: 'Je traject staat tijdelijk stil. Neem contact op als je vragen hebt.', notfit: 'Op dit moment is er geen passend traject. Je profiel blijft bewaard; we nemen contact op als er iets verandert.', step: 'Stap' },
  en: { h: 'Your journey', sub: 'This is the road to your first working day. We update your phase whenever something changes.', now: 'You are here', done: 'Completed', todo: 'Still to come', yours: 'What you do', paused: 'Your journey is on hold for now. Get in touch if you have questions.', notfit: 'There is no suitable route at the moment. Your profile stays on file and we will contact you if that changes.', step: 'Step' },
  es: { h: 'Tu recorrido', sub: 'Así es el camino hasta tu primer día de trabajo. Actualizamos tu fase en cuanto algo cambia.', now: 'Estás aquí', done: 'Completado', todo: 'Aún por venir', yours: 'Lo que haces tú', paused: 'Tu recorrido está en pausa. Ponte en contacto si tienes dudas.', notfit: 'De momento no hay un recorrido adecuado. Guardamos tu perfil y te avisaremos si eso cambia.', step: 'Paso' },
  pl: { h: 'Twoja ścieżka', sub: 'Tak wygląda droga do pierwszego dnia pracy. Aktualizujemy Twój etap, gdy coś się zmienia.', now: 'Tu jesteś', done: 'Zakończone', todo: 'Jeszcze przed Tobą', yours: 'Co robisz Ty', paused: 'Twoja ścieżka jest wstrzymana. Skontaktuj się, jeśli masz pytania.', notfit: 'Obecnie nie ma odpowiedniej ścieżki. Twój profil zostaje zapisany; odezwiemy się, gdy coś się zmieni.', step: 'Etap' }
};

// Uit de opgeslagen status afleiden in welke fase iemand zit.
function phaseIndex(status) {
  if (!status) return 0;
  const i = PHASES.findIndex(p => p.nl.t === status);
  if (i >= 0) return i;
  if (status === 'Nieuw') return 0;
  return -1; // Gepauzeerd of Niet passend
}

function renderJourney(status, lang, esc) {
  const u = UI[lang] || UI.nl;
  const cur = phaseIndex(status);
  const off = cur < 0;
  const melding = off
    ? `<p class="jr-off">${esc(status === 'Niet passend' ? u.notfit : u.paused)}</p>`
    : '';
  const steps = PHASES.map((p, i) => {
    const tekst = p[lang] || p.nl;
    const state = off ? 'todo' : (i < cur ? 'done' : (i === cur ? 'now' : 'todo'));
    const label = state === 'done' ? u.done : (state === 'now' ? u.now : u.todo);
    return `<li class="jr-step jr-${state}">
<span class="jr-dot">${state === 'done' ? '&#10003;' : (i + 1)}</span>
<div class="jr-body">
<h3>${esc(tekst.t)}<span class="jr-tag">${esc(label)}</span></h3>
<p>${esc(tekst.w)}</p>
<p class="jr-you"><b>${esc(u.yours)}:</b> ${esc(tekst.y)}</p>
</div></li>`;
  }).join('');
  const pct = off ? 0 : Math.round(((cur + 1) / PHASES.length) * 100);
  return `<div class="rcard jr-card">
<h2>${esc(u.h)}</h2><p class="hint">${esc(u.sub)}</p>
${melding}
<div class="jr-bar"><div class="jr-bar-fill" style="width:${pct}%"></div></div>
<p class="jr-pct">${esc(u.step)} ${off ? '—' : (cur + 1)} / ${PHASES.length}</p>
<ol class="jr-list">${steps}</ol></div>`;
}

module.exports = { PHASES, ADMIN_PHASES, OFF_TRACK, phaseIndex, renderJourney };
