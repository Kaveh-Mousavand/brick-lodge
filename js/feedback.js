// Logic for feedback.html: validation, file reading, submission to the Apps Script endpoint.
(function () {
  var CFG = window.BRICK_LODGE_FEEDBACK || {};
  var MAX_WORDS = CFG.maxWords || 1000;
  var MAX_MB = CFG.maxFileMB || 20;
  var MAX_BYTES = MAX_MB * 1024 * 1024;

  var params = new URLSearchParams(location.search);
  var obs = params.get('obs') || '';
  var titles = CFG.observations || {};
  var title = titles[obs] || '';
  var num = (obs.match(/^obs-(\d+)$/) || [])[1];

  var $ = function (id) { return document.getElementById(id); };
  if ($('max-mb')) $('max-mb').textContent = MAX_MB;
  var form = $('feedback-form'), status = $('form-status'), submit = $('submit-btn');
  var back = $('back-to-obs');
  if (back) back.setAttribute('href', 'observations.html' + (obs ? '#' + obs : ''));

  $('obs-label').textContent = num
    ? 'Observation ' + num + (title ? ': ' + title : '')
    : 'Observations';

  if (!CFG.endpoint) {
    $('not-active').hidden = false;
    form.hidden = true;
    return;
  }
  if (!/^obs-\d{1,3}$/.test(obs)) {
    $('bad-link').hidden = false;
    form.hidden = true;
    return;
  }

  function words(s) { return (s.trim().match(/\S+/g) || []).length; }
  function say(msg, kind) {
    status.textContent = msg;
    status.className = 'form-status ' + (kind || '');
    status.hidden = !msg;
  }

  // Clear an old error message as soon as the visitor edits anything.
  form.addEventListener('input', function () { if (status.classList.contains('error')) say(''); });
  form.addEventListener('change', function () { if (status.classList.contains('error')) say(''); });

  var comment = $('comment'), counter = $('word-count');
  function updateCount() {
    var n = words(comment.value);
    counter.textContent = n + ' / ' + MAX_WORDS + ' words';
    counter.classList.toggle('over', n > MAX_WORDS);
  }
  comment.addEventListener('input', updateCount);
  updateCount();

  var fileInput = $('attachment'), fileNote = $('file-note');
  function fileProblem() {
    var f = fileInput.files[0];
    if (!f) return '';
    if (f.size > MAX_BYTES) return 'The attachment is larger than ' + MAX_MB + ' MB.';
    return '';
  }
  fileInput.addEventListener('change', function () {
    var f = fileInput.files[0];
    var p = fileProblem();
    fileNote.textContent = p || (f ? f.name + ' (' + (f.size / 1048576).toFixed(1) + ' MB)' : '');
    fileNote.classList.toggle('over', !!p);
  });

  function readFile(f) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(',')[1] || ''); };
      r.onerror = function () { reject(new Error('read')); };
      r.readAsDataURL(f);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('full-name').value.trim();
    var email = $('email').value.trim();
    var text = comment.value.trim();
    if (name.length < 2) return say('Please enter your full name.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('Please enter a valid email address.', 'error');
    if (!text) return say('Please write your comment.', 'error');
    if (words(text) > MAX_WORDS) return say('Your comment is longer than ' + MAX_WORDS + ' words. Please shorten it.', 'error');
    var problem = fileProblem();
    if (problem) return say(problem, 'error');

    submit.disabled = true;
    say('Sending… please keep this page open (large attachments can take a minute).', 'info');

    var f = fileInput.files[0];
    (f ? readFile(f) : Promise.resolve(null))
      .then(function (b64) {
        var payload = {
          obs: obs, title: title, name: name, email: email, comment: text,
          website: $('website').value,
          file: f ? { name: f.name, type: f.type, data: b64 } : null
        };
        // text/plain avoids a CORS preflight request, which Apps Script cannot answer.
        return fetch(CFG.endpoint, { method: 'POST', body: JSON.stringify(payload) });
      })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.ok) {
          form.hidden = true;
          $('thanks').hidden = false;
          status.hidden = true;
        } else {
          submit.disabled = false;
          say((res && res.error) || 'Sorry, your comment could not be sent. Please try again.', 'error');
        }
      })
      .catch(function () {
        submit.disabled = false;
        say('Sorry, your comment could not be sent. Please try again later, or contact Kaveh Mousavand through his home page.', 'error');
      });
  });
})();
