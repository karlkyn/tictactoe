'use strict';

describe('New Tic tac toe element', function() {
  var compile, scope, http, httpBackend, tictactoeController, location;

  beforeEach(module('tictactoeApp'));
  beforeEach(module('app/tictactoe/tictactoe.html'));
  beforeEach(function() {
    module(function($provide) {
      $provide.value('guid', function() {
        return '12345';
      });
    });
  });

  beforeEach(inject(function($compile, $rootScope, $http, $injector, $controller, $location) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    compile = $compile;
    scope = $rootScope.$new();
    location = $location;
    tictactoeController = $controller('tictactoeController', {
          $scope: scope
    });
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('Should render a div with Tic Tac Toe as text', function() {
    var element = compile(angular.element('<tictactoe></tictactoe>'))(scope);
    scope.$digest();
    expect(element.html()).toContain('<h1>Tic Tac Toe</h1>');
  });
  it('Should send a create game request and get event back', function() {
    var date = new Date().getTime()/1000;
    httpBackend.expectPOST('/api/createGame', {
      id: '12345',
      cmd: "CreateGame",
      user: {
        userName: 'karlkyn',
        symbol: 1
      },
      gameName: 'Fun times',
      timestamp: date
    }).respond([{
        id: '12345',
        event: 'GameCreated',
        user: {
          userName: 'karlkyn',
          symbol: 1
        }
      }]);

    scope.myName = 'karlkyn';
    scope.gameName = 'Fun times';

    scope.createGame(date);
    httpBackend.flush();

    expect(scope.gameModel.gameCreated).toBe(true);
    expect(scope.gameModel.user.symbol).toBe(1);
    expect(location.search()['gameId']).toBe('12345');
    expect(scope.joinUrl).toBe(location.absUrl() + '&joinGame=true');

  });
});


