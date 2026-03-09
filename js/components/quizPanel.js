export function quizPanel({id, question, options, correct, explanation}) {

    const buttons = options.map(o => `<button class="test-option" data-value="${o}">${o}</button>`).join("");

    return `
        <div class="test-panel" 
            data-correct="${correct}" 
            data-explanation="${explanation}">

            <h3>Вопрос ${id}</h3>

            <div class="test-question">${question}</div>

            ${buttons}

            <div class="test-feedback"></div>

        </div>
    `;
}