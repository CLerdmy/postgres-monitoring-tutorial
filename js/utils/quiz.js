import { state } from "../state.js";

export function initQuiz(levelNumber){

    const levelKey = levelNumber === 6 ? "final" : "level" + levelNumber;

    const panels = document.querySelectorAll(".test-panel");

    const answers = state.quizAnswers[levelKey];

    panels.forEach((panel,index)=>{

        const qId = index + 1;

        const correct = panel.dataset.correct;
        const explanation = panel.dataset.explanation;

        const options = panel.querySelectorAll(".test-option");
        const feedback = panel.querySelector(".test-feedback");

        if(answers[qId]){

            options.forEach(opt=>{

                opt.disabled = true;

                if(opt.dataset.value === correct){
                    opt.classList.add("correct");
                }

                if(opt.dataset.value === answers[qId] && answers[qId] !== correct){
                    opt.classList.add("incorrect");
                }

            });

            feedback.innerHTML =
                (answers[qId] === correct
                    ? `<span style="color:#4ade80">Правильно.</span>`
                    : `<span style="color:#f87171">Неверно.</span>`)
                + `<br>${explanation}`;
        }

        options.forEach(option=>{

            option.addEventListener("click",()=>{

                if(answers[qId]) return;

                const value = option.dataset.value;

                answers[qId] = value;

                state.stats.totalAnswers++;

                if(value === correct){
                    state.stats.correctAnswers++;
                }

                options.forEach(opt=>{

                    opt.disabled = true;

                    if(opt.dataset.value === correct){
                        opt.classList.add("correct");
                    }

                });

                if(value === correct){

                    option.classList.add("correct");

                    feedback.innerHTML = `<span style="color:#4ade80">Правильно.</span><br>${explanation}`;

                } else {

                    option.classList.add("incorrect");

                    feedback.innerHTML = `<span style="color:#f87171">Неверно.</span><br>${explanation}`;
                }

                checkCompletion(levelNumber);

            });

        });

    });

}

function checkCompletion(levelNumber){

    const levelKey = levelNumber === 6 ? "final" : "level"+levelNumber;

    const answers = state.quizAnswers[levelKey];

    if(Object.keys(answers).length === 10){

        if(levelNumber <= 5){

            state.completedLevels += 1;

        }

        const nextBtn = document.querySelector(".next");

        if(nextBtn){
            nextBtn.disabled = false;
        }

        updateProgress();

    }

}

function updateProgress(){

    const progress = document.querySelector(".progress");
    const accuracy = document.querySelector(".accuracy");

    if(progress){
        progress.textContent = `Уровней изучено: ${state.completedLevels}/5`;
    }

    if(accuracy){

        const percent = state.stats.totalAnswers === 0 ? 0 : Math.round((state.stats.correctAnswers / state.stats.totalAnswers) * 100);

        accuracy.textContent = `Правильных ответов: ${percent}%`;
    }

}