import { renderPage } from "../router.js";
import { state } from "../state.js";

export function setupNavigation(){

    document.querySelectorAll("[data-prev]").forEach(btn => {

        btn.addEventListener("click", () => {

            const page = btn.dataset.prev;

            state.currentPage = page;

            renderPage(page);

        });

    });

    document.querySelectorAll("[data-next]").forEach(btn => {

        btn.addEventListener("click", () => {

            const page = btn.dataset.next;

            state.currentPage = page;

            renderPage(page);

        });

    });

}