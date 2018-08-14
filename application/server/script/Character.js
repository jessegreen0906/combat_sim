class Character {
	constructor() {
		this.startingPosition = 0;
		this.stats={
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
		this.statuses={
		};
		this.action={
			"actionType": "none"
		};
	}
	
	setStartingPosition(pos) {
		this.startingPosition = pos;
	}
}
export default Character;