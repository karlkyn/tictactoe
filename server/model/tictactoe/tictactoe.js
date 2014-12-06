'use strict';

module.exports = function (history) {
  //var tictactoeState = require('./tictactoeState');
  //var gameState = tictactoeState(history);

  return {
    executeCommand: function(cmd) {
      var cmdHandlers = {
        "CreateGame": function(cmd) {
          return [{
            event:     "GameCreated",
            user:      cmd.user,
            gameName:  cmd.gameName,
            timestamp: cmd.timestamp
          }]
        }
      }
      return cmdHandlers[cmd.cmd](cmd)
    }
  }
};
