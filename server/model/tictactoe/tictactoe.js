'use strict';

module.exports = function (history) {
  return {
    executeCommand: function(cmd) {
      var cmdHandlers = {
        "CreateGame": function(cmd) {
          return [
            {
              event: "GameCreated",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }
          ]
        },
        "JoinGame": function(cmd) {
          return [
            {
              event: "GameJoined",
              user: cmd.user,
              gameName: cmd.gameName,
              timestamp: cmd.timestamp
            }
          ]
        }
      };
      return cmdHandlers[cmd.cmd](cmd)
    }
  }
};
