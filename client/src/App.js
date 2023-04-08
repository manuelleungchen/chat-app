import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import Chat from './pages/Chat';

import './App.css';

import { SocketContext, socket } from './context/SocketContext';

function App() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home
                            username={username}
                            setUsername={setUsername}
                            room={room}
                            setRoom={setRoom}
                        />} />
                        {/* <Route path="/chat" element={<ChatPage />}></Route> */}
                        <Route
                            path='/chat'
                            element={<Chat username={username} room={room} socket={socket} />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </SocketContext.Provider>
    );
}

export default App;