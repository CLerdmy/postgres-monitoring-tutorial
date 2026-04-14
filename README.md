# PostgreSQL Monitoring Tutorial

This project is a small interactive tutorial about **monitoring a PostgreSQL database**. The tutorial explains how different monitoring tools work at different levels, from operating system tools to internal database telemetry. The idea is similar to nested layers: first you look at the system, then infrastructure monitoring tools, then PostgreSQL built-in views, extensions, and finally low-level internal mechanisms. Each level has short theory, examples, and small quiz questions to check understanding.

The project is a **Single Page Application (SAP)** built with **HTML, CSS and JavaScript**. Navigation between sections happens without reloading the page. The interface shows the learning progress and gives feedback for quiz answers.

## Project structure

- Images are stored in `resources/img` as `.png` files
- The main HTML file is `index.html`, and styles are in `css/styles.css`
- JavaScript code is organized in the `js` folder: core files (`app.js`, `router.js`, `state.js`), page files in `pages/`, utility functions in `utils/`, and reusable UI parts in `components/`

## GitHub Pages

**Link**: https://clerdmy.github.io/postgres-monitoring-tutorial/

## Run with Docker

**Build image**:
```bash
docker build -t postgres-monitoring-tutorial .
```

**Run container**:
```bash
docker run -p 8080:80 postgres-monitoring-tutorial
```

**Open**: http://localhost:8080

---