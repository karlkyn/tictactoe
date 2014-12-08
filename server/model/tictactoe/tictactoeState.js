'use strict';

var _ = require('lodash');

module.exports = function(history) {
  var gameFull = false;
  var gameBoard = [[0,0,0],[0,0,0],[0,0,0]];

  function processEvent(event) {
    if (event.event === "GameJoined") {
      gameFull = true;
    }
    if (event.event === "MovePlaced") {

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
    },
    gameBoard: function() {
      return gameBoard;
    }
  }
};
