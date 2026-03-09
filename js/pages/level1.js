import { setupNavigation } from "../utils/navigation.js";
import { initQuiz } from "../utils/quiz.js";

export function renderLevel1() {

    setTimeout(()=>{
        setupNavigation();
        initQuiz(1);
    },0);

    return `

    <div class="page">

        <div class="blue-panel">
            <h1 class="title">Уровень 1: средства мониторинга операционной системы</h1>
        </div>

        <div class="blue-panel">
            <h3>Введение в мониторинг ОС</h3>
            <div class="content-text">
                <p>Мониторинг операционной системы - это базовый уровень наблюдения за работой сервера, на котором работает база данных. Перед тем как анализировать внутренние метрики PostgreSQL, необходимо убедиться, что сама операционная система работает корректно и не испытывает нехватки ресурсов.</p>
                
                <p>Даже идеально оптимизированная база данных будет работать медленно, если:</p>

                <ul>
                    <li>перегружен процессор</li>
                    <li>нехватка оперативной памяти</li>
                    <li>диск выполняет слишком много операций ввода-вывода</li>
                    <li>перегружена сеть</li>
                </ul>

                <p>Поэтому мониторинг ОС является <strong>первым уровнем диагностики производительности PostgreSQL</strong>. Инструменты мониторинга ОС позволяют отслеживать:</p>

                <ul>
                    <li>загрузку <strong>процессора</strong></li>
                    <li>использование <strong>оперативной памяти</strong></li>
                    <li>активность <strong>дисковой системы</strong></li>
                    <li>активность <strong>сети</strong></li>
                    <li>состояние <strong>процессов</strong></li>
                </ul>

                <p>В Linux большинство инструментов мониторинга - это <strong>консольные утилиты</strong>, входящие в стандартную поставку системы.</p>

                <p>В Windows чаще используются <strong>графические инструменты и системные счетчики</strong> производительности.</p>
                
            </div>
        </div>

        <div class="blue-panel">
            <h1 class="title">Мониторинг операционной системы в Linux</h1>
        </div>

        <div class="blue-panel">
            <h3>Команда top</h3>
            <div class="content-text">
                <p>Отображает динамическую информацию о процессах и использовании ресурсов системы в реальном времени.</p>
                <p>Команда показывает:</p>

                <ul>
                    <li>текущую загрузку CPU</li>
                    <li>использование памяти</li>
                    <li>список процессов</li>
                    <li>среднюю загрузку</li>
                    <li>время работы системы</li>
                </ul>

            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды top</h3>
            <img src="resources/img/top.png" alt="top command">
        </div>

        <div class="panel-grid">
            <div class="blue-panel">
                <h3>Метрики CPU</h3>
                <div class="content-text">
                    <ul>
                        <li><code>us</code> - использование CPU пользовательскими процессами</li>
                        <li><code>sy</code> - использование CPU ядром</li>
                        <li><code>id</code> - процент простоя CPU</li>
                        <li><code>wa</code> - время ожидания операций ввода-вывода</li>
                    </ul>
                </div>
            </div>
            
            <div class="blue-panel">
                <h3>Метрики Memory</h3>
                <div class="content-text">
                    <ul>
                        <li><code>total</code> - общий объем RAM</li>
                        <li><code>used</code> - используемая память</li>
                        <li><code>free</code> - свободная память</li>
                        <li><code>buff/cache</code> - кэш файловой системы</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="panel-grid">
            <div class="blue-panel">
                <h3>Load average</h3>
                <div class="content-text">
                    <p>Показывает среднюю нагрузку системы за:</p>
                    <ul>
                        <li>1 минуту</li>
                        <li>5 минут</li>
                        <li>15 минут</li>
                    </ul>
                </div>
            </div>
            
            <div class="blue-panel">
                <h3>На что обратить внимание</h3>
                <div class="content-text">
                    <ul>
                        <li><strong>load average</strong> - если значение выше числа CPU, то сервер перегружен</li>
                        <li><strong>%CPU процессов</strong> - если один процесс использует много CPU, то это возможная причина проблемы</li>
                        <li><strong>wa</strong> - если высокий, то значит диск медленный</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Команда htop</h3>
            <div class="content-text">
                <p>Улучшенная версия top. Она имеет более удобный интерактивный интерфейс и цветную визуализацию ресурсов.</p>
                <p>Основные возможности:</p>

                <ul>
                    <li>отображение нагрузки по каждому ядру CPU</li>
                    <li>сортировка процессов</li>
                    <li>поиск процессов</li>
                    <li>завершение процессов</li>
                    <li>настройка колонок</li>
                </ul>

            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды htop</h3>
            <img src="resources/img/htop.png" alt="htop command">
        </div>

        <div class="blue-panel">
            <h3>Утилита ps</h3>
            <div class="content-text">
                <p>Показывает снимок текущих процессов, а не обновляет данные в реальном времени.</p>
                <p>Команда показывает:</p>

                <ul>
                    <li><code>USER</code> - пользователь, от которого запущен процесс</li>
                    <li><code>PID</code> - идентификатор процесса</li>
                    <li><code>%CPU</code> - загрузка процессора</li>
                    <li><code>%MEM</code> - доля оперативной памяти, используемая процессом</li>
                    <li><code>COMMAND</code> - команда, которой был запущен процесс</li>
                </ul>

                <p>Утилита часто используется вместе с <strong>grep</strong>: <code>ps aux | grep postgres</code>.</p>

            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода ps</h3>
            <img src="resources/img/psgrep.png" alt="ps command">
        </div>

        <div class="blue-panel">
            <h3>Команда free</h3>
            <div class="content-text">
                <p>Показывает использование оперативной памяти и раздела подкачки.</p>
                <p>Команда показывает:</p>

                <ul>
                    <li><code>total</code> - общий объем RAM</li>
                    <li><code>used</code> - используемая память</li>
                    <li><code>free</code> - свободная память</li>
                    <li><code>buff/cache</code> - память, используемая для кэша</li>
                    <li><code>available</code> - доступная память для новых приложений</li>
                </ul>

                <p><strong>Важно понимать</strong>: Linux активно использует память для кэширования файлов, поэтому низкое значение <code>free</code> не всегда означает проблему.</p>
                <p>Параметр <code>-m</code> выводит значения в мегабайтах.</p>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды free</h3>
            <img src="resources/img/free.png" alt="free command">
        </div>

        <div class="blue-panel">
            <h3>Команда vmstat</h3>
            <div class="content-text">
                <p>Отображает статистику работы системы в реальном времени:</p>
                <ul>
                    <li>число процессов</li>
                    <li>использование оперативной памяти</li>
                    <li>подкачку страниц памяти на диск</li>
                    <li>ввода-вывода диска</li>
                    <li>загрузка процессора</li>
                </ul>
                <p>Параметр <code>1</code> - интервал обновления в секундах.</p>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды vmstat</h3>
            <img src="resources/img/vmstat.png" alt="vmstat command">
        </div>

        <div class="panel-grid">
            <div class="blue-panel">
                <h3>Основные поля</h3>
                <div class="content-text">
                    <ul>
                        <li><code>r</code> - процессы в очереди</li>
                        <li><code>b</code> - процессы, ожидающие ввод-вывод</li>
                        <li><code>si/so</code> - swap in/out (подкачка)</li>
                        <li><code>bi/bo</code> - чтение/запись с диска</li>
                        <li><code>us/sy</code> - загрузка процессора user/system</li>
                        <li><code>id</code> - процент CPU в простое</li>
                        <li><code>wa</code> - процент CPU в ожидании I/O</li>
                    </ul>
                </div>
            </div>
            
            <div class="blue-panel">
                <h3>На что обратить внимание</h3>
                <div class="content-text">
                    <ul>
                        <li><strong>us + sy > 90%</strong> - нагрузка на CPU близка к предельной</li>
                        <li><strong>si/so > 0</strong> - не хватает оперативной памяти, нужно увеличить RAM</li>
                        <li><strong>wa > 0</strong> - есть проблемы с диском, стоит проверить iostat</li>
                        <li><strong>b > 0</strong> - процессы ждут I/O, возможно проблемы с диском</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Команда iostat</h3>
            <div class="content-text">
                <p>Анализирует работу дисков и дисковых устройств:</p>
                <ul>
                    <li>скорость чтения/записи</li>
                    <li>количество операций обращения к диску</li>
                    <li>загрузка диска</li>
                    <li>время отклика</li>
                </ul>
                
                <p>Основные параметры:</p>
                <ul>
                    <li><code>-x</code> - расширенная статистика</li>
                    <li><code>-z</code> - не показывать пустые диски</li>
                    <li><code>1</code> - интервал обновления в секунду</li>
                </ul>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды iostat</h3>
            <img src="resources/img/iostat.png" alt="iostat command">
        </div>

        <div class="panel-grid">
            <div class="blue-panel">
                <h3>Основные поля</h3>
                <div class="content-text">
                    <ul>
                        <li><code>r/s</code> - сколько операций чтения/записи в секунду</li>
                        <li><code>r/w kB/s</code> - сколько данных читается/пишется в секунду</li>
                        <li><code>await</code> - среднее время ответа диска на все запросы (в миллисекундах)</li>
                        <li><code>r/w_await</code> - время ответа диска на чтение/запись</li>
                        <li><code>svctm</code> - время обработки одного запроса</li>
                        <li><code>%util</code> - загрузска диска</li>
                    </ul>
                </div>
            </div>
            
            <div class="blue-panel">
                <h3>На что обратить внимание</h3>
                <div class="content-text">
                    <ul>
                        <li><strong>%util близок к 100%</strong> - диск работает на пределе</li>
                        <li><strong>await > 100-200 мс</strong> - диск очень медленно отвечает</li>
                        <li><strong>tps очень высокий</strong> - диск не справляется с количеством операций</li>
                        <li><strong>kB_read/s + kB_wrtn/s</strong> - если уперлось в максимум диска, то нужно более быстрое хранилище</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Команда mpstat</h3>
            <div class="content-text">
                <p>Показывает загрузку каждого ядра процессора по отдельности. Поля:</p>
                <ul>
                    <li><code>%usr</code> - проценты CPU под пользовательскими процессами</li>
                    <li><code>%nice</code> - проценты CPU под процессами с приоритетом nice</li>
                    <li><code>%sys</code> - проценты CPU под системными процессами (ядро)</li>
                    <li><code>%iowait</code> - сколько процентов CPU ждет ввода-вывода</li>
                    <li><code>%irq</code> - прерывания от железа</li>
                    <li><code>%soft</code> - программные прерывания</li>
                    <li><code>%idle</code> - процентов CPU в простое</li>
                </ul>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды mpstat</h3>
            <img src="resources/img/mpstat.png" alt="mpstat command">
        </div>

        <div class="blue-panel">
            <h3>Команда df</h3>
            <div class="content-text">
                <p>Показывает, сколько места занято и свободно на дисках:</p>
                <ul>
                    <li><code>Filesystem</code> - имя диска или раздела</li>
                    <li><code>Size</code> - общий размер раздела</li>
                    <li><code>Used</code> - сколько уже занято</li>
                    <li><code>Available</code> - сколько свободно</li>
                    <li><code>Use%</code> - процент занятого места</li>
                    <li><code>Mounted on</code> - куда монтирован раздел</li>
                </ul>
                <p>Параметр <code>-h</code> - показывает размеры в GB и MB.</p>
                <p><strong>Важно:</strong> если <code>Use%</code> приближается к 90-95%, скоро закончится место. Особенно важно следить за корнем <code>/</code> - если заполнится, система может работать нестабильно.</p>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода команды df</h3>
            <img src="resources/img/df.png" alt="df command">
        </div>

        <div class="blue-panel">
            <h1 class="title">Мониторинг операционной системы в Windows</h1>
        </div>

        <div class="blue-panel">
            <h3>Task Manager (Диспетчер задач)</h3>
            <div class="content-text">
                <p>Основной инструмент мониторинга Windows с графической оболочкой.</p>
                <p>Основные вкладки:</p>
                <ul>
                    <li><strong>Processes</strong> - список запущенных процессов, нагрузка на CPU, память, диск, сеть по каждому процессу</li>
                    <li><strong>Performance</strong> - графики загрузки CPU, памяти, дисков, сети в реальном времени</li>
                    <li><strong>Users</strong> - какие пользователи работают и сколько ресурсов потребляют</li>
                    <li><strong>Details</strong> - детальная информация о процессах (PID, статус, приоритет)</li>
                </ul>
                <p><strong>На что смотреть:</strong> процессы с высокой нагрузкой CPU/памяти, общая загрузка ресурсов, нехватка памяти.</p>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Вкладка процессов в диспетчере задач</h3>
            <img src="resources/img/taskmanager.png" alt="task manager">
        </div>

        <div class="blue-panel">
            <h3>Resource Monitor (Монитор ресурсов)</h3>
            <div class="content-text">
                <p>Более детальная информация чем в Task Manager. Показывает:</p>
                <ul>
                    <li><strong>CPU</strong> - загрузка процессора по процессам, ожидание, графики</li>
                    <li><strong>Memory</strong> - использование RAM, сколько свободно, сколько в кэше</li>
                    <li><strong>Disk</strong> - активность дисков, какие процессы читают/пишут, скорость</li>
                    <li><strong>Network</strong> - сетевые соединения, трафик по процессам, TCP-соединения</li>
                </ul>
                <p><strong>На что смотреть:</strong> какие процессы активно работают с диском, сколько памяти реально свободно, сетевые соединения подозрительных процессов.</p>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Вкладка процессора в мониторе ресурсов</h3>
            <img src="resources/img/resourcemonitor.png" alt="resource monitor">
        </div>

        <div class="panel-grid">
            <div class="blue-panel">
                <h3>Process Monitor (Sysinternals)</h3>
                <div class="content-text">
                    <p>Продвинутый инструмент для глубокой диагностики. Отслеживает в реальном времени:</p>
                    <ul>
                        <li>операции с файловой системой - какие процессы и к каким файлам обращаются</li>
                        <li>обращения к реестру Windows - ключи, которые читает/пишет процесс</li>
                        <li>сетевые операции - соединения, запросы</li>
                        <li>активность процессов и потоков</li>
                    </ul>
                </div>
            </div>

            <div class="blue-panel">
                <h3>PowerShell counters (Get-Counter)</h3>
                <div class="content-text">
                    <p>Сбор метрик производительности через командную строку.</p>
                    <p>Примеры команд:</p>
                    <ul>
                        <li><code>Get-Counter '\Processor(_Total)\% Processor Time'</code> - текущая загрузка CPU</li>
                        <li><code>Get-Counter -ListSet PhysicalDisk | Select-Object -ExpandProperty Paths</code> - посмотреть все счетчики дисков</li>
                    </ul>
                    <p><strong>Важно:</strong> можно собирать метрики в скриптах, автоматизировать мониторинг, проверять значения при подозрениях на проблемы.</p>
                </div>
            </div>
        </div>

        <div class="blue-panel">
            <h3>Пример вывода Get-Counter</h3>
            <img src="resources/img/getcounter.png" alt="get counter">
        </div>

        <div class="blue-panel">
            <h1 class="title">Вопросы по уровню</h1>
        </div>
        

        <div class="test-panel" data-correct="top" data-explanation="Команда top показывает процессы и обновляет их в реальном времени.">

            <h3>Вопрос 1</h3>

            <div class="test-question">Какая команда Linux показывает список процессов в реальном времени?</div>

            <button class="test-option" data-value="ps">ps</button>
            <button class="test-option" data-value="free">free</button>
            <button class="test-option" data-value="top">top</button>
            <button class="test-option" data-value="df">df</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="free" data-explanation="Команда free показывает использование RAM и swap.">

            <h3>Вопрос 2</h3>

            <div class="test-question">Какая команда показывает использование оперативной памяти?</div>

            <button class="test-option" data-value="free">free</button>
            <button class="test-option" data-value="ps">ps</button>
            <button class="test-option" data-value="iostat">iostat</button>
            <button class="test-option" data-value="df">df</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="время ожидания операций ввода-вывода" data-explanation="%iowait показывает время ожидания дисковых операций.">

            <h3>Вопрос 3</h3>

            <div class="test-question">Что показывает параметр %iowait?</div>

            <button class="test-option" data-value="время ожидания сети">время ожидания сети</button>
            <button class="test-option" data-value="время ожидания операций ввода-вывода">время ожидания операций ввода-вывода</button>
            <button class="test-option" data-value="использование памяти">использование памяти</button>
            <button class="test-option" data-value="загрузку GPU">загрузку GPU</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="df" data-explanation="Команда df показывает размер файловых систем и свободное место.">

            <h3>Вопрос 4</h3>

            <div class="test-question">Какая команда показывает использование дискового пространства?</div>

            <button class="test-option" data-value="top">top</button>
            <button class="test-option" data-value="df">df</button>
            <button class="test-option" data-value="free">free</button>
            <button class="test-option" data-value="vmstat">vmstat</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="Task Manager" data-explanation="Task Manager показывает процессы и загрузку CPU, RAM и сети.">

            <h3>Вопрос 5</h3>

            <div class="test-question">Какой инструмент Windows показывает процессы и загрузку CPU?</div>

            <button class="test-option" data-value="Event Viewer">Event Viewer</button>
            <button class="test-option" data-value="Task Manager">Task Manager</button>
            <button class="test-option" data-value="Disk Management">Disk Management</button>
            <button class="test-option" data-value="Registry Editor">Registry Editor</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="Performance Monitor" data-explanation="Performance Monitor (PerfMon) собирает и анализирует счетчики производительности.">

            <h3>Вопрос 6</h3>

            <div class="test-question">Какой инструмент Windows собирает счетчики производительности?</div>

            <button class="test-option" data-value="Performance Monitor">Performance Monitor</button>
            <button class="test-option" data-value="Task Manager">Task Manager</button>
            <button class="test-option" data-value="Services">Services</button>
            <button class="test-option" data-value="Notepad">Notepad</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="iostat" data-explanation="Команда iostat показывает статистику операций чтения и записи дисков.">

            <h3>Вопрос 7</h3>

            <div class="test-question">Какая команда Linux показывает дисковую активность?</div>

            <button class="test-option" data-value="ps">ps</button>
            <button class="test-option" data-value="iostat">iostat</button>
            <button class="test-option" data-value="free">free</button>
            <button class="test-option" data-value="uptime">uptime</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="среднюю нагрузку системы" data-explanation="Load average показывает среднее количество процессов ожидающих CPU.">

            <h3>Вопрос 8</h3>

            <div class="test-question">Что показывает load average?</div>

            <button class="test-option" data-value="температуру CPU">температуру CPU</button>
            <button class="test-option" data-value="сетевые соединения">сетевые соединения</button>
            <button class="test-option" data-value="среднюю нагрузку системы">среднюю нагрузку системы</button>
            <button class="test-option" data-value="размер базы данных">размер базы данных</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="Process Monitor" data-explanation="Process Monitor из набора Sysinternals отслеживает операции файловой системы.">

            <h3>Вопрос 9</h3>

            <div class="test-question">Какой инструмент показывает операции файловой системы в Windows?</div>

            <button class="test-option" data-value="Process Monitor">Process Monitor</button>
            <button class="test-option" data-value="Disk Cleanup">Disk Cleanup</button>
            <button class="test-option" data-value="Control Panel">Control Panel</button>
            <button class="test-option" data-value="Windows Update">Windows Update</button>

            <div class="test-feedback"></div>

        </div>

        <div class="test-panel" data-correct="процент времени, когда диск был занят операциями ввода-вывода" data-explanation="%util показывает процент времени, когда диск был занят операциями ввода-вывода.">

            <h3>Вопрос 10</h3>

            <div class="test-question">Что означает параметр %util в выводе iostat?</div>

            <button class="test-option" data-value="процент занятого места на диске">процент занятого места на диске</button>
            <button class="test-option" data-value="процент времени, когда диск был занят операциями ввода-вывода">процент времени, когда диск был занят операциями ввода-вывода</button>
            <button class="test-option" data-value="процент загрузки процессора дисковыми операциями">процент загрузки процессора дисковыми операциями</button>
            <button class="test-option" data-value="процент свободного места на диске">процент свободного места на диске</button>

            <div class="test-feedback"></div>

        </div>

        
        <div class="page-navigation">

            <button class="nav-button prev" data-prev="intro">Назад</button>

            <button class="nav-button next" data-next="level2" disabled>Далее</button>

        </div>

    </div>
    `;
}