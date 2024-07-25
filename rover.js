
// const Message = require('../message.js');
// const Command = require('../command.js');


class Rover {
   constructor(position, mode, generatorWatts) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

    receiveMessage(message) {
      let statusCheckArray = [];

      let response = {
         message : message.name,
         results : message.commands
      }
      return response;
   }

      
      // for (let i = 0; i < message.commands.length; i++) { 
      //    if (message.commands[i] === 'STATUS_CHECK') {
      //       statusCheckArray.push({complete : true, roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}});
      //    }
      //    return statusCheckArray;
      //    }
              

};
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;