'use strict';

var should = require("should");
var lodash = require("lodash");
var tictactoe = require("./tictactoe");

// Variables holding events for testing
var gameCreatedEvent = {
  event: "GameCreated",
  user: {
    userName: "karlkyn"
  },
  gameName: "Fun times",
  timestamp: 1417851954
};

var gameJoinedEvent = {
  event: "GameJoined",
  user: {
    userName: "tronics"
  },
  gameName: "Fun times",
  timestamp: 1417851954
};

function placeMove(coordinates, symbol) {
  return {
    event: "MovePlaced",
    user: {
      userName: "karlkyn"
    },
    gameName: "Fun times",
    timestamp: 1417851954,
    move: {
      coordinates: coordinates,
      symbol: symbol
    }
  }
}

var X = 1;
var O = -1;

describe("move placed command", function() {
  it("should emit move placed event", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [0,0],
        symbol: X
      }
    };

    var then = [{
      event: "MovePlaced",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [0,0],
        symbol: X
      }
    }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    //Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on top row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,0], X), placeMove([0,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [0,2],
        symbol: X
      }
    };

    var then = [placeMove([0,2], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on middle row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([1,0], X), placeMove([1,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [1,2],
        symbol: X
      }
    };

    var then = [placeMove([1,2], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on bottom row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([2,0], X), placeMove([2,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,2],
        symbol: X
      }
    };

    var then = [placeMove([2,2], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on vertical left row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,0], X), placeMove([1,0], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,0],
        symbol: X
      }
    };

    var then = [placeMove([2,0], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on vertical middle row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,1], X), placeMove([1,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,1],
        symbol: X
      }
    };

    var then = [placeMove([2,1], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on vertical right row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,2], X), placeMove([1,2], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,2],
        symbol: X
      }
    };

    var then = [placeMove([2,2], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on top left to bottom right diagonal row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,0], X), placeMove([1,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,2],
        symbol: X
      }
    };

    var then = [placeMove([2,2], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game won on top right to bottom left diagonal row win", function() {
    //Arrange
    var given = [gameCreatedEvent, gameJoinedEvent, placeMove([0,2], X), placeMove([1,1], X)];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,0],
        symbol: X
      }
    };

    var then = [placeMove([2,0], X),
      {
        event: "GameWon",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
  it("should emit game draw event", function() {
    //Arrange
    var given = [
      gameCreatedEvent,
      gameJoinedEvent,
      placeMove([0,0], X),
      placeMove([0,1], O),
      placeMove([0,2], X),
      placeMove([1,1], O),
      placeMove([1,0], X),
      placeMove([1,2], O),
      placeMove([2,1], X),
      placeMove([2,0], O)
    ];

    var when = {
      cmd: "PlaceMove",
      user: {
        userName: "karlkyn"
      },
      gameName: "Fun times",
      timestamp: 1417851954,
      move: {
        coordinates: [2,2],
        symbol: X
      }
    };

    var then = [placeMove([2,2], X),
      {
        event: "GameDraw",
        user: {
          userName: "karlkyn"
        },
        gameName: "Fun times",
        timestamp: 1417851954
      }];

    // Act
    var actualEvents = tictactoe(given).executeCommand(when);

    // Assert
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});
