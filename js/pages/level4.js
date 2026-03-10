import { setupNavigation } from "../utils/navigation.js";
import { initQuiz } from "../utils/quiz.js";

import { buildPage } from "../components/pageBuilder.js";
import { quizPanel } from "../components/quizPanel.js";
import { titlePanel, textPanel, imagePanel, gridPanels, navigateButtons } from "../components/panels.js";
import { ul, p, codeBlock } from "../components/contentBlock.js";

export function renderLevel4() {

    setTimeout(()=>{
        setupNavigation();
        initQuiz(4);
    },0);

    const sections = [

        titlePanel("Уровень 4: расширения и плагины СУБД"),

        textPanel("Введение", [
            p("Здесь мы рассмотрим дополнительные модули (extensions) и плагины PostgreSQL, которые расширяют возможности мониторинга."),
            p("Это официально поставляемые или внешние расширения, позволяющие собирать дополнительные метрики и логи. Они запускаются внутри сервера базы данных и часто выводят статистику по специфическим аспектам работы СУБД.")
        ]),

        textPanel("Обзор основных расширений", [
            p("pg_stat_statements - уже знакомый инструмент, который собирает статистику выполнения SQL-запросов:",
            { strong: ["pg_stat_statements"], code: ["pg_stat_statements"] }),
            ul([
                "общее время выполнения",
                "количество вызовов",
                "средние времена",
                "число возвращенных строк"
            ]),
            p("Нужен для анализа самых медленных или часто вызываемых запросов."),
            
            p("pg_buffercache - расширение для исследования содержимого буферов PostgreSQL в реальном времени:",
            { strong: ["pg_buffercache"], code: ["pg_buffercache"] }),
            ul([
                "представление pg_buffercache показывает, какие страницы каких таблиц сейчас находятся в shared_buffers",
                "полезно для понимания эффективности кеширования данных"
            ]),
            
            p("auto_explain - модуль логирования планов выполнения медленных запросов:",
            { strong: ["auto_explain"], code: ["auto_explain"] }),
            ul([
                "автоматически записывает EXPLAIN (ANALYZE) в лог для запросов, превышающих заданную продолжительность",
                "позволяет находить 'тяжелые' запросы без ручного анализа"
            ])
        ]),

        gridPanels(
            textPanel("Метрики auto_explain", [
                p("Планы выполнения запросов (auto_explain):", { code: ["auto_explain"] }),
                ul([
                    "статистика по узлам плана",
                    "использование буферов",
                    "время выполнения каждого этапа"
                ]),
                p("auto_explain не создает SQL-представление, а пишет в лог:", 
                { strong: ["auto_explain"], code: ["auto_explain"] }),
                ul([
                    "логи с планами запросов, когда они выполняются дольше порога",
                    "статистика по каждому оператору в плане (буферы, время на узел)",
                    "информация об использовании дискового I/O (log_buffers)"
                ]),
                p("Позволяет понять, почему конкретный запрос выполняется медленно и какие узлы плана самые дорогие.")
            ]),
            
            textPanel("Метрики pg_buffercache", [
                p("Наполнение кеша (pg_buffercache):", { code: ["pg_buffercache"] }),
                ul([
                    "какие таблицы имеют сколько страниц в кеше",
                    "помогает оптимизировать размеры shared_buffers"
                ]),
                p("Информация о загруженных страницах:", { code: ["pg_buffercache"] }),
                ul([
                    "bufferid - идентификатор буфера",
                    "relfilenode - файл таблицы/индекса",
                    "isdirty - флаг 'грязный' (измененный)",
                    "usagecount - частота использования"
                ], { code: ["bufferid","relfilenode","isdirty","usagecount"] }),
                p("Показывает, какие таблицы и индексы сейчас в кеше.")
            ])
        ),

        textPanel("Анализ буферного кеша через pg_buffercache", [
            p("Запрос показывает, какие таблицы занимают больше всего страниц в shared_buffers:"),
            codeBlock([
                "SELECT c.relname AS table_name, count(*) AS buffers",
                "FROM pg_buffercache b",
                "JOIN pg_class c ON b.relfilenode = c.relfilenode",
                "WHERE b.relfilenode <> 0",
                "GROUP BY c.relname",
                "ORDER BY buffers DESC",
                "LIMIT 5;"
            ], 0),
            p("Результат - топ таблиц по количеству занятых страниц в буфере."),
            p("Позволяет понять, какие таблицы сейчас активно кэшируются и эффективно ли используется shared_buffers.")
        ]),

        textPanel("Логирование планов через auto_explain", [
            p("Настройка в postgresql.conf для логирования медленных запросов:"),
            codeBlock([
                "shared_preload_libraries = 'auto_explain'",
                "auto_explain.log_min_duration = '500ms'",
            ], 0),
            p("Пример запроса, который будет залогирован (если выполняется > 500 мс):"),
            codeBlock([
                "EXPLAIN SELECT * FROM big_table WHERE value > 1000;"
            ], 0),
            p("auto_explain автоматически запишет в лог план выполнения с детализацией по узлам, времени и использованию буферов для всех медленных запросов.")
        ]),

        quizPanel({
            id: 1,
            question: "Какое расширение PostgreSQL помогает отслеживать самые длительные запросы?",
            options: [
                "pg_stat_archiver",
                "pg_buffercache",
                "pg_stat_statements",
                "pg_locks"
            ],
            correct: "pg_stat_statements",
            explanation: "pg_stat_statements собирает статистику выполнения запросов (время, кол-во вызовов) и позволяет найти наиболее медленные."
        }),

        quizPanel({
            id: 2,
            question: "Что показывает расширение pg_buffercache?",
            options: [
                "содержимое WAL-файла",
                "состояние буферного кеша памяти PostgreSQL",
                "текущие SQL-сессии",
                "статистику таблиц"
            ],
            correct: "состояние буферного кеша памяти PostgreSQL",
            explanation: "pg_buffercache позволяет просматривать содержимое shared buffer cache - какие страницы каких таблиц загружены в память."
        }),

        quizPanel({
            id: 3,
            question: "Какое расширение автоматически логирует планы медленных запросов?",
            options: [
                "pg_stat_activity",
                "auto_explain",
                "pg_stat_database",
                "pg_stat_statements"
            ],
            correct: "auto_explain",
            explanation: "Модуль auto_explain записывает планы выполнения запросов, которые выполняются дольше заданного порога."
        }),

        quizPanel({
            id: 4,
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

        quizPanel({
            id: 5,
            question: "Что означает высокое значение параметра usagecount в pg_buffercache?",
            options: [
                "буфер часто используется и, вероятно, хранит 'горячие' данные",
                "буфер никогда не использовался",
                "буфер занят системной таблицей",
                "буфер помечен как 'грязный' (dirty)"
            ],
            correct: "буфер часто используется и, вероятно, хранит 'горячие' данные",
            explanation: "Поле usagecount показывает, сколько раз страница попадала в кеш при алгоритме Clock. Большое значение означает частое использование, т.е. данные 'горячие'."
        }),

        quizPanel({
            id: 6,
            question: "Какая информация НЕ предоставляется расширением pg_stat_statements?",
            options: [
                "общее время выполнения запроса",
                "количество выполнений запроса",
                "текущий текст всех запросов в очереди",
                "суммарное количество возвращенных строк"
            ],
            correct: "текущий текст всех запросов в очереди",
            explanation: "pg_stat_statements дает агрегированные данные по уже выполненным запросам, а не текущее состояние соединений (для этого pg_stat_activity)."
        }),

        quizPanel({
            id: 7,
            question: "Что из перечисленного можно сделать при помощи pg_buffercache?",
            options: [
                "очистить буферную память",
                "посмотреть, какие таблицы занимают буферы",
                "повысить производительность запросов",
                "отобразить блокировки"
            ],
            correct: "посмотреть, какие таблицы занимают буферы",
            explanation: "С помощью запросов к pg_buffercache можно узнать, какие таблицы и индексы имеют сколько страниц в кеше."
        }),

        quizPanel({
            id: 8,
            question: "Какой флаг в pg_buffercache указывает, что страница была изменена и требует записи на диск?",
            options: [
                "bufferid",
                "relfilenode",
                "isdirty",
                "usagecount"
            ],
            correct: "isdirty",
            explanation: "Флаг isdirty ('грязный') показывает, что страница была изменена и еще не записана на диск. Такие страницы впоследствии будут сброшены на диск фоновым процессом."
        }),

        quizPanel({
            id: 9,
            question: "Какой параметр в postgresql.conf нужно установить, чтобы auto_explain логировал запросы, выполняющиеся дольше 1 секунды?",
            options: [
                "auto_explain.threshold = '1s'",
                "auto_explain.log_min_duration = '1000ms'",
                "auto_explain.log_duration = 1000",
                "auto_explain.min_time = 1"
            ],
            correct: "auto_explain.log_min_duration = '1000ms'",
            explanation: "Параметр auto_explain.log_min_duration задает порог длительности в миллисекундах. Значение '1000ms' или 1000 означает, что будут логироваться запросы, выполняющиеся дольше 1 секунды."
        }),

        quizPanel({
            id: 10,
            question: "Что произойдет после выполнения этого запроса к pg_buffercache? SELECT c.relname, count(*) FROM pg_buffercache b JOIN pg_class c ON b.relfilenode = c.relfilenode WHERE b.relfilenode <> 0 GROUP BY c.relname ORDER BY count(*) DESC LIMIT 3;",
            options: [
                "покажет три самых больших по размеру таблицы в базе",
                "покажет три таблицы, которые занимают больше всего страниц в буферном кеше",
                "покажет три таблицы с наибольшим количеством запросов",
                "покажет три таблицы, которые чаще всего блокируются"
            ],
            correct: "покажет три таблицы, которые занимают больше всего страниц в буферном кеше",
            explanation: "Запрос группирует страницы из pg_buffercache по таблицам (через pg_class) и сортирует по убыванию количества страниц. Это показывает, какие таблицы сейчас занимают больше всего места в shared_buffers."
        }),

        navigateButtons("level3", "level5")
    
    ];

    return buildPage(sections);

}