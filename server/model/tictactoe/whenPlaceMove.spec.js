'use strict';

var should = require("should");
var lodash = require("lodash");
var tictactoe = require("./tictactoe");

// Variables holding events for testing
var gameCreatedEvent = {
  event: "GameCreated",
  user: {
    userName: "karlkyn"
  },
  gameName: "Fun times",
  timestamp: 1417851954
};

var gameJoinedEvent = {
  event: "GameJoined",
  user: {
    userName: "tronics"
  },
  gameName: "Fun times",
  timestamp: 1417851954
};

var X = 1;

describe("move placed command", function() {
  it("should emit move placed event", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [0,0],
        symbol: X
      }
    };

    var then = [{
      event: "MovePlaced",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [0,0],
        symbol: X
      }
    }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    //Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});
