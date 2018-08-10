const MOVEMENT_ANIMATION_RATIO = 1;

var canvas = document.getElementById('battlefield');
var stage = new createjs.Stage(canvas);

function init() {
	console.log('Init firing');
	console.log('Canvas is : '+canvas);
	console.log('Stage is :'+stage);
	
	//Create a Shape DisplayObject.
	// var rectangle = new createjs.Shape();
	// rectangle.graphics.beginFill('blue').drawRect(190,85,5,10);
	// stage.addChild(rectangle);
	var player1 = new createjs.Shape();
	player1.graphics.beginFill('red').drawRect(0,0,5,10);
	player1.x = 5;
	player1.y = 85;
	player1.name = 'player1';
	stage.addChild(player1);
	stage.update();
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", handleTick);
};

function handleTick(event) {
	// console.log('tick');
	var player1 = stage.getChildByName('player1');
	player1.x += MOVEMENT_ANIMATION_RATIO;
	stage.update();
}