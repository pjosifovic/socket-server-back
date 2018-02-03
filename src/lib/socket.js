import socketIO from 'socket.io';

export default server => {
  const options = {
    origins: process.env.CORS_ORIGIN,
  };

  const io = socketIO(server, options);

  io.on('connection', client => {
    console.log(`Client connected: ${client.id}`);
    client.on('hello', data => {
      console.log(data);
    });
  });
};

