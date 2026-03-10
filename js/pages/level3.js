import { setupNavigation } from "../utils/navigation.js";
import { initQuiz } from "../utils/quiz.js";

import { buildPage } from "../components/pageBuilder.js";
import { quizPanel } from "../components/quizPanel.js";
import { titlePanel, textPanel, imagePanel, gridPanels, navigateButtons } from "../components/panels.js";
import { ul, p, codeBlock } from "../components/contentBlock.js";

export function renderLevel3() {

    setTimeout(()=>{
        setupNavigation();
        initQuiz(3);
    },0);

    const sections = [

        titlePanel("Уровень 3: встроенные средства СУБД"),

        textPanel("Введение", [
            p("К внутренним средствам PostgreSQL относятся встроенные динамические представления (pg_stat_*), расширения (например, pg_stat_statements) и системные функции.",
            { strong: ["внутренним средствам PostgreSQL"], code: ["pg_stat_*","pg_stat_statements"] }),
            
            p("Они позволяют получить информацию о текущей и накопленной статистике работы СУБД без внешних утилит.", 
            { strong: ["без внешних утилит"] }),
            
            p("Основные преимущества:"),
            ul([
                "данные собираются сервером базы данных",
                "доступны через SQL",
                "отражают реальное состояние системы"
            ], { strong: ["сервером базы данных","через SQL","реальное состояние"] })
        ]),

        gridPanels(
            textPanel("pg_stat_activity", [
                p("Содержит одну строку на каждое соединение (процесс), показывает текущее состояние соединения:"),
                ul([
                    "выполняемый запрос",
                    "состояние (active/idle)",
                    "время начала"
                ])
            ]),
            
            textPanel("pg_stat_database", [
                p("Одна строка на каждую базу данных, показывает суммарные статистики:"),
                ul([
                    "число транзакций (xact_commit/xact_rollback)",
                    "возвраты (blocks hit)",
                    "блокировки (conflicts/deadlocks)"
                ])
            ])
        ),

        gridPanels(
            textPanel("pg_stat_user_tables", [
                p("Статистика по обращениям к таблицам текущей базы:"),
                ul([
                    "сканирования (seq_scan, idx_scan)",
                    "вставки (n_tup_ins)",
                    "обновления (n_tup_upd)",
                    "удаления (n_tup_del)"
                ])
            ]),
            
            textPanel("pg_locks и pg_stat_replication", [
                p("Информация о блокировках и репликации:"),
                ul([
                    "текущие блокировки (pg_locks)",
                    "состояние репликации и lag (pg_stat_replication)"
                ])
            ])
        ),

        textPanel("Расширение pg_stat_statements", [
            p("Расширение pg_stat_statements (входит в стандартный дистрибутив PostgreSQL) отслеживает статистику выполнения всех SQL-запросов на сервере.",
            { code: ["pg_stat_statements"] }),
            p("После включения доступно представление pg_stat_statements, содержащее:", 
            { code: ["pg_stat_statements"] }),
            ul([
                "среднее/максимальное/общее время выполнения запросов",
                "число вызовов (calls)",
                "количество обработанных строк (rows)",
                "информацию по вводу-выводу (blk_read_time, blk_write_time)"
            ]),
            p("Расширение необходимо добавить в файл конфигурации.")
        ]),

        textPanel("Особенности сбора статистики", [
            p("Системные представления собирают статистику накопительно с момента последнего сброса или старта сервера.",
            { strong: ["накопительно"] }),
            p("Для сброса статистики есть функции:"),
            ul([
                "pg_stat_statements_reset() - обнуляет счетчики расширения",
                "pg_stat_reset() - сбрасывает кумулятивную статистику"
            ]),
            p("На наполнение системных представлений влияют параметры конфигурации: track_activities, track_counts (включены по умолчанию).",
            { code: ["track_activities", "track_counts"] })
        ]),

        imagePanel("Запрос активных соединений", "resources/img/pgconnection.png"),

        gridPanels(
            textPanel("SQL запрос", [
                codeBlock([
                    "SELECT pid, usename, state, query",
                    "FROM pg_stat_activity",
                    "WHERE datname = current_database();"
                ], 0)
            ]),
            
            textPanel("Пояснения", [
                p("Выводит активные соединения:"),
                ul([
                    "pid - идентификатор процесса",
                    "usename - имя пользователя",
                    "state - состояние (active/idle)",
                    "query - текущий выполняемый запрос"
                ], { code: ["pid","usename","state","query"] }),
                p("Позволяет увидеть, какие запросы выполняются прямо сейчас и кто их запустил.")
            ])
        ),

        imagePanel("Статистика по базам данных", "resources/img/pgallconnections.png"),

        gridPanels(
            textPanel("SQL запрос", [
                codeBlock([
                    "SELECT datname, numbackends, xact_commit, xact_rollback",
                    "FROM pg_stat_database;"
                ], 0)
            ]),
            
            textPanel("Пояснения", [
                p("Показывает:"),
                ul([
                    "datname - имя базы данных",
                    "numbackends - текущее число соединений",
                    "xact_commit - количество закоммиченных транзакций",
                    "xact_rollback - количество отмененных транзакций"
                ], { code: ["datname","numbackends","xact_commit","xact_rollback"] }),
                p("Позволяет оценить стабильность работы БД (чем меньше rollback, тем лучше).")
            ])
        ),

        imagePanel("Агрегированные статистики", "resources/img/pgtotaltime.png"),

        gridPanels(
            textPanel("SQL запрос", [
                codeBlock([
                    "SELECT calls, total_plan_time, query",
                    "FROM pg_stat_statements",
                    "ORDER BY total_plan_time DESC",
                    "LIMIT 5;"
                ], 0)
            ]),
            
            textPanel("Пояснения", [
                p("Выводит пять самых ресурсоемких запросов:"),
                ul([
                    "calls - количество вызовов",
                    "total_plan_time - суммарное время выполнения",
                    "query - текст запроса"
                ], { code: ["calls","total_plan_time","query"] }),
                p("Помогает найти запросы, которые больше всего нагружают базу.")
            ])
        ),

        imagePanel("Детальная статистика транзакций", "resources/img/pgtransaction.png"),

        gridPanels(
            textPanel("SQL запрос", [
                codeBlock([
                    "SELECT",
                    "  datname,",
                    "  xact_commit, xact_rollback,",
                    "  blks_read, blks_hit",
                    "FROM pg_stat_database",
                    "WHERE datname = 'mydb';"
                ], 0)
            ]),
            
            textPanel("Пояснения", [
                p("Добавлены метрики по кэшированию:"),
                ul([
                    "xact_commit/xact_rollback - успешные и неуспешные транзакции",
                    "blks_read - чтения страниц с диска",
                    "blks_hit - чтения из кэша (буферного кэша)"
                ], { code: ["xact_commit","xact_rollback","blks_read","blks_hit"] }),
                p("Что показывает:"),
                ul([
                    "высокое blks_hit говорит о хорошей эффективности кэша",
                    "рост blks_read указывает на нехватку shared_buffers или медленный диск",
                    "соотношение xact_commit к xact_rollback показывает стабильность"
                ])
            ])
        ),

        quizPanel({
            id: 1,
            question: "Что показывает представление pg_stat_activity?",
            options: [
                "Суммарную статистику по таблицам.",
                "Информацию о каждом активном соединении.",
                "Метрики буфера обмена (cache).",
                "Настройки сервера."
            ],
            correct: "Информацию о каждом активном соединении.",
            explanation: "pg_stat_activity содержит по одной строке на каждый процесс (соединение) PostgreSQL, отображая состояние и выполняемый запрос."
        }),

        quizPanel({
            id: 2,
            question: "Что необходимо сделать, чтобы использовать представление pg_stat_statements?",
            options: [
                "Установить расширение pg_stat_statements и перезапустить сервер.",
                "Включить параметр track_io.",
                "Ничего, оно всегда включено.",
                "Подключиться как superuser."
            ],
            correct: "Установить расширение pg_stat_statements и перезапустить сервер.",
            explanation: "Расширение pg_stat_statements нужно добавить в shared_preload_libraries в конфиге и выполнить CREATE EXTENSION, после чего сервер нужно перезапустить."
        }),

        quizPanel({
            id: 3,
            question: "Какие данные содержит pg_stat_database?",
            options: [
                "Состояние всех активных транзакций.",
                "Статистику по каждой базе данных (кол-во транзакций, операций).",
                "Логи сервера.",
                "Бинарные данные пользователей."
            ],
            correct: "Статистику по каждой базе данных (кол-во транзакций, операций).",
            explanation: "pg_stat_database имеет по строке на каждую БД, показывая суммарную статистику (количество транзакций, файл запись/чтение и т.д.)."
        }),

        quizPanel({
            id: 4,
            question: "Что означает высокий показатель blks_read в pg_stat_database?",
            options: [
                "Сервер перевел много денежных средств.",
                "Большое количество чтений данных с диска.",
                "Много ошибок в системе.",
                "Превышен лимит соединений."
            ],
            correct: "Большое количество чтений данных с диска.",
            explanation: "blks_read - количество блоков (страниц) прочитанных с диска. Высокое значение говорит о частом доступе к дисковому хранилищу (мало кеширования)."
        }),

        quizPanel({
            id: 5,
            question: "Что из перечисленного показывает pg_stat_statements?",
            options: [
                "Состояние сети.",
                "Статистику выполнения SQL-запросов (время, количество вызовов).",
                "Пользователей базы.",
                "Версию PostgreSQL."
            ],
            correct: "Статистику выполнения SQL-запросов (время, количество вызовов).",
            explanation: "Модуль pg_stat_statements отслеживает статистику планирования и выполнения всех SQL-запросов на сервере."
        }),

        quizPanel({
            id: 6,
            question: "Какой столбец pg_stat_statements отражает общее время выполнения запроса?",
            options: [
                "total_time",
                "calls",
                "rows",
                "queryid"
            ],
            correct: "total_time",
            explanation: "В представлении pg_stat_statements столбец total_time содержит общее время выполнения данного запроса (в мс)."
        }),

        quizPanel({
            id: 7,
            question: "Что означает состояние idle in transaction в pg_stat_activity?",
            options: [
                "Соединение закрыто.",
                "Открыта транзакция без активности.",
                "Выполняется долгий запрос.",
                "Сервер ожидает команду CREATE DATABASE."
            ],
            correct: "Открыта транзакция без активности.",
            explanation: "idle in transaction означает, что соединение находится внутри транзакции, но сейчас в ожидании команды. Такие 'зависшие' транзакции могут удерживать блокировки."
        }),

        quizPanel({
            id: 8,
            question: "Какой SQL-запрос покажет количество подключений по пользователям?",
            options: [
                "SELECT count(*) FROM pg_stat_database;",
                "SELECT usename, count(*) FROM pg_stat_activity GROUP BY usename;",
                "SELECT * FROM pg_database;",
                "SELECT * FROM pg_roles;"
            ],
            correct: "SELECT usename, count(*) FROM pg_stat_activity GROUP BY usename;",
            explanation: "pg_stat_activity содержит колонку usename (имя пользователя) и количество строк равно кол-ву соединений. Группировка по usename посчитает их количество."
        }),

        quizPanel({
            id: 9,
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
            id: 10,
            question: "Какие статистики невозможно получить из этих встроенных представлений?",
            options: [
                "Количество прочитанных строк в запросе.",
                "Среднее время выполнения запроса.",
                "Использование CPU в процентах.",
                "Число операций вставки в таблицу."
            ],
            correct: "Использование CPU в процентах.",
            explanation: "Встроенные представления PostgreSQL не содержат прямой информации об использовании CPU. Они дают статистику операций базы (строки, время запросов, блоки), но не метрики ОС (CPU, память)."
        }),

        navigateButtons()
    
    ];

    return buildPage(sections);

}