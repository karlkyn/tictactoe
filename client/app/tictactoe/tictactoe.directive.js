'use strict';

angular.module('tictactoeApp').directive('tictactoe', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/tictactoe/tictactoe.html',
    controller: 'tictactoeController',
    controllerAs: 'ctrl'
  };
}).controller('tictactoeController', function($scope, $http) {
  $scope.gameModel = {
    gameBoard: [[0,0,0],[0,0,0],[0,0,0]],
    users: {
      myName: '',
      strangersName: ''
    },
    id: '12345',
    gameName: '',
    timestamp: ''
  };
  $scope.command = '';

  $scope.processHistory = function(history) {
    $scope.processedHistory = history;
  };

  $scope.createGame = function(date) {
    $scope.gameModel.timestamp = date;
    $scope.command = 'CreateGame';

    var data = {
      'id': $scope.gameModel.id,
      'cmd': $scope.command,
      'user': {
        'userName': $scope.gameModel.users.myName
      },
      'gameName': $scope.gameModel.gameName,
      'timestamp': $scope.gameModel.timestamp
    };

    $http.post('/api/createGame', data).then(function(history) {
      $scope.processHistory(history.data.response);
    });
  };
});
