// Live klokken voor het tijdsverschil tussen Nederland en Colombia.
(function () {
  var els = document.querySelectorAll('[data-clock]');
  if (!els.length) return;
  function tick() {
    for (var i = 0; i < els.length; i++) {
      var tz = els[i].getAttribute('data-clock');
      try {
        els[i].textContent = new Intl.DateTimeFormat('nl-NL', {
          timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
      } catch (e) { els[i].textContent = '--:--'; }
    }
  }
  tick();
  setInterval(tick, 30000);
})();
