import React, { useEffect, useState, useRef, useContext } from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { SocketContext } from '../context/SocketContext';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    // 👇️ scroll to bottom every time messages change
    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);


    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;