// Brick Lodge: settings for the "Comments & Feedback" feature.
//
// endpoint:  paste the web-app URL of your Google Apps Script here (it ends in /exec).
//            While it is empty, the form page explains that comments are not yet active.
// maxWords / maxFileMB: limits shown to visitors and checked in the browser
//            (the backend enforces the same limits).
// observations: one line per observation, so the form page can display its title.
//            When you add "Observation 2" to observations.html, add its id and title here.
window.BRICK_LODGE_FEEDBACK = {
  endpoint: "https://script.google.com/macros/s/AKfycbyibB9WXHTdOGmGZGyoa10EiU8sew9Dj95rVfi-Kl7TZgQ_t8kGs7LPWUN43KW6z3k5/exec",
  maxWords: 1000,
  maxFileMB: 20,
  observations: {
    "obs-1": "On infinite semibrick of pairwise extension-orthogonal rigid bricks"
  }
};
