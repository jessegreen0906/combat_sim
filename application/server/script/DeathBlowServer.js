/*
 * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

import Session from './Session';
import DeathBlowClient from '../../client/build/DeathBlowClient';

class DeathBlowServer {
	constructor() {
		this.sessionList = {};
	}
	
	createSession () {
		var session = new Session();
		
		this.sessionList[session.id] = session;
		
		DeathBlowClient.writeToLog('Server session created');
		return session.id;
	}
	
	startSession (sessionId) {
		DeathBlowClient.writeToLog('Starting session');
		this.sessionList[sessionId].fillPlayers();
		this.sessionList[sessionId].startSession();
	}
	
	addPlayer (name, sessionId) {
		var player = {};
		player.name = name;
		this.sessionList[sessionId].addPlayer(player);
	}
	
	getGameStep (sessionId, stepId) {
		var step = {};
		var i = 0;
		while(Object.keys(step).length <= 0) {
			step = this.sessionList[sessionId].game.getGameStep(stepId);
			i++;
			if (i > 500) {
				step = {"gameEnded":true};
			}
		}
		return step;
	}
	
	static createSession() {
		var session = new Session();
		this.sessionList.push(session);
		
		DeathBlowClient.writeToLog('Server session created');
		return true;
	}
	
}

export default DeathBlowServer;