export function titlePanel(title) {
    return `
        <div class="blue-panel">
            <h1 class="title">${title}</h1>
        </div>
    `;
}

export function textPanel(title, blocks) {
    return `
        <div class="blue-panel">
            <h3>${title}</h3>
            <div class="content-text">
                ${blocks.join("")}
            </div>
        </div>
    `;
}

export function imagePanel(title, img) {
    return `
        <div class="blue-panel">
            <h3>${title}</h3>
            <img src="${img}">
        </div>
    `;
}

export function gridPanels(leftPanel, rightPanel) {
    return `
        <div class="panel-grid">
            ${leftPanel}
            ${rightPanel}
        </div>
    `;
}

export function navigateButtons(left, right) {
    return `
        <div class="page-navigation">
            <button class="nav-button prev" data-prev=${left}>Назад</button>
            <button class="nav-button next" data-next=${right} disabled>Далее</button>
        </div>
    `;
}