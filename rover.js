
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
      let modeCheckObject = {};
      let moveCheckObject = {};
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
               //do I need to write an object result that says false if mode is in low? Or just make sure rover doesn't move?
  
            //    else if (message.commands[i].commandType === 'MOVE') {
            //       if (rover.mode === 'NORMAL'){
            //       rover.position = message.commands[i].value;
            //       moveCheckObject = {
            //          complete: true
            //       };
            //       statusCheckArray.push(moveCheckObject);
            //    }
            // }
            

            //do I need to make a nested loop for the values maybe?? If the commands were put in the opposite way, I would think code would break
               else if (message.commands[i].commandType === ('MOVE') && ('MODE_CHANGE')){
                  if (message.commands[1].value === 'LOW_POWER'){
                  moveCheckObject = {
                     complete: false
                  };
                
                  statusCheckArray.push(moveCheckObject);
                  
               }
         
      
               else if (message.commands[i].commandType === ('MOVE') && ('MODE_CHANGE')){
                  if (message.commands[1].value === 'NORMAL'){
                     rover.position = message.commands[i].value; 
                     
                     moveCheckObject = {
                        complete: true
                     };
                  
                     
                     statusCheckArray.push(moveCheckObject);
                     
                     
                  } 
   
               } 
               
              
            }
             //CHECK FOR MODE VALUES: NORMAL and LOW POWER

         else if (message.commands[i].commandType === 'MODE_CHANGE'){
               if (message.commands[i].value === 'NORMAL'){
               modeCheckObject = {
               complete : true 
               } 
               statusCheckArray.push(modeCheckObject);

            }
         

         else if (message.commands[i].value === 'LOW_POWER') {
               modeCheckObject = {
               complete : false
               };
               statusCheckArray.push(modeCheckObject);  

            }
  

            
         else {
            let status = {
               message : message.name,
               results : message.commands                          
                                                                
               }
                                                                                                                 
            return status;

         }   
      }
   }                
         
               stats = {
                  message : message.name,
                  results : statusCheckArray
               }
               return stats;
            }
      
         
         
         
};




// let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(100000)  
// let response = rover.receiveMessage(message);

//checking if low power still allows the rover to move. If feel like I might need to write a conditional where if it is move command && low power, do not move...

// let commands = [new Command('MOVE', 200000)];
let commands = [new Command('MOVE', 250000), new Command('MODE_CHANGE', 'NORMAL')];
// let commands = [new Command('MOVE', 300000), new Command('MODE_CHANGE', 'LOW_POWER')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(100000)  
let response = rover.receiveMessage(message);
console.log(response);
console.log(rover.position);


/* 
Current results when running the program:

--->let commands = [new Command('MOVE', 200000)];   :

{
  message: 'Test message with two commands',
  results: [ { complete: true } ]
}
200000

---> let commands = [new Command('MOVE', 250000), new Command('MODE_CHANGE', 'NORMAL')];   :

{
  message: 'Test message with two commands',
  results: [ { complete: true }, { complete: true } ]
}
250000

---> let commands = [new Command('MOVE', 300000), new Command('MODE_CHANGE', 'LOW_POWER')];   :
                                                                                                            <---- I had it working before I put the extra MOVE in
{
  message: 'Test message with two commands',
  results: [ { complete: true }, { complete: false } ]
}
300000

*/





// console.log(commands[0].value);           //<----------That's the VALUE that we need to check for LOW_POWER MODE!!!!!!!!!!!!
// console.log('this is receiveMessage results', response.results);
// console.log("\n\n");
// console.log('this is what message.commands looks like', message.commands);

    
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;