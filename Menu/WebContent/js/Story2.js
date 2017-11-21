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
	this.sprite.anchor.set(1.35, 0.8);
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(10000,this.change,this,"m2s2");
	//this.time.events.add(15000,this.change,this,"m2s2");
	/*
	 * this.time.events.add(5000,this.change,this,"1");
	 * this.time.events.add(15000,this.change,this,"2");
	 * this.time.events.add(27000,this.change,this,"3");
	 * this.time.events.add(40000,this.change,this,"4");
	 * this.time.events.add(55000,this.change,this,"5");
	 * this.time.events.add(63000,this.change,this,"6");
	 * this.time.events.add(73000,this.change,this,"7");
	 * this.time.events.add(83000,this.change,this,"8");
	 * this.time.events.add(93000,this.change,this,"9");
	 * this.time.events.add(103000,this.change,this,"10");
	 */
	this.time.events.add(23000, this.startGame, this);
};
Story2.prototype.change = function(k) {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, k);
	this.sprite.anchor.set(1.3, 0.8);
};
Story2.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Level2");
};
