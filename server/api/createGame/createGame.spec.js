'use strict';

var should  = require("should");
var request = require("supertest");
var app     = require("../../app");

describe("POST /api/createGame", function() {
  it("Should return a JSON array for a game created event", function(done) {
    // Arrange
    var cmd = {
      id: "12345",
      cmd: "CreateGame",
      user: {
        username: "karlkyn"
      },
      gameName: "FunTimes",
      timestamp: 1417851954
    };

    var req = request(app);

    //Act
    req.post("/api/createGame")
       .type("json")
       .send(cmd)
       .end(function(err, res) {
         if (err) return done(err);
         //Assert
         res.body.should.be.instanceOf(Array);
         done();
       });

  });
});
