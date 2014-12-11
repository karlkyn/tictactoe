'use strict';

var _ = require('lodash');

module.exports = function(history) {
  var gameFull  = false;
  var gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
  var gameWon   = false;
  var moves = 0;

  function processEvent(event) {
    var winSum = 0;

    if (event.event === "GameJoined") {
      gameFull = true;
    }
    if (event.event === "MovePlaced") {
      var row    = event.move.coordinates[0];
      var col    = event.move.coordinates[1];
      var symbol = event.move.symbol;
      gameBoard[row][col] = symbol;
      ++moves;

      // Check for horizontal line win
      winSum = _(gameBoard[row]).reduce(function (sum, num) {
        return sum + num;
      });

      if (winSum === 3 || winSum === -3) {
        return gameWon = true;
      }

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
    gameWon: function() {
      return gameWon;
    }
  }
};
