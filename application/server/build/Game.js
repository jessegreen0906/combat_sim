'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Character = require('./Character');

var _Character2 = _interopRequireDefault(_Character);

var _DeathBlowClient = require('../../client/script/DeathBlowClient');

var _DeathBlowClient2 = _interopRequireDefault(_DeathBlowClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(characters) {
		_classCallCheck(this, Game);

		_DeathBlowClient2.default.writeToLog('Game started');
		this.characterList = characters;
		this.gameSteps = {};
	}

	_createClass(Game, [{
		key: 'getGameStep',
		value: function getGameStep(stepId) {
			if (Object.keys(this.gameSteps).length > stepId) {
				return this.gameSteps[stepId];
			} else {
				return null;
			}
		}
	}, {
		key: 'playGame',
		value: function playGame() {
			this.initialise();
			var gameEnded = false;
			var i = 1;
			while (!gameEnded) {
				this.gameSteps[i] = this.decisionLoop();
				gameEnded = this.gameSteps[i].gameEnd;
				i++;

				if (i >= 500) {
					gameEnded == true;
				}
			}
		}
	}, {
		key: 'decisionLoop',
		value: function decisionLoop() {
			var endGame = this.checkDeath();
			var step = {};
			step.gameEnd = endGame;
			step.characters = {};
			for (var character in this.characterList) {
				if (!endGame) {
					this.makeDecision(this.characterList[character]);
				} else {
					this.characterList[character].action.actionType = 'none';
				}
			}
			this.resolveActions();
			for (var character in this.characterList) {
				var characterString = JSON.stringify(this.characterList[character]);
				step.characters[character] = JSON.parse(characterString);
			}

			return step;
		}
	}, {
		key: 'makeDecision',
		value: function makeDecision(character) {
			character.action.actionType = 'movement';
			// character.action.movement = 5;
		}
	}, {
		key: 'resolveActions',
		value: function resolveActions() {
			for (var character in this.characterList) {
				// var iCharacter = this.characterList[character];
				if (this.characterList[character].action.actionType == 'movement') {
					this.characterList[character].position.x += this.characterList[character].stats.movement;
				}
				this.characterList[character].stats.health = 0;
			}
		}
	}, {
		key: 'checkDeath',
		value: function checkDeath() {
			var i = 0;
			for (var character in this.characterList) {
				if (this.characterList[character].stats.health >= 1) {
					i++;
				}
			}
			if (i > 1) {
				return false;
			} else {
				return true;
			}
		}
	}, {
		key: 'initialise',
		value: function initialise() {
			_DeathBlowClient2.default.writeToLog('Initialising game.');
			// Assign player start position
			var i = 10;
			for (var character in this.characterList) {
				this.characterList[character].position.x = i;
				i += 10;
			}
			var gameStep = {};
			gameStep.gameEnd = false;
			gameStep.characters = this.characterList;
			this.gameSteps[0] = gameStep;
		}
	}]);

	return Game;
}();

exports.default = Game;