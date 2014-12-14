'use strict';

var should = require("should");

var tictactoe = require("./tictactoe");

describe("create game command", function() {
  it("should emit game created event", function() {
    //Arrange
    var given = [];
    var when =
      {
        id: "12345",
        cmd: "CreateGame",
        user: {
          username: "karlkyn"
        },
        gameName: "FunTimes",
        timestamp: 1417851954
      };
    var then = [
      {
        id: "12345",
        event: "GameCreated",
        user: {
          username: "karlkyn"
        },
        gameName: "FunTimes",
        timestamp: 1417851954
      }
    ];

    //Act
    var actualEvents = tictactoe(given).executeCommand(when);

    //Assert
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));

  });
});
