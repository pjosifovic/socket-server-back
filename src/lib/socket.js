import socketIO from 'socket.io';
import Room from './room';

const state = {
  rooms: {},
  owners:{},
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

    client.on('disconnect', () => {
      console.log(`Client disconnected: ${client.id}`);
      const ownedRoom = state.owners[client.id];
      if (ownedRoom) {
        state.rooms[ownedRoom].closeRoom(io); 
        // TODO: add to this so we emit a notification to each connected client
      }
    });
    
    client.on('create room', roomName => {
      if (state.rooms[roomName]) {
        io.to(client.id).emit('room conflict', `The room name "${roomName}" is not available.`);
      } else {
        io.to(client.id).emit('room created', `You have just created the room "${roomName}".`);
        // TODO: on client side this must dispatch set state for room
        // TODO: add check to make sure you don't already own a room
        state.rooms[roomName] = new Room(client, roomName);
        state.owners[client.id] = roomName;
        client.join(roomName);
        console.log('socket.io ROOOOOOMS', io.sockets.adapter.rooms);
        console.log('STATEEEEEEEE', state);
      }
    });
    
    client.on('join room', roomName => {
      const roomToJoin = state.rooms[roomName];
      if (roomToJoin) {
        // TODO: add check to make sure we are not already in the room
        io.to(client.id).emit('room joined', `You have just joined the room "${roomName}".`);
        // TODO: on client side this must dispatch set state for room
        client.join(roomName);
        roomToJoin.addVoter(client);
        console.log('STATEEEEEEEE', state);
        console.log(state.rooms[roomName].voters.map(voter => voter.id));
      } else {
        io.to(client.id).emit('room not found', `The room name "${roomName}" does not exist.`);
      }
    });
  });
};

