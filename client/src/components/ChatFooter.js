import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatFooter = () => {
    const [message, setMessage] = useState('');
    const socket = useContext(SocketContext);

    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`)
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        // clear message state and notify others when a user is not typing 
        setMessage('');
        socket.emit('typing', ``)
    };

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                        if (e.target.value === "") {
                            socket.emit('typing', ``)
                        }
                    }}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;