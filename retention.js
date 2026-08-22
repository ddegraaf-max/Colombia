// Automatisch opruimen. Wat er niet meer is, kan bij een inbraak ook niet
// uitlekken — daarom verdwijnen berichten en gespreksaanvragen na de bewaartermijn.
// De zandloper in het overzicht laat zien hoeveel tijd een bericht nog heeft.

const MAANDEN = Math.max(1, parseInt(process.env.RETENTION_MONTHS || '24', 10) || 24);
const DAG = 24 * 60 * 60 * 1000;

function vervaldatum(aangemaakt) {
  if (!aangemaakt) return null;
  const d = new Date(aangemaakt);
  if (isNaN(d)) return null;
  const v = new Date(d);
  v.setMonth(v.getMonth() + MAANDEN);
  return v;
}

function resterend(aangemaakt) {
  const v = vervaldatum(aangemaakt);
  if (!v) return null;
  const dagen = Math.ceil((v - Date.now()) / DAG);
  let niveau = 'ver';
  if (dagen <= 30) niveau = 'bijna';
  else if (dagen <= 180) niveau = 'binnenkort';
  return { dagen, datum: v, niveau };
}

// Korte, leesbare tekst: jaren en maanden zolang het ver weg is, dagen als het dichtbij komt.
function label(dagen) {
  if (dagen <= 0) return 'wordt opgeruimd';
  if (dagen < 31) return dagen + (dagen === 1 ? ' dag' : ' dagen');
  const maanden = Math.round(dagen / 30.4);
  if (maanden < 12) return maanden + (maanden === 1 ? ' maand' : ' maanden');
  const jaren = Math.floor(maanden / 12);
  const rest = maanden % 12;
  return jaren + (jaren === 1 ? ' jaar' : ' jaar') + (rest ? ' ' + rest + ' mnd' : '');
}

function zandloper(aangemaakt, esc) {
  const r = resterend(aangemaakt);
  if (!r) return '';
  const datum = r.datum.toLocaleDateString('nl-NL');
  const titel = r.dagen > 0
    ? 'Wordt automatisch verwijderd op ' + datum
    : 'Staat klaar om te worden opgeruimd';
  return `<span class="zl zl-${r.niveau}" title="${esc(titel)}"><span class="zl-ic">&#8987;</span>${esc(label(r.dagen))}</span>`;
}

function uitleg() {
  return 'Berichten en gespreksaanvragen worden ' + MAANDEN + ' maanden bewaard en daarna automatisch verwijderd. ' +
    'De zandloper laat zien hoeveel tijd er nog is. Wat je eerder weg wilt hebben, verwijder je zelf.';
}

// Ruimt op en geeft terug wat er is verwijderd. Draait bij het opstarten en daarna dagelijks.
async function ruimOp(modellen) {
  const grens = new Date();
  grens.setMonth(grens.getMonth() - MAANDEN);
  const resultaat = {};
  for (const [naam, Model] of Object.entries(modellen)) {
    try {
      const r = await Model.deleteMany({ createdAt: { $lt: grens } });
      resultaat[naam] = r.deletedCount || 0;
    } catch (e) { resultaat[naam] = -1; }
  }
  return { grens, resultaat };
}

function plan(modellen, log) {
  const draai = async () => {
    const { grens, resultaat } = await ruimOp(modellen);
    const totaal = Object.values(resultaat).filter(n => n > 0).reduce((a, b) => a + b, 0);
    if (totaal > 0 && log) {
      log('[opruimen] ' + totaal + ' record(s) ouder dan ' + MAANDEN + ' maanden verwijderd (' +
        Object.entries(resultaat).filter(([, n]) => n > 0).map(([k, n]) => k + ': ' + n).join(', ') + ')');
    }
  };
  draai();
  setInterval(draai, DAG);
}

module.exports = { MAANDEN, vervaldatum, resterend, label, zandloper, uitleg, ruimOp, plan };
