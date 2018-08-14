'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// Imports

// Globals

var _DeathBlowClient = require('./DeathBlowClient');

var _DeathBlowClient2 = _interopRequireDefault(_DeathBlowClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
	function Renderer(canvas) {
		_classCallCheck(this, Renderer);

		this.stage = new createjs.Stage(canvas);
		_DeathBlowClient2.default.writeToLog('Stage = ' + this.stage);
	}

	_createClass(Renderer, [{
		key: 'initialRender',
		value: function initialRender(data) {
			_DeathBlowClient2.default.writeToLog('Initial render');
			this.characterCollection = {};
			var stage = this.stage;
			for (var i in data.characters) {
				var iCharacter = new createjs.Shape();
				iCharacter.graphics.beginFill('red').drawRect(0, 0, 5, 10);
				iCharacter.x = data.characters[i].position.x;
				iCharacter.y = data.characters[i].position.y;
				stage.addChild(iCharacter);
			}
			this.stage.update();
			var self = this;

			createjs.Ticker.framerate = 60;
			createjs.Ticker.addEventListener("tick", function () {
				self.stage.update();
			});
		}
	}, {
		key: 'renderStep',
		value: function renderStep(data) {
			for (var i in data.characters) {
				var iCharacter = new createjs.Shape();
				iCharacter.graphics.beginFill('red').drawRect(0, 0, 5, 10);
				iCharacter.x = data.characters[i].position.x;
				iCharacter.y = data.characters[i].position.y;
				this.stage.addChild(iCharacter);
			}
		}
	}]);

	return Renderer;
}();

exports.default = Renderer;