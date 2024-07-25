const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  
  //TEST 7:
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(98382); 
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  
  //TEST 8:
  test("response returned by receiveMessage contains the name of the message", function () {
    let message = new Message('Test message with two commands');
    let rover = new Rover(100000);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);  
    
    
  });





  //TEST 9:
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);

    console.log(message.name);

    let rover = new Rover(100000)  
    rover.receiveMessage(message.commands);
    expect(rover.receiveMessage(commands)).toEqual();







    // let commands = new Command('How low can you go?', 'Drop it low');
    // let message = new Message("Let's check out your moves", commands);
    // let rover = new Rover(100000, 'Down low', 4500);
    // let response = rover.receiveMessage(message);
    // expect(response.results).toEqual([{},{}]);
		







    // // expect(rover.receiveMessage(commands.commandType)).toEqual([{'MODE_CHANGE' : 'LOW_POWER'}, {'STATUS_CHECK' : null}]);
    // expect(rover.receiveMessage(response.results)).toEqual([{completed: true}, {completed: true, 
    //   roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }}]);

  });


  // //TEST 10:
  // test("responds correctly to the status check command", function () {
  //   expect().toEqual();

  // });


  // //TEST 11:
  // test("responds correctly to the mode change command", function () {

  // });


  // //TEST 12:
  // test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {

  // });


  // //TEST 13:
  // test("responds with the position for the move command", function () {

  // });

});



  /*
     
          receiveMessage(message)

    message is a Message object
    Returns an object containing at least two properties:
    message: the name of the original Message object
    results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
    Updates certain properties of the rover object
    Details about how to respond to different commands are in the Command Types table.


                                {
                                  message: 'Test message with two commands',
                                  results: [
                                      {
                                        completed: true
                                      },
                                      {
                                        completed: true, 
                                        roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
                                      }
                                  ]
                                } 
   
      THINK: THE FUNCTION IS WRITTEN AS AN OBJECT WITH 2 PROPERTIES (MESSAGE AND RESULTS). MESSAGE JUST RETURNS THE MESSAGE THE WAS SENT TO THE ROVER. 
      HOWEVER, RESULTS RETURNS AN ARRAY THAT HAS 2 OBJECTS INSIDE THAT CORRESPONDS TO THE COMMANDS THAT WERE PASSED IN. EACH OF THE OBJECTS INSIDE THE RESULTS ARRAY
      HAVE A KEY THAT CHECKS IF IT HAS BEEN COMPLETED. 

      POSSIBLY: SET "COMPLETED" TO FALSE AND UPDATE TO TRUE IF IT WAS DONE
                STATUS CHECK SEEMS TO RETURN AN UPDATE ON PROPERTIES OF THE ROVER
                DECLARE A RESULTS ARRAY (LET RESULTS = [];)
                PUSH COMMANDS INTO THE ARRAY?? (RESULTS.PUSH(COMMANDS[0]);) --- BUT I NEED TO MAKE THE COMMANDS OBJECTS FIRST. 
                OR MAYBE I NEED TO WRITE CONDITIONALS TO CHECK THE STATUS OF THE COMMANDS FOR UPDATES.

  */