export function buildPage(sections) {

    return `
        <div class="page">
            ${sections.join("")}
        </div>
    `;
}