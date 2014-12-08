'use strict';

module.exports = function (history) {
  var tictactoeState = require('./tictactoeState');

  var gameState = tictactoeState(history);

  return {
    executeCommand: function(cmd) {
      var cmdHandlers = {
        "CreateGame": function(cmd) {
          return [{
              event: "GameCreated",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
        },
        "JoinGame": function(cmd) {
          if(gameState.gameFull()) {
            return [{
              event: "JoinFullGameAttempted",
              user : cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
          }
          else {
            return [{
              event: "GameJoined",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
          }
        },
        "PlaceMove": function(cmd) {
          return [{
            event: "MovePlaced",
            user: cmd.user,
            gameName:cmd.gameName,
            timestamp: cmd.timestamp,
            move: cmd.move
          }]
        }

      };
      return cmdHandlers[cmd.cmd](cmd)
    }
  }
};
