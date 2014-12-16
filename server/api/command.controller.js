'use strict';

var app = require('../app');
var boundedContext = require('../model/tictactoe/tictactoeContext');
var tictactoe = require('../model/tictactoe/tictactoe');

exports.executeCommand = function(req, res) {
  if(!app.eventStore) {
    app.eventStore = require('../eventstore/memoryStore')();
  }

  var store = app.eventStore;
  var context = boundedContext(store, tictactoe);
  var result = context.handleCommand(req.body);

  res.json(result);
};
