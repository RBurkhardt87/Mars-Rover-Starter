
const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
   constructor(position, mode, generatorWatts) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

    receiveMessage(message) {
      let statusCheckArray = [];
      let statusCheckObject = {};
      
      for (let i = 0; i < message.commands.length; i++) { 
         if (message.commands[i].commandType === 'STATUS_CHECK') {          
            statusCheckObject = {
               complete : true, 
               roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
         };
         statusCheckArray.push(statusCheckObject);
            
         } 
      }
          
         let response = {
         message : message.name,
         results : statusCheckArray
         }
   
      return response;
   }
};

let commands = [new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(100000)  
let response = rover.receiveMessage(message);
console.log('this is receiveMessage results', response.results);
console.log("\n\n");
console.log('this is what message.commands looks like', message.commands);
    
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;