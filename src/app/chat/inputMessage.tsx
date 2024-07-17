'use client';

import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { sendChatMessage } from '../services/chat_service';
import { ResponseMessage } from '../models/ResponseMessage';
import { MessageDTO } from '../models/Dto/MessageDTO';


interface InputMessageProps {
    onNewMessage: (message: ResponseMessage) => void;
}


export default function InputMessage({ onNewMessage }: InputMessageProps) {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const newMessage = new ResponseMessage(1, message, 1, []);
            const responseMessage = await sendChatMessage(new MessageDTO(newMessage.Answer));
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
        <div className="flex w-full justify-center">
            <div className="flex-none p-4 max-w-screen-lg w-full">
                <div className="form-control flex flex-row ">
                    <input
                        type="text"
                        placeholder="How can I help you?"
                        className="input input-bordered flex-grow"
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
            </div>
        </div>
    );
}
