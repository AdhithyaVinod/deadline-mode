# Deadline Mode — Your Countdown, Your Design

A responsive countdown and milestone planner built for the Handshake AI Skills Studio × Google November challenge: **Your Deadline, Your Design: Create a Countdown Lock Screen**.

## Features
- Live days, hours, minutes and seconds countdown
- Lock-screen view with prominent clock and simplified layout
- Print-to-PDF option for saving the lock-screen composition
- Editable deadline title, date/time and accent theme
- Add, complete and remove milestones (up to 8)
- Progress bar and completion count
- Focus mode and native share support
- Saves settings and milestone progress in the current browser using `localStorage`
- Responsive layout for phones, tablets and desktops

## Run locally
No build tools, Node.js or backend are required.

1. Extract the project folder.
2. Open `index.html` in a modern browser, or run `python -m http.server 8000` in this folder.
3. Visit `http://localhost:8000`.

## Publish with GitHub Pages
The repository should contain `index.html`, `styles.css`, `app.js` and the `assets` folder at its root. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.

## Default challenge countdown
The default is **24 November 2026, 12:29 PM India Standard Time**, corresponding to **23 November 2026, 11:59 PM Pacific Time**, the entry deadline stated in the official rules. The date can be changed in Customize.

## Suggested Handshake submission
**Title:** Deadline Mode — Your Countdown, Your Design

**Description:** Deadline Mode turns an important deadline into a clear, personal action plan. Its live countdown can be personalized with a title, date and accent theme, while editable milestones help users break a big goal into achievable steps. A dedicated lock-screen view emphasizes the clock and remaining time, and a print-to-PDF option lets users save the composition. Progress and settings are stored locally in the browser.

**Cover image:** `assets/cover.png`

## Notes
- Settings and milestone progress are stored locally in each browser; they are not synced across devices.
- The lock-screen view is a web preview. It does not automatically install itself as the device's wallpaper; use the browser's print-to-PDF flow to save the composition.
