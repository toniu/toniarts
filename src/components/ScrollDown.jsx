import React, { useState, useEffect } from 'react';
import { BiSolidMouse } from "react-icons/bi";

const ScrollDown = ({message, textColor}) => {
    const [showIndicator, setShowIndicator] = useState(false);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            setShowIndicator(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setShowIndicator(false), 3000); // Set the timeout duration (in milliseconds)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={`p-3 text-xl ${textColor}`}>
            {showIndicator && (
                <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 opacity-100'>
                    <BiSolidMouse className="h-10 w-10 inline-block mr-1 animate-bounce" />
                    {message}
                </div>
            )}
        </div>
    );
};

export default ScrollDown;
