import SliderMessage from "@/app/components/sliderMessage";
import { Message } from "postcss";

import React, { useEffect, useRef } from "react";

export default function TextMessage({ chatMessages } : { chatMessages: any[] }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
        (messagesEndRef.current as HTMLDivElement | null)?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
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
                <div className="flex justify-center flex-grow h-full items-center">
                    <div className="flex flex-col gap-y-5  px-4 mt-10 p-10 overflow-x-hidden" style={{ maxHeight:'75vh' }}>
                        {chatMessages.map((message, index) => (
                            <React.Fragment key={index}>
                                {message.Products && message.Products.length > 0 && <SliderMessage products={message.Products} />}
                                <div className={`chat ${message.TypeUser === 1 ? "chat-end" : "chat-start"}`}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Chat avatar" src={`${message.TypeUser === 1 ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" : "@/app/assets/robo.webp"}`} />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.TypeUser === 1 ? "Usuario" : "ShopChat"}
                                        <time className="text-xs opacity-50"></time>
                                    </div>
                                    <div className="chat-bubble">{message.content}</div>
                                </div>
                            </React.Fragment>
                        ))}
                        {}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}
        </div>
    );
}
