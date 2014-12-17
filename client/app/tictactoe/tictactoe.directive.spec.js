'use strict';

describe('New Tic tac toe element', function() {
  var compile, scope, http, httpBackend, tictactoeController;

  beforeEach(module('tictactoeApp'));
  beforeEach(module('app/tictactoe/tictactoe.html'));

  beforeEach(inject(function($compile, $rootScope, $http, $injector, $controller) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    compile = $compile;
    scope = $rootScope.$new();
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
        userName: 'karlkyn'
      },
      gameName: 'Fun times',
      timestamp: date
    }).respond({
      response: [{}]
    });

    scope.gameModel.users.myName = 'karlkyn';
    scope.gameModel.gameName = 'Fun times';

    scope.createGame(date);
    httpBackend.flush();

    expect(scope.processedHistory.length).toBe(1);

  });
});


