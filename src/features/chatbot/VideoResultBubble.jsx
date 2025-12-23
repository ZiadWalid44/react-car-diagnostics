import React from 'react';
import { FaPlayCircle, FaExternalLinkAlt } from 'react-icons/fa';

// The data received by the component (comes from the bot's conversation log)
const VideoResultBubble = ({ content }) => {
    // Conversation contents
    const { title, searchUrl, description } = content;
    
    // Function to open the search link in a new tab
    const handleOpenLink = () => {
        // Ensure using _blank to open the link in a new window
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="video-result-bubble-container" style={{ direction: 'ltr', textAlign: 'left' }}>
            
            {/* 1. Card Header and Alert */}
            <div className="video-result-header">
                <FaPlayCircle size={20} color="#FF0000" />
                {/* Text translated */}
                <h4>Solutions Found</h4>
            </div>

            {/* 2. Video Details (Search Title) */}
            <div className="video-result-body">
                <p className="video-title">
                    {/* Text translated */}
                    {title || "Search for your car's fault solution now!"}
                </p>
                <p className="video-description">
                    {/* Text translated */}
                    {description || "Click to search the CarCareKiosk database for a solution to this fault."}
                </p>
            </div>
            
            {/* 3. Call To Action (CTA) Button that opens the search link */}
            <button 
                onClick={handleOpenLink} 
                className="video-search-btn"
                // Text translated
                title="Click to search on the external site"
            >
                <FaExternalLinkAlt size={14} style={{ marginRight: '8px' }} />
                {/* Button text translated */}
                View Solutions & Watch Video
            </button>
            
        </div>
    );
};

export default VideoResultBubble;