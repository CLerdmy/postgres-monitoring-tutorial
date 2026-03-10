import { setupNavigation } from "../utils/navigation.js";
import { initQuiz } from "../utils/quiz.js";

import { buildPage } from "../components/pageBuilder.js";
import { quizPanel } from "../components/quizPanel.js";
import { titlePanel, textPanel, imagePanel, gridPanels, navigateButtons } from "../components/panels.js";
import { ul, p, codeBlock } from "../components/contentBlock.js";

export function renderLevel5() {

    setTimeout(()=>{
        setupNavigation();
        initQuiz(5);
    },0);

    const sections = [

        titlePanel("Уровень 5: внутренняя телеметрия и низкоуровневые механизмы"),

        textPanel("Введение", [
            p("Внутренняя телеметрия PostgreSQL - это встроенные средства сбора и представления статистики о внутренних процессах СУБД и низкоуровневых операциях (WAL, фоновый писатель, кэш-блоки, память и т.д.).",
            { strong: ["Внутренняя телеметрия"] }),
            p("Эти данные собираются в системных представлениях и функциях статистического модуля PostgreSQL и позволяют глубоко анализировать работу СУБД без сторонних инструментов."),
            p("К данной категории относятся системные представления статистики, которые показывают состояние и активность внутренних механизмов СУБД: статистика генерации WAL, активности фонового писателя, чекпоинтера, операций ввода-вывода, работы кэша страниц, распределения памяти и т.д.",
            { strong: ["без сторонних инструментов"] }),
            p("Для сбора некоторых показателей требуется включить параметры конфигурации: track_io_timing, track_wal_io_timing.",
            { code: ["track_io_timing", "track_wal_io_timing"] })
        ]),

        gridPanels(
            textPanel("pg_stat_archiver", [
                p("Содержит одну строку с данными о работе процесса архивации WAL:",
                { code: ["pg_stat_archiver"] }),
                ul([
                    "archived_count - число успешно заархивированных файлов",
                    "failed_count - число неудачных попыток",
                    "last_archived_time - время последней архивации",
                    "last_failed_time - время последней ошибки"
                ], { code: ["archived_count","failed_count","last_archived_time","last_failed_time"] })
            ]),
            
            textPanel("pg_stat_bgwriter", [
                p("Статистика фонового писателя:",
                { code: ["pg_stat_bgwriter"] }),
                ul([
                    "buffers_clean - число записанных фоновых буферов",
                    "bgwriter_maxwritten - сколько раз писатель останавливался из-за лимита",
                    "buffers_backend - число буферов, записанных серверным процессом",
                    "buffers_alloc - общее число выделенных буферов"
                ], { code: ["buffers_clean","bgwriter_maxwritten","buffers_backend","buffers_alloc"] })
            ])
        ),

        gridPanels(
            textPanel("pg_stat_checkpointer", [
                p("Статистика процесса чекпоинтов (с PostgreSQL 17):",
                { code: ["pg_stat_checkpointer"] }),
                ul([
                    "num_timed - чекпоинты по таймауту",
                    "num_requested - чекпоинты по запросу",
                    "buffers_written - сколько буферов записано",
                    "write_time - время записи на диск",
                    "sync_time - время синхронизации файлов"
                ], { code: ["num_timed","num_requested","buffers_written","write_time","sync_time"] })
            ]),
            
            textPanel("pg_stat_wal", [
                p("Сводная статистика WAL:",
                { code: ["pg_stat_wal"] }),
                ul([
                    "wal_records - общее число записей WAL",
                    "wal_bytes - суммарный объем WAL в байтах",
                    "wal_fpi - число полных снимков страницы",
                    "wal_buffers_full - сколько раз буферы WAL переполнялись"
                ], { code: ["wal_records","wal_bytes","wal_fpi","wal_buffers_full"] })
            ])
        ),

        textPanel("pg_stat_io", [
            p("Агрегированная статистика ввода-вывода. Строка на каждое сочетание:", 
            { code: ["pg_stat_io"] }),
            ul([
                "типа бэкенда (backend_type)",
                "типа объекта (relation, temp relation, wal)",
                "контекста I/O (normal, init, vacuum, bulkread, bulkwrite)"
            ]),
            p("Показывает:"),
            ul([
                "reads, writes - число операций чтения/записи",
                "read_time, write_time - время ожидания I/O (при track_io_timing)",
                "hits - число попаданий в кэш",
                "evictions - число вытеснений из кэша",
                "extends - операции расширения файлов"
            ], { code: ["reads","writes","read_time","write_time","hits","evictions","extends"] })
        ]),

        gridPanels(
            textPanel("pg_stat_slru", [
                p("Статистика операций в SLRU-кэше (simple LRU):",
                { code: ["pg_stat_slru"] }),
                ul([
                    "blks_zeroed - нулевые блоки",
                    "blks_hit - попадания в SLRU",
                    "blks_read - чтения с диска",
                    "blks_written - записи на диск",
                    "truncates - усечения кэша"
                ], { code: ["blks_zeroed","blks_hit","blks_read","blks_written","truncates"] })
            ]),
            
            textPanel("pg_backend_memory_contexts", [
                p("Распределение памяти в текущем процессе по контекстам (с PostgreSQL 14):",
                { code: ["pg_backend_memory_contexts"] }),
                ul([
                    "name - имя контекста памяти",
                    "total_bytes - общий размер",
                    "used_bytes - используемая память",
                    "free_bytes - свободная память"
                ], { code: ["name","total_bytes","used_bytes","free_bytes"] }),
                p("Доступ: суперпользователи или роль pg_read_all_stats.",
                { code: ["pg_read_all_stats"] })
            ])
        ),

        textPanel("Ключевые метрики внутренней телеметрии", [
            p("Активность WAL:", { strong: ["WAL"] }),
            ul([
                "скорость генерации WAL (wal_bytes за интервал времени)",
                "количество записей (wal_records)",
                "количество полных снимков страницы (wal_fpi)"
            ]),
            p("Оценивает нагрузку на диск и объем данных для репликации и резервирования."),
            
            p("Буферный кэш:", { strong: ["буферный кэш"] }),
            ul([
                "число попаданий в кэш (hits) из pg_stat_io",
                "число вытеснений из кэша (evictions)"
            ]),
            p("Высокое hits - эффективное использование памяти, большой evictions - недостаток кэш-памяти (нужно увеличить shared_buffers).",
            { code: ["shared_buffers"] }),
            
            p("Фоновый писатель и чекпоинты:", { strong: ["фоновый писатель", "чекпоинты"] }),
            ul([
                "buffers_clean, buffers_checkpoint, buffers_written",
                "num_timed, num_requested",
                "write_time, sync_time"
            ]),
            p("Показывают активность базовых процессов по обеспечению устойчивости данных."),
            
            p("Ввод-вывод:", { strong: ["ввод-вывод"] }),
            ul([
                "read_time, write_time по разным контекстам",
                "отличие обычного I/O от bulk-операций или операций во время вакуума"
            ]),
            
            p("Память:", { strong: ["память"] }),
            ul([
                "used_bytes, free_bytes в pg_backend_memory_contexts",
                "помогает находить утечки или дисбаланс распределения памяти по контекстам"
            ])
        ]),

        textPanel("Сброс статистики и параметры", [
            p("Функции для сброса статистики:", { code: ["pg_stat_reset_shared", "pg_stat_reset"] }),
            codeBlock([
                "pg_stat_reset() - сброс всей статистики",
                "pg_stat_reset_shared('bgwriter') - сброс статистики bgwriter",
                "pg_stat_statements_reset() - сброс pg_stat_statements"
            ], 0),
            p("Параметры конфигурации для сбора данных о времени I/O:"),
            codeBlock([
                "track_io_timing = on     # время операций ввода-вывода",
                "track_wal_io_timing = on # время операций WAL"
            ], 0),
            p("Включение этих параметров добавляет данные в read_time/write_time в pg_stat_io.")
        ]),

        quizPanel({
            id: 1,
            question: "Какое представление статистики PostgreSQL показывает активность процесса архивации WAL?",
            options: [
                "pg_stat_archiver",
                "pg_stat_bgwriter",
                "pg_stat_wal",
                "pg_stat_recovery"
            ],
            correct: "pg_stat_archiver",
            explanation: "pg_stat_archiver содержит сведения о работе архива WAL, включая число успешно заархивированных файлов (archived_count), время и имена последних файлов и число неудачных попыток (failed_count)."
        }),

        quizPanel({
            id: 2,
            question: "Какой параметр в postgresql.conf нужно включить, чтобы собирать статистику времени операций чтения/записи данных?",
            options: [
                "track_counts",
                "track_io_timing",
                "track_commit_timestamp",
                "track_activity"
            ],
            correct: "track_io_timing",
            explanation: "При включении track_io_timing PostgreSQL начинает накапливать информацию о времени чтения, записи, расширения и fsync операций на уровне блоков данных. Для WAL отдельно существует track_wal_io_timing."
        }),

        quizPanel({
            id: 3,
            question: "Что означает столбец buffers_clean в представлении pg_stat_bgwriter?",
            options: [
                "число буферов, очищенных (записанных) фоновым писателем",
                "число буферов, очищенных в ходе autovacuum",
                "число чистых (пустых) буферов в очереди на запись",
                "число таймерных событий фонового писателя"
            ],
            correct: "число буферов, очищенных (записанных) фоновым писателем",
            explanation: "В документации pg_stat_bgwriter указано, что buffers_clean - это количество буферов, записанных фоновым писателем (Number of buffers written by the background writer)."
        }),

        quizPanel({
            id: 4,
            question: "Какое представление показывает сводную статистику активности записей WAL (Write-Ahead Log)?",
            options: [
                "pg_stat_archiver",
                "pg_stat_bgwriter",
                "pg_stat_io",
                "pg_stat_wal"
            ],
            correct: "pg_stat_wal",
            explanation: "pg_stat_wal содержит глобальные данные о WAL: общее число записанных WAL-записей (wal_records), объем записанных данных (wal_bytes), число полных снимков страницы (wal_fpi) и другие поля."
        }),

        quizPanel({
            id: 5,
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
            id: 6,
            question: "Какие значения может принимать поле context в представлении pg_stat_io?",
            options: [
                "normal, init, vacuum, bulkread, bulkwrite",
                "read, write, delete, update, insert",
                "local, remote, cache, disk, memory",
                "active, idle, idle in transaction, waiting"
            ],
            correct: "normal, init, vacuum, bulkread, bulkwrite",
            explanation: "В pg_stat_io используются следующие контексты: normal - стандартные операции через буферный кэш, init - операции при инициализации WAL сегментов, vacuum - I/O при вакуумировании, bulkread и bulkwrite - большие пакетные операции чтения/записи (например, COPY)."
        }),

        quizPanel({
            id: 7,
            question: "Чему соответствует высокая величина метрики evictions (вытеснений) в выводе pg_stat_io для контекста normal?",
            options: [
                "недостаток места на диске",
                "большой объем shared_buffers в конфигурации",
                "многочисленные операции очистки кэша (background writer)",
                "недостаточный размер shared_buffers"
            ],
            correct: "недостаточный размер shared_buffers",
            explanation: "Колонка evictions показывает, сколько раз блок был вытеснен из кэша из-за нехватки места. Высокий показатель указывает на то, что кэш памяти переполняется, и следует увеличить параметр shared_buffers."
        }),

        quizPanel({
            id: 8,
            question: "Какую функцию PostgreSQL можно вызвать для сброса кластерных статистических счетчиков (например, статистики bgwriter или WAL)?",
            options: [
                "pg_reset_wal()",
                "pg_stat_reset()",
                "pg_stat_reset_shared()",
                "pg_resetstats()"
            ],
            correct: "pg_stat_reset_shared()",
            explanation: "pg_stat_reset_shared() сбрасывает кластерные (общие) счетчики статистики. Можно передать аргумент для сброса определенного типа ('bgwriter', 'wal', 'slru') или вызвать без аргумента для сброса всех общих счетчиков."
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
            question: "Что означает колонка wal_bytes в pg_stat_wal?",
            options: [
                "число байтов, записанных за последние N транзакций",
                "количество байтов WAL, очищенных фоновой задачей",
                "общий объем сгенерированных WAL-данных с момента последнего сброса статистики",
                "размер очереди на запись WAL"
            ],
            correct: "общий объем сгенерированных WAL-данных с момента последнего сброса статистики",
            explanation: "Поле wal_bytes содержит число байтов, записанных в журналы WAL с момента последнего сброса статистики. Это общий счетчик объема WAL, с его помощью оценивают нагрузку на диск и объем данных для репликации."
        }),

        navigateButtons("level4", "final")
    
    ];

    return buildPage(sections);

}