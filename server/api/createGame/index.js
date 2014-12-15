'use strict';

var express = require("express");
var controller = require("./createGame.controller");

module.exports = function(app) {
  var router = express.Router();

  router.post("/", controller.createGame);

  return {
    router: router
  }
};