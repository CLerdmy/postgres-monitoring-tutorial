import { renderIntro } from "./pages/intro.js";
import { renderLevel1 } from "./pages/level1.js";
import { renderLevel2 } from "./pages/level2.js";
import { renderLevel3 } from "./pages/level3.js";
import { renderLevel4 } from "./pages/level4.js";
import { renderLevel5 } from "./pages/level5.js";
import { renderFinal } from "./pages/final.js";
import { setupNavigation } from "./utils/navigation.js";

export function renderPage(page) {

    const app = document.getElementById("app");

    switch(page){

        case "intro":
            app.innerHTML = renderIntro();
            break;

        case "level1":
            app.innerHTML = renderLevel1();
            break;

        case "level2":
            app.innerHTML = renderLevel2();
            break;

        case "level3":
            app.innerHTML = renderLevel3();
            break;

        case "level4":
            app.innerHTML = renderLevel4();
            break;

        case "level5":
            app.innerHTML = renderLevel5();
            break;

        case "final":
            app.innerHTML = renderFinal();
            break;
    }

    setupNavigation();

    window.scrollTo(0, 0);

}