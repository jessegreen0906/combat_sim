"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function () {
	function Character() {
		_classCallCheck(this, Character);

		this.startingPosition = 0;
		this.stats = {
			"health": 100,
			"movement": 10,
			"damage": 10,
			"range": 5,
			"luck": 1,
			"accuracy": 100,
			"evasion": 10
		};
		this.position = {
			"x": 0,
			"y": 0
		};
		this.statuses = {};
		this.action = {
			"actionType": "none"
		};
	}

	_createClass(Character, [{
		key: "setStartingPosition",
		value: function setStartingPosition(pos) {
			this.startingPosition = pos;
		}
	}]);

	return Character;
}();

exports.default = Character;