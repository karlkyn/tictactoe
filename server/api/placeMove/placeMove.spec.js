'use strict';

var should  = require('should');
var request = require('supertest');
var app     = require('../../app');

describe('POST /api/placeMove', function() {
  it('should respond with json array', function(done) {
    var cmd = {
      id: '12345',
      cmd: 'PlaceMove',
      user: {
        username: 'karlkyn'
      },
      gameName: 'FunTimes',
      timestamp: 1417851954,
      move: {
        coordinates: [0,0],
        symbol: 1
      }
    };

    var req = request(app);

    req.post('/api/placeMove')
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
