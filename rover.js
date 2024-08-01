
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
            complete : true, 
            roverStatus : {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position}
            };
            statusCheckArray.push(statusCheckObject);                                                           
         }

         else if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER'){             
               moveCheckObject = {
               complete: false,
               };
               statusCheckArray.push(moveCheckObject);

            }  else {
                  this.mode = 'NORMAL';
                  this.position = message.commands[i].value;
                  moveCheckObject = {
                     complete: true,
                     position: this.position
                  };
               
                  statusCheckArray.push(moveCheckObject);
               }
         }              

         else if (message.commands[i].commandType === 'MODE_CHANGE'){
            if (message.commands[i].value === 'NORMAL'){
               this.mode = "NORMAL";
               modeCheckObject = {
               complete : true 
               };              
               statusCheckArray.push(modeCheckObject);

            }  else {
                  this.mode = "LOW_POWER";
                  modeCheckObject = {
                  complete : false
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