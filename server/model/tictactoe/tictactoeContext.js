'use strict';

var _ = require('lodash');

module.exports = function(eventStore, cmdHandler) {
  return {
    handleCommand: function(cmd) {
      var eventStream = eventStore.loadEvents(cmd.id);
      var events = cmdHandler(eventStream).executeCommand(cmd);
      return events;
    }
  }
};
