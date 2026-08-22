// Rekenmodel bemiddelingstarief. Rekent live, slaat niets op.
(function () {
  var kosten = document.querySelectorAll('[data-kost]');
  if (!kosten.length) return;

  function num(el) { var v = parseFloat(el && el.value); return isFinite(v) && v >= 0 ? v : 0; }
  function aanname(naam) { return num(document.querySelector('[data-aanname="' + naam + '"]')); }
  function euro(n) {
    if (!isFinite(n)) return '—';
    return '€ ' + Math.round(n).toLocaleString('nl-NL');
  }
  function zet(naam, tekst) {
    var els = document.querySelectorAll('[data-uit="' + naam + '"]');
    for (var i = 0; i < els.length; i++) els[i].textContent = tekst;
  }

  function reken() {
    var direct = 0;
    for (var i = 0; i < kosten.length; i++) direct += num(kosten[i]);

    var uitval = Math.min(95, aanname('uitval')); // 100% zou delen door nul geven
    var marge = aanname('marge');
    var maand = aanname('salaris');

    // Kandidaten die afhaken kosten wel geld maar leveren niets op. De kosten
    // van de hele groep worden gedragen door het deel dat wél geplaatst wordt.
    var slaagkans = (100 - uitval) / 100;
    var kostprijs = slaagkans > 0 ? direct / slaagkans : Infinity;
    var advies = kostprijs * (1 + marge / 100);

    zet('direct', euro(direct));
    zet('kostprijs', euro(kostprijs));
    zet('breakeven', euro(kostprijs));
    zet('advies', euro(advies));
    zet('advies2', euro(advies));

    // Jaarsalaris inclusief 8,33% vakantiegeld en 8,33% eindejaarsuitkering.
    var jaar = maand * 12 * 1.1666;
    zet('jaar', euro(jaar));
    zet('m20', euro(jaar * 0.20));
    zet('m25', euro(jaar * 0.25));
    zet('m30', euro(jaar * 0.30));

    var uitleg = '';
    if (!isFinite(kostprijs)) {
      uitleg = 'Met dit uitvalpercentage plaats je niemand; het model kan dan geen tarief berekenen.';
    } else {
      var perc = jaar > 0 ? (advies / jaar) * 100 : 0;
      uitleg = 'Van elke 10 kandidaten die je start, plaats je er ongeveer ' +
        Math.round(slaagkans * 10) + '. De kosten van de andere ' + (10 - Math.round(slaagkans * 10)) +
        ' draag je mee in het tarief. Je geadviseerde tarief komt neer op ' + perc.toFixed(1) +
        '% van het bruto jaarsalaris' +
        (perc > 30 ? ' — boven de marktnorm, dus onderbouw goed wat je extra levert.' :
         (perc < 20 ? ' — onder de marktnorm; je laat waarschijnlijk geld liggen.' :
          ' — binnen de gebruikelijke marktbandbreedte.'));
    }
    zet('uitleg', uitleg);
    // Rekent met het werkelijk afgesproken tarief zodra dat is ingevuld.
    var werkelijk = aanname('werkelijk');
    rekenMijlpalen(direct, werkelijk > 0 ? werkelijk : advies, werkelijk > 0);
  }

  // Mijlpaalbetalingen: wat kost een afhaker je op elk moment in het traject?
  function rekenMijlpalen(direct, advies, eigenTarief) {
    var rijen = document.querySelectorAll('[data-mijl-kosten]');
    if (!rijen.length) return;

    var maxVerlies = 0, feeTotaal = 0, hoogstePunt = '';
    var namen = document.querySelectorAll('.tf-mijl-naam b');

    for (var i = 0; i < rijen.length; i++) {
      var kPct = num(document.querySelector('[data-mijl-kosten="' + i + '"]'));
      var fPct = num(document.querySelector('[data-mijl-fee="' + i + '"]'));
      feeTotaal += fPct;

      var kosten = direct * (kPct / 100);
      // Op het moment van uitval heb je ontvangen wat tot en met deze mijlpaal is betaald.
      var ontvangen = 0;
      for (var j = 0; j <= i; j++) ontvangen += advies * (num(document.querySelector('[data-mijl-fee="' + j + '"]')) / 100);
      var verlies = kosten - ontvangen;

      var cel = document.querySelector('[data-mijl-kosteneuro="' + i + '"]');
      if (cel) cel.textContent = euro(kosten);
      var cel2 = document.querySelector('[data-mijl-feeeuro="' + i + '"]');
      if (cel2) cel2.textContent = euro(ontvangen);
      var cel3 = document.querySelector('[data-mijl-verlies="' + i + '"]');
      if (cel3) {
        cel3.textContent = verlies > 0 ? euro(verlies) : euro(0);
        cel3.className = verlies > direct * 0.5 ? 'tf-slecht' : (verlies > 0 ? 'tf-matig' : 'tf-goed');
      }

      // De laatste mijlpaal is een geslaagde plaatsing, geen uitval.
      if (i < rijen.length - 1 && verlies > maxVerlies) {
        maxVerlies = verlies;
        hoogstePunt = namen[i] ? namen[i].textContent : '';
      }
    }

    zet('expNu', euro(direct));
    zet('expMijl', euro(maxVerlies));
    var daling = direct - maxVerlies;
    zet('expDaling', euro(daling));

    var w = document.querySelector('[data-uit="mijlWaarschuwing"]');
    if (w) {
      w.textContent = Math.round(feeTotaal) === 100 ? ''
        : 'Let op: de percentages van de fee tellen op tot ' + Math.round(feeTotaal) + '% in plaats van 100%.';
      w.style.display = Math.round(feeTotaal) === 100 ? 'none' : 'block';
    }

    var pct = direct > 0 ? Math.round((daling / direct) * 100) : 0;
    zet('mijlUitleg', direct > 0
      ? 'Zonder mijlpalen kost elke afhaker je de volle ' + euro(direct) + '. Met deze verdeling is je grootste blootstelling ' +
        euro(maxVerlies) + (hoogstePunt ? ' — vlak na "' + hoogstePunt + '"' : '') + '. Dat scheelt ' + euro(daling) +
        ' per afhaker, oftewel ' + pct + '% minder risico.' + (eigenTarief ? ' (gerekend met je eigen tarief van ' + euro(advies) + ')' : '') + ' Het verlaagt bovendien je werkkapitaalbehoefte, want je krijgt eerder geld binnen.'
      : '');
  }

  var alle = document.querySelectorAll('[data-kost],[data-aanname],[data-mijl-kosten],[data-mijl-fee]');
  for (var j = 0; j < alle.length; j++) {
    alle[j].addEventListener('input', reken);
    alle[j].addEventListener('change', reken);
  }
  reken();
})();
