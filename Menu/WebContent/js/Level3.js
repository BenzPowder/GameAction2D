/**
 * 
 */
function Level3() {
	Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level3.prototype = proto;
Level3.prototype.create = function() {
	this.music = this.add.sound("map3", 1, true);
	this.music.play();
	// เริ่มใช้Physic Engine ARCADE
	// ใช้ส ำหรับตรวจสอบกำรชน และ กำรเคลื่อนที่
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

	this.bg = this.game.add.sprite(0, 0, "3");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("ST3.1");
	this.map.addTilesetImage('mapCity');
	this.map.addTilesetImage('map_sheet');
	this.map_layer = this.map.createLayer("Tile Layer 1");
	this.map_layer = this.map.createLayer("Tile Layer 2");
	this.map_layer = this.map.createLayer("Tile Layer 3");
	this.map_layer = this.map.createLayer("Tile Layer 4");
	this.map_layer = this.map.createLayer("Tile Layer 1");
	
	this.game.score = 0; //เหรียญ
	this.game.score1 =0;
	this.scoretext=this.add.text(this.camera.width/1.3,0,'Coin :'+this.game.score,{font:'50px arial;',fill:'red'}); //เหรียญ
	this.scoretext.fixedToCamera = true; //เหรียญ
	this.scoretext1=this.add.text(this.game.camera.hight/1.3,0,'Score Kills :'+this.game.score1,{font:'50px arial;',fill:'blue'});
	this.scoretext1.fixedToCamera = true;

	// ปรับขนำด world ให้กว้ำง เท่ำกับ ขนำดของ map
	this.map_layer.resizeWorld();
	// ก ำหนดให้ tile id 0 ถึง 17 เป็นตัวที่จะใช้ตัวสอบกำรชน
	this.map.setCollisionBetween(0, 32, true, this.map_layer);

	// แสดง sprite
	this.enemies = this.add.group();
	this.goal = this.add.group();
	this.Coin = this.add.group(); //เหรียญ
	
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
		} else if (obj.type == "Coin") { //เหรียญ
			var c = this.addCoin(obj.x, obj.y); //เหรียญ
			this.Coin.add(c); //เหรียญ
			w.width = 128; //เหรียญ
			w.height = 128; //เหรียญ
		} //เหรียญ
	}
	
	
	this.createWeapon();
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR,
			Phaser.Keyboard.DOWN ]);
	this.player.inputEnabled = true;
	this.player.events.onInputDown.add(this.fireWeapon, this);
};

Level3.prototype.hitEnemy = function(p, x) {
	this.music.stop();
	this.game.state.start("Level3");
};

Level3.prototype.hitgoal = function(p, x) {
	this.music.stop();
	this.music = this.add.sound("check2", 1, false);
	this.music.play();
	this.game.state.start("Story4");
};

Level3.prototype.hitCoin = function(p, x) { //เหรียญ
	this.scoin = this.add.audio("scoin",1,false);
	x.kill();

	if(x.kill() !=false){
	this.scoin.play();
	
	}
	
	this.game.score++;
	this.scoretext.text = 'Coin :'+this.game.score;
	return true;
};


Level3.prototype.addCoin = function (x, y) { //เหรียญ
	c = this.add.sprite(x, y, "coins");
	c.anchor.set(0,2);
	c.scale.set(0.05);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	//c.play("coins");
	return c;
};

Level3.prototype.createWeapon = function() {
	this.weapon = this.add.weapon(1, "armor3");
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.trackSprite(this.player, 60, -160);
	this.weapon.bulletSpeed = 2000;
	this.weapon.fireAngle = -7;
	this.weapon.rate = 0;

};

Level3.prototype.fireWeapon = function() {
	this.weapon.fire();
};

Level3.prototype.update = function() {
	this.game.physics.arcade.collide(this.player, this.map_layer);
	this.game.physics.arcade.collide(this.enemies, this.map_layer);
	this.game.physics.arcade.collide(this.goal, this.map_layer);
	this.game.physics.arcade.collide(this.Coin, this.map_layer); //เหรียญ
	this.game.physics.arcade.collide(this.enemies, this.weapon.bullets,
			this.onCollide, null, this);
	this.game.physics.arcade.collide(this.player, this.Coin, this.hitCoin, //เหรียญ
			null, this);
	this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy,
			null, this);
	this.game.physics.arcade.collide(this.player, this.goal, this.hitgoal,
			null, this);

	if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.player.body.velocity.x = -200;
		this.player.scale.x = -1;
		this.player.play("Walk");
		this.weapon.trackSprite(this.player, -60, -160);
		this.weapon.fireAngle = 180;
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.player.body.velocity.x = 200;
		this.player.scale.x = 1;
		this.player.play("Walk");
		this.weapon.trackSprite(this.player, 60, -160);
		this.weapon.fireAngle = -7;
	}

	if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		if (this.player.body.velocity.y == 0)
			this.player.body.velocity.y = -650;
		// this.music = this.add.sound("jump", 1, false);
		// this.music.play();

	}
	if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.fireWeapon();
		this.player.play("Shoot");
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		// this.player.body.acceleration.y = 120;
	} else {
		// this.player.body.velocity.setTo(0, 0);
		// this.player.body.acceleration.setTo(0, 0);
		if (this.player.body.velocity.x == 0)
			this.player.play("Idle");
	}
};

Level3.prototype.onCollide = function(enemies, armor3) {
	this.explosion = this.add.audio("explosion",1,false);
	enemies.kill();

	if(enemies.kill() !=false){
	this.explosion.play();
	}
	bomb = this.add.sprite(enemies.x,enemies.y,"Boom");
	bomb.anchor.set(0.7,1.4);
	bomb.animations.add("all").play(12,false,true);
	armor3.kill();
	this.game.score1++;
	this.scoretext1.text = 'Score Kills :'+this.game.score1;
	
	return true;
};

function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}

Level3.prototype.addPlayer = function(x, y) {
	var t = this.add.sprite(x, y, "glory");
	t.animations.add("Idle", gframes("idle", 11), 12, true);
	t.animations.add("Jump", gframes("jump", 10), 12, true);
	t.animations.add("Shoot", gframes("shoot", 09), 12, true);
	t.animations.add("Walk", gframes("walk", 11), 12, true);
	t.anchor.set(0, 2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("Idle");
	t.body.collideWorldBounds = true;
	// this.game.physics.enable(t);
	t.body.drag.setTo(500, 0);
	// แก้การชน
	t.body.setSize(50, 90, 10, 10);
	// 10=ข้างหน้า , 120=พื้น , 80=หลัง
	// t.body.collideWorldBounds = true;
	return t;
};

function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}

Level3.prototype.addCat = function(x, y) {
	var c = this.add.sprite(x, y, "gos");
	c.animations.add("Idle", gframes("idle", 11), 12, true);
	c.animations.add("Walk", gframes("walk", 11), 12, true);
	c.anchor.set(0, 2);
	(c.scale.x = -1);
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

};

Level3.prototype.addDog = function(x, y) {
	var c = this.add.sprite(x, y, "gos2");
	c.animations.add("Idle", gframes("idle", 11), 12, true);
	// c.animations.add("Walk", gframes("walk", 11), 12, true);
	c.anchor.set(0, 2);
	c.scale.x = -1;
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
};

Level3.prototype.addgoal = function(x, y) {
	w = this.add.sprite(x, y, "warp");
	w.anchor.set(0, 2);
	// w.smoothed = false;
	// enable physic
	this.game.physics.enable(w);
	// w.play("Idle");
	w.body.collideWorldBounds = true;
	return w;
};
