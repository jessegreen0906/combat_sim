'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _DeathBlowClient = require('../../client/script/DeathBlowClient');

var _DeathBlowClient2 = _interopRequireDefault(_DeathBlowClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
	function Session() {
		_classCallCheck(this, Session);

		this.id = "1"; // TODO: Obviously this needs to be better.
		this.playerList = {};
		this.minPlayers = 1;
		this.maxPlayers = 2;
	}

	_createClass(Session, [{
		key: 'addPlayer',
		value: function addPlayer(playerData) {
			this.playerList[playerData.name] = new _Player2.default(playerData);
			//TODO: Ensure player name is unique.
			_DeathBlowClient2.default.writeToLog("Player added: " + this.playerList[playerData.name].name);
		}
	}, {
		key: 'fillPlayers',
		value: function fillPlayers() {
			while (Object.keys(this.playerList).length < this.maxPlayers) {
				var player = {};
				player.name = 'bot';
				this.addPlayer(player);
			}
		}
	}, {
		key: 'startSession',
		value: function startSession() {
			var characters = {};
			var i = 0;
			for (var i in this.playerList) {
				characters[i] = this.playerList[i].character;
			}
			this.game = new _Game2.default(characters);
			this.game.playGame();
		}
	}]);

	return Session;
}();

exports.default = Session;