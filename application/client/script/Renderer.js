/*
 * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

// Imports

// Globals

import DeathBlowClient from './DeathBlowClient';

class Renderer {
	constructor(canvas) {
		this.stage = new createjs.Stage(canvas);
		DeathBlowClient.writeToLog('Stage = '+this.stage);
	}
	
	initialRender(data) {
		DeathBlowClient.writeToLog('Initial render');
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
		createjs.Ticker.addEventListener("tick", function() {
			self.stage.update();
		});
	}
	
	renderStep(data) {
		for (var i in data.characters) {
			var iCharacter = new createjs.Shape();
			iCharacter.graphics.beginFill('red').drawRect(0, 0, 5, 10);
			iCharacter.x = data.characters[i].position.x;
			iCharacter.y = data.characters[i].position.y;
			this.stage.addChild(iCharacter);
		}
	}
}

export default Renderer;

