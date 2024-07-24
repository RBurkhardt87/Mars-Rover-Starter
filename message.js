class Message {
      constructor(name, commands) {
        this.name = name;
        if (!name) {
          throw Error("Name of message is required.");
        }
        this.commands = commands;
      }
    
    }



let message = new Message('Test message with two commands', ['MODE_CHANGE', 'STATUS_CHECK']);

module.exports = Message;