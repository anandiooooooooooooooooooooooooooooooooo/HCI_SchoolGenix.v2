/**
 * ===================================================================
 * Class Manager untuk semua Fungsionalitas Halaman Siswa (FINAL v5)
 * ===================================================================
 */
class SiswaManager {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => this.init());
    }

    init() {
        this._initSidebar();
        this._initDropdowns();
        this._initTabs();
        this._initDashboardComponents();
        this._initClassSelection();
        this._setClassNameFromStorage();
        this._initChatWidget();
    }

    _initSidebar() {
        const currentPage = window.location.pathname;
        const menuLinks = document.querySelectorAll('.sidebar-menu-section a');

        menuLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && currentPage.includes(linkHref.replace('./', ''))) {
                link.classList.add('active');
            }
        });

        const sidebar = document.querySelector('.sidebar');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const overlay = document.getElementById('sidebar-overlay');

        if (!sidebar || !hamburgerBtn || !overlay) return;

        const toggleSidebar = () => {
            sidebar.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
            overlay.classList.toggle('active');
        };

        hamburgerBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }

    _initDropdowns() {
        const dropdowns = document.querySelectorAll(".dropdown");
        if (dropdowns.length === 0) return;

        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector(".dropdown-btn");
            if (!dropdownToggle) return;

            dropdownToggle.addEventListener("click", (event) => {
                event.stopPropagation();
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove("active");
                });
                dropdown.classList.toggle("active");
            });
        });

        document.addEventListener("click", () => {
            dropdowns.forEach(d => d.classList.remove("active"));
        });
    }

    /**
     * FIXED: This function now correctly handles tab switching and state persistence.
     */
    _initTabs() {
        const tabs = document.querySelectorAll(".tab");
        const pages = document.querySelectorAll(".page");
        if (tabs.length === 0 || pages.length === 0) return;

        const activateTab = (tabId) => {
            const tabToActivate = document.querySelector(`.tab[data-page="${tabId}"]`);
            const pageToActivate = document.getElementById(tabId);

            // If the tab or page doesn't exist for any reason, stop.
            if (!tabToActivate || !pageToActivate) return;

            // Deactivate all other tabs and pages
            tabs.forEach(t => t.classList.remove("active"));
            pages.forEach(p => p.classList.remove("active"));

            // Activate the correct tab and page
            tabToActivate.classList.add("active");
            pageToActivate.classList.add("active");

            // Store the active tab ID so it can be reloaded
            localStorage.setItem("activeTab", tabId);
        };

        // Add a click event listener to each tab
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const tabId = tab.getAttribute("data-page");
                activateTab(tabId);
            });
        });

        // --- Logic to load the correct tab on page start ---

        // 1. Get the last active tab from storage
        let initialTabId = localStorage.getItem("activeTab");

        // 2. Check if a tab with that ID actually exists on this page
        const initialTabExists = initialTabId ? document.querySelector(`.tab[data-page="${initialTabId}"]`) : null;

        // 3. If there's no stored tab or the stored tab doesn't exist, default to the first tab
        if (!initialTabId || !initialTabExists) {
            initialTabId = tabs[0]?.getAttribute("data-page");
        }

        // 4. Activate the determined initial tab
        if (initialTabId) {
            activateTab(initialTabId);
        }
    }

    _initClassSelection() {
        const classCards = document.querySelectorAll('.class-card');
        classCards.forEach(card => {
            card.addEventListener('click', () => {
                const subjectName = card.dataset.subjectName;
                if (subjectName) {
                    localStorage.setItem("selectedClass", subjectName);
                    window.location.href = "./siswa-classes-2.html";
                }
            });
        });
    }

    _setClassNameFromStorage() {
        const className = localStorage.getItem("selectedClass");
        const el = document.getElementById("class-name");
        if (className && el) el.textContent = className;
    }

    _initDashboardComponents() {
        if (document.querySelector('.circular-progress')) this._animateCircularProgress();
        if (document.querySelector('.clock-gauge')) this._initClockGauge();
        if (document.querySelector('.task-progress-card')) this._updateTaskProgressBars();
        if (document.querySelector('.calendar-card')) this._renderCalendar();
    }

    _animateCircularProgress() {
        const el = document.querySelector('.circular-progress');
        if (!el) return;

        const percentage = parseInt(el.dataset.percentage, 10);
        const progressCircle = el.querySelector('.progress');
        const percentageText = el.querySelector('.text h2');

        const r = progressCircle.r.baseVal.value;
        const circ = 2 * Math.PI * r;

        progressCircle.style.strokeDasharray = `${circ} ${circ}`;

        setTimeout(() => {
            progressCircle.style.strokeDashoffset = circ - (percentage / 100) * circ;
        }, 100);

        let count = 0;
        const interval = setInterval(() => {
            if (count >= percentage) {
                clearInterval(interval);
                percentageText.textContent = `${percentage}%`;
            } else {
                count++;
                percentageText.textContent = `${count}%`;
            }
        }, 2000 / (percentage || 1));
    }

    _updateTaskProgressBars() {
        document.querySelectorAll('.task-details').forEach(task => {
            const text = task.querySelector('.task-right');
            const fill = task.querySelector('.progress-bar-fill');
            if (!text || !fill) return;

            const [completed, total] = text.textContent.split('/').map(Number);
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            setTimeout(() => {
                fill.style.width = `${percentage}%`;
            }, 300);
        });
    }

    _renderCalendar() {
        const monthYearEl = document.getElementById('month-year');
        const daysContainer = document.getElementById('calendar-days-container');
        const prevBtn = document.getElementById('prev-month-btn');
        const nextBtn = document.getElementById('next-month-btn');
        if (!monthYearEl || !daysContainer || !prevBtn || !nextBtn) return;

        const events = {
            '2025-6-10': 'Ujian Matematika',
            '2025-6-19': 'Presentasi Fisika',
            '2025-6-20': 'Pengumpulan Tugas Biologi',
            '2025-7-4': 'Libur Sekolah'
        };

        let date = new Date();

        const displayCalendar = () => {
            const year = date.getFullYear();
            const month = date.getMonth();

            monthYearEl.textContent = `${date.toLocaleString('id-ID', { month: 'long' })} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();
            const today = new Date();

            daysContainer.innerHTML = '';

            for (let i = 0; i < firstDay; i++) {
                daysContainer.innerHTML += '<div class="empty"></div>';
            }

            for (let i = 1; i <= lastDate; i++) {
                const day = document.createElement('div');
                day.textContent = i;

                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    day.classList.add('current-day');
                }

                if (new Date(year, month, i).getDay() === 0) {
                    day.classList.add('red');
                }

                const eventKey = `${year}-${month + 1}-${i}`;
                if (events[eventKey]) {
                    day.classList.add('has-event');
                    day.title = events[eventKey];
                }

                daysContainer.appendChild(day);
            }
        };

        prevBtn.addEventListener('click', () => {
            date.setMonth(date.getMonth() - 1);
            displayCalendar();
        });

        nextBtn.addEventListener('click', () => {
            date.setMonth(date.getMonth() + 1);
            displayCalendar();
        });

        displayCalendar();
    }

    _initClockGauge() {
        const gaugeEl = document.querySelector('.clock-gauge');
        if (!gaugeEl) return;

        const percentage = parseInt(gaugeEl.dataset.percentage, 10) || 0;
        const needle = document.getElementById('gauge-needle');
        const ticksContainer = document.getElementById('gauge-ticks-container');
        const labelsContainer = document.getElementById('gauge-labels-container');
        const textValue = document.getElementById('gauge-text-value');
        const tickTemplate = document.getElementById('tick-template');

        if (!needle || !ticksContainer || !labelsContainer || !textValue || !tickTemplate) return;

        const totalAngle = 180;
        const startAngle = -90;

        ticksContainer.innerHTML = '';
        labelsContainer.innerHTML = '';

        for (let i = 0; i <= 10; i++) {
            const angle = startAngle + (i / 10) * totalAngle;
            const isMajorTick = i % 2 === 0;

            const tick = document.createElementNS("http://www.w3.org/2000/svg", "use");
            tick.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#tick-template');
            tick.setAttribute('transform', `rotate(${angle})`);
            if (isMajorTick) tick.style.strokeWidth = '3';
            ticksContainer.appendChild(tick);

            if (isMajorTick) {
                const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                const labelRadius = 62;
                const angleRad = angle * (Math.PI / 180);
                label.setAttribute('x', labelRadius * Math.cos(angleRad));
                label.setAttribute('y', labelRadius * Math.sin(angleRad));
                label.textContent = i * 10;
            }
        }

        setTimeout(() => {
            const needleAngle = startAngle + (percentage / 100) * totalAngle;
            needle.setAttribute('transform', `rotate(${needleAngle})`);

            const activeTicks = Math.round(percentage / 10);
            ticksContainer.querySelectorAll('use').forEach((tick, index) => {
                if (index <= activeTicks) {
                    tick.classList.add('active');
                }
            });

            let currentVal = 0;
            const interval = setInterval(() => {
                if (currentVal >= percentage) {
                    clearInterval(interval);
                    textValue.textContent = `${percentage}%`;
                } else {
                    currentVal++;
                    textValue.textContent = `${currentVal}%`;
                }
            }, 1500 / (percentage || 1));
        }, 100);
    }

    _initChatWidget() {
        const container = document.getElementById('chat-widget');
        if (!container) return; // Exit if the chat widget is not on the page

        const icon = container.querySelector('.chat-widget-icon');
        const closeBtn = document.getElementById('chat-close');
        const messagesContainer = container.querySelector('.chat-messages');
        const input = container.querySelector('.chat-input');
        const sendBtn = document.getElementById('chat-send');

        if (!icon || !closeBtn || !messagesContainer || !input || !sendBtn) return;

        const toggleWidget = () => container.classList.toggle('active');

        icon.addEventListener('click', toggleWidget);
        closeBtn.addEventListener('click', toggleWidget);

        const addMessage = (text, type) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;

            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.textContent = text;

            messageDiv.appendChild(bubble);
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const handleSend = () => {
            const messageText = input.value.trim();
            if (messageText === "") return;

            addMessage(messageText, 'user');
            input.value = '';

            setTimeout(() => {
                addMessage("Terima kasih atas pertanyaan Anda. Saya adalah AI Assistant, bagaimana saya bisa membantu?", 'ai');
            }, 1000);
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        setTimeout(() => {
            addMessage("Halo! Ada yang bisa saya bantu?", 'ai');
        }, 1500);
    }
}

new SiswaManager();