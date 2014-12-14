'use strict';

module.exports = function (history) {
  var tictactoeState = require('./tictactoeState');

  var gameState = tictactoeState(history);

  return {
    executeCommand: function(cmd) {
      var cmdHandlers = {
        "CreateGame": function(cmd) {
          return [{
              id: cmd.id,
              event: "GameCreated",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
        },
        "JoinGame": function(cmd) {
          if(gameState.gameFull()) {
            return [{
              id: cmd.id,
              event: "JoinFullGameAttempted",
              user : cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
          }
          else {
            return [{
              id: cmd.id,
              event: "GameJoined",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }];
          }
        },
        "PlaceMove": function(cmd) {
          var events = [{
            id: cmd.id,
            event: "MovePlaced",
            user: cmd.user,
            gameName: cmd.gameName,
            timestamp: cmd.timestamp,
            move: cmd.move
          }];
          gameState.processEvents(events);
          if(gameState.gameWon()) {
            events.push({
              id: cmd.id,
              event: "GameWon",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            })
          }
          if(gameState.gameDraw()) {
            events.push({
              id: cmd.id,
              event: "GameDraw",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            })
          }
          return events;
        }

      };
      return cmdHandlers[cmd.cmd](cmd)
    }
  }
};
