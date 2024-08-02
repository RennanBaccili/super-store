'use client'

import { useState } from "react";
import InputMessage from "./mini-chat/inputMessage";
import TextMessage from "./mini-chat/textMessage";
import { TfiAlignJustify, TfiViewList } from "react-icons/tfi";

export default function ChatPage() {
    const [chatMessage, setChatMessages] = useState<(any)[]>([]);
    const [chatHistory, setChatHistory] = useState<{ title: string, messages: any[] }[]>([]);
    const [activeChatIndex, setActiveChatIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNewMessage = (newMessage: any) => {
        setChatMessages(prevMessages => [...prevMessages, newMessage]);

        setChatHistory(prevHistory => {
            const updatedHistory = [...prevHistory];
            if(!updatedHistory[activeChatIndex]){
                updatedHistory[activeChatIndex] = { title: `Historico chat ${activeChatIndex + 1}`, messages: [] };
            }
            updatedHistory[activeChatIndex].messages = [...chatMessage, newMessage];
            return updatedHistory;
        });
    };

    const handleNewChat = () => {
        if (chatHistory[activeChatIndex]?.messages.length === 0) {
            console.log('O chat atual está vazio. Não é possível criar um novo chat.');
            return;
        }
    
        setChatHistory(prevHistory => {
            const updatedHistory = [...prevHistory];
    
            if (!updatedHistory[activeChatIndex]) {
                return updatedHistory;
            }
    
            return [
                ...prevHistory,
                { title: `Historico chat ${prevHistory.length + 1}`, messages: [] }
            ];
        });
    
        setChatMessages([]);
    
        setActiveChatIndex(chatHistory.length);
    };

    const handleSelectChat = (index: number) => {
        setActiveChatIndex(index);
        setChatMessages(chatHistory[index].messages);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <section className="h-screen w-full flex flex-row">
            <div className={`h-full w-64 bg-base-200 fixed ${isVisible ? 'slide-in' : 'slide-out'}`} style={{ height: 'calc(100vh - 7vh)', marginTop:'6.6vh' }}>
                <ul className={`w-full mt-20 ${isVisible? '' : ''}`}>
                    <li className="w-full justify-center flex pb-4">
                        <button className="btn btn-ghost w-1/2">
                            <a onClick={handleNewChat}>New Chat</a>
                        </button>
                        <button className="self-start fixed left-72 btn btn-ghost z-10"  onClick={toggleVisibility}>
                    <a><TfiViewList /> </a>
                </button>
                    </li>
                    
                    <hr className="p-2"></hr>
                    {chatHistory.map((chat, index) => (
                        <li className={`w-full justify-center flex`} key={index}>
                            <button className="btn btn-ghost w-1/2">
                                <a onClick={() => handleSelectChat(index)}>{chat.title}</a>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-full flex-grow bg-base-200 flex justify-center flex-col items-center ml-2/12">
                
                <div className="flex h-full flex-col w-2/3 max-w-screen-lg">
                    <TextMessage chatMessages={chatMessage} />
                </div>
                <div className="flex p-4 max-w-screen-lg w-full">
                    <InputMessage onNewMessage={handleNewMessage} />
                </div>
            </div>
        </section>
    );
}


