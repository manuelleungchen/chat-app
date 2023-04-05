import React from 'react';
import socketIO from 'socket.io-client';

export const socket = socketIO.connect('http://localhost:4000');

export const SocketContext = React.createContext();
