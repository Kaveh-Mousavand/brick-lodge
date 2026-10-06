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
| `open-conjectures.html` | A. Open Conjectures — each in its own card, with a "More information" drop-down |
| `open-questions.html` | B. Open Questions — same layout, plus related MathOverflow problems |
| `index.html` (script at the bottom) | C. New Results and D. Observations — currently "Content coming soon" pop-ups |
| `css/style.css` | Shared stylesheet |
| `assets/images/profile.jpg` | Sidebar photo |

The site is plain HTML and CSS. There is nothing to build or install.

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
* **New Results / Observations:** edit the `brickLodgeContent` object at the bottom of
  `index.html`; each entry's `body` accepts plain HTML.
* **References:** always hyperlink them (arXiv and journal versions where available).
