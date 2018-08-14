'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Client side application for Death Blow game.

// Imports


var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _DeathBlowServer = require('../../server/build/DeathBlowServer');

var _DeathBlowServer2 = _interopRequireDefault(_DeathBlowServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Global variables
var debugMode = true;

var DeathBlowClient = function () {
	function DeathBlowClient() {
		_classCallCheck(this, DeathBlowClient);

		if (debugMode) {
			DeathBlowClient.writeToLog('Debug mode enabled', true);
		}

		DeathBlowClient.writeToLog('Death Blow client starting');

		// Initialise session with server
		// TODO: Mocking this for now. In the future, turn this into a full server implentation.
		this.dBS = new _DeathBlowServer2.default();
		this.sessionId = this.dBS.createSession();

		DeathBlowClient.writeToLog('Session ID: ' + this.sessionId);

		this.dBS.addPlayer('Player 1', this.sessionId);

		// Initialise Renderer
		if ($(document.getElementById('battleground')) != null) {
			this.renderer = new _Renderer2.default('battleground');
			DeathBlowClient.writeToLog('Renderer initialised');
		} else {
			DeathBlowClient.writeToError('No canvas found');
		}

		this.dBS.startSession(this.sessionId);

		var endGame = false;
		var step = 0;
		var stepData;

		while (!endGame) {
			DeathBlowClient.writeToLog('Attempting to retrieve game step #' + step);
			stepData = this.dBS.getGameStep(this.sessionId, step);
			if (step == 0) {
				this.renderer.initialRender(stepData);
			} else {
				this.renderer.renderStep(stepData);
			}
			step++;
			endGame = stepData.gameEnd;
		}

		DeathBlowClient.writeToLog('Game ending');
	}

	_createClass(DeathBlowClient, null, [{
		key: 'writeToError',
		value: function writeToError(output) {
			DeathBlowClient.writeToLog('ERROR: ' + output, false);
		}
	}, {
		key: 'writeToLog',
		value: function writeToLog(output) {
			DeathBlowClient.writeToLog(output, false);
		}
	}, {
		key: 'writeToLog',
		value: function writeToLog(output, outline) {
			var log = $('.debug-log');
			if (outline) {
				log.append('----------------------------');
				log.append('<br />');
			}
			log.append(output);
			log.append('<br />');
			if (outline) {
				log.append('----------------------------');
				log.append('<br />');
			}
		}
	}]);

	return DeathBlowClient;
}();

exports.default = DeathBlowClient;