# Brick Lodge

A repository for recent developments on **bricks** in the representation theory of algebras and
related areas — a growing collection of open conjectures, open questions, new results,
observations and examples.

**Live site:** https://kaveh-mousavand.github.io/brick-lodge/
**Maintainer:** [Kaveh Mousavand](https://kaveh-mousavand.github.io/) · kaveh.mousavand@oist.jp

## Contents

| File | What it contains |
|---|---|
| `index.html` | Landing page: introduction and the A/B/C/D topic list |
| `open-conjectures.html` | A. Open Conjectures — each in its own card, with a "More information" drop-down; at the bottom, the inline SVG diagram of implications among the bBT conjectures (its labels are clickable; source PDF in `assets/docs/`) |
| `open-questions.html` | B. Open Questions — same layout, plus related MathOverflow problems |
| `results.html` | C. New Results — same card layout as the Observations page; Result 1 is "On E-Symmetric Algebras and brick-Brauer–Thrall Conjectures" (K. Mousavand with GPT-6, November 2026) |
| `observations.html` | D. Observations — same card layout; Observation 1 is Enomoto's AI-constructed infinite rigid semibrick; Observation 2 is the Enomoto–Marczinzik AI-constructed counterexample to the Auslander–Reiten conjecture and its link with the boundedness conjecture |
| `feedback.html` | "Comments & Feedback" form opened from each observation or result (name, email, comment, optional file) |
| `js/` | `feedback-config.js` (settings and endpoint), `feedback.js` (form), `comments.js` (shows approved comments) |
| `assets/docs/` | PDFs attached to entries (Enomoto's note, the E-symmetric algebras note and its implications diagram, and the bBT implications diagram) |
| `css/style.css` | Shared stylesheet |
| `assets/images/profile.jpg` | Sidebar photo |

The site is plain HTML and CSS. There is nothing to build or install.

## Link convention

Links that stay inside the Brick Lodge (including "Back to Brick Lodge") open in the **same tab**, so
visitors never end up with several copies of the main page. Links that leave the Brick Lodge (other
websites, the maintainer's main site, PDFs) open in a **new tab** (`target="_blank" rel="noopener noreferrer"`).

## How changes are made

Nothing goes live until the maintainer approves it:

1. Create a branch (or edit a file directly on GitHub — it will offer to create a branch).
2. Make your changes and open a **pull request** into `main`.
3. The maintainer reviews the **Files changed** tab and merges it, or asks for revisions.

Every change is recorded in the repository history, and any merged change can be reverted from
its pull request page. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Adding or editing content

* **A new conjecture or question:** copy an existing `<div class="conjecture-card"> … </div>`
  block in `open-conjectures.html` or `open-questions.html`, paste it in the right
  (chronological) position, and edit the title, meta line, setting, statement and drop-down.
  Give the drop-down button and its panel a new matching id (for example `info-9`).
* **A new observation:** copy the card in `observations.html`, paste it below the last one, renumber it,
  and give its drop-down button/panel a new matching id (for example `o-info-2`).
* **A new result:** copy the card of Result 1 in `results.html`, paste it below the last one and renumber it.
  Change `res-1` to `res-2` (card id, `data-obs`, `data-group`, the form link `feedback.html?obs=res-2`), the panel
  ids `r-info-1`/`r-comments-1` to `r-info-2`/`r-comments-2` (and the matching `data-target`s), and add one line
  with its title to `js/feedback-config.js`. Observations use ids `obs-N`, results use `res-N`.
* **A new observation also needs:** its own comments drop-down. Copy the whole card of Observation 1
  (including the two buttons and both panels), then change `obs-1` to `obs-2` (card id, `data-obs`,
  `data-group`, the form link `feedback.html?obs=obs-2`), the panel ids `o-info-1`/`o-comments-1` to
  `o-info-2`/`o-comments-2` (and the matching `data-target`s), and add one line with its title to
  `js/feedback-config.js`.
* **Comments & Feedback:** visitors' comments are emailed to the maintainer and contributors and appear
  under the observation only after approval. The service runs in the maintainer's Google account (Apps
  Script); its code is deliberately **not** stored in this public repository.
* **References:** always hyperlink them (arXiv and journal versions where available).
