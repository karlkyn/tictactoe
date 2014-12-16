'use strict';

describe("New Tic tac toe element", function() {
  var $compile, $rootScope;

  beforeEach(module("tictactoeApp"));
  beforeEach(module("app/tictactoe/tictactoe.html"));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("Should render a div with Tic Tac Toe as text", function() {
    var element = $compile(angular.element("<tictactoe></tictactoe>"))($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("<h1>Tic Tac Toe</h1>");
  });
});


