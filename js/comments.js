// "Comments & Feedback" drop-down of each observation.
//  - Before the Google service is connected (no endpoint in feedback-config.js) the drop-down shows
//    the "not activated yet" message that is already in the HTML.
//  - Once an endpoint is set, it shows the approved comments, a count on the button, and a button
//    that opens the comment form (feedback.html).
(function () {
  var CFG = window.BRICK_LODGE_FEEDBACK || {};
  var panels = document.querySelectorAll('.comments-panel[data-obs]');
  if (!CFG.endpoint || !panels.length) return;

  panels.forEach(function (panel) {
    panel.querySelector('.comments-inactive').hidden = true;
    panel.querySelector('.comments-active').hidden = false;
    panel.querySelector('.comments-status').textContent = 'Loading comments…';
  });

  function fmt(ms) {
    var d = new Date(Number(ms));
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function render(panel, mine) {
    var box = panel.querySelector('.approved-comments');
    var status = panel.querySelector('.comments-status');
    box.innerHTML = '';
    mine.forEach(function (c) {
      var item = document.createElement('div');
      item.className = 'comment-item';
      var head = document.createElement('p');
      head.className = 'comment-head';
      var who = document.createElement('strong');
      who.textContent = c.name;
      var when = document.createElement('span');
      when.className = 'comment-date';
      when.textContent = ' · ' + fmt(c.timestamp);
      head.appendChild(who);
      head.appendChild(when);
      var body = document.createElement('p');
      body.className = 'comment-body';
      body.textContent = c.comment;
      item.appendChild(head);
      item.appendChild(body);
      box.appendChild(item);
    });
    status.textContent = mine.length ? '' : 'No comments have been posted yet.';
    var obs = panel.getAttribute('data-obs');
    var btn = document.querySelector('.comments-toggle[data-obs="' + obs + '"] .comments-label');
    if (btn) btn.textContent = 'Comments & Feedback' + (mine.length ? ' (' + mine.length + ')' : '');
  }

  if (!window.fetch) return;
  fetch(CFG.endpoint + '?action=list')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok) throw new Error('list');
      panels.forEach(function (panel) {
        var obs = panel.getAttribute('data-obs');
        render(panel, data.comments.filter(function (c) { return c.obs === obs; }));
      });
    })
    .catch(function () {
      panels.forEach(function (panel) {
        panel.querySelector('.comments-status').textContent = 'Comments could not be loaded right now.';
      });
    });
})();
