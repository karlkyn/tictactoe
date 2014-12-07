'use strict';

var should = require('should');

var tictactoe = require('./tictactoe');

describe('game joined command', function() {
  it("should emit game joined event", function() {
    //Arrange
    var given = [{
      event: "GameCreated",
      user: {
        username: "karlkyn"
      },
      gameName: "First game",
      timestamp: 1417851954
    }];
    var when = {
      cmd: "JoinGame",
      user: {
        username: "karlkyn"
      },
      gameName: "First game",
      timestamp: 1417851954
    };
    var then = [
      {
        event: "GameJoined",
        user: {
          username: "karlkyn"
        },
        gameName: "First game",
        timestamp: 1417851954
      }
    ];

    //Act
    var actualEvents = tictactoe(given).executeCommand(when)

    //Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});
