window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1200, 800, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Menu2", Menu2);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("Story2", Story2);
	game.state.add("Story3", Story3);
	game.state.add("Story4", Story4); 
	game.state.add("Story45", Story45);
	game.state.add("Story5", Story5);
	game.state.add("How", How);
	game.state.add("Credit", Credit);
	game.state.add("Story", Story);
	game.state.add("Level2", Level2);
	game.state.add("Level3", Level3);
	game.state.add("Level4", Level4);
	

	// Now start the Boot state.
	game.state.start("Boot");
};
