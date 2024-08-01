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
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(100000);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);       
  });


  //TEST 9:  
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(100000)  
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[1].complete).toEqual(true);     
  });


  //TEST 10:
  test("responds correctly to the status check command", function () {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(100000)  
    let response = rover.receiveMessage(message);
    expect(response.results[0].complete).toEqual(true);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
  });


  //TEST 11:
  test("responds correctly to the mode change command", function () {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Checking for mode change', commands);
    let command1 = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message1 = new Message('checking for low power', command1);
    let rover = new Rover(100000)  
    let response = rover.receiveMessage(message);
    let response1 = rover.receiveMessage(message1);
    expect(response.results[0].complete).toEqual(true);
    expect(response1.results[0].complete).toEqual(false);    
  });


  // //TEST 12:
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 200000)];
    let message = new Message('Checking for mode change low power', commands);
    let rover = new Rover(100000)  
    let response = rover.receiveMessage(message);
    expect(response.results[0].complete).toEqual(false);
    expect(rover.position).toEqual(100000);
  });


  //TEST 13:
  test("responds with the position for the move command", function () {
    let commands = [new Command('MOVE', 1234567890)];
    let message = new Message('Checking for mode change', commands);  
    let rover = new Rover(100000)  
    let response = rover.receiveMessage(message);   
    expect(response.results[0].position).toEqual(1234567890); 
    expect(response.results[0].complete).toEqual(true);
  });
});




