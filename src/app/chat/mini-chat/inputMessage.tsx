'use client';

import { useAuth } from '@/app/auth/AuthContext.';
import { MessageDTO } from '@/app/models/Dto/MessageDTO';
import { RequestMessage } from '@/app/models/Dto/Request/RequestMessage';
import { RequestMessageDTO } from '@/app/models/Dto/Request/RequestSaveMessage';
import { Message } from '@/app/models/message';
import { ResponseMessage } from '@/app/models/Response/ResponseMessage';
import { sendChatMessage, sendSaveChatMessage } from '@/app/services/chat_service';
import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';


interface InputMessageProps {
    onNewMessage: (message: Message) => void;
}

export default function InputMessage({ onNewMessage }: InputMessageProps) {
    const [message, setMessage] = useState('');


    const { isAuthenticated, getUserFromLocalStorage } = useAuth();
  

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const newMessage = new RequestMessage(message, 1, []);
            let responseMessage: Message | null = null;
            if (!isAuthenticated) {
                responseMessage = await sendChatMessage(new MessageDTO(newMessage.content));
            } else {
                const user = getUserFromLocalStorage();
                console.log(user, new MessageDTO(newMessage.content), '');
                responseMessage = await sendSaveChatMessage(new RequestMessageDTO(user._id, new MessageDTO(newMessage.content), ''));
            }
            onNewMessage(newMessage);
            onNewMessage(responseMessage);
            
            setMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
            <div className="form-control w-full flex flex-row">
                <input
                    type="text"
                    placeholder="How can I help you?"
                    className="input input-bordered w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="btn btn-primary ml-2"
                    onClick={handleSendMessage}
                >
                    <BiSend size={20} />
                </button>
            </div>
    );
}
