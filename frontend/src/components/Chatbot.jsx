import React, { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm SacAI. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of chat body
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Set up Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? ' ' : '') + transcript);
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error', e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Handle textarea height auto-resizing
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Safari.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Gather chat history for Azure OpenAI API
      const conversationHistory = [...messages, userMessage]
        .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
        .map((msg) => ({
          role: msg.role,
          content: msg.content
        }));

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
      const botResponse = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error('Error connecting to SacAI backend API:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm SacAI. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const insertEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
  };

  const emojis = ['😊', '👍', '🔥', '💻', '💡', '🚀', '⭐', '😂', '🎓', '🛠️', '🎨', '✨'];

  return (
    <>
      {/* Floating Chatbot Toggle Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 glow"
        title="Chat with SacAI"
      >
        <i className={`fas ${isOpen ? 'fa-comment-slash' : 'fa-comment-alt'} text-xl`}></i>
      </button>

      {/* Floating Chat Container Widget */}
      <div
        className={`fixed bottom-24 right-8 z-40 w-[350px] sm:w-[400px] h-[550px] chat-container transition-all duration-300 flex flex-col ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="chat-header p-4 flex items-center justify-between text-white">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-robot text-lg"></i> Chat with SacAI
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-white/90 hover:text-white"
              title="Clear Conversation"
            >
              <i className="fas fa-redo text-sm"></i>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-white/90 hover:text-white"
              title="Minimize"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="chat-body flex-1 p-4 flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[80%] ${
                msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-600'
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col self-start items-start max-w-[80%]">
              <div className="p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-container p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-150 dark:border-gray-700 flex flex-col gap-2 relative">
          
          {/* Emoji Popover */}
          {emojiOpen && (
            <div className="absolute bottom-16 left-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg p-2.5 grid grid-cols-6 gap-2 z-50">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  className="text-xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Text input wrapper */}
          <div className="chat-input-wrapper flex items-end p-1 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20">
            {/* Feature buttons */}
            <div className="flex items-center p-1 gap-1">
              <button
                type="button"
                onClick={() => setEmojiOpen(!emojiOpen)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500 transition-colors flex items-center justify-center"
                title="Insert emoji"
              >
                <i className="far fa-smile text-lg"></i>
              </button>
              <button
                type="button"
                onClick={toggleVoice}
                className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500'
                }`}
                title="Voice input"
              >
                <i className="fas fa-microphone text-lg"></i>
              </button>
            </div>

            {/* Input textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isListening ? "Listening..." : "Ask SacAI anything..."}
              className="chat-input flex-1 outline-none text-sm p-2 bg-transparent dark:text-white resize-none"
              style={{ maxHeight: '120px' }}
            />

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                input.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export { Chatbot };
