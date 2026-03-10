import { setupNavigation } from "../utils/navigation.js";
import { initQuiz } from "../utils/quiz.js";

import { buildPage } from "../components/pageBuilder.js";
import { quizPanel } from "../components/quizPanel.js";
import { titlePanel, textPanel, imagePanel, gridPanels, navigateButtons } from "../components/panels.js";
import { ul, p, codeBlock } from "../components/contentBlock.js";

export function renderFinal() {

    setTimeout(()=>{
        initQuiz(6);
    },0);

    const sections = [

        titlePanel("Финальная проверка знаний по всем уровням"),

        quizPanel({
            id: 1,
            question: "Какая функция сбрасывает статистику pg_stat_statements?",
            options: [
                "pg_stat_reset()",
                "pg_stat_statements_reset()",
                "pg_refresh_stats()",
                "pg_reset_wal()"
            ],
            correct: "pg_stat_statements_reset()",
            explanation: "Для обнуления счетчиков pg_stat_statements используется функция pg_stat_statements_reset()."
        }),        

        quizPanel({
            id: 2,
            question: "Как Grafana осуществляет оповещения (alerting)?",
            options: [
                "не осуществляет",
                "через внешние системы (Prometheus Alertmanager)",
                "встроенный механизм уведомлений по условиям в дашборде",
                "только Email"
            ],
            correct: "встроенный механизм уведомлений по условиям в дашборде",
            explanation: "В Grafana можно настроить правила оповещений на графиках (Alerts) с отправкой в Slack, Email, PagerDuty и др. каналы."
        }),

        quizPanel({
            id: 3,
            question: "Что показывает расширение pg_buffercache?",
            options: [
                "содержимое WAL-файла",
                "состояние буферного кэша памяти PostgreSQL",
                "текущие SQL-сессии",
                "статистику таблиц"
            ],
            correct: "состояние буферного кэша памяти PostgreSQL",
            explanation: "pg_buffercache позволяет просматривать содержимое shared buffer cache - какие страницы каких таблиц загружены в память."
        }),        

        quizPanel({
            id: 4,
            question: "Кому разрешен доступ к просмотру pg_backend_memory_contexts?",
            options: [
                "любому подключенному пользователю",
                "только суперпользователю или роли с привилегией pg_read_all_stats",
                "только роли postgres",
                "только суперпользователю"
            ],
            correct: "только суперпользователю или роли с привилегией pg_read_all_stats",
            explanation: "По умолчанию информацию из pg_backend_memory_contexts могут читать суперпользователь или роли с привилегией pg_read_all_stats. Обычные пользователи статистику памяти других бэкендов видеть не могут."
        }),

        quizPanel({
            id: 5,
            question:"Что показывает параметр %iowait?",
            options:["время ожидания сети","время ожидания операций ввода-вывода","использование памяти","загрузку GPU"],
            correct:"время ожидания операций ввода-вывода",
            explanation:"%iowait показывает время ожидания дисковых операций."
        }), 

        quizPanel({
            id: 6,
            question:"Какой инструмент Windows показывает процессы и загрузку CPU?",
            options:["Event Viewer","Task Manager","Disk Management","Registry Editor"],
            correct:"Task Manager",
            explanation:"Task Manager показывает процессы и загрузку CPU, RAM и сети."
        }),

       quizPanel({
            id: 7,
            question: "Какие статистики невозможно получить из этих встроенных представлений?",
            options: [
                "количество прочитанных строк в запросе",
                "среднее время выполнения запроса",
                "использование CPU в процентах",
                "число операций вставки в таблицу"
            ],
            correct: "использование CPU в процентах",
            explanation: "Встроенные представления PostgreSQL не содержат прямой информации об использовании CPU. Они дают статистику операций базы (строки, время запросов, блоки), но не метрики ОС (CPU, память)."
        }),

        quizPanel({
            id: 8,
            question: "Что показывает панель Grafana?",
            options: [
                "графики и таблицы метрик во времени",
                "списки файлов",
                "средства шифрования",
                "системный реестр Windows"
            ],
            correct: "графики и таблицы метрик во времени",
            explanation: "Панель Grafana строит графики, столбчатые диаграммы, таблицы и другие виджеты по временным рядам данных (метрик)."
        }),

        quizPanel({
            id: 9,
            question: "Что показывает представление pg_stat_slru?",
            options: [
                "статистику по таблицам с именами, начинающимися на 'slru'",
                "сспользование памяти страниц SQL (Shared Memory)",
                "статистику операций над SLRU-кэшами (например, commit_timestamp, multixact)",
                "статистику по индексам, использующим SLRU-алгоритм"
            ],
            correct: "статистику операций над SLRU-кэшами (например, commit_timestamp, multixact)",
            explanation: "SLRU (Simple LRU) используется для низкоуровневых кэшей PostgreSQL. pg_stat_slru содержит по одной строке на каждый SLRU-кэш и показывает число операций чтения/записи блоков, попаданий в кэш и усечений."
        }),

        quizPanel({
            id: 10,
            question: "Что нужно сделать, чтобы начать использовать pg_stat_statements?",
            options: [
                "выполнить CREATE EXTENSION pg_stat_statements и перезапустить сервер",
                "установить флаг track_activities в off",
                "Ничего, т.к. оно включено по умолчанию.",
                "подключиться как обычный пользователь"
            ],
            correct: "выполнить CREATE EXTENSION pg_stat_statements и перезапустить сервер",
            explanation: "Расширение pg_stat_statements нужно активировать командой CREATE EXTENSION, а также включить его в shared_preload_libraries (требуется перезапуск)."
        }),

        `<div class="page-navigation-center"><button class="nav-button-center" data-next="intro">Вернуться</button></div>`
    
    ];

    return buildPage(sections);

}