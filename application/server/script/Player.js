import Character from './Character';

class Player {
	constructor(playerData) {
		this.name = playerData.name;
		this.character = new Character();
	}
	
	getCharacter() {
		return this.character;
	}
	
}

export default Player;