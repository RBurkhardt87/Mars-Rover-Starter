
const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
   constructor(position) {
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
            completed: true, 
            roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
            };
            statusCheckArray.push(statusCheckObject);                                                           
         }

         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER'){             
               statusCheckObject = {
               completed: false
               };           
            }  
            
            else if (this.mode === 'NORMAL'){               
                  this.position = message.commands[i].value;
                  statusCheckObject = {
                  completed: true
                  };                 
            }
            statusCheckArray.push(statusCheckObject);
         }              

         if (message.commands[i].commandType === 'MODE_CHANGE'){
            if (message.commands[i].value === 'NORMAL' || message.commands[i].value === 'LOW_POWER'  ){
               this.mode = message.commands[i].value;
               statusCheckObject = {
               completed : true 
               };      
            }  
               statusCheckArray.push(statusCheckObject);
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