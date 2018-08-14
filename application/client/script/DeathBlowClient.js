/*
 * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

// Client side application for Death Blow game.

// Imports
import Renderer from "./Renderer";
import DeathBlowServer from '../../server/build/DeathBlowServer';

// Global variables
let debugMode = true;

class DeathBlowClient {
	constructor () {
		if (debugMode) {
			DeathBlowClient.writeToLog('Debug mode enabled', true);
		}
		
		DeathBlowClient.writeToLog('Death Blow client starting');
		
		// Initialise session with server
		// TODO: Mocking this for now. In the future, turn this into a full server implentation.
		this.dBS = new DeathBlowServer;
		this.sessionId = this.dBS.createSession();
		
		DeathBlowClient.writeToLog('Session ID: '+this.sessionId);
		
		this.dBS.addPlayer('Player 1', this.sessionId);
		
		
		// Initialise Renderer
		if($(document.getElementById('battleground')) != null) {
			this.renderer = new Renderer('battleground');
			DeathBlowClient.writeToLog('Renderer initialised');
		} else {
			DeathBlowClient.writeToError('No canvas found');
		}
		
		this.dBS.startSession(this.sessionId);
		
		var endGame = false;
		var step = 0;
		var stepData;
		
		while(!endGame) {
			DeathBlowClient.writeToLog('Attempting to retrieve game step #'+step);
			stepData = this.dBS.getGameStep(this.sessionId, step);
			if(step == 0) {
				this.renderer.initialRender(stepData);
			} else {
				this.renderer.renderStep(stepData);
			}
			step++;
			endGame = stepData.gameEnd;
		}
		
		DeathBlowClient.writeToLog('Game ending');
	}
	
	static writeToError(output) {
		DeathBlowClient.writeToLog('ERROR: '+output, false);
	}
	
	static writeToLog(output) {
		DeathBlowClient.writeToLog(output, false);
	}
	
	static writeToLog(output, outline) {
		var log = $('.debug-log');
		if(outline) {
			log.append('----------------------------');
			log.append('<br />');
		}
		log.append(output);
		log.append('<br />');
		if(outline) {
			log.append('----------------------------');
			log.append('<br />');
		}
	}
}

export default DeathBlowClient;
