// Pagina voor zorginstellingen. Kern van het aanbod: de kandidaat staat binnen
// enkele maanden op de afdeling in een ondersteunende functie en groeit daarna
// door naar BIG-geregistreerd verpleegkundige.
//
// Juridisch nauw luisteren: verpleegkundigen mogen pas ZELFSTANDIG werken na
// BIG-registratie, en de titel is beschermd. Vóór registratie werkt de kandidaat
// dus in een ondersteunende functie (zorgassistent of helpende) — nooit als
// verpleegkundige. Die formulering moet overal kloppen.
//
// Tarieven staan bewust niet op deze pagina; die horen aan tafel thuis.

const T = {
  nl: {
    title: 'Voor zorginstellingen',
    lead: 'U heeft nu mensen nodig, niet over een jaar. Daarom werken wij in twee fasen: de kandidaat staat binnen enkele maanden op uw afdeling in een ondersteunende functie, en groeit daarna door naar volwaardig BIG-geregistreerd verpleegkundige.',
    fasen: {
      eyebrow: 'HOE HET WERKT', h2: 'Twee fasen in plaats van wachten',
      sub: 'De gebruikelijke aanpak laat een kandidaat maanden thuis studeren voordat er iemand op de werkvloer staat. Wij draaien dat om.',
      items: [
        ['Fase 1 — direct inzetbaar', 'Zodra de kandidaat voldoende Nederlands beheerst voor de dagelijkse praktijk, start hij bij u in een ondersteunende functie: zorgassistent of helpende. U heeft meteen extra handen, precies waar het tekort zit.'],
        ['Fase 2 — doorgroei naar verpleegkundige', 'Naast het werk loopt de taalopleiding door naar B1 of B2, samen met de erkenning van het diploma en de BIG-registratie. Zodra die rond is, gaat de kandidaat over naar de functie van verpleegkundige.']
      ],
      let: 'Belangrijk: tot de BIG-registratie rond is werkt de kandidaat uitdrukkelijk niet als verpleegkundige en voert hij geen voorbehouden handelingen zelfstandig uit. De titel verpleegkundige is beschermd; wij houden ons daar strikt aan en u dus ook.'
    },
    waarom: {
      eyebrow: 'WAAROM DIT BETER WERKT', h2: 'Vier redenen dat dit model beter uitpakt',
      items: [
        ['Capaciteit nu, niet later', 'U vult een deel van uw personeelstekort binnen maanden in plaats van na een volledig opleidingstraject.'],
        ['Veel minder uitval', 'Onze kandidaten halen op eigen kracht en op eigen kosten niveau A2 voordat wij ze aannemen; wie die stap zet, meent het. Daarna werken ze in een team, ontvangen ze salaris en horen ze dagelijks Nederlands. Dat haakt aanzienlijk minder snel af dan iemand die in zijn eentje in het buitenland zit te studeren.'],
        ['Sneller op niveau', 'Taal leer je het snelst door hem te gebruiken. Op de afdeling gaat dat vele malen sneller dan in een online les.'],
        ['U kent elkaar al', 'Bij de overgang naar de verpleegkundige functie werkt u met iemand die uw organisatie, uw bewoners en uw werkwijze al kent. Geen nieuwe inwerkperiode.']
      ]
    },
    rollen: {
      eyebrow: 'DUIDELIJKE ROLVERDELING', h2: 'Wie doet wat',
      sub: 'Honor Care International bemiddelt niet zelf en is geen werkgever. Dat houdt de verhoudingen zuiver en het traject in lijn met de Nederlandse wetgeving.',
      us: { h: 'Wij doen', items: ['Werving en selectie in Spanje en andere EU-landen', 'Screening en controle van diploma’s en documenten', 'Taalopleiding Nederlands van A2 tot het vereiste niveau', 'Begeleiding bij diploma-erkenning en BIG-registratie', 'Coördinatie en toetsing van de huisvesting, en begeleiding na aankomst', 'Eén vast aanspreekpunt voor u en voor de kandidaat'] },
      partner: { h: 'Het geregistreerde partnerbureau doet', items: ['De officiële bemiddeling en het werkgeverschap', 'Het arbeidscontract en de arbeidsvoorwaarden', 'Loonbetaling en werkgeversverplichtingen', 'Naleving van de Waadi en de Wtta'] },
      inst: { h: 'Wij vragen van u', items: ['Een ondersteunende functie waarin de kandidaat kan starten', 'Een vaste begeleider of buddy op de afdeling', 'Ruimte in het rooster voor de taalopleiding', 'Huisvesting, of hulp bij het vinden daarvan — wij coördineren en toetsen die', 'Bereidheid de kandidaat te laten doorgroeien zodra de BIG-registratie rond is'] }
    },
    tijd: {
      eyebrow: 'DOORLOOPTIJD', h2: 'Wat kunt u wanneer verwachten?',
      sub: 'Een indicatie; het tempo wordt vooral bepaald door de taal en door de doorlooptijd bij het BIG-register.',
      items: [
        ['Kennismaking en werving', 'We bepalen het profiel en zoeken gericht in Spanje en andere EU-landen.'],
        ['Voorbereiding', 'Screening, documentcontrole en de start van de taalopleiding. De erkenningsaanvraag gaat parallel lopen.'],
        ['Start op uw afdeling', 'De kandidaat begint in een ondersteunende functie en leert verder in de praktijk.'],
        ['Doorgroei', 'Na het Staatsexamen NT2 en de BIG-registratie gaat de kandidaat over naar de verpleegkundige functie.']
      ],
      note: 'De erkenning door de commissie CBGV duurt maximaal 13 weken na een compleet dossier. Voor EU-kandidaten is geen visum of tewerkstellingsvergunning nodig, wat maanden scheelt.'
    },
    cta: { h2: 'Personeelsvraag bespreken?', p: 'Vertel ons welke functies openstaan en op welke termijn. Wij zeggen eerlijk of internationale werving bij uw situatie past — en wanneer niet.', btn1: 'PLAN EEN GESPREK', btn2: 'STEL EEN VRAAG' }
  },

  en: {
    title: 'For healthcare institutions',
    lead: 'You need people now, not in a year. That is why we work in two phases: the candidate joins your team within months in a supporting role, and then grows into a fully BIG-registered nurse.',
    fasen: {
      eyebrow: 'HOW IT WORKS', h2: 'Two phases instead of waiting',
      sub: 'The usual approach has a candidate studying at home for months before anyone appears on the ward. We turn that around.',
      items: [
        ['Phase 1 — working from the start', 'As soon as the candidate speaks enough Dutch for daily practice, they start with you in a supporting role: care assistant or healthcare aide. You gain extra hands immediately, exactly where the shortage is.'],
        ['Phase 2 — growing into the nursing role', 'Alongside the work, language training continues to B1 or B2, together with diploma recognition and BIG registration. Once that is complete, the candidate moves into the nursing role.']
      ],
      let: 'Important: until BIG registration is complete the candidate expressly does not work as a nurse and does not independently perform reserved procedures. The title of nurse is protected; we adhere to that strictly, and so must you.'
    },
    waarom: {
      eyebrow: 'WHY THIS WORKS BETTER', h2: 'Four reasons this model pays off',
      items: [
        ['Capacity now, not later', 'You fill part of your staffing gap within months instead of after a full training programme.'],
        ['Far less drop-out', 'Our candidates reach level A2 under their own steam and at their own expense before we take them on; anyone taking that step means it. After that they work in a team, earn a salary and hear Dutch every day. That gives up considerably less often than someone studying alone abroad.'],
        ['Faster to the required level', 'You learn a language fastest by using it. On the ward that goes many times faster than in an online lesson.'],
        ['You already know each other', 'When the move to the nursing role comes, you are working with someone who already knows your organisation, your residents and your way of working. No new induction.']
      ]
    },
    rollen: {
      eyebrow: 'CLEAR DIVISION OF ROLES', h2: 'Who does what',
      sub: 'Honor Care International does not place workers itself and is not an employer. That keeps the relationships clean and the process compliant with Dutch law.',
      us: { h: 'We do', items: ['Recruitment and selection in Spain and other EU countries', 'Screening and verification of diplomas and documents', 'Dutch language training from A2 to the required level', 'Support with diploma recognition and BIG registration', 'Coordinating and checking the housing, and guidance after arrival', 'One point of contact for you and for the candidate'] },
      partner: { h: 'The registered partner agency does', items: ['The official placement and the employer role', 'The employment contract and terms of employment', 'Salary payment and employer obligations', 'Compliance with the Waadi and the Wtta'] },
      inst: { h: 'We ask of you', items: ['A supporting role in which the candidate can start', 'A dedicated mentor or buddy on the ward', 'Room in the rota for language training', 'Housing, or help in finding it — we coordinate and check it', 'Willingness to let the candidate move up once BIG registration is complete'] }
    },
    tijd: {
      eyebrow: 'TIMELINE', h2: 'What can you expect, and when?',
      sub: 'An indication; the pace is set mainly by the language and by the processing time at the BIG register.',
      items: [
        ['Introduction and sourcing', 'We define the profile and search specifically in Spain and other EU countries.'],
        ['Preparation', 'Screening, document checks and the start of language training. The recognition application runs in parallel.'],
        ['Start on your ward', 'The candidate begins in a supporting role and keeps learning in practice.'],
        ['Moving up', 'After the Staatsexamen NT2 and BIG registration the candidate moves into the nursing role.']
      ],
      note: 'Recognition by the CBGV committee takes up to 13 weeks once the file is complete. EU candidates need no visa or work permit, which saves months.'
    },
    cta: { h2: 'Discuss your staffing needs?', p: 'Tell us which roles are open and on what timeline. We will say honestly whether international recruitment fits your situation — and when it does not.', btn1: 'BOOK A MEETING', btn2: 'ASK A QUESTION' }
  },

  es: {
    title: 'Para centros sanitarios',
    lead: 'Necesita personal ahora, no dentro de un año. Por eso trabajamos en dos fases: el candidato se incorpora a su servicio en pocos meses en un puesto de apoyo y después crece hasta ser enfermero con registro BIG completo.',
    fasen: {
      eyebrow: 'CÓMO FUNCIONA', h2: 'Dos fases en lugar de esperar',
      sub: 'El enfoque habitual deja al candidato estudiando en casa durante meses antes de que alguien pise la planta. Nosotros le damos la vuelta.',
      items: [
        ['Fase 1: incorporación inmediata', 'En cuanto el candidato domina el neerlandés suficiente para el día a día, empieza con usted en un puesto de apoyo: auxiliar sanitario o cuidador. Gana manos de inmediato, justo donde está la escasez.'],
        ['Fase 2: crecimiento hacia enfermero', 'Junto al trabajo continúa la formación lingüística hasta B1 o B2, con la homologación del título y el registro BIG. Cuando está listo, el candidato pasa al puesto de enfermero.']
      ],
      let: 'Importante: hasta completar el registro BIG el candidato expresamente no trabaja como enfermero ni realiza de forma autónoma actos reservados. El título de enfermero está protegido; nosotros lo respetamos estrictamente y usted también debe hacerlo.'
    },
    waarom: {
      eyebrow: 'POR QUÉ FUNCIONA MEJOR', h2: 'Cuatro razones por las que este modelo sale mejor',
      items: [
        ['Capacidad ahora, no después', 'Cubre parte de su falta de personal en meses en lugar de tras un programa formativo completo.'],
        ['Muchísimo menos abandono', 'Nuestros candidatos alcanzan el nivel A2 por su cuenta y a su cargo antes de que los aceptemos; quien da ese paso va en serio. Después trabajan en equipo, cobran un salario y escuchan neerlandés a diario. Eso abandona bastante menos que quien estudia solo en el extranjero.'],
        ['Antes al nivel exigido', 'Un idioma se aprende usándolo. En la planta eso va mucho más rápido que en una clase online.'],
        ['Ya se conocen', 'Al pasar al puesto de enfermero trabaja con alguien que ya conoce su organización, sus residentes y su forma de trabajar. Sin nueva incorporación.']
      ]
    },
    rollen: {
      eyebrow: 'REPARTO CLARO DE FUNCIONES', h2: 'Quién hace qué',
      sub: 'Honor Care International no realiza la intermediación ni es empleador. Eso mantiene limpias las relaciones y el proceso conforme a la ley neerlandesa.',
      us: { h: 'Nosotros hacemos', items: ['Captación y selección en España y otros países de la UE', 'Evaluación y verificación de títulos y documentos', 'Formación en neerlandés desde A2 hasta el nivel exigido', 'Apoyo con la homologación y el registro BIG', 'Coordinación y verificación del alojamiento, y acompañamiento tras la llegada', 'Un único interlocutor para usted y para el candidato'] },
      partner: { h: 'La agencia asociada registrada hace', items: ['La intermediación oficial y la condición de empleador', 'El contrato y las condiciones laborales', 'El pago del salario y las obligaciones del empleador', 'El cumplimiento de la Waadi y la Wtta'] },
      inst: { h: 'Le pedimos', items: ['Un puesto de apoyo donde el candidato pueda empezar', 'Un mentor fijo en la planta', 'Espacio en el turno para la formación lingüística', 'Alojamiento, o ayuda para encontrarlo: nosotros lo coordinamos y verificamos', 'Disposición a promocionar al candidato cuando tenga el registro BIG'] }
    },
    tijd: {
      eyebrow: 'PLAZOS', h2: '¿Qué puede esperar y cuándo?',
      sub: 'Una orientación; el ritmo lo marcan sobre todo el idioma y los plazos del registro BIG.',
      items: [
        ['Contacto y captación', 'Definimos el perfil y buscamos específicamente en España y otros países de la UE.'],
        ['Preparación', 'Evaluación, verificación de documentos e inicio de la formación. La solicitud de homologación va en paralelo.'],
        ['Incorporación a su servicio', 'El candidato empieza en un puesto de apoyo y sigue aprendiendo en la práctica.'],
        ['Promoción', 'Tras el Staatsexamen NT2 y el registro BIG pasa al puesto de enfermero.']
      ],
      note: 'El reconocimiento por la comisión CBGV tarda un máximo de 13 semanas con el expediente completo. Los candidatos de la UE no necesitan visado ni permiso de trabajo, lo que ahorra meses.'
    },
    cta: { h2: '¿Hablamos de sus necesidades de personal?', p: 'Cuéntenos qué puestos tiene abiertos y en qué plazo. Le diremos con honestidad si la captación internacional encaja en su situación, y cuándo no.', btn1: 'RESERVAR UNA REUNIÓN', btn2: 'HACER UNA PREGUNTA' }
  },

  pl: {
    title: 'Dla placówek medycznych',
    lead: 'Ludzie są potrzebni teraz, nie za rok. Dlatego pracujemy w dwóch etapach: kandydat staje na oddziale w ciągu kilku miesięcy na stanowisku wspierającym, a następnie awansuje na pełnoprawną pielęgniarkę z rejestracją BIG.',
    fasen: {
      eyebrow: 'JAK TO DZIAŁA', h2: 'Dwa etapy zamiast czekania',
      sub: 'Zwykłe podejście każe kandydatowi miesiącami uczyć się w domu, zanim ktokolwiek pojawi się na oddziale. My to odwracamy.',
      items: [
        ['Etap 1 — od razu w pracy', 'Gdy kandydat zna niderlandzki na poziomie codziennej praktyki, zaczyna u Państwa na stanowisku wspierającym: asystent lub opiekun medyczny. Zyskujecie ręce do pracy od razu, dokładnie tam, gdzie brakuje.'],
        ['Etap 2 — awans na pielęgniarkę', 'Obok pracy trwa nauka do B1 lub B2, wraz z uznaniem dyplomu i rejestracją BIG. Po ich zakończeniu kandydat przechodzi na stanowisko pielęgniarki.']
      ],
      let: 'Ważne: do czasu rejestracji BIG kandydat wyraźnie nie pracuje jako pielęgniarka i nie wykonuje samodzielnie czynności zastrzeżonych. Tytuł pielęgniarki jest chroniony; my ściśle tego przestrzegamy i Państwo również muszą.'
    },
    waarom: {
      eyebrow: 'DLACZEGO TO DZIAŁA LEPIEJ', h2: 'Cztery powody, dla których ten model się opłaca',
      items: [
        ['Ludzie teraz, nie później', 'Część braków kadrowych zapełniacie w ciągu miesięcy, a nie po pełnym programie szkoleniowym.'],
        ['Znacznie mniejsza rezygnacja', 'Nasi kandydaci osiągają poziom A2 własnymi siłami i na własny koszt, zanim ich przyjmiemy; kto robi ten krok, mówi poważnie. Potem pracują w zespole, dostają wynagrodzenie i codziennie słyszą niderlandzki. Rezygnują znacznie rzadziej niż osoby uczące się samotnie za granicą.'],
        ['Szybciej na wymaganym poziomie', 'Języka uczy się najszybciej przez używanie. Na oddziale idzie to wielokrotnie szybciej niż na lekcji online.'],
        ['Już się znacie', 'Przy przejściu na stanowisko pielęgniarki pracujecie z kimś, kto zna Waszą organizację, pacjentów i sposób pracy. Bez ponownego wdrażania.']
      ]
    },
    rollen: {
      eyebrow: 'JASNY PODZIAŁ RÓL', h2: 'Kto co robi',
      sub: 'Honor Care International nie prowadzi pośrednictwa i nie jest pracodawcą. Dzięki temu relacje pozostają czyste, a proces zgodny z holenderskim prawem.',
      us: { h: 'My robimy', items: ['Rekrutację i selekcję w Hiszpanii i innych krajach UE', 'Weryfikację dyplomów i dokumentów', 'Naukę niderlandzkiego od A2 do wymaganego poziomu', 'Wsparcie przy uznaniu dyplomu i rejestracji BIG', 'Koordynację i weryfikację zakwaterowania oraz opiekę po przyjeździe', 'Jeden punkt kontaktu dla Państwa i dla kandydata'] },
      partner: { h: 'Zarejestrowane biuro partnerskie robi', items: ['Oficjalne pośrednictwo i rolę pracodawcy', 'Umowę o pracę i warunki zatrudnienia', 'Wypłatę wynagrodzenia i obowiązki pracodawcy', 'Przestrzeganie Waadi i Wtta'] },
      inst: { h: 'Prosimy Państwa o', items: ['Stanowisko wspierające, na którym kandydat może zacząć', 'Stałego opiekuna na oddziale', 'Miejsce w grafiku na naukę języka', 'Zakwaterowanie lub pomoc w jego znalezieniu — my je koordynujemy i sprawdzamy', 'Gotowość do awansowania kandydata po uzyskaniu rejestracji BIG'] }
    },
    tijd: {
      eyebrow: 'CZAS TRWANIA', h2: 'Czego i kiedy mogą Państwo oczekiwać?',
      sub: 'Orientacyjnie; tempo wyznaczają głównie język i czas rozpatrywania w rejestrze BIG.',
      items: [
        ['Rozmowa i rekrutacja', 'Ustalamy profil i szukamy celowo w Hiszpanii i innych krajach UE.'],
        ['Przygotowanie', 'Weryfikacja, sprawdzenie dokumentów i start nauki języka. Wniosek o uznanie biegnie równolegle.'],
        ['Start na oddziale', 'Kandydat zaczyna na stanowisku wspierającym i uczy się dalej w praktyce.'],
        ['Awans', 'Po Staatsexamen NT2 i rejestracji BIG przechodzi na stanowisko pielęgniarki.']
      ],
      note: 'Uznanie przez komisję CBGV trwa do 13 tygodni od kompletnego wniosku. Kandydaci z UE nie potrzebują wizy ani zezwolenia na pracę, co oszczędza miesiące.'
    },
    cta: { h2: 'Porozmawiamy o potrzebach kadrowych?', p: 'Proszę powiedzieć, jakie stanowiska są wolne i w jakim terminie. Uczciwie powiemy, czy rekrutacja międzynarodowa pasuje do Państwa sytuacji — i kiedy nie.', btn1: 'UMÓW ROZMOWĘ', btn2: 'ZADAJ PYTANIE' }
  }
};

function renderInstitutions(lang, h) {
  const t = T[lang] || T.nl;
  const esc = h.esc;
  const f = t.fasen, w = t.waarom, r = t.rollen, d = t.tijd;

  const fasen = f.items.map((x, i) => `<article class="inst-fase"><span class="inst-n">${i + 1}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`).join('');
  const redenen = w.items.map(x => `<article class="eur-item give"><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`).join('');
  const lijst = (arr) => arr.map(x => `<li>${esc(x)}</li>`).join('');
  const stappen = d.items.map((x, i) => `<li><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></li>`).join('');

  return `<section class="page has-hero">
<p class="contact-lead">${esc(t.lead)}</p>

<div class="eur-block">
<div class="eur-head"><span class="eyebrow">${esc(f.eyebrow)}</span><h2>${esc(f.h2)}</h2><p>${esc(f.sub)}</p></div>
<div class="inst-fasen">${fasen}</div>
<p class="inst-let">${esc(f.let)}</p>
</div>

<div class="eur-block">
<div class="eur-head"><span class="eyebrow">${esc(w.eyebrow)}</span><h2>${esc(w.h2)}</h2></div>
<div class="eur-grid">${redenen}</div>
</div>

<div class="eur-block">
<div class="eur-head"><span class="eyebrow">${esc(d.eyebrow)}</span><h2>${esc(d.h2)}</h2><p>${esc(d.sub)}</p></div>
<ol class="eur-timeline">${stappen}</ol>
<p class="dv-note">${esc(d.note)}</p>
</div>

<div class="eur-roles"><div class="eur-head"><span class="eyebrow">${esc(r.eyebrow)}</span><h2>${esc(r.h2)}</h2><p>${esc(r.sub)}</p></div>
<div class="inst-rollen">
<article class="eur-role us"><h3>${esc(r.us.h)}</h3><ul>${lijst(r.us.items)}</ul></article>
<article class="eur-role partner"><h3>${esc(r.partner.h)}</h3><ul>${lijst(r.partner.items)}</ul></article>
<article class="eur-role inst"><h3>${esc(r.inst.h)}</h3><ul>${lijst(r.inst.items)}</ul></article>
</div></div>

<section class="page-cta"><h2>${esc(t.cta.h2)}</h2><p>${esc(t.cta.p)}</p>
<div class="page-cta-btns"><a class="btn gold" href="/plan">${esc(t.cta.btn1)}</a><a class="btn light" href="/contact#kontakt">${esc(t.cta.btn2)}</a></div></section>
</section>`;
}

function instTitle(lang) { return (T[lang] || T.nl).title; }

module.exports = { renderInstitutions, instTitle };
