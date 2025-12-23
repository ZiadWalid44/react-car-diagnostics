import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../../context/ChatContext';
import VideoResultBubble from './VideoResultBubble'; // Result bubble component
import { FaPaperPlane } from 'react-icons/fa';

// Initial default messages
const initialMessages = [
    { id: 1, sender: 'bot', text: "Hello! I am the Diagnostics Assistant. What is the make and model of your car?", type: 'text' }
];

const ChatDialog = ({ handleClose }) => { // Assuming handleClose is passed to close the dialog
    // 1. Global state and functions
    const { carMake, carModel, setCarDetails, setProblemKeywords } = useChatContext();
    
    // 2. Local message log
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState('');
    
    // 3. useRef for auto-scrolling
    const messagesEndRef = useRef(null);
    
    // 4. Function to scroll to the bottom when a new message is added
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Effect to scroll the window upon message update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Message processing simulation function
    const processMessage = (text) => {
        const query = text.trim();
        const newMsgId = Date.now();
        
        // 1. Add the user's message to the log
        setMessages(prev => [...prev, { id: newMsgId, sender: 'user', text: query, type: 'text' }]);

        // 2. Analyze and generate responses (Simulation Logic)
        let botResponse = null;
        
        if (!carMake) {
            // State 1: User hasn't specified the car yet. Assume input is Make and Model
            const parts = query.split(/\s+/); 
            const make = parts[0];
            const model = parts.slice(1).join(' ');
            
            setCarDetails(make, model);
            
            botResponse = {
                text: `Thank you. Your vehicle has been registered: ${make} ${model}. Please describe the fault (e.g., Squeaking sound when braking).`,
                type: 'text'
            };
            
        } else {
            // State 2: Car is specified. Now search for the solution
            setProblemKeywords(query);
            
            // Generate search URL for CarCareKiosk
            const searchTerms = `${carMake} ${carModel} ${query}`;
            // Use Google search restricted to CarCareKiosk site for relevant results
            const searchURL = `https://www.google.com/search?q=site:carcarekiosk.com+${encodeURIComponent(searchTerms)}`;

            botResponse = {
                type: 'video-result',
                content: {
                    title: `Diagnostic Solutions for ${carMake} ${carModel}`,
                    searchUrl: searchURL,
                    description: `Click the button to view search results for: "${query}" on the CarCareKiosk site.`,
                }
            };
        }
        
        // 3. Add the bot's message after a slight delay (simulating processing time)
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', ...botResponse }]);
        }, 500); // 500ms delay for simulation
    };

    // 5. Main message sending function
    const handleSend = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;
        
        const messageToSend = inputMessage;
        setInputMessage(''); // Clear input field immediately upon sending

        processMessage(messageToSend);
    };


    return (
        // .chat-dialog-content assumes existing styles in styles.css
        <div className="chat-dialog-content" style={{ direction: 'ltr' }}> 
            
            {/* Message List Area */}
            <div className="message-list">
                {messages.map(msg => (
                    <div key={msg.id} className={`message-row ${msg.sender}`}>
                        {msg.type === 'text' && (
                            <div className="message-bubble">{msg.text}</div>
                        )}
                        {/* Use VideoResultBubble component for 'video-result' message type */}
                        {msg.type === 'video-result' && (
                            <VideoResultBubble content={msg.content} />
                        )}
                    </div>
                ))}
                {/* Reference for scrolling to bottom */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="chat-input-area">
                <input
                    type="text"
                    placeholder={carMake ? "Describe the car fault (e.g., rattling noise)" : "Type your car make and model..."}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button 
                    type="submit" 
                    aria-label="Send Message"
                    disabled={inputMessage.trim() === ''} // Disable button if input is empty
                >
                    <FaPaperPlane size={18} color="white" />
                </button>
            </form>
        </div>
    );
};

export default ChatDialog;