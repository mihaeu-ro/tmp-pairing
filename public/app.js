'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);

app.controller('MemoryController', ['$http', function($http) {
    
    var memory = this;
    memory.game = {
      cardsTurned: 0,
      foundCards: 0,
      cards: []
    }
    
    $http.get('/api').success(function (data) {
      for (var i = 0; i < 8; ++i) {
        memory.game.cards.push({
          value: i,
          isFaceUp: false,
          isSolved: false
        });
        memory.game.cards.push({
          value: i,
          isFaceUp: false,
          isSolved: false
        });
      }
      memory.game.cards = _.shuffle(memory.game.cards);
    });

    memory.turnCard = function(card) {
      $http.post('/click', {'game':memory.game});

      if (card.isSolved) {
      	return;
      }

      if (memory.game.cardsTurned === 2) {
        memory.turnAllCardsDown();
      }

      card.isFaceUp = !card.isFaceUp;
      ++memory.game.cardsTurned;


      _.map(memory.game.cards,function(otherCard){
      	if (card === otherCard) {
      		return;
      	}

        if (otherCard.value === card.value && otherCard.isFaceUp) {
        	card.isSolved = true;
        	otherCard.isSolved = true;
        	memory.foundCards++;
        }
      });
    };

    memory.turnAllCardsDown = function(){
      memory.game.cardsTurned = 0;
      _.map(memory.game.cards, function(card) {
        if (!card.isSolved) {
    	  card.isFaceUp = false;
    	}
      });
    }
}]);
