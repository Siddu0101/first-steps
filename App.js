// App-complete.js - COMPLETE ERROR-FREE VERSION
// This replaces App-1.js with full API integration and error handling

// =============================================================================
// CONFIGURATION & STATE
// =============================================================================
const CONFIG = {
  aiEndpoint: '/api/getAIResponse',
  requestTimeout: 30000, // 30 seconds
  maxMessageLength: 1000,
  maxRetries: 3
};

const state = {
  currentPage: 'home',
  currentStep: 1,
  isLoading: false,
  chatMessages: [],
  retryCount: 0,
  websiteData: {
    step1: {},
    step2: {},
    step3: {},
    generated: null
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function showToast(message, type = 'success') {
  const toast = $('#toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function formatTime() {
  return new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// =============================================================================
// NAVIGATION FUNCTIONS
// =============================================================================
function showPage(pageId) {
  try {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    $$('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // Remove active class from all nav links
    $$('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Show target page
    const targetPage = $('#' + pageId);
    if (!targetPage) {
      console.error('Page not found:', pageId);
      showToast('Page not found', 'error');
      return false;
    }
    
    targetPage.classList.add('active');
    state.currentPage = pageId;
    
    // Add active class to corresponding nav link
    const activeLink = $(`[data-page="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Successfully navigated to:', pageId);
    return true;
    
  } catch (error) {
    console.error('Error navigating to page:', error);
    showToast('Navigation error', 'error');
    return false;
  }
}

function initNavigation() {
  try {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-page]');
      if (navLink) {
        e.preventDefault();
        const targetPage = navLink.getAttribute('data-page');
        showPage(targetPage);
      }
    });
    
    // Handle mobile nav toggle
    const navToggle = $('#navToggle');
    const navMenu = $('#navMenu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
      
      // Close nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
        }
      });
    }
    
    console.log('Navigation initialized successfully');
    
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
}

// =============================================================================
// CHAT FUNCTIONS - WITH REAL API INTEGRATION
// =============================================================================
function addMessage(content, isUser = false) {
  try {
    const chatMessages = $('#chatMessages');
    if (!chatMessages) {
      console.error('Chat messages container not found');
      return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${sanitizeHTML(content)}</p>
      </div>
      <div class="message-time">${formatTime()}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in state
    state.chatMessages.push({
      content,
      isUser,
      timestamp: new Date().toISOString()
    });
    
    console.log('Message added:', { content: content.substring(0, 50) + '...', isUser });
    
  } catch (error) {
    console.error('Error adding message:', error);
  }
}

function showChatLoading() {
  const chatLoading = $('#chatLoading');
  if (chatLoading) {
    chatLoading.style.display = 'block';
    const chatMessages = $('#chatMessages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}

function hideChatLoading() {
  const chatLoading = $('#chatLoading');
  if (chatLoading) {
    chatLoading.style.display = 'none';
  }
}

// REAL API INTEGRATION - This is the key fix!
async function getAIResponse(userMessage) {
  try {
    console.log('Getting AI response for:', userMessage.substring(0, 50) + '...');
    
    // Validate input
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
      throw new Error('Invalid message');
    }
    
    if (userMessage.length > CONFIG.maxMessageLength) {
      throw new Error(`Message too long. Maximum ${CONFIG.maxMessageLength} characters allowed.`);
    }
    
    showChatLoading();
    state.isLoading = true;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, CONFIG.requestTimeout);
    
    // Make API request
    const response = await fetch(CONFIG.aiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: userMessage.trim()
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = 'Failed to get response from AI service';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      
      if (response.status === 503) {
        errorMessage = 'The AI model is loading. Please wait a moment and try again.';
      } else if (response.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment before asking another question.';
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse successful response
    const data = await response.json();
    console.log('AI API response received:', data);
    
    if (!data || !data.text) {
      throw new Error('Invalid response format from AI service');
    }
    
    state.retryCount = 0; // Reset retry count on success
    return data.text;
    
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    let errorMessage;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timed out. Please try again with a shorter message.';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Unable to connect to AI service. Please check your internet connection and try again.';
    } else if (error.message.includes('JSON')) {
      errorMessage = 'Received invalid response from AI service. Please try again.';
    } else {
      errorMessage = error.message || 'An unexpected error occurred. Please try again.';
    }
    
    // Retry logic for certain errors
    if (state.retryCount < CONFIG.maxRetries && 
        (error.name === 'AbortError' || error.message.includes('503'))) {
      state.retryCount++;
      console.log(`Retrying request (attempt ${state.retryCount}/${CONFIG.maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 2000 * state.retryCount));
      return getAIResponse(userMessage);
    }
    
    return `I apologize, but I'm experiencing technical difficulties: ${errorMessage}`;
    
  } finally {
    hideChatLoading();
    state.isLoading = false;
  }
}

function initChat() {
  try {
    const chatForm = $('#chatForm');
    const chatInput = $('#chatInput');
    
    if (!chatForm || !chatInput) {
      console.error('Chat form elements not found');
      return;
    }
    
    console.log('Initializing chat with real API integration...');
    
    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (state.isLoading) {
        console.log('Already processing a request, ignoring...');
        return;
      }
      
      const message = chatInput.value.trim();
      if (!message) return;
      
      // Add user message
      addMessage(message, true);
      chatInput.value = '';
      
      // Get AI response
      const aiResponse = await getAIResponse(message);
      addMessage(aiResponse, false);
    });
    
    // Handle Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });
    
    // Handle suggestion pills
    $$('.suggestion-pill').forEach(pill => {
      pill.addEventListener('click', async (e) => {
        if (state.isLoading) return;
        
        const suggestion = pill.getAttribute('data-suggestion');
        if (!suggestion || !chatInput) return;
        
        // Add suggestion as user message
        addMessage(suggestion, true);
        
        // Get AI response
        const aiResponse = await getAIResponse(suggestion);
        addMessage(aiResponse, false);
      });
    });
    
    // Add welcome message
    addMessage("Hi! I'm your AI startup mentor. Ask me anything about starting and growing your business. I can help with business planning, market research, funding strategies, and more!", false);
    
    console.log('Chat initialized successfully with API integration');
    
  } catch (error) {
    console.error('Error initializing chat:', error);
    showToast('Failed to initialize chat', 'error');
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing FirstSteps application...');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize chat with real API
    initChat();
    
    console.log('FirstSteps application initialized successfully!');
    showToast('Welcome to FirstSteps!', 'success');
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
    showToast('Failed to initialize application', 'error');
  }
});

// =============================================================================
// ERROR HANDLING
// =============================================================================
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  showToast('An unexpected error occurred', 'error');
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { showPage, getAIResponse, addMessage };
}
