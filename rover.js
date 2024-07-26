
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
      let otherCommandObject = {};
      
      for (let i = 0; i < message.commands.length; i++) { 
         if (message.commands[i].commandType === 'STATUS_CHECK') {          
            statusCheckObject = {
            complete : true, 
            roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
         };
            statusCheckArray.push(statusCheckObject);
                                                            //ideally, I should be able to make if statements for the other
            let stats = {                                   //commands. they will have their own object response that I can
               message : message.name,                      //push into statusCheckArray and return the stats object. Once that
               results : statusCheckArray                   // is done. I probably will no longer need the status object. I would
            }                                               //think I would just have validation for invalid command if anything.
            return stats;
         } 

         if (message.commands[i].commandType === 'MODE_CHANGE', 'NORMAL') {
            statusCheckObject = {
               complete : true
            };
               statusCheckArray.push(statusCheckObject);

               let stats = {
                  message : message.name,
                  results : statusCheckArray
               }
               return stats;
         }
     
         }        
         let status = {
         message : message.name,
         results : message.commands                          //message.commands (makes test 9 work), but I feel like I have to change it in order
         }                                                  // to get the real commands to work. When I have it as statusCheckArray I feel like I 
                                                            // am so close to having it. 
      return status;
      }

};

// let commands = [new Command('not status check')];
// let commands = [new Command('STATUS_CHECK')];
// let commands = [new Command('MODE_CHANGE', 'NORMAL')]
let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
let message = new Message('Test message with two commands', commands);
let rover = new Rover(100000)  
let response = rover.receiveMessage(message);
console.log(commands[0].value);           //<----------That's the VALUE that we need to check for LOW_POWER MODE!!!!!!!!!!!!
// console.log('this is receiveMessage results', response.results);
// console.log("\n\n");
// console.log('this is what message.commands looks like', message.commands);

    
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;