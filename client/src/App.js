import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

import { SocketContext, socket } from './context/SocketContext';

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/chat" element={<ChatPage />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </SocketContext.Provider>
    );
}

export default App;