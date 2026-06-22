(function () {
  var chat = document.getElementById('chat');
  var form = document.getElementById('chatform');
  var msg = document.getElementById('msg');
  if (!chat || !form || !msg) return;
  var history = [];

  function add(role, text) {
    var d = document.createElement('div');
    d.className = 'bubble ' + role;
    d.textContent = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }

  add('assistant', 'Hallo! Ik ben de AI-assistent van Honor Care. Vraag me bijvoorbeeld om een wervingsmail te schrijven, een subsidie uit te leggen of een planning te maken.');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var text = msg.value.trim();
    if (!text) return;
    msg.value = '';
    add('user', text);
    history.push({ role: 'user', content: text });
    var placeholder = add('assistant', '…');
    try {
      var r = await fetch('/assistant/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      var data = await r.json();
      if (data && data.error) {
        placeholder.textContent = '⚠ ' + data.error;
      } else {
        placeholder.textContent = data.reply;
        history.push({ role: 'assistant', content: data.reply });
      }
    } catch (err) {
      placeholder.textContent = '⚠ Kon de assistent niet bereiken.';
    }
  });
})();
