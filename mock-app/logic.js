/*
 * Copyright (c) 2018. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

function writeToLog(output, outline) {
	if(outline) {
		$('#combat-log').append('----------------------------');
		$('#combat-log').append('<br />');
	}
	$('#combat-log').append(output);
	$('#combat-log').append('<br />');
	if(outline) {
		$('#combat-log').append('----------------------------');
		$('#combat-log').append('<br />');
	}
}

function startFight() {
	$('#combat-log').html('');
	writeToLog('Initialising players', true);
	var players = initPlayers();
	
	writeToLog('Initialisting player position', true);
	initPosition(players.player1, players.player2);
	
	writeToLog('Combat begins', true);
	var turnCount = 1;
	while (checkDeath(players)) {
		writeToLog('Turn #'+turnCount, true);
		combatDecision(players);
		resolveDecisions(players);
		turnCount++;
	}
	
	writeToLog('Combat ends', true);
	writeToLog('Winner announcement', true);
	var winner = decideResult(players);
	if (winner != null) {
		writeToLog('Winner is: '+winner.name);
	} else {
		writeToLog('End result is a draw');
	}
}
function decideResult(players) {
	var winner = null;
	for(player in players) {
		player = players[player];
		if (player.health <= 0) {
			for(otherPlayer in players) {
				otherPlayer = players[otherPlayer];
				if(otherPlayer != player) {
					if (otherPlayer.health <= 0) {
						winner = null;
						return winner;
					} else {
						winner = otherPlayer;
						return winner;
					}
				}
			}
		}
	}
}

function checkDeath(players) {
	for (player in players) {
		player = players[player];
		if (player.health <= 0) {
			return false;
		}
	}
	return true;
}

function resolveDecisions(players) {
	for (player in players) {
		player = players[player];
		switch(player.action.action) {
			case 'move':
				if(player.location > player.action.target.location) {
					player.location = player.location - player.moveSpeed;
				} else {
					player.location = player.location + player.moveSpeed;
				}
				writeToLog(player.name+' has moved towards '+player.action.target.name, false);
				writeToLog(player.name+' is now '+((player.location - otherPlayer.location)*-1)+' from '+player.action.target.name, false);
				break;
			
			case 'attack':
				player.action.target.health = player.action.target.health - player.damage;
				writeToLog(player.name+' has attacked '+player.action.target.name, false);
				writeToLog(player.action.target.name+'\'s health is now '+player.action.target.health, false);
				break;
		}
	}
}

function combatDecision(players) {
	for (player in players) {
		var playerObj = players[player];
		for (otherPlayer in players) {
			var otherPlayerObj = players[otherPlayer];
			if (playerObj != otherPlayerObj) {
				if(playerObj.location > otherPlayerObj.location) {
					var largeLoc = playerObj.location;
					var smallLoc = otherPlayerObj.location;
				} else {
					var largeLoc = otherPlayerObj.location;
					var smallLoc = playerObj.location;
				}
				if (largeLoc - smallLoc > playerObj.strikeRange) {
					playerObj.action = {
						
						'action': 'move',
						'target': otherPlayerObj
					};
				} else {
					playerObj.action = {
						'action': 'attack',
						'target': otherPlayerObj
					}
				}
			}
		}
	}
}

function initPosition(player1, player2) {
	player1.location = 0;
	player2.location = 100;
}

function initPlayers() {
	var player1Template = $('input[name="player1"]:checked').val() || '';
	var player2Template = $('input[name="player2"]:checked').val() || '';
	
	writeToLog('Player 1 template: '+player1Template, false);
	var player1 = initPlayer(player1Template);
	player1.name = $('input#player1').val();
	
	writeToLog('', false);
	var statsTable = 'Player 1 stats: <br /><table><tbody>';
	statsTable += '<tr><td>Name</td><td>'+player1.name+'</td></tr>';
	statsTable += '<tr><td>Health</td><td>'+player1.health+'</td></tr>';
	statsTable += '<tr><td>Damage</td><td>'+player1.damage+'</td></tr>';
	statsTable += '<tr><td>Move speed</td><td>'+player1.moveSpeed+'</td></tr>';
	statsTable += '<tr><td>Strike range</td><td>'+player1.strikeRange+'</td></tr>';
	statsTable += '</tbody></table>';
	
	writeToLog(statsTable, false);
	
	writeToLog('Player 2 template: '+player2Template, false);
	var player2 = initPlayer(player2Template);
	player2.name = $('input#player2').val();
	
	statsTable = 'Player 2 stats: <br /><table><tbody>';
	statsTable += '<tr><td>Name</td><td>'+player2.name+'</td></tr>';
	statsTable += '<tr><td>Health</td><td>'+player2.health+'</td></tr>';
	statsTable += '<tr><td>Damage</td><td>'+player2.damage+'</td></tr>';
	statsTable += '<tr><td>Move speed</td><td>'+player2.moveSpeed+'</td></tr>';
	statsTable += '<tr><td>Strike range</td><td>'+player2.strikeRange+'</td></tr>';
	statsTable += '</tbody></table>';
	
	writeToLog(statsTable, false);
	
	return {
		'player1': player1,
		'player2': player2
	};
	
}

function initPlayer(template) {
	var basic = {
		'name': '',
		'health': 100,
		'moveSpeed': 10,
		'damage': 20,
		'strikeRange': 100
	};
	var ranged = {
		'strikeRange':100,
		'health':50,
		'moveSpeed':0,
		'damage':10
	};
	
	var tank = {
		'strikeRange':5,
		'health':200,
		'moveSpeed':10,
		'damage':20
	};
	
	var melee = {
		'strikeRange': 5,
		'health':100,
		'moveSpeed':10,
		'damage':50
	};
	
	switch (template) {
		case 'ranged':
			return ranged;
			break;
		case 'tank':
			return tank;
			break;
		case 'melee':
			return melee;
			break;
		default:
			return basic;
			break;
	}
	
}