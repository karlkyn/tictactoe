'use strict';

var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');

describe('game created event', function() {
  it('should emit game created event', function() {
    //Arrange
    var given = [];
    var when =
      {
        cmd: "CreateGame",
        user: {
          userName: "karlkyn"
        },
        gameName: "FunTimes",
        timestamp: 1417851954
      };
    var then = [
      {
        event: "GameCreated",
        user: {
          userName: "karlkyn"
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
