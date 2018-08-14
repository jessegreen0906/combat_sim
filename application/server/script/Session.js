/*
 * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */
import Player from './Player';
import Game from './Game';

import DeathBlowClient from '../../client/script/DeathBlowClient';

class Session {
	
	
	constructor() {
		this.id = "1"; // TODO: Obviously this needs to be better.
		this.playerList = {};
		this.minPlayers = 1;
		this.maxPlayers = 2;
	}
	
	addPlayer(playerData) {
		this.playerList[playerData.name] = new Player(playerData);
		//TODO: Ensure player name is unique.
		DeathBlowClient.writeToLog("Player added: "+this.playerList[playerData.name].name);
	}
	
	fillPlayers() {
		while(Object.keys(this.playerList).length < this.maxPlayers) {
			var player = {};
			player.name = 'bot';
			this.addPlayer(player);
		}
	}
	
	startSession() {
		var characters = {};
		var i = 0;
		for(var i in this.playerList) {
			characters[i] = this.playerList[i].character;
		}
		this.game = new Game(characters);
		this.game.playGame();
	}
	
	
}

export default Session;