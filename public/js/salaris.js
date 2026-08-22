// Keuzehulp salaris. Rekent volledig in de browser: er gaat niets naar de server
// en er wordt niets opgeslagen. De CAO-bedragen komen uit het JSON-blok #saldata,
// dat de server meestuurt vanuit salary.js.
(function () {
  var holder = document.getElementById('saldata');
  var form = document.getElementById('salform');
  var out = document.getElementById('saluitkomst');
  if (!holder || !form || !out) return;

  var D;
  try { D = JSON.parse(holder.textContent); } catch (e) { return; }

  var LOCALE = { nl: 'nl-NL', en: 'en-IE', es: 'es-ES', pl: 'pl-PL' };
  var loc = LOCALE[D.lang] || 'nl-NL';

  function euro(n) {
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(n));
    } catch (e) { return '€ ' + Math.round(n); }
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function scaleByFwg(fwg) {
    for (var i = 0; i < D.scales.length; i++) if (D.scales[i].fwg === fwg) return D.scales[i];
    return D.scales[0];
  }

  function factor(list, key) {
    for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i].f;
    return 0;
  }

  // Eén situatie doorrekenen: schaal, trede-aandeel, uren en aandeel onregelmatige uren.
  function reken(fwg, ervF, uren, dienstF) {
    var s = scaleByFwg(fwg);
    var deel = uren / D.hoursFull;
    var bruto = (s.min + (s.max - s.min) * ervF) * deel;
    var ort = bruto * dienstF;
    // Vakantiegeld gaat over salaris en ORT; de eindejaarsuitkering alleen over het salaris.
    var vakJaar = (bruto + ort) * 12 * (D.vakantiegeld / 100);
    var eindJaar = bruto * 12 * (D.eindejaar / 100);
    var jaar = (bruto + ort) * 12 + vakJaar + eindJaar;
    return {
      fwg: fwg, key: s.key, bruto: bruto, ort: ort, vakJaar: vakJaar, eindJaar: eindJaar, jaar: jaar,
      nettoLaag: (bruto + ort) * D.nettoLow, nettoHoog: (bruto + ort) * D.nettoHigh
    };
  }

  function kolom(titel, r, klasse) {
    var R = D.res;
    var regels = [
      [R.functie, esc(D.functies[r.key] || '')],
      [R.fwg, 'FWG ' + r.fwg],
      [R.bruto, euro(r.bruto)],
      [R.ort, r.ort > 0 ? euro(r.ort) + ' ' + esc(R.perMaand) : '—'],
      [R.vak, euro(r.vakJaar) + ' ' + esc(R.perJaar)],
      [R.eind, euro(r.eindJaar) + ' ' + esc(R.perJaar)],
      [R.netto, euro(r.nettoLaag) + ' – ' + euro(r.nettoHoog)]
    ];
    var html = '<div class="sal-kolom ' + klasse + '"><h4>' + esc(titel) + '</h4>'
      + '<p class="sal-groot">' + euro(r.jaar) + '<span>' + esc(R.perJaar) + '</span></p><dl>';
    for (var i = 0; i < regels.length; i++) {
      html += '<dt>' + esc(regels[i][0]) + '</dt><dd>' + regels[i][1] + '</dd>';
    }
    return html + '</dl></div>';
  }

  function toon() {
    var R = D.res;
    var beroep = document.getElementById('sal-beroep').value;
    var ervF = factor(D.ervaring, document.getElementById('sal-ervaring').value);
    var taal = document.getElementById('sal-taal').value;
    var uren = parseInt(document.getElementById('sal-uren').value, 10) || D.hoursFull;
    var dienstF = factor(D.diensten, document.getElementById('sal-diensten').value);

    var route = D.routes[beroep] || D.routes.anders;
    var nu = reken(route.start, ervF, uren, dienstF);
    var straks = reken(route.doel, ervF, uren, dienstF);
    var verschil = straks.jaar - nu.jaar;

    var html = '<h3>' + esc(R.h) + '</h3><div class="sal-kolommen">'
      + kolom(R.now, nu, 'sal-nu') + kolom(R.later, straks, 'sal-straks') + '</div>'
      + '<p class="sal-verschil"><strong>' + esc(R.gain) + ':</strong> ' + euro(verschil) + '</p>'
      + '<div class="sal-next"><h4>' + esc(R.nextH) + '</h4><p>' + esc(R.next[taal] || R.next.t0) + '</p>'
      + '<p class="sal-nextbtns"><a class="btn gold" href="' + esc(R.ctaHref) + '">' + esc(R.cta) + '</a>'
      + '<a class="btn light" href="' + esc(R.cta2Href) + '">' + esc(R.cta2) + '</a></p></div>'
      + '<p class="sal-note">' + esc(R.note) + '</p>';

    out.innerHTML = html;
    out.hidden = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); toon(); });
  form.addEventListener('reset', function () { out.hidden = true; out.innerHTML = ''; });
})();
