'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);

// app.controller('MemoryController', function(){
//   var memory = this;

//   memory.cards = _range(20);
// });

app.controller('MemoryController', function() {
    var memory = this;
    memory.cardsTurned = 0;
    memory.foundCards = 0;

    memory.cards = [];
    for (var i = 0; i < 8; ++i) {
    	memory.cards.push({
    		value: i,
    		isFaceUp: false,
    		isSolved: false
    	});
    	memory.cards.push({
    		value: i,
    		isFaceUp: false,
    		isSolved: false
    	});
    }
    memory.cards = _.shuffle(memory.cards);

    memory.turnCard = function(card) {
      if (card.isSolved) {
      	return;
      }

      if (memory.cardsTurned === 2) {
        memory.turnAllCardsDown();
      }

      card.isFaceUp = !card.isFaceUp;
      ++memory.cardsTurned;


      _.map(memory.cards,function(otherCard){
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
      memory.cardsTurned = 0;
      _.map(memory.cards, function(card) {
        if (!card.isSolved) {
    	  card.isFaceUp = false;
    	}
      });
    }
});
