// Shows approved comments under each observation and the comment count on the link.
(function () {
  var CFG = window.BRICK_LODGE_FEEDBACK || {};
  var blocks = document.querySelectorAll('.comments-block[data-obs]');
  if (!CFG.endpoint || !blocks.length || !window.fetch) return;

  function fmt(ms) {
    var d = new Date(Number(ms));
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  fetch(CFG.endpoint + '?action=list')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok) return;
      blocks.forEach(function (block) {
        var obs = block.getAttribute('data-obs');
        var mine = data.comments.filter(function (c) { return c.obs === obs; });
        if (!mine.length) return;
        var link = block.querySelector('.feedback-link');
        if (link) link.innerHTML = '&#128172; Comments &amp; Feedback (' + mine.length + ')';
        var box = block.querySelector('.approved-comments');
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
        box.hidden = false;
      });
    })
    .catch(function () { /* comments are optional; fail silently */ });
})();
