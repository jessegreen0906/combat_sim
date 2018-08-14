import Character from './Character';
import DeathBlowClient from '../../client/script/DeathBlowClient';

class Game {
	constructor(characters) {
		DeathBlowClient.writeToLog('Game started');
		this.characterList = characters;
		this.gameSteps = {};
	}
	
	getGameStep(stepId) {
		if(Object.keys(this.gameSteps).length > stepId) {
			return this.gameSteps[stepId];
		} else {
			return null;
		}
	}
	
	playGame() {
		this.initialise();
		var gameEnded = false;
		var i = 1;
		while(!gameEnded) {
			this.gameSteps[i] = this.decisionLoop();
			gameEnded = this.gameSteps[i].gameEnd;
			i++;
			
			if(i>=500) {
				gameEnded == true;
			}
		}
	}
	
	decisionLoop() {
		var endGame = this.checkDeath();
		var step = {};
		step.gameEnd = endGame;
		step.characters = {};
		for(var character in this.characterList) {
			if(!endGame) {
				this.makeDecision(this.characterList[character]);
			} else {
				this.characterList[character].action.actionType = 'none';
			}
		}
		this.resolveActions();
		for(var character in this.characterList) {
			var characterString = JSON.stringify(this.characterList[character]);
			step.characters[character] = JSON.parse(characterString);
		}
		
		
		return step;
	}
	
	makeDecision(character) {
		character.action.actionType = 'movement';
		// character.action.movement = 5;
		
	}
	
	resolveActions() {
		for(var character in this.characterList) {
			// var iCharacter = this.characterList[character];
			if (this.characterList[character].action.actionType == 'movement') {
				this.characterList[character].position.x += this.characterList[character].stats.movement;
			}
			this.characterList[character].stats.health = 0;
		}
	}
	
	checkDeath() {
		var i = 0;
		for(var character in this.characterList) {
			if(this.characterList[character].stats.health >= 1) {
				i++;
			}
		}
		if(i>1) {
			return false;
		} else {
			return true;
		}
	}
	
	initialise() {
		DeathBlowClient.writeToLog('Initialising game.');
		// Assign player start position
		var i = 10;
		for(var character in this.characterList) {
			this.characterList[character].position.x = i;
			i+=10;
		}
		var gameStep = {};
		gameStep.gameEnd = false;
		gameStep.characters = this.characterList;
		this.gameSteps[0] = gameStep;
	}
	
}
export default Game;