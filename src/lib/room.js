// TODO: Consider emitting for each of these actions

class Room {
  constructor(socket, roomName) {
    this.creator = socket;
    this.voters = [];
    this.roomName = roomName;

    socket.join(roomName);
  }

  closeRoom() {
    this.voters.push(this.creator);
    this.voters.forEach(voter => {
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