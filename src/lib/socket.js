import socketIO from 'socket.io';

const openRooms = {};

export default server => {
  const options = {
    origins: process.env.CORS_ORIGIN,
  };

  const io = socketIO(server, options);

  io.on('connection', client => {
    console.log(`Client connected: ${client.id}`);
    client.on('createRoom', roomName => {
      openRooms[roomName] = client.id;
      console.log(io.sockets);
      console.log(openRooms);
    });
  });
};

