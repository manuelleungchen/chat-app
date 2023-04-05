import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const socket = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        // sneds the username and socket ID to the Node.js server
        socket.emit('newUser', { userName, socketID: socket.id })
        navigate('/chat');
    };
    return (
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username__input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <button className="home__cta">SIGN IN</button>
        </form>
    );
};

export default Home;