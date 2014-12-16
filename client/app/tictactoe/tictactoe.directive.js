'use strict';

angular.module('tictactoeApp').directive('tictactoe', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/tictactoe/tictactoe.html',
    controller: 'tictactoeController',
    controllerAs: 'ctrl'
  }
}).controller('tictactoeController', function($scope, $http) {
  this.gameModel = {
    gameBoard: [[0,0,0],[0,0,0],[0,0,0]],
    users: {
      myName: '',
      strangersName: ''
    },
    id: '12345',
    gameName: '',
    timestamp: ''
  };

  this.createGame = function() {
    console.log('inside me');
    this.gameModel.timestamp = Date();
    var command = "CreateGame";

    var data = {
      'id': this.gameModel.id,
      'cmd': command,
      'user': {
        'username': this.gameModel.users.myName
      },
      'gameName': this.gameModel.gameName,
      'timestamp': this.gameModel.timestamp
    };

    $http.post('/api/createGame', data).success(function(history) {
      console.log(history);
    });
  }
});
