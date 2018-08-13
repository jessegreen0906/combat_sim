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
		this.dBS.createSession();
		
		
		// Initialise Renderer
		if($(document.getElementById('battleground')) != null) {
			this.renderer = new Renderer('battleground');
			DeathBlowClient.writeToLog('Renderer initialised');
		} else {
			DeathBlowClient.writeToError('No canvas found');
		}
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
