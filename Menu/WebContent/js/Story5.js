/**
 *
 */
function Story5 () {
	Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story5.prototype = proto;

Story5.prototype.preload = function() {
	this.load.pack("Story", "assets/assets-pack.json");
};

Story5.prototype.create = function() {
	this.music = this.add.sound("theafter",1,true);
	this.music.play();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"m5s1");
	this.sprite.anchor.set(0.8, 0.8);
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(5000,this.change,this,"m5s2");
	this.time.events.add(10000,this.change,this,"m5s3");
	this.time.events.add(15000,this.change,this,"m5s4");
	this.time.events.add(20000,this.change,this,"m5s5");
	this.time.events.add(27000,this.change,this,"m5s6");
	//this.time.events.add(63000,this.change,this,"m5s6");
/*	this.time.events.add(5000,this.change,this,"1");
	this.time.events.add(15000,this.change,this,"2");
	this.time.events.add(27000,this.change,this,"3");
	this.time.events.add(40000,this.change,this,"4");
	this.time.events.add(55000,this.change,this,"5");
	this.time.events.add(63000,this.change,this,"6");
	this.time.events.add(73000,this.change,this,"7");
	this.time.events.add(83000,this.change,this,"8");
	this.time.events.add(93000,this.change,this,"9");
	this.time.events.add(103000,this.change,this,"10");*/
	this.time.events.add(30000,this.startGame,this);
};
Story5.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
	this.sprite.anchor.set(0.8, 0.8);
};
Story5.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Menu2");
};

