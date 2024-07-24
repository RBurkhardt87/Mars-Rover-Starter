const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    //TEST 4:
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect( function() { new Message();}).toThrow(new Error('Name of message is required.'));
    });

    let message = new Message('Test message with two commands', ['MODE_CHANGE', 'STATUS_CHECK']);

    //TEST 5:    
    test("Constructor sets name", function () {
        expect(message.name).toEqual('Test message with two commands');
    });


    //TEST 6:
    test("contains a commands array passed into the constructor as the 2nd argument", function () {
        expect(message.commands).toEqual(['MODE_CHANGE', 'STATUS_CHECK']);
    });
});
