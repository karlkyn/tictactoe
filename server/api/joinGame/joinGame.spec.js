'use strict';

var should  = require('should');
var request = require('supertest');
var app     = require('../../app');

describe('POST /api/joinGame', function() {
  it('should respond with json array', function(done) {
    var cmd = {
      id: '12345',
      cmd: 'JoinGame',
      user: {
        username: 'karlkyn'
      },
      gameName: 'FunTimes',
      timestamp: 1417851954
    };

    var req = request(app);

    req.post('/api/joinGame')
      .type('json')
      .send(cmd)
      .end(function(err, res) {
        if (err) return done(err);
        //Assert
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});
