async function loadComponent(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load: ${url}`);
    return response.text();
}

class AIChatWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.sendMessage = this.sendMessage.bind(this);
        // This object will act as the AI's short-term memory
        this.context = {
            topic: null, // e.g., 'assignment', 'grade'
            data: null   // The specific data related to the topic
        };
    }

    async connectedCallback() {
        const htmlPath = '../../assets/components/ai-chat.html';
        const cssPath = '../../assets/components/ai-chat.css';

        try {
            const [html, css] = await Promise.all([
                loadComponent(htmlPath),
                loadComponent(cssPath)
            ]);
            this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
            this.bindElements();
            this.setupEventListeners();
            this.addMessage("Hello! Ask me about your assignments, grades, or schedule shown on this page.", 'ai');
        } catch (error) {
            console.error('Error loading AI Chat component:', error);
            this.shadowRoot.innerHTML = `<p style="color:red; font-size:12px; padding: 10px;">Chat Failed to Load</p>`;
        }
    }

    bindElements() {
        this.container = this.shadowRoot.querySelector('.chat-widget-container');
        this.closeBtn = this.shadowRoot.querySelector('.chat-close-btn');
        this.messages = this.shadowRoot.querySelector('.chat-messages');
        this.inputBox = this.shadowRoot.querySelector('.chat-input');
        this.sendBtn = this.shadowRoot.querySelector('.chat-send-btn');
    }

    setupEventListeners() {
        this.container.addEventListener('click', () => {
            if (!this.container.classList.contains('active')) {
                this.container.classList.add('active');
                this.inputBox.focus();
            }
        });

        this.closeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.container.classList.remove('active');
        });

        this.sendBtn.addEventListener('click', this.sendMessage);
        this.inputBox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    addMessage(text, sender = 'user', status = 'idle') {
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `message ${sender}`;
        const msgBubble = document.createElement('div');
        msgBubble.className = 'message-bubble';

        if (status === 'loading') {
            msgBubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            msgWrapper.id = 'loading-bubble';
        } else {
            msgBubble.textContent = text;
        }

        msgWrapper.appendChild(msgBubble);
        const loadingBubble = this.shadowRoot.getElementById('loading-bubble');
        if (loadingBubble && sender === 'ai' && status === 'idle') {
            loadingBubble.replaceWith(msgWrapper);
        } else {
            this.messages.appendChild(msgWrapper);
        }
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    sendMessage() {
        const text = this.inputBox.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.inputBox.value = '';
        this.addMessage('', 'ai', 'loading');

        // Simulate the AI "thinking" before replying
        setTimeout(() => {
            const aiReply = this.generateAiResponse(text);
            this.addMessage(aiReply, 'ai');
        }, 1200);
    }

    // --- The New AI Brain ---
    generateAiResponse(userText) {
        const lowerText = userText.toLowerCase();

        // Rule 1: Check for contextual follow-up questions first
        if (this.context.topic === 'assignment_info') {
            if (/\b(due|deadline)\b/.test(lowerText)) {
                const response = `The deadline for "${this.context.data.title}" is ${this.context.data.deadline}.`;
                this.context = {}; // Clear context after answering
                return response;
            }
            if (/\b(status|submitted)\b/.test(lowerText)) {
                const response = `The status for "${this.context.data.title}" is: ${this.context.data.status}.`;
                this.context = {}; // Clear context
                return response;
            }
        }

        // Rule 2: Check for primary intents
        if (/\b(hello|hi|hey)\b/.test(lowerText)) {
            return 'Hi there! How can I help you with your classes today?';
        }

        if (/\b(homework|assignments?)\b/.test(lowerText)) {
            const assignments = this._getAssignmentsData();
            if (assignments.length > 0) {
                this.context = { topic: 'assignment_info', data: assignments[0] }; // Remember the first assignment
                return `I found ${assignments.length} assignment(s). The most recent is "${assignments[0].title}". What would you like to know about it? (e.g., "when is it due?")`;
            }
            return "I couldn't find any assignments on the Assessment tab.";
        }

        if (/\b(grades?|scores?)\b/.test(lowerText)) {
            const grades = this._getGradesData();
            if (grades.length > 0) {
                const highestGrade = grades.sort((a, b) => b.score - a.score)[0];
                return `I found ${grades.length} graded items. Your highest score is a ${highestGrade.score} in "${highestGrade.title}".`;
            }
            return "I couldn't find any grades on the Grades tab.";
        }

        if (/\b(absence|attendance)\b/.test(lowerText)) {
            const absenceInfo = this._getAbsenceData();
            return `According to the Absence tab, you have been absent ${absenceInfo.absentCount} time(s) out of ${absenceInfo.totalMeetings} meetings.`;
        }

        if (/\b(thank|thanks)\b/.test(lowerText)) {
            return "You're welcome! Is there anything else I can help with?";
        }

        // Rule 3: Fallback response
        this.context = {}; // Clear any lingering context
        return "I'm sorry, I can only answer questions about assignments, grades, or attendance shown on this page. Please try asking one of those!";
    }

    // --- Helper functions to read data from the page ---
    _getAssignmentsData() {
        const rows = document.querySelectorAll('#assessment tbody tr');
        const data = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 5) {
                data.push({
                    title: cells[1].textContent.trim(),
                    deadline: cells[3].textContent.trim(),
                    status: cells[4].textContent.trim()
                });
            }
        });
        return data;
    }

    _getGradesData() {
        const blocks = document.querySelectorAll('#grades .grade-block');
        const data = [];
        blocks.forEach(block => {
            const titleEl = block.querySelector('.above .left p');
            const scoreEl = block.querySelector('.above .right p');
            const score = parseInt(scoreEl.textContent.trim(), 10);
            if (titleEl && scoreEl && !isNaN(score)) {
                data.push({
                    title: titleEl.textContent.trim(),
                    score: score
                });
            }
        });
        return data;
    }

    _getAbsenceData() {
        const summaryEl = document.querySelector('.absence-summary-container');
        if (summaryEl) {
            const summaryText = summaryEl.children[1].textContent; // "2 / 25 Meetings"
            const parts = summaryText.match(/(\d+)\s*\/\s*(\d+)/);
            if (parts) {
                return { absentCount: parts[1], totalMeetings: parts[2] };
            }
        }
        return { absentCount: 0, totalMeetings: 0 };
    }
}
customElements.define('ai-chat-widget', AIChatWidget);


// The LogoutModal class does not need any changes
class LogoutModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    async connectedCallback() {
        const htmlPath = '../../assets/components/logout-modal.html';
        const cssPath = '../../assets/components/logout-modal.css';
        try {
            const [html, css] = await Promise.all([
                loadComponent(htmlPath),
                loadComponent(cssPath)
            ]);
            this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading Logout Modal component:', error);
        }
    }
    setupEventListeners() {
        const logoutButton = document.querySelector(".logout-btn");
        if (!logoutButton) return;
        const modalContainer = this.shadowRoot.querySelector('.logout-modal-container');
        const yesButton = this.shadowRoot.querySelector('.modal-btn-yes');
        const noButton = this.shadowRoot.querySelector('.modal-btn-no');
        logoutButton.addEventListener("click", e => {
            e.preventDefault();
            modalContainer.classList.add("active");
        });
        yesButton.addEventListener("click", () => window.location.href = logoutButton.href);
        noButton.addEventListener("click", () => modalContainer.classList.remove("active"));
        modalContainer.addEventListener("click", e => {
            if (e.target === modalContainer) modalContainer.classList.remove("active");
        });
    }
}
customElements.define('logout-modal', LogoutModal);