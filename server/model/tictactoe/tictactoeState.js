'use strict';

var _ = require('lodash');

module.exports = function(history) {
  var gameFull = false;

  function processEvent(event) {
    if (event.event === "GameJoined") {
      gameFull = true;
    }
  }

  function processEvents(history) {
    _.each(history, processEvent)
  }

  processEvents(history);

  return {
    processEvents: processEvents,
    gameFull: function() {
      return gameFull;
    }
  }
};
