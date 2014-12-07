'use strict';

var should = require('should');

var tictactoe = require('./tictactoe');

describe("join game command", function() {
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

    var then = [{
      event: "GameJoined",
      user: {
        username: "karlkyn"
      },
      gameName: "First game",
      timestamp: 1417851954
    }];

    //Act
    var actualEvents = tictactoe(given).executeCommand(when)

    //Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it("should emit full game joined event", function() {
    //Arrange
    var given = [{
        event: "GameCreated",
        user: {
          username: "karlkyn"
        },
        gameName: "First game",
        timestamp: 1417851954
      },
      {
        event: "GameJoined",
        user: {
          username: "tronics"
        },
        gameName: "First game",
        timestamp: 1417851954
      }];

    var when = {
      cmd: "JoinGame",
      user: {
        username: "bobo"
      },
      gameName: "First game",
      timestamp: 1417851954
    };

    var then = [{
        event: "JoinFullGameAttempted",
        user: {
          username: "bobo"
        },
        gameName : "First game",
        timestamp: 1417851954
    }];

    //Act
    var actualEvents = tictactoe(given).executeCommand(when);

    //Assert
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});
