
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
      

      
      for (let i = 0; i < message.commands.length; i++) { 
         
         if (message.commands[i].commandType === 'STATUS_CHECK') {          
            statusCheckObject = {
            completed: true, 
            roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
            };
            statusCheckArray.push(statusCheckObject);                                                           
         }

         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER' || message.commands[i].value === 'LOW_POWER'){             
               moveCheckObject = {
               completed: false
               };
               statusCheckArray.push(moveCheckObject);

            }  
            
            else if (this.mode === 'NORMAL'){               
                  this.position = message.commands[i].value;
                  moveCheckObject = {
                  completed: true
                  };
               
                  statusCheckArray.push(moveCheckObject);
               }
         }              

         if (message.commands[i].commandType === 'MODE_CHANGE'){
            if (message.commands[i].value === 'NORMAL'){
               this.mode = "NORMAL";
               modeCheckObject = {
               completed : true 
               };              
               statusCheckArray.push(modeCheckObject);

            }  else if (message.commands[i].value === 'LOW_POWER'){
                  this.mode = "LOW_POWER";
                  modeCheckObject = {
                  completed : true
                  };
                  statusCheckArray.push(modeCheckObject);
               }  
         }
               
      }          

           let stats = {
               message : message.name,
               results : statusCheckArray                      
            };                                                                                                   
            return stats;
   }            
};




module.exports = Rover;