'use strict';

var _ = require('lodash');

module.exports = function(eventStore, cmdHandler) {
  return {
    handleCommand: function(cmd) {
      var eventStream = eventStore.loadEvents(cmd.id);
      var resultingEvents = [];
      _.forEach(cmdHandler, function(handler){
        var items = handler(eventStream).executeCommand(cmd);
        resultingEvents = resultingEvents.concat(items);
      });
      return resultingEvents;
    }
  }
};
