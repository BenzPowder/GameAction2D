/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;
Menu.prototype.preload = function() {
	this.load.pack("Start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.music = this.add.sound("menus",1,true);
	this.music.play();
	this.bg = this.add.sprite(0, 0, "BG");
	{
	}

	// ทำ tap
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY, "tap");
	sprite.anchor.set(0.5, -1);
	sprite.inputEnabled = true;
	sprite.events.onInputDown.add(this.startGame, this);
	// ทำ story
	story_button = this.add.sprite(this.world.centerX, 500, "story_button");
	story_button.anchor.set(2.15, 4);
	story_button.inputEnabled = true;
	story_button.events.onInputDown.add(this.startStory, this);
	// ทำ how
	how = this.add.sprite(this.world.centerX, 500, "how");
	how.anchor.set(-1.25, 4);
	how.inputEnabled = true;
	how.events.onInputDown.add(this.startHow, this);
	this.input.onDown.add(this.startGame, this);

	var logo = this.add.sprite(this.world.centerX, -500, "logo");
	logo.width = 500;
	logo.high = 200;
	logo.anchor.set(0.5, -1.5);
	var twn = this.add.tween(logo);
	twn.to({
		y : 100
	}, 2000, "Bounce", true, 0);

	text = this.add.text(30, this.world.height - 40, "By N.O.V.A Group", {
		fill : 'white'
	});
	text.scale.set(1);

	// ทำ credit
	credit = this.add.sprite(this.world.centerX, 500, "credit");
	credit.anchor.set(0.6, 4);
	credit.inputEnabled = true;
	credit.events.onInputDown.add(this.startCredit, this);
	
};

Menu.prototype.startStory = function() {
	
	this.music.stop();
	this.game.state.start("Story");
};

Menu.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Level3");
};

Menu.prototype.startHow = function() {
	this.music.stop();
	this.game.state.start("How");
};

Menu.prototype.startCredit = function() {
	this.music.stop();
	this.game.state.start("Credit");
};

