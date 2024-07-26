
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
      let stats = {};

      //CHECK FOR:  STATUS CHECK
      
      for (let i = 0; i < message.commands.length; i++) { 
         if (message.commands[i].commandType === 'STATUS_CHECK') {          
            statusCheckObject = {
            complete : true, 
            roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
         };
            statusCheckArray.push(statusCheckObject);
                                                            
       
         } 


         //CHECK FOR MODE VALUES: NORMAL and LOW POWER


         for (let i = 0; i < message.commands.length; i++){
            if (message.commands[i].value === 'NORMAL'){
               statusCheckObject = {
               complete : true 
            } 
            statusCheckArray.push(statusCheckObject);

         }


            if (message.commands[i].value === 'LOW_POWER') {
               statusCheckObject = {
               complete : false
               };
               statusCheckArray.push(statusCheckObject);
            }
              
            
         }   
               
         
               stats = {
                  message : message.name,
                  results : statusCheckArray
               }
               return stats;
            };

         
         

         
      
         //CHECK FOR BASIC COMMAND RETURNS UNTIL ALL CONDITIONS ARE WRITTEN   
         stats = {
         message : message.name,
         results : message.commands                          
                                                          
         }
                                                                                                               
      return stats;
            }
      

};




// let commands = [new Command('not status check')];
let commands = [new Command('STATUS_CHECK')];
// let commands = [new Command('MODE_CHANGE', 'NORMAL')]
// let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
let message = new Message('Test message with two commands', commands);
let rover = new Rover(100000)  
let response = rover.receiveMessage(message);
console.log(response.results);
// console.log(commands[0].value);           //<----------That's the VALUE that we need to check for LOW_POWER MODE!!!!!!!!!!!!
// console.log('this is receiveMessage results', response.results);
// console.log("\n\n");
// console.log('this is what message.commands looks like', message.commands);

    
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;