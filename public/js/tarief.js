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
  }

  var alle = document.querySelectorAll('[data-kost],[data-aanname]');
  for (var j = 0; j < alle.length; j++) {
    alle[j].addEventListener('input', reken);
    alle[j].addEventListener('change', reken);
  }
  reken();
})();
