// TODO: Consider emitting for each of these actions

class Room {
  constructor(socket, roomName) {
    this.creator = socket;
    this.voters = [];
    this.roomName = roomName;

    socket.join(roomName);
  }

  closeRoom(io) {
    this.voters.forEach(voter => {
      io.to(voter.id).emit('room closed', `The room "${this.roomName}" has been closed.`);
      voter.leave(this.roomName);
    });
  }

  addVoter(voter) {
    this.voters.push(voter);
  }

  removeVoter(voter) {
    this.voters = this.voters.filter(currentVoter => currentVoter.id !== voter.id);
  }

  // TODO: send poll?
  // TODO: send results?
}

export default Room;