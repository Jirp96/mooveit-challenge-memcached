const listener = (socket) => {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
};

exports.listener = listener;