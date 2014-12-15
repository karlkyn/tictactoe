'use strict';

var boundedContext = require("../../model/tictactoe/tictactoeContext");
var tictactoeHandler = require("../../model/tictactoe/tictactoe");


exports.createGame = function(req, res) {
  var store = {
    loadEvents: function(id) {
      return [];
    }
  };

  var context = boundedContext(store, [tictactoeHandler]);

  var result = context.handleCommand(req.body);

  res.json(result);

};
