import React, { useState } from 'react';
import { useChatContext } from '../../context/ChatContext'; 
// 🔑 استيراد أيقونة الإغلاق من مسارها الصحيح (Ai)
import { AiOutlineClose } from 'react-icons/ai'; 
// 🔑 استيراد أيقونة السيارة من مسارها الصحيح (Fa)
import { FaCar } from 'react-icons/fa'; 
import ChatDialog from './ChatDialog'; 

const InteractiveCarIcon = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { carMake } = useChatContext();

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const carIconClasses = isChatOpen ? 'car-icon active-glow' : 'car-icon';

    return (
        <div className="chatbot-fixed-container" style={{ direction: 'ltr' }}>
            
            {/* 1. Chat Dialog Window */}
            {isChatOpen && (
                <div className="chat-dialog-box">
                    <header className="chat-header">
                        <h3>Diagnostics Assistant {carMake || 'Vehicle'}</h3>
                        <button onClick={toggleChat} className="close-btn">
                            <AiOutlineClose size={20} />
                        </button>
                    </header>
                    
                    <ChatDialog /> 
                </div>
            )}

            {/* 2. Interactive Car Icon */}
            <div 
                className={carIconClasses} 
                onClick={toggleChat}
                title={isChatOpen ? "Close Chat" : "Open Diagnostics Assistant"} 
            >
                <div className="car-svg-placeholder">
                    {/* استخدام الأيقونات الصحيحة */}
                    {isChatOpen ? <AiOutlineClose size={22} /> : <FaCar size={25} />} 
                </div>
            </div>
            
        </div>
    );
};

export default InteractiveCarIcon;