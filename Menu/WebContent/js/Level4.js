/**
 * 
 */
function Level4() {
	Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level4.prototype = proto;
Level4.prototype.create = function() {
	this.music = this.add.sound("map41", 1, true);
	this.music.play();
	// เริ่มใช้Physic Engine ARCADE
	// ใช้ส ำหรับตรวจสอบกำรชน และ กำรเคลื่อนที่
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

	this.bg = this.game.add.sprite(0, 0, "4");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("past4");
	this.map.addTilesetImage('Graves');
	this.map_layer = this.map.createLayer("Tile Layer 1");

	// ปรับขนำด world ให้กว้ำง เท่ำกับ ขนำดของ map
	this.map_layer.resizeWorld();
	// ก ำหนดให้ tile id 0 ถึง 17 เป็นตัวที่จะใช้ตัวสอบกำรชน
	this.map.setCollisionBetween(0, 32, true, this.map_layer);

	// แสดง sprite
	this.enemies = this.add.group();
	this.goal = this.add.group();

	for (x in this.map.objects.object) {
		var obj = this.map.objects.object[x];
		if (obj.type == "player") {
			// console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("Walk");
			console.log(this.player);
		} else if (obj.type == "enemy1") {
			var c = this.addCat(obj.x, obj.y);
			this.enemies.add(c);
		} else if (obj.type == "enemy2") {
			var c = this.addDog(obj.x, obj.y);
			this.enemies.add(c);
		} else if (obj.type == "goal") {
			var w = this.addgoal(obj.x, obj.y);
			this.goal.add(w);
			w.width = 128;
			w.height = 128;
		}
	}
};

Level4.prototype.hitEnemy = function(p, x) {
	this.music.stop();
	this.game.state.start("Story5");
};

Level4.prototype.hitgoal = function(p, x) {
	this.music.stop();
	this.game.state.start("Story5");
};

Level4.prototype.update = function() {
	this.game.physics.arcade.collide(this.player, this.map_layer);
	this.game.physics.arcade.collide(this.enemies, this.map_layer);
	this.game.physics.arcade.collide(this.goal, this.map_layer);
	this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy,
			null, this);
	this.game.physics.arcade.collide(this.player, this.goal, this.hitgoal,
			null, this);

	if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.player.body.velocity.x = -200;
		this.player.scale.x = -1;
		this.player.play("Walk");
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.player.body.velocity.x = 200;
		this.player.scale.x = 1;
		this.player.play("Walk");
	}

	if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		if (this.player.body.velocity.y == 0)
			this.player.body.velocity.y = -650;
//		this.music = this.add.sound("jump");
//		this.music.play();
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		// this.player.body.acceleration.y = 120;
	} else {
		// this.player.body.velocity.setTo(0, 0);
		// this.player.body.acceleration.setTo(0, 0);
		if (this.player.body.velocity.x == 0)
			this.player.play("Idle");
	}
	if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.player.play("Shoot");
	}
};

function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}

Level4.prototype.addPlayer = function(x, y) {
	var t = this.add.sprite(x, y, "glory");
	t.animations.add("Idle", gframes("idle", 11), 12, true);
	t.animations.add("Jump", gframes("jump", 10), 12, true);
	t.animations.add("Shoot", gframes("shoot", 09), 12, true);
	t.animations.add("Walk", gframes("walk", 11), 12, true);
	t.anchor.set(0, 2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("Idle");
	t.body.collideWorldBounds = false;
	// this.game.physics.enable(t);
	t.body.drag.setTo(500, 0);
	// แก้การชน
	t.body.setSize(50, 90, 10, 10);
	// 10=ข้างหน้า , 120=พื้น , 80=หลัง
	// t.body.collideWorldBounds = true;
	return t;

	j.anchor.set(0, 1);
	j.smoothed = false;
	this.game.physics.arcade.enable(j);
	j.play("Idle");
	j.body.collideWorldBounds = false;
	j.body.drag.setTo(500, 0);
	j.body.setSize(20, 60, 5, 0);
	return j;
};

function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}

Level4.prototype.addCat = function(x, y) {
	var c = this.add.sprite(x, y, "monster");
	c.animations.add("Idle", gframes("idle", 11), 12, true);
	// c.animations.add("Walk", gframes("walk", 11), 12, true);
	c.anchor.set(0, 2);
	c.scale.x = -1;

	c.smoothed = false;
	this.game.physics.arcade.enable(c);
	c.play("Walk");
	c.body.collideWorldBounds = false;
	// this.game.physics.enable(t);
	c.body.drag.setTo(500, 0);
	// แก้การชน
	c.body.setSize(50, 110, 10, 10);
	// 10=ข้างหน้า , 120=พื้น , 80=หลัง
	// t.body.collideWorldBounds = true;
	return c;

	j.anchor.set(0, 1);
	j.smoothed = false;
	this.game.physics.arcade.enable(j);
	j.play("Walk");
	j.body.collideWorldBounds = false;
	j.body.drag.setTo(500, 0);
	j.body.setSize(20, 60, 5, 0);
	return j;
};

Level4.prototype.addDog = function(x, y) {
	var c = this.add.sprite(x, y, "monster");
	c.animations.add("Idle", gframes("idle", 11), 12, true);
	// c.animations.add("Walk", gframes("walk", 11), 12, true);
	c.anchor.set(0, 2);
	c.scale.x = -1;
	/*
	 * var twn = this.add.tween(c); twn.to({ x : 0.3, x : -0.3 }, 15000,
	 * "Linear", true, 0);
	 */
	c.smoothed = false;
	this.game.physics.arcade.enable(c);
	c.play("Idle");
	c.body.collideWorldBounds = false;
	// this.game.physics.enable(t);
	c.body.drag.setTo(500, 0);
	// แก้การชน
	c.body.setSize(50, 40, 10, 10);
	// 10=ข้างหน้า , 120=พื้น , 80=หลัง
	// t.body.collideWorldBounds = true;
	return c;

	j.anchor.set(0, 1);
	j.smoothed = false;
	this.game.physics.arcade.enable(j);
	j.play("Idle");
	j.body.collideWorldBounds = false;
	j.body.drag.setTo(500, 0);
	j.body.setSize(20, 60, 5, 0);
	return j;
};

Level4.prototype.addgoal = function(x, y) {
	w = this.add.sprite(x, y, "warp3");
	w.anchor.set(0, 2);
	// w.smoothed = false;
	// enable physic
	this.game.physics.enable(w);
	// w.play("Idle");
	w.body.collideWorldBounds = true;
	return w;
};
