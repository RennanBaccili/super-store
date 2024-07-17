import React, { useEffect, useRef } from "react";

import { ResponseMessage } from "../models/ResponseMessage";
import SliderMessage from "../components/sliderMessage";

export default function TextMessage({ chatMessages } : { chatMessages: ResponseMessage[] }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
        (messagesEndRef.current as HTMLDivElement | null)?.scrollIntoView({ behavior: "smooth" });
        }, 1200);
    }, [chatMessages]);

    return (
        <div className="flex flex-col h-full w-full">
            {chatMessages.length === 0 ? (
                <div className="flex justify-center items-center h-full w-full">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">Welcome to ShopChat</h1>
                        <p className="text-lg text-gray-300">Select a chat to start messaging</p>
                    </div>                         
                </div>
            ) : (
                <div className="flex w-full justify-center flex-grow">
                    <div className="flex flex-col gap-y-5 w-full max-w-screen-lg px-4 mt-10 pt-5 overflow-auto" style={{ maxHeight:'670px', minHeight:'500px' }}>
                        {chatMessages.map((message, index) => (
                            <React.Fragment key={index}>
                                {message.Products && message.Products.length > 0 && <SliderMessage products={message.Products} />}
                                <div className={`chat ${message.TypeUser === 1 ? "chat-end" : "chat-start"}`}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Chat avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.TypeUser === 1 ? "Usuario" : "ShopChat"}
                                        <time className="text-xs opacity-50"></time>
                                    </div>
                                    <div className="chat-bubble">{message.Answer}</div>
                                </div>
                            </React.Fragment>
                        ))}
                        {/* Invisible element to help scroll to bottom */}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}
        </div>
    );
}
