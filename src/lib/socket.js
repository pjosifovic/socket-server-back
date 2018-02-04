import socketIO from 'socket.io';
import Room from './room';

const state = {
  rooms: {},
};

export default server => {
  // const options = {
  //   origins: process.env.CORS_ORIGIN,
  // };

  // const io = socketIO(server, options);

  // TODO: Uncomment the above to only allow connections from our front end and delete the below

  const io = socketIO(server);

  io.on('connection', client => {
    console.log(`Client connected: ${client.id}`);
    console.log(io.sockets);

    client.on('disconnect', () => {
      console.log(`Client disconnected: ${client.id}`);
      console.log(io.sockets);
    });
    
    client.on('createRoom', roomName => {
      state.rooms[roomName] = new Room(client, roomName);
      console.log(io.sockets);
      console.log(state);
    });
  });
};

