'use strict';

angular.module('tictactoeApp').directive('tictactoe', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/tictactoe/tictactoe.html',
    controller: 'tictactoeController',
    controllerAs: 'ctrl'
  };
}).controller('tictactoeController', function($scope, $http, guid, gameModel,$location) {

  $scope.id = guid();
  $scope.myName = '';
  $scope.command = '';
  $scope.gameName = '';
  $scope.timeStamp = '';
  $scope.gameCreated = false;

  var processEvents = function(events) {
    $scope.gameModel.handle(events.data);
  };

  $scope.gameModel = gameModel;

  $scope.createGame = function(date) {
    $scope.timestamp = date;
    $scope.command = 'CreateGame';

    var data = {
      'id': $scope.id,
      'cmd': $scope.command,
      'user': {
        'userName': $scope.myName,
        'symbol': 1
      },
      'gameName': $scope.gameName,
      'timestamp': $scope.timestamp
    };

    $http.post('/api/createGame', data).then(function(events) {
      processEvents(events);
      $location.search('gameId', events.data[0].id);
    });

    $scope.$watch(function(){
      return $location.search()['gameId'];
    }, function(){
      $scope.joinUrl = $location.absUrl() + '&joinGame=true'
    });

    $scope.gameModel.user = data.user;
  };
}).factory('gameModel', function() {
  var gameModel = {
    gameBoard: [[0,0,0],[0,0,0],[0,0,0]],
    user: {},
    gameCreated: false,
    myTurn: false,
    handle: function(events) {
      var handlers = {
        'GameCreated': function(event, gameModel) {
          gameModel.gameCreated = true;
          gameModel.id = event.id;
        }
      };
      _.forEach(events, function(ev) {
        handlers[ev.event] && handlers[ev.event](ev, gameModel);
      });
    }
  };
  return gameModel;
});
