import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import styles from './Home.module.css';

const Home = ({ username, setUsername, room, setRoom }) => {
    const navigate = useNavigate();
    // const [userName, setUserName] = useState('');
    const socket = useContext(SocketContext);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.setItem('userName', userName);
    //     // sneds the username and socket ID to the Node.js server
    //     socket.emit('newUser', { userName, socketID: socket.id })
    //     navigate('/chat');
    // };

    // Callback function to join a room 
    const joinRoom = (e) => {
        // e.preventDefault();
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
        // Redirect to /chat
        navigate('/chat', { replace: true });
    };

    return (
        <div className={styles.container}>
            {/* <div > */}
            <form onSubmit={joinRoom} className={styles.formContainer}>
                <h1>{`<>DevRooms</>`}</h1>

                <input className={styles.input}
                    type="text"
                    required placeholder='Username...'
                    minLength={6}
                    name="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <select className={styles.input} required onChange={(e) => setRoom(e.target.value)}>
                    <option value="">-- Select Room --</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='node'>Node</option>
                    <option value='express'>Express</option>
                    <option value='react'>React</option>
                </select>
                <button className='btn btn-secondary' style={{ width: '100%' }}>Join Room</button>
            </form>

            {/* <form className="home__container" onSubmit={handleSubmit}>
            <h1 className="home__header">Sign in to Open Chat</h1>
            <label htmlFor="username" placeholder='Username'>Username</label>
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
            <select className={styles.input}>
                <option>-- Select Room --</option>
                <option value='javascript'>JavaScript</option>
                <option value='node'>Node</option>
                <option value='express'>Express</option>
                <option value='react'>React</option>
            </select>
            <button className="home__cta">SIGN IN</button>
        </form> */}
            {/* </div> */}
        </div>
    );
};

export default Home;