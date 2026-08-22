// Berichtenbak: aanvinken, tellen en bevestigen vóór verwijderen.
(function () {
  var form = document.getElementById('msgform');
  if (!form) return;

  var vinkjes = form.querySelectorAll('[data-rij]');
  var alles = form.querySelector('[data-alles]');
  var teller = form.querySelector('[data-teller]');
  var spamKnop = form.querySelector('[data-selecteer-spam]');

  function aantal() {
    var n = 0;
    for (var i = 0; i < vinkjes.length; i++) if (vinkjes[i].checked) n++;
    return n;
  }

  function bijwerken() {
    var n = aantal();
    if (teller) teller.textContent = n + ' geselecteerd';
    if (alles) {
      alles.checked = n > 0 && n === vinkjes.length;
      alles.indeterminate = n > 0 && n < vinkjes.length;
    }
    var knoppen = form.querySelectorAll('[name="actie"]');
    for (var i = 0; i < knoppen.length; i++) knoppen[i].disabled = n === 0;
  }

  if (alles) {
    alles.addEventListener('change', function () {
      for (var i = 0; i < vinkjes.length; i++) vinkjes[i].checked = alles.checked;
      bijwerken();
    });
  }

  if (spamKnop) {
    spamKnop.addEventListener('click', function () {
      for (var i = 0; i < vinkjes.length; i++) {
        if (vinkjes[i].hasAttribute('data-verdacht')) vinkjes[i].checked = true;
      }
      bijwerken();
    });
  }

  for (var i = 0; i < vinkjes.length; i++) vinkjes[i].addEventListener('change', bijwerken);

  // Shift-klik selecteert een reeks — scheelt veel klikken bij lange lijsten.
  var laatste = null;
  for (var j = 0; j < vinkjes.length; j++) {
    (function (index) {
      vinkjes[index].addEventListener('click', function (e) {
        if (e.shiftKey && laatste !== null) {
          var van = Math.min(laatste, index), tot = Math.max(laatste, index);
          for (var k = van; k <= tot; k++) vinkjes[k].checked = vinkjes[index].checked;
          bijwerken();
        }
        laatste = index;
      });
    })(j);
  }

  form.addEventListener('submit', function (e) {
    var knop = document.activeElement;
    var actie = knop && knop.getAttribute ? knop.getAttribute('value') : '';
    var n = aantal();
    if (n === 0) { e.preventDefault(); return; }
    if (actie === 'verwijderen') {
      var tekst = n === 1
        ? 'Dit bericht definitief verwijderen?'
        : n + ' berichten definitief verwijderen?';
      if (!window.confirm(tekst)) e.preventDefault();
    }
  });

  bijwerken();
})();
