import { renderPage } from "./router.js";
import { state } from "./state.js";

function renderHeader(){

    const header = document.getElementById("header");

    header.innerHTML = `

    <div class="header-grid">

        <div class="progress">
            Уровней изучено: ${state.completedLevels}/5
        </div>

        <h1 class="title">
            PostgreSQL Monitoring Tutorial
        </h1>

        <div class="accuracy">
            ${state.stats.totalAnswers === 0 ? "Правильных ответов: 0%" : `Правильных ответов: ${Math.round((state.stats.correctAnswers/state.stats.totalAnswers)*100)}%`}
        </div>

    </div>

    <div class="level-nav">

        <button data-page="intro">Введение</button>
        <button data-page="level1">Уровень 1</button>
        <button data-page="level2">Уровень 2</button>
        <button data-page="level3">Уровень 3</button>
        <button data-page="level4">Уровень 4</button>
        <button data-page="level5">Уровень 5</button>
        <button data-page="final">Финал</button>

    </div>

    `;

    document.querySelectorAll("[data-page]").forEach(btn => {

        btn.addEventListener("click", () => {

            const page = btn.dataset.page;

            state.currentPage = page;

            renderPage(page);
            renderHeader();

        });

    });

}

function init(){

    renderHeader();
    renderPage(state.currentPage);

}

init();