/**
 *
 */
function Story () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("Story", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.music = this.add.sound("waterlife",1,true);
	this.music.play();
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"mode");
	this.sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(5000,this.change,this,"m1s1");
	this.time.events.add(15000,this.change,this,"m1s2");
	this.time.events.add(25000,this.change,this,"m1s3");
	this.time.events.add(30000,this.startGame,this);
};
Story.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
};
Story.prototype.startGame = function() {
	
	this.music.stop("waterlife");
	this.game.state.start("Level");
};




