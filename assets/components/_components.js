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
    }

    async connectedCallback() {
        // In your project, these paths will point to your actual files.
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
        } catch (error) {
            console.error('Error loading AI Chat component:', error);
            this.shadowRoot.innerHTML = `<p style="color:red; font-size:12px; padding: 10px;">Chat Failed to Load</p>`;
        }
    }

    bindElements() {
        // --- CORRECTED ---
        // Get a reference to the main container that does the animation.
        this.container = this.shadowRoot.querySelector('.chat-widget-container');

        // Note: No need to select .chat-widget-icon anymore for event listening
        // since the container will handle the click.
        this.closeBtn = this.shadowRoot.querySelector('.chat-close-btn');
        this.messages = this.shadowRoot.querySelector('.chat-messages');
        this.inputBox = this.shadowRoot.querySelector('.chat-input');
        this.sendBtn = this.shadowRoot.querySelector('.chat-send-btn');
    }

    setupEventListeners() {
        // --- CORRECTED ---
        // Listen for clicks on the main container.
        this.container.addEventListener('click', () => {
            // Only open if it's not already active.
            if (!this.container.classList.contains('active')) {
                this.container.classList.add('active');
                this.inputBox.focus();
            }
        });

        this.closeBtn.addEventListener('click', (event) => {
            // Stop the click from bubbling up to the container, which would reopen the chat.
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

    addMessage(text, sender = 'user') {
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `message`; // Using your new message classes
        msgWrapper.classList.add(sender);
        
        const msgBubble = document.createElement('div');
        msgBubble.className = 'message-bubble';
        msgBubble.textContent = text;
        
        msgWrapper.appendChild(msgBubble);
        this.messages.appendChild(msgWrapper);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    getFakeReply(userText) {
        const lower = userText.toLowerCase();
        const responses = [
            { keywords: ['hello', 'hi', 'hey'], response: 'Hi there! How can I assist you today?' },
            { keywords: ['help', 'assist'], response: 'Sure! I’m here to help. What do you need?' },
            { keywords: ['schedule', 'class'], response: 'You can find your class schedule under the "Schedule" section.' },
            { keywords: ['thanks', 'thank you'], response: 'You’re welcome! 😊' },
            { keywords: ['bye', 'goodbye'], response: 'Goodbye! Have a great day!' }
        ];
        for (const item of responses) {
            for (const keyword of item.keywords) {
                if (lower.includes(keyword)) return item.response;
            }
        }
        return "Sorry, I'm not sure how to respond to that.";
    }

    sendMessage() {
        const text = this.inputBox.value.trim();
        if (!text) return;
        this.addMessage(text, 'user');
        this.inputBox.value = '';
        setTimeout(() => this.addMessage(this.getFakeReply(text), 'ai'), 800);
    }
}
customElements.define('ai-chat-widget', AIChatWidget);

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