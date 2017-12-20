/**
 * 
 */
function Story2() {
	Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story2.prototype = proto;
Story2.prototype.preload = function() {
	this.load.pack("Story", "assets/assets-pack.json");
};

Story2.prototype.create = function() {
	this.music = this.add.sound("theforest",1,true);
	this.music.play();

	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"m2s1");
	this.sprite.anchor.set(0.8, 0.8);
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(10000,this.change,this,"m2s2");
	this.time.events.add(23000, this.startGame, this);
};
Story2.prototype.change = function(k) {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, k);
	this.sprite.anchor.set(0.8, 0.8);
};
Story2.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Level2");
};
