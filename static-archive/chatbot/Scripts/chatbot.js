/**
 * Enhanced Chatbot Interface with Azure OpenAI Integration
 */
class AzureAIChatbot {
    constructor() {
        // Initialize DOM elements and state
        this.initElements();
        this.setupEventListeners();
        
        // Conversation state
        this.conversations = {
            main: {
                messages: [
                    {
                        role: 'assistant',
                        content: "Hello! I'm SacAI. How can I help you today?",
                        timestamp: new Date()
                    }
                ]
            },
            float: {
                messages: [
                    {
                        role: 'assistant',
                        content: "Hello! I'm SacAI. How can I help you today?",
                        timestamp: new Date()
                    }
                ]
            }
        };

        // State for widgets
        this.isFloatingWidgetOpen = false;
        this.isVoiceActive = false;
        this.voiceRecognition = null;
        this.emojiPickerVisible = false;
        
        // Default textarea height
        this.defaultTextareaHeight = '44px';
        
        // Initialize Azure AI service
        this.initAzureAI();
    }

    initElements() {
        // Main chat elements
        this.mainChatBody = document.getElementById('main-chat-body');
        this.mainChatInput = document.getElementById('main-chat-input');
        this.mainChatSend = document.getElementById('main-chat-send');
        this.mainClearBtn = document.getElementById('main-clear-btn');
        this.mainVoiceBtn = document.getElementById('main-voice-btn');
        this.mainUploadBtn = document.getElementById('main-upload-btn');
        this.mainSettingsBtn = document.getElementById('main-settings-btn');
        
        // Floating widget elements
        this.chatWidgetTrigger = document.getElementById('chat-widget-trigger');
        this.chatWidget = document.getElementById('chat-widget');
        this.floatChatBody = document.getElementById('float-chat-body');
        this.floatChatInput = document.getElementById('float-chat-input');
        this.floatChatSend = document.getElementById('float-chat-send');
        this.floatClearBtn = document.getElementById('float-clear-btn');
        this.floatVoiceBtn = document.getElementById('float-voice-btn');
        this.closeWidgetBtn = document.querySelector('.close-widget');
        
        // File upload
        this.fileUploadInput = document.getElementById('file-upload');
        
        // Initialize textareas with default height
        if (this.mainChatInput) this.mainChatInput.style.height = this.defaultTextareaHeight;
        if (this.floatChatInput) this.floatChatInput.style.height = this.defaultTextareaHeight;
        
        // Add additional buttons to the chat input container
        this.addFeatureButtons();
    }
    
    addFeatureButtons() {
        // Create feature buttons container for main chat
        if (this.mainChatInput) {
            const mainInputWrapper = this.mainChatInput.closest('.chat-input-wrapper');
            if (mainInputWrapper) {
                const featureButtonsContainer = document.createElement('div');
                featureButtonsContainer.className = 'feature-buttons';
                
                // Emoji button
                const emojiButton = document.createElement('button');
                emojiButton.type = 'button';
                emojiButton.className = 'feature-btn emoji-btn';
                emojiButton.innerHTML = '<i class="far fa-smile"></i>';
                emojiButton.title = 'Insert emoji';
                emojiButton.addEventListener('click', () => this.toggleEmojiPicker('main'));
                
                // Voice button (moved from header to input area)
                const voiceButton = document.createElement('button');
                voiceButton.type = 'button';
                voiceButton.className = 'feature-btn voice-btn';
                voiceButton.id = 'main-voice-btn-input';
                voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceButton.title = 'Voice input';
                voiceButton.addEventListener('click', () => this.toggleVoiceInput('main'));
                
                // File upload button (moved from header to input area)
                const uploadButton = document.createElement('button');
                uploadButton.type = 'button';
                uploadButton.className = 'feature-btn upload-btn';
                uploadButton.id = 'main-upload-btn-input';
                uploadButton.innerHTML = '<i class="fas fa-paperclip"></i>';
                uploadButton.title = 'Upload file';
                uploadButton.addEventListener('click', () => this.triggerFileUpload());
                
                // Add buttons to the container
                featureButtonsContainer.appendChild(emojiButton);
                featureButtonsContainer.appendChild(voiceButton);
                featureButtonsContainer.appendChild(uploadButton);
                
                // Insert before textarea
                mainInputWrapper.insertBefore(featureButtonsContainer, this.mainChatInput);
            }
        }
        
        // Create feature buttons container for float chat
        if (this.floatChatInput) {
            const floatInputWrapper = this.floatChatInput.closest('.chat-input-wrapper');
            if (floatInputWrapper) {
                const featureButtonsContainer = document.createElement('div');
                featureButtonsContainer.className = 'feature-buttons';
                
                // Emoji button
                const emojiButton = document.createElement('button');
                emojiButton.type = 'button';
                emojiButton.className = 'feature-btn emoji-btn';
                emojiButton.innerHTML = '<i class="far fa-smile"></i>';
                emojiButton.title = 'Insert emoji';
                emojiButton.addEventListener('click', () => this.toggleEmojiPicker('float'));
                
                // Voice button
                const voiceButton = document.createElement('button');
                voiceButton.type = 'button';
                voiceButton.className = 'feature-btn voice-btn';
                voiceButton.id = 'float-voice-btn-input';
                voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceButton.title = 'Voice input';
                voiceButton.addEventListener('click', () => this.toggleVoiceInput('float'));
                
                // Add buttons to the container
                featureButtonsContainer.appendChild(emojiButton);
                featureButtonsContainer.appendChild(voiceButton);
                
                // Insert before textarea
                floatInputWrapper.insertBefore(featureButtonsContainer, this.floatChatInput);
            }
        }
    }

    setupEventListeners() {
        // Widget toggle
        if (this.chatWidgetTrigger) {
            this.chatWidgetTrigger.addEventListener('click', () => this.toggleFloatingWidget(true));
        }
        
        if (this.closeWidgetBtn) {
            this.closeWidgetBtn.addEventListener('click', () => this.toggleFloatingWidget(false));
        }
        
        // Send buttons
        if (this.mainChatSend) {
            this.mainChatSend.addEventListener('click', () => this.sendMessage('main'));
        }
        
        if (this.floatChatSend) {
            this.floatChatSend.addEventListener('click', () => this.sendMessage('float'));
        }
        
        // Input fields
        this.setupTextareaEvents(this.mainChatInput, 'main');
        this.setupTextareaEvents(this.floatChatInput, 'float');
        
        // Clear buttons
        if (this.mainClearBtn) {
            this.mainClearBtn.addEventListener('click', () => this.clearConversation('main'));
        }
        
        if (this.floatClearBtn) {
            this.floatClearBtn.addEventListener('click', () => this.clearConversation('float'));
        }
        
        // Voice input buttons in header (keeping for backward compatibility)
        if (this.mainVoiceBtn) {
            this.mainVoiceBtn.addEventListener('click', () => this.toggleVoiceInput('main'));
        }
        
        if (this.floatVoiceBtn) {
            this.floatVoiceBtn.addEventListener('click', () => this.toggleVoiceInput('float'));
        }
        
        // File upload buttons in header (keeping for backward compatibility)
        if (this.mainUploadBtn) {
            this.mainUploadBtn.addEventListener('click', () => this.triggerFileUpload());
        }
        
        if (this.fileUploadInput) {
            this.fileUploadInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }
        
        // Close emoji picker when clicking outside
        document.addEventListener('click', (e) => {
            if (this.emojiPickerVisible && !e.target.closest('.emoji-picker') && 
                !e.target.closest('.emoji-btn')) {
                this.closeEmojiPicker();
            }
        });
    }

    setupTextareaEvents(textarea, chatId) {
        if (!textarea) return;
        
        textarea.addEventListener('input', () => {
            this.adjustTextareaHeight(textarea);
        });
        
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage(chatId);
            }
        });
        
        // Ensure textarea starts with correct height
        this.adjustTextareaHeight(textarea);
    }

    toggleFloatingWidget(show = !this.isFloatingWidgetOpen) {
        this.isFloatingWidgetOpen = show;
        
        if (show) {
            this.chatWidget.classList.add('active');
            this.chatWidgetTrigger.style.display = 'none';
            
            if (this.floatChatInput) {
                setTimeout(() => this.floatChatInput.focus(), 300);
            }
        } else {
            this.chatWidget.classList.remove('active');
            this.chatWidgetTrigger.style.display = 'flex';
        }
    }

    async sendMessage(chatId) {
        const input = chatId === 'main' ? this.mainChatInput : this.floatChatInput;
        const message = input.value.trim();
        
        if (!message) return;
        
        // Clear input
        input.value = '';
        
        // Reset textarea height to default
        input.style.height = this.defaultTextareaHeight;
        
        // Add user message to the UI with current timestamp
        this.addMessage(chatId, 'user', message);
        
        // Show typing indicator
        const typingIndicator = this.showTypingIndicator(chatId);
        
        try {
            // Get response from Azure AI
            const response = await this.getAzureAIResponse(chatId, message);
            
            // Remove typing indicator and add AI response
            this.hideTypingIndicator(typingIndicator);
            this.addMessage(chatId, 'assistant', response);
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator(typingIndicator);
            this.addMessage(chatId, 'assistant', "I'm sorry, I encountered an error. Please try again.");
        }
    }

    addMessage(chatId, role, content) {
        // Create timestamp
        const timestamp = new Date();
        
        // Add to conversation history
        this.conversations[chatId].messages.push({
            role,
            content,
            timestamp
        });
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${role === 'user' ? 'user' : 'ai'}`;
        messageElement.dataset.timestamp = timestamp.toISOString();
        
        // Format content
        const formattedContent = this.formatMessageContent(content);
        
        if (role === 'user') {
            messageElement.innerHTML = `
                <div class="message-meta">You • ${this.formatTimestamp(timestamp)}</div>
                <div class="message-content">${formattedContent}</div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-header">
                    <div class="message-avatar">
                        <img src="./Resources/Images/favicon.png" alt="SacAI" class="w-6 h-6">
                    </div>
                    <div class="message-meta">SacAI • ${this.formatTimestamp(timestamp)}</div>
                </div>
                <div class="message-content">${formattedContent}</div>
            `;
        }
        
        // Add to DOM
        const chatBody = chatId === 'main' ? this.mainChatBody : this.floatChatBody;
        chatBody.appendChild(messageElement);
        
        // Scroll to bottom
        this.scrollToBottom(chatBody);
        
        // Setup timer to update all timestamps periodically
        this.setupTimestampUpdates();
    }
    
    formatTimestamp(date) {
        const now = new Date();
        const diffSeconds = Math.floor((now - date) / 1000);
        
        if (diffSeconds < 60) {
            return 'Just now';
        } else if (diffSeconds < 3600) {
            const minutes = Math.floor(diffSeconds / 60);
            return `${minutes}m ago`;
        } else if (diffSeconds < 86400) {
            const hours = Math.floor(diffSeconds / 3600);
            return `${hours}h ago`;
        } else if (diffSeconds < 172800) {
            return 'Yesterday';
        } else {
            // Format as MM/DD/YYYY for older messages
            return date.toLocaleDateString();
        }
    }
    
    setupTimestampUpdates() {
        // Clear any existing timer
        if (this._timestampTimer) {
            clearInterval(this._timestampTimer);
        }
        
        // Update timestamps every minute
        this._timestampTimer = setInterval(() => {
            this.updateAllTimestamps();
        }, 60000); // 1 minute
    }
    
    updateAllTimestamps() {
        // Update timestamps in both chat containers
        this.updateContainerTimestamps(this.mainChatBody);
        this.updateContainerTimestamps(this.floatChatBody);
    }
    
    updateContainerTimestamps(container) {
        if (!container) return;
        
        const metaElements = container.querySelectorAll('.message-meta');
        metaElements.forEach(element => {
            // Find the message element
            const messageElement = element.closest('.message');
            if (messageElement && messageElement.dataset.timestamp) {
                const timestamp = new Date(messageElement.dataset.timestamp);
                
                // Update timestamp text
                const currentText = element.textContent;
                const prefix = currentText.split(' • ')[0]; // "You" or "Azure AI"
                element.textContent = `${prefix} • ${this.formatTimestamp(timestamp)}`;
            }
        });
    }

    formatMessageContent(content) {
        // Handle code blocks with syntax highlighting
        content = content.replace(/```(.+?)\n([\s\S]*?)```/g, (match, language, code) => {
            return `<pre><code class="${language}">${this.escapeHtml(code.trim())}</code></pre>`;
        });
        
        // Handle inline code
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert line breaks to <br>
        return content.replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator(chatId) {
        const chatBody = chatId === 'main' ? this.mainChatBody : this.floatChatBody;
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        chatBody.appendChild(typingIndicator);
        this.scrollToBottom(chatBody);
        
        return typingIndicator;
    }

    hideTypingIndicator(typingIndicator) {
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.parentNode.removeChild(typingIndicator);
        }
    }

    scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    adjustTextareaHeight(textarea) {
        if (!textarea) return;
        
        // Reset height to default first
        textarea.style.height = this.defaultTextareaHeight;
        
        // Only expand if content exists and exceeds current height
        if (textarea.value && textarea.scrollHeight > textarea.clientHeight) {
            const maxHeight = 120;
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
        }
    }

    clearConversation(chatId) {
        const welcomeMessage = "Hello! I'm SacAI, your personal assistant. How can I help you today?";
        
        // Reset conversation to just the welcome message with current timestamp
        this.conversations[chatId].messages = [
            { role: 'assistant', content: welcomeMessage, timestamp: new Date() }
        ];
        
        // Clear chat body
        const chatBody = chatId === 'main' ? this.mainChatBody : this.floatChatBody;
        chatBody.innerHTML = '';
        
        // Add welcome message
        this.addMessage(chatId, 'assistant', welcomeMessage);
    }

    toggleVoiceInput(chatId) {
        // Voice button could be in the header or input area
        const voiceButton = chatId === 'main' 
            ? document.getElementById('main-voice-btn-input') || this.mainVoiceBtn 
            : document.getElementById('float-voice-btn-input') || this.floatVoiceBtn;
        
        if (!voiceButton) return;
        
        if (this.isVoiceActive) {
            // Stop voice recognition
            this.stopVoiceRecognition();
            voiceButton.classList.remove('microphone-active');
        } else {
            // Start voice recognition
            voiceButton.classList.add('microphone-active');
            this.startVoiceRecognition(chatId);
        }
        
        this.isVoiceActive = !this.isVoiceActive;
    }

    startVoiceRecognition(chatId) {
        // Check if Web Speech API is available
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice recognition is not supported by your browser.');
            return;
        }
        
        // For a production app, use Azure Speech Services
        // For now, we'll use Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.voiceRecognition = new SpeechRecognition();
        this.voiceRecognition.continuous = false;
        this.voiceRecognition.interimResults = false;
        this.voiceRecognition.lang = 'en-US';
        
        this.voiceRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const input = chatId === 'main' ? this.mainChatInput : this.floatChatInput;
            input.value = transcript;
            this.sendMessage(chatId);
        };
        
        this.voiceRecognition.onerror = (event) => {
            console.error('Speech recognition error', event);
            this.toggleVoiceInput(chatId);
        };
        
        this.voiceRecognition.onend = () => {
            // Auto-stop when speech ends
            this.toggleVoiceInput(chatId);
        };
        
        this.voiceRecognition.start();
    }

    stopVoiceRecognition() {
        if (this.voiceRecognition) {
            this.voiceRecognition.stop();
            this.voiceRecognition = null;
        }
    }

    triggerFileUpload() {
        if (this.fileUploadInput) {
            this.fileUploadInput.click();
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // In a production app, upload to Azure Blob Storage
        const chatId = this.isFloatingWidgetOpen ? 'float' : 'main';
        this.addMessage(chatId, 'user', `I'm uploading a file: ${file.name}`);
        
        // Reset file input
        event.target.value = null;
        
        // Add file context to conversation and get AI response
        this.conversations[chatId].messages.push({
            role: 'system',
            content: `User uploaded a file named "${file.name}"`,
            timestamp: new Date()
        });
        
        this.getAzureAIResponse(chatId, `I've uploaded the file ${file.name}. Can you help me with it?`)
            .then(response => {
                this.addMessage(chatId, 'assistant', response);
            })
            .catch(error => {
                console.error('Error processing file:', error);
                this.addMessage(chatId, 'assistant', "I'm sorry, I encountered an error processing your file.");
            });
    }
    
    toggleEmojiPicker(chatId) {
        // Close any existing picker
        this.closeEmojiPicker();
        
        // Create and position new emoji picker
        const input = chatId === 'main' ? this.mainChatInput : this.floatChatInput;
        const button = document.querySelector(chatId === 'main' ? '.main-chat .emoji-btn' : '.float-chat .emoji-btn');
        
        if (!input || !button) return;
        
        // Create emoji picker
        const emojiPicker = document.createElement('div');
        emojiPicker.className = 'emoji-picker';
        emojiPicker.id = `emoji-picker-${chatId}`;
        
        // Add some popular emojis
        const popularEmojis = ['😊', '👍', '👀', '🙏', '❤️', '👋', '🔥', '⭐', '🤔', '🙌', '🎉', '😂', '😅', '😎', '😍'];
        
        popularEmojis.forEach(emoji => {
            const emojiButton = document.createElement('button');
            emojiButton.className = 'emoji';
            emojiButton.textContent = emoji;
            emojiButton.addEventListener('click', () => {
                // Insert emoji at current cursor position
                const cursorPos = input.selectionStart;
                const textBefore = input.value.substring(0, cursorPos);
                const textAfter = input.value.substring(cursorPos);
                
                input.value = textBefore + emoji + textAfter;
                
                // Update cursor position
                input.selectionStart = cursorPos + emoji.length;
                input.selectionEnd = cursorPos + emoji.length;
                
                // Focus back on input
                input.focus();
                
                // Update textarea height
                this.adjustTextareaHeight(input);
                
                // Close picker
                this.closeEmojiPicker();
            });
            
            emojiPicker.appendChild(emojiButton);
        });
        
        // Position the picker
        const rect = button.getBoundingClientRect();
        emojiPicker.style.position = 'absolute';
        emojiPicker.style.left = `${rect.left}px`;
        emojiPicker.style.top = `${rect.top - 220}px`; // Position above the button
        
        // Add to DOM
        document.body.appendChild(emojiPicker);
        
        // Mark as visible
        this.emojiPickerVisible = true;
    }
    
    closeEmojiPicker() {
        const pickers = document.querySelectorAll('.emoji-picker');
        pickers.forEach(picker => picker.remove());
        this.emojiPickerVisible = false;
    }

    /* Azure AI Integration Methods */
    
    async getAzureAIResponse(chatId, message) {
        // Prepare conversation history
        const conversationHistory = this.conversations[chatId].messages
            .filter(msg => msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system')
            .map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            
        try {
            // Use your Azure App Service URL
            const response = await fetch('https://sachin-portfolio-api-bwf4bde4bmaxcefc.eastus-01.azurewebsites.net/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: conversationHistory })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error getting AI response:', error);
            return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new AzureAIChatbot();
    
    // Auto-resize textareas on page load
    document.querySelectorAll('.chat-input').forEach(textarea => {
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    });
});