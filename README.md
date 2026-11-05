# My Portfolio

Pure HTML + CSS + JavaScript portfolio. No build step needed.

## Files
- `index.html` : all content (name, skills, projects, education, achievements, certificates, contact)
- `style.css`  : design, colors, animations
- `script.js`  : typing effect, scroll animations, theme toggle, particles

## Put it live on GitHub Pages (free)

1. Go to github.com -> **New repository**.
2. Name it **`sivakeerthi946-cmd.github.io`** (replace with your exact GitHub username). Set it **Public**.
3. Click **uploading an existing file**, drag `index.html`, `style.css`, `script.js` (and `resume.pdf`, if you have one), then **Commit changes**.
4. Go to **Settings -> Pages**. Under *Branch*, choose **main** and folder **/ (root)**, then **Save**.
5. Wait 1-2 minutes. Your site is live at `https://sivakeerthi946-cmd.github.io`.

(If you name the repo something else, like `portfolio`, the link will be `https://sivakeerthi946-cmd.github.io/portfolio`.)

## What to edit

| What | Where |
|------|-------|
| Name, title tag | `index.html` -> search `Keerthi Siva Prasad` and `KS.` |
| Typing roles | `script.js` -> `ROLES` at the top |
| Email | `index.html` (mailto links) and `script.js` -> `MY_EMAIL` |
| GitHub / LinkedIn links | `index.html` -> hero `.socials` |
| Skills and percentages | `index.html` -> `#skills` (`data-w="90"` and the `90%` text) |
| Projects | `index.html` -> `#projects` (copy one `<article>` to add more) |
| Education | `index.html` -> `#education` |
| Achievements / Certificates | `index.html` -> `#achievements`, `#certificates` |
| Colors | `style.css` -> `:root` variables (`--accent`, `--accent-2`) |
| Resume | Put `resume.pdf` in the same folder |

## Tips for recruiters
- Add real live links and GitHub links to every project.
- Add your photo? Put `photo.jpg` in the folder and add an `<img>` in the About section.
- Keep project descriptions to what you built + the result (numbers help).
