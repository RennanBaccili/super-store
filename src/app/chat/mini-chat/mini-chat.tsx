'use client'


import React, { useState, useEffect } from 'react';
import TextMessage from './textMessage';
import InputMessage from './inputMessage';
import { ResponseMessage } from '@/app/models/Response/ResponseMessage';

export default function MiniChat() {
    const [isVisible, setIsVisible] = useState(true);
    const [chatMessage, setChatMessages] = useState<(ResponseMessage)[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth > 1000);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNewMessage = (newMessage: any) => {
        setChatMessages(prevMessages => [...prevMessages, newMessage]); 
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 bg-slate-700">
                <div className="flex flex-col h-full">
                    <div className="flex flex-row h-full">
                        <div className={`flex justify-center items-center h-full ${!isVisible ? 'hidden' : ''}`}>
                        </div>
                        <div className='flex flex-col h-full w-full justify-center overflow-auto' >        
                            <TextMessage chatMessages={chatMessage} />
                            <InputMessage onNewMessage={handleNewMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
