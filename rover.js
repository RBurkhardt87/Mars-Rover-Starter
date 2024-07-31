
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

         
         //do I need to write an object result that says false if mode is in low? Or just make sure rover doesn't move? Or just return the position of rover?        
            

         /*do I need to make a nested loop for the values maybe?? If the commands were put in the opposite way, I would think code would break. HOWEVER WHEN I PUT IN A LOOP AND DO "message.commands[i].value[j]" the update in position stops and I only get an array of one response object returned-- even when I add a modeCheckObject to the if statement and push it into the statusCheckArray.            PLUS: do I need to update the mode change??*/

               if (message.commands[i].commandType === ('MOVE') && ('MODE_CHANGE')){
                  // for (let j = 0; j < message.commands[i].value.length; j++){
                     if (message.commands[1].value === 'LOW_POWER'){
                        rover.mode = 'LOW_POWER';

                        moveCheckObject = {
                        complete: false,
                        position : rover.position
                        };    
                        // modeCheckObject = {
                        //    complete: false
                        // };
                                           
                        statusCheckArray.push(moveCheckObject);
                        //  statusCheckArray.push(modeCheckObject);                 
                     }
         
               
               else if (message.commands[i].commandType === ('MOVE') && ('MODE_CHANGE')){
                     if (message.commands[1].value === 'NORMAL'){
                        rover.position = message.commands[i].value;
                        rover.mode = "NORMAL";        
                        
                        moveCheckObject = {
                           complete: true,
                           position: rover.position
                        };      
                        // modeCheckObject = {
                        //    complete: true
                        // };           
                        statusCheckArray.push(moveCheckObject); 
                        // statusCheckArray.push(modeCheckObject);                  
                        } 
               } 
               
               // break;

         //TRYING TO MAKE CONDITION FOR WHEN NO MODE CHANGE COMMAND IS PASSED, BUT NORMAL IS DEFAULT MODE

               else if (message.commands[i].commandType === 'MOVE') {
                  if (this.mode !== 'NORMAL'){
                  rover.position = message.commands[i].value;
                  rover.mode = 'LOW_POWER'
                  
                  moveCheckObject = {
                     complete: false,
                     position: rover.position
                  };
                  statusCheckArray.push(moveCheckObject);
                  }
               }              
               }
               // }
               

         //CHECK FOR MODE VALUES: NORMAL and LOW POWER

         if (message.commands[i].commandType === 'MODE_CHANGE'){
               if (message.commands[i].value === 'NORMAL'){
               this.mode = "NORMAL";

               modeCheckObject = {
               complete : true 
               } 
               statusCheckArray.push(modeCheckObject);
               }
         

         else if (message.commands[i].value === 'LOW_POWER'){
               this.mode = "LOW_POWER";

               modeCheckObject = {
               complete : false
               };
               statusCheckArray.push(modeCheckObject);  
         }
  

         //CONDITION FOR IF INVALID COMMAND IS PASSED IN, IT STILL RETURNS SOMETHING

         else {
            let status = {
               message : message.name,
               results : message.commands                      
            };                                                                                                   
            return status;
         }   
      }
   }                


         //THE RETURN RESPONSE FOR ROVER COMMANDS/MESSAGES

               stats = {
                  message : message.name,
                  results : statusCheckArray,
               };
               return stats;
            }
      
         
         
         
};




// let commands = [new Command('STATUS_CHECK')];
// let commands = [new Command('STATUS_CHECK'), new Command ("MODE_CHANGE", 'NORMAL')];
// let commands = [new Command('MOVE', 200000)];
let commands = [new Command('MOVE', 250000), new Command('MODE_CHANGE', 'NORMAL')];
// let commands = [new Command('MOVE', 300000), new Command('MODE_CHANGE', 'LOW_POWER')];
// let commands = [new Command('MOVE', 250000), new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
// let commands = [new Command('MOVE', 250000), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 200)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(100000)  
let response = rover.receiveMessage(message);
console.log(response);



/*-----> So the program seems like it is running correctly, but it is not. If I don't include a j for loop to loop over the values of the commandTypes, then I think...
         1. I won't be able to ever send just the command MOVE, and the rover will NOT be able to move when the default mode is at NORMAL
         2. If the commands were put in the opposite order, the program would halt. I need a loop

         But... I can't figure out how to add the loop in correctly...
         1. Once I add the loop the position update gets messed up-- I don't think i am assigning the update correctly

         Also... I don't know if the conditions for checking NORMAL and LOW_POWER for MODE_CHANGE is needed or not. Maybe I could trim down on code by just having the 
         conditions checked once and reassigning the rover.position in that if statement. Rather than having multiple if statements. But if I were to do that. I am not 
         sure how I would update the rover.position

         Second, am I even checking the MOVE and MODE CHANGE command together correctly?
         

*/




// console.log(commands[0].value);           //<----------That's the VALUE that we need to check for LOW_POWER MODE!!!!!!!!!!!!
// console.log('this is receiveMessage results', response.results);
// console.log("\n\n");
// console.log('this is what message.commands looks like', message.commands);

    
// roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
//I think receivedMessage(message) will be a function. Remember that for when I go to write the tests correctly.


module.exports = Rover;