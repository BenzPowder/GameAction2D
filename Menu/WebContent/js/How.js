/**
 *
 */
function How () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
How.prototype = proto;

How.prototype.preload = function() {
	this.load.pack("How", "assets/assets-pack.json");
};

How.prototype.create = function() {
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"HowTo");
	this.sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
//	this.time.events.add(10000,this.change,this,"water");
//	this.time.events.add(20000,this.change,this,"3");
//	this.time.events.add(27000,this.change,this,"4");
//	this.time.events.add(40000,this.change,this,"5");
//	this.time.events.add(55000,this.change,this,"6");
//	this.time.events.add(63000,this.change,this,"7");
//	this.time.events.add(73000,this.change,this,"8");
//	this.time.events.add(83000,this.change,this,"9");
//	this.time.events.add(93000,this.change,this,"10");
	this.time.events.add(103000,this.startGame,this);
};
How.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
};
How.prototype.startGame = function() {
	this.game.state.start("Menu");
};




