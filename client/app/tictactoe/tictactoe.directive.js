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
  $scope.gameName = '';
  $scope.gameCreated = false;

  var processEvents = function(events) {
    $scope.gameModel.handle(events.data);
    console.log(events);
  };

  $scope.gameModel = gameModel;

  $scope.createGame = function(date) {
    var timestamp = date;

    var data = {
      'id': $scope.id,
      'cmd': 'CreateGame',
      'user': {
        'userName': $scope.myName,
        'symbol': 1
      },
      'gameName': $scope.gameName,
      'timestamp': timestamp
    };

    $http.post('/api/createGame', data).then(function(events) {
      processEvents(events);
      $location.search('gameId', events.data[0].id);
    });

    $scope.gameModel.user = data.user;
  };

  $scope.$watch(function( ) {
    return $location.search().gameId;
  }, function(){
    $scope.joinUrl = $location.absUrl() + '&joiningGame=true';
  });

  $scope.joinGame = function(date) {
    var timestamp = date;
    var data = {
      'id': $scope.gameModel.id,
      'cmd': 'JoinGame',
      'user': {
        'userName': $scope.myName,
        'symbol': -1
      },
      'timestamp': timestamp
    };
    $http.post('/api/joinGame', data).then(function(events) {
      processEvents(events);
    });

    $scope.gameModel.user = data.user;
  };

  $scope.placeMove = function (date, coordinates) {
    var timestamp = date;
    var data = {
      'id': $scope.gameModel.id,
      'cmd': 'PlaceMove',
      'user': {
        'userName': $scope.myName,
        'symbol': gameModel.user.symbol
      },
      'timestamp': timestamp,
      'move': {
        'coordinates': coordinates,
        'symbol': gameModel.user.symbol
      }

    };

    $http.post('/api/placeMove', data).then(function(events) {
      processEvents(events);
    });

    $scope.gameModel.user = data.user;
  };

  if($location.search().joiningGame) {
    $scope.joinGame(1417851955);
  }

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
        },
        'GameJoined': function(event, gameModel) {
          gameModel.otherUser = event.user;
        },
        'MovePlaced': function(event, gameModel) {
          var x = event.move.coordinates[0];
          var y = event.move.coordinates[1];
          gameModel.gameBoard[x][y] = event.move.symbol;
        }
      };
      _.each(events, function(ev) {
        var hand = handlers[ev.event] && handlers[ev.event](ev, gameModel);
        console.log(hand);
      });
    }
  };
  return gameModel;
});
