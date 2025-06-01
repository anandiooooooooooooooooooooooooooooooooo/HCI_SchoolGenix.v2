function selectClass(subjectName) {
  localStorage.setItem("selectedClass", subjectName);
  window.location.href = "./siswa-classes-2.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // Dropdown menu logic
  const dropdownToggle = document.querySelector(".dropdown-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdown = document.querySelector(".dropdown");

  if (dropdownToggle && dropdown && dropdownMenu) {
    dropdownToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("active");
      dropdown.style.zIndex = "9999";
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  // Tabs logic
  const tabs = document.querySelectorAll(".tab");
  const pages = document.querySelectorAll(".page");

  if (tabs.length > 0 && pages.length > 0) {
    pages.forEach(page => {
      page.classList.remove("active");
      page.style.display = "none";
    });

    let activeTab = localStorage.getItem("activeTab");

    if (!activeTab || !document.getElementById(activeTab)) {
      activeTab = pages[0].id;
      localStorage.setItem("activeTab", activeTab);
    }

    function activateTab(tabId) {
      if (!tabId) return;

      pages.forEach(page => {
        page.classList.remove("active");
        page.style.display = "none";
      });

      tabs.forEach(tab => tab.classList.remove("active"));

      const selectedPage = document.getElementById(tabId);
      if (selectedPage) {
        selectedPage.classList.add("active");
        selectedPage.style.display = "flex";
      } else {
        return;
      }

      const selectedTab = document.querySelector(`[data-page="${tabId}"]`);
      if (selectedTab) {
        selectedTab.classList.add("active");
      }

      localStorage.setItem("activeTab", tabId);
    }

    activateTab(activeTab);

    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        const targetId = this.getAttribute("data-page");
        activateTab(targetId);
      });
    });
  }

  // Set selected class name in the DOM
  const className = localStorage.getItem("selectedClass");
  if (className) {
    const classNameEl = document.getElementById("class-name");
    if (classNameEl) {
      classNameEl.textContent = className;
    }
  }
  // Prevent multiple creation
  if (!document.getElementById('fakeAI-btn')) {
    // Create floating button
    const floatBtn = document.createElement('button');
    floatBtn.id = 'fakeAI-btn';
    floatBtn.textContent = 'AI Assistant';

    // Style for floating button
    Object.assign(floatBtn.style, {
      position: 'fixed',
      bottom: '55px',
      right: '10px',
      backgroundColor: '#222',
      color: '#fff',
      border: 'none',
      padding: '10px 14px',
      borderRadius: '50px',
      fontSize: '14px',
      boxShadow: '0 0px 12px rgba(255, 255, 255, 0.4)',
      zIndex: '1000',
      transition: 'filter 0.3s ease',
      cursor: 'pointer',
    });

    // Hover effect
    floatBtn.addEventListener('mouseenter', () => {
      floatBtn.style.filter = 'invert(1)';
    });
    floatBtn.addEventListener('mouseleave', () => {
      floatBtn.style.filter = 'invert(0)';
    });

    document.body.appendChild(floatBtn);

    // Chat popup
    const chatPopup = document.createElement('div');
    chatPopup.id = 'fakeAI-chat';
    Object.assign(chatPopup.style, {
      position: 'fixed',
      bottom: '55px',
      right: '10px',
      width: '225px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: '10001',
      fontFamily: 'Arial, sans-serif',
      transition: 'max-height 0.4s ease, opacity 0.4s ease',
      maxHeight: '400px',
      opacity: '1'
    });

    // Chat header
    const header = document.createElement('div');
    Object.assign(header.style, {
      backgroundColor: '#222',
      color: 'white',
      padding: '10px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    });
    header.textContent = 'AI Assistant';

    // Collapse/expand icon
    const collapseBtn = document.createElement('span');
    collapseBtn.textContent = '▼';
    Object.assign(collapseBtn.style, {
      cursor: 'pointer',
      fontWeight: 'bold',
    });
    header.appendChild(collapseBtn);

    // Wrapper for messages + input (to animate only the content)
    const chatContent = document.createElement('div');
    Object.assign(chatContent.style, {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'max-height 0.4s ease, opacity 0.4s ease',
      maxHeight: '350px',
      opacity: '1'
    });

    // Chat messages
    const messages = document.createElement('div');
    Object.assign(messages.style, {
      flex: '1',
      padding: '10px',
      overflowY: 'auto',
      fontSize: '14px',
    });

    // Input section
    const inputContainer = document.createElement('div');
    Object.assign(inputContainer.style, {
      display: 'flex',
      width: '100%',
      borderTop: '1px solid #ccc',
    });

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Type a message...';
    Object.assign(inputBox.style, {
      flex: '1',
      padding: '10px',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      width: '100%',
    });

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    Object.assign(sendBtn.style, {
      backgroundColor: '#222',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      cursor: 'pointer',
      fontWeight: 'bold',
    });

    inputContainer.appendChild(inputBox);
    inputContainer.appendChild(sendBtn);
    chatContent.appendChild(messages);
    chatContent.appendChild(inputContainer);

    chatPopup.appendChild(header);
    chatPopup.appendChild(chatContent);
    document.body.appendChild(chatPopup);

    // Collapse/expand logic
    let isCollapsed = false;
    collapseBtn.addEventListener('click', () => {
      if (isCollapsed) {
        chatContent.style.maxHeight = '350px';
        chatContent.style.opacity = '1';
        collapseBtn.textContent = '▼';
      } else {
        chatContent.style.maxHeight = '0';
        chatContent.style.opacity = '0';
        collapseBtn.textContent = '▲';
      }
      isCollapsed = !isCollapsed;
    });

    // Toggle popup visibility (e.g., from floating button)
    floatBtn.addEventListener('click', () => {
      chatPopup.style.display = chatPopup.style.display === 'none' ? 'flex' : 'none';
      if (chatPopup.style.display === 'flex') inputBox.focus();
    });


    // Fake AI response logic
    function fakeReply(userText) {
      const lower = userText.toLowerCase();

      const responses = [
        {
          keywords: ['hello', 'hi', 'hey'],
          response: 'Hi there! How can I assist you today?'
        },
        {
          keywords: ['help', 'assist', 'support'],
          response: 'Sure! I’m here to help. Could you tell me more about what you need?'
        },
        {
          keywords: ['schedule', 'class', 'timetable'],
          response: 'You can find your class schedule under the "Schedule" tab or section.'
        },
        {
          keywords: ['location', 'where', 'map'],
          response: 'Are you looking for a specific location? You can use the Map feature.'
        },
        {
          keywords: ['thanks', 'thank you'],
          response: 'You’re welcome! 😊 Let me know if you need anything else.'
        },
        {
          keywords: ['bye', 'goodbye', 'see you'],
          response: 'Goodbye! Have a great day!'
        }
      ];

      for (const item of responses) {
        for (const keyword of item.keywords) {
          if (lower.includes(keyword)) {
            return item.response;
          }
        }
      }

      // fallback
      return "Hmm... I'm not sure how to respond to that yet, but I'm learning!";
    }


    // Add message to chat
    function addMessage(text, sender = 'user') {
      const msg = document.createElement('div');
      msg.textContent = text;
      msg.style.margin = '6px 0';
      msg.style.padding = '10px 14px';
      msg.style.borderRadius = '15px';
      msg.style.maxWidth = '70%';
      msg.style.wordBreak = 'break-word';
      msg.style.backgroundColor = sender === 'user' ? '#dcf8c6' : '#f1f0f0';

      // Wrapper to control left/right alignment
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';

      wrapper.appendChild(msg);
      messages.appendChild(wrapper);
      messages.scrollTop = messages.scrollHeight;
    }


    // Handle send
    function sendMessage() {
      const text = inputBox.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      inputBox.value = '';
      setTimeout(() => addMessage(fakeReply(text), 'ai'), 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    inputBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
})