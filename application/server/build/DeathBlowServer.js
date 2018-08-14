'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _DeathBlowClient = require('../../client/build/DeathBlowClient');

var _DeathBlowClient2 = _interopRequireDefault(_DeathBlowClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeathBlowServer = function () {
	function DeathBlowServer() {
		_classCallCheck(this, DeathBlowServer);

		this.sessionList = {};
	}

	_createClass(DeathBlowServer, [{
		key: 'createSession',
		value: function createSession() {
			var session = new _Session2.default();

			this.sessionList[session.id] = session;

			_DeathBlowClient2.default.writeToLog('Server session created');
			return session.id;
		}
	}, {
		key: 'startSession',
		value: function startSession(sessionId) {
			_DeathBlowClient2.default.writeToLog('Starting session');
			this.sessionList[sessionId].fillPlayers();
			this.sessionList[sessionId].startSession();
		}
	}, {
		key: 'addPlayer',
		value: function addPlayer(name, sessionId) {
			var player = {};
			player.name = name;
			this.sessionList[sessionId].addPlayer(player);
		}
	}, {
		key: 'getGameStep',
		value: function getGameStep(sessionId, stepId) {
			var step = {};
			var i = 0;
			while (Object.keys(step).length <= 0) {
				step = this.sessionList[sessionId].game.getGameStep(stepId);
				i++;
				if (i > 500) {
					step = { "gameEnded": true };
				}
			}
			return step;
		}
	}], [{
		key: 'createSession',
		value: function createSession() {
			var session = new _Session2.default();
			this.sessionList.push(session);

			_DeathBlowClient2.default.writeToLog('Server session created');
			return true;
		}
	}]);

	return DeathBlowServer;
}();

exports.default = DeathBlowServer;