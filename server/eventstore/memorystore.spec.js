'use strict';

var memoryStore = require('./memorystore');
var should      = require('should');

describe('in memory event store', function() {
  it('should return an empty array for a unknown id', function() {
    //Arrange
    var store = memoryStore();

    //Act
    var loadEvents = store.loadEvents('12345');

    //Assert
    should(loadEvents.length).be.exactly(0);
    should(loadEvents).be.instanceOf(Array);
  });

  it('should return past events stored', function () {
    var store = memoryStore();

    store.storeEvents('12345', [{"id": "1"}]);

    var loadEvents = store.loadEvents('12345');

    should(loadEvents.length).be.exactly(1);
    should(loadEvents).eql([{"id": "1"}]);
  });

  it('should append new events to past events', function() {
    var store = memoryStore();

    store.storeEvents('12345', [{"id": "1"}]);
    store.storeEvents('12345', [{"id": "2"}]);

    var loadEvents = store.loadEvents('12345');

    should(loadEvents.length).be.exactly(2);
    should(loadEvents).eql([{"id": "1"}, {"id": "2"}]);
  });
});
