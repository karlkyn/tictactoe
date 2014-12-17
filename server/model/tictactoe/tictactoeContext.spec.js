'use strict';

var should = require('should');
var sinon = require('sinon');

describe('tic tac toe game context', function() {
  it('should route command to an instance of tictactoe with a eventstream from a store', function() {
    var eventStore = {
      loadEvents: function() {},
      storeEvents: function() {}
    };
    var tictactoe = { executeCommand : function() {} };
    var emptyCommand = { id: "123" };

    var storeMock = sinon.mock(eventStore);
    var gameMock = sinon.mock(tictactoe);

    storeMock.expects("loadEvents").once().withExactArgs("123").returns([]);
    gameMock.expects("executeCommand").once().withArgs().returns([]);

    var cmdHandlers = function() {
      return tictactoe;
    };

    var gameContext = require('./tictactoeContext.js')(eventStore, cmdHandlers);

    gameContext.handleCommand(emptyCommand);

    storeMock.verify();
    gameMock.verify();

  });
});
