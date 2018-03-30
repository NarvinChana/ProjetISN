var gameWidth = window.innerWidth,
    gameHeight = window.innerHeight;

//Des alias qui permettent de raccourcir le code
var Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

//Création du canvas
var app = new Application({
    width: gameWidth,
    height: gameHeight,
    antialias: true
});

document.getElementById("jeu").appendChild(app.view);


//variables qui seront utilisé dans plusieurs fonctions
var state;
var introScene, menuScene, gameScene;
var buttons_texture = [];
var play, play_button, options_button, quit_button;
var button_container, showName;
var text, profileName = " ", validValue;
var bg, title;
var ship;
app.renderer.autoResize = true;

//chargement des images de base pour affficher l'écran de chargement
loader
    .add("lib/main menu/background.png")
    .add("lib/main menu/title.png")
    .add("lib/main menu/loadingFrame.png")
    .add("lib/main menu/unloaded.png")
    .add("lib/main menu/loaded.png")
    .load(preloading)

// fonction de "preload" ==> ecran de chargement
function preloading() {

    bg = new Sprite(resources["lib/main menu/background.png"].texture);
    bg.width = gameWidth;
    bg.height = gameHeight;

    title = new Sprite(resources["lib/main menu/title.png"].texture);
    title.width = gameWidth * 70 / 100;
    title.height = gameHeight * 20 / 100;
    title.x = gameWidth / 2 - title.width / 2;
    title.y = 7 / 100 * gameHeight;

    loadFrame = new Sprite(resources["lib/main menu/loadingFrame.png"].texture);
    loadFrame.width = gameWidth * 80 / 100;
    loadFrame.height = loadFrame.width / 7.5;
    loadFrame.x = gameWidth / 2 - loadFrame.width / 2;
    loadFrame.y = 75 / 100 * gameHeight;

    unloaded = new Sprite(resources["lib/main menu/unloaded.png"].texture);
    unloaded.width = gameWidth * 80 / 100;
    unloaded.height = unloaded.width / 7.5;
    unloaded.x = gameWidth / 2 - unloaded.width / 2;
    unloaded.y = 75 / 100 * gameHeight;

    loaded = new Sprite(resources["lib/main menu/loaded.png"].texture);
    loaded.width = gameWidth * 80 / 100;
    loaded.height = loaded.width / 7.5;
    loaded.x = gameWidth / 2 - loaded.width / 2;
    loaded.y = 75 / 100 * gameHeight;

    load_container = new Container();
    load_container.addChild(loaded, unloaded, loadFrame);
    app.stage.addChild(load_container, bg, title);

	
    //lancement du chargement des ressources du jeu et des menus
    //après le preloading 
    load();

}
//Chargement tilesets et images du jeu : Fond, boutons, effets, animations, personnages, vaisseaux etc...
function load() {
    loader
        .add('play button', "lib/main menu/buttons/play.png")
        .add('play hover button', "lib/main menu/buttons/play_hover.png")
        .add('options button', "lib/main menu/buttons/options.png")
        .add('options hover button', "lib/main menu/buttons/options_hover.png")
        .add('quit button', "lib/main menu/buttons/quit.png")
        .add('quit hover button', "lib/main menu/buttons/quit_hover.png")
		.add('enemy ship', "lib/vaisseau/vaisseau_enemy.png")
        .on("progress", loadProgressHandler)
        .on('complete', function (e) {
            load_container.visible = false;
        })
        .load(setup);
}

//état d'avancement de la barre de chargement
function loadProgressHandler(loader, resource) {
    console.log("loading " + resource.name);
    console.log("progress: " + loader.progress + "%");
    var a = (loader.progress / 100) * unloaded.width;
    unloaded.width = unloaded.width - a;
    unloaded.x += a;
}
//Initialisation des images, textures et containers
function setup() {

    introScene = new Container();
    
    text = new Text('Bienvenue ! Entrez votre pseudo :', {
        fontFamily: 'PixelOperator',
        fontSize: 60,
        fill: 'black'
    });
    text.position.set(gameWidth / 2 - text.width / 2, gameHeight *33/100);
    introScene.addChild(text);
    app.stage.addChild(introScene);  
	
    buttons_texture = [
        TextureCache["lib/main menu/buttons/play.png"],
        TextureCache["lib/main menu/buttons/play_hover.png"],
        TextureCache["lib/main menu/buttons/options.png"],
        TextureCache["lib/main menu/buttons/options_hover.png"],
        TextureCache["lib/main menu/buttons/quit.png"],
        TextureCache["lib/main menu/buttons/quit_hover.png"]
    ]

    button_container = new Container();

    play_button = new Sprite();
    options_button = new Sprite();
    quit_button = new Sprite;

    button_container.addChild(play_button, options_button, quit_button);

    for (var i = 0; i < 3; i++) {
        button_container.getChildAt(i).texture = buttons_texture[i * 2];
        button_container.getChildAt(i).width = gameWidth * 40 / 100;
        button_container.getChildAt(i).height = gameHeight * 15 / 100;
        button_container.getChildAt(i).x = gameWidth / 2 - button_container.getChildAt(i).width / 2;
        button_container.getChildAt(i).y = gameHeight * 45 / 100 + button_container.getChildAt(i).height * i;
        button_container.getChildAt(i).interactive = true;
    }

    play_button.on('mouseover', function () {
        play_button.texture = buttons_texture[1];
    });
    play_button.on('mouseout', function () {
        play_button.texture = buttons_texture[0];
    });

    options_button.on('mouseover', function () {
        options_button.texture = buttons_texture[3];
    });
    options_button.on('mouseout', function () {
        options_button.texture = buttons_texture[2];
    });

    quit_button.on('mouseover', function () {
        quit_button.texture = buttons_texture[5];
    });
    quit_button.on('mouseout', function () {
        quit_button.texture = buttons_texture[4];
    });
    //mise en place de l'écran menu (titre + fond) dans la scène
		
    showName = new Text(profileName, {
        fontFamily: 'PixelOperator',
        fontSize: 60,
        fill: 'black'
    });
    showName.y = gameHeight * 33 / 100;


    menuScene = new Container();
    menuScene.addChild(button_container, showName);
	
	ship = new Sprite();
	ship.texture = TextureCache['enemy ship'];
	
	ship.scale.set(0.22,0.22);
	ship.x = gameWidth/2 - ship.width/2;
	ship.y = gameHeight/2 - ship.height/2;
	ship.vx = 0;
	ship.vy = 0;
	ship.anchor.x = 0.5;
	ship.anchor.y = 0.5;
	
	window.addEventListener("keydown", function (e){
		e.preventDefault();
		switch(e.keyCode){
		//tourner à droite / à gauche
			case 37:
				
			break;
			
			case 39:
				
			break;
		//avancer / reculer
			case 38:
				
			break;
			
			case 40:
				
			break;
		}
	});
	
    gameScene = new Container();
	gameScene.addChild(ship);
    app.stage.addChild(menuScene, gameScene);
	
	menuScene.visible = false;
	gameScene.visible = false;
	
    state = "menu";
	
	gameLoop();
	
	document.getElementById("inputbox").addEventListener("keyup", function(event) {
		event.preventDefault();
		//si la touche entrée + les conditions sont réunis alors on accede au menu
			if (event.keyCode === 13 && profileName.length < 15 && profileName.length > 2) {
			introScene.visible = false;
			menuScene.visible = true;
			showName.text = "Bienvenue, " + profileName;
			document.getElementById('inputbox').parentNode.removeChild(document.getElementById('inputbox'));
			showName.x = gameWidth / 2 - showName.width / 2;
			}
	});
}
//Boucle général du jeu
function gameLoop() {
    switch(state){
		case "menu" : 
		menu();
		break;
		case "play" : 
		play();
		break;
	}
    window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {
	
	if (document.getElementById('inputbox') != null ){
		profileName = document.getElementById('inputbox').value;
	}
 
    play_button.on("click", function () {
        menuScene.visible = false;
        title.visible = false;
		gameScene.visible = true;
		state = "play";
        
    })
    options_button.on("click", function () {
		title.visible = false;
		menuScene.visible = false;
    })
    quit_button.on("click", function () {
        location.reload();
    })

}
//Tout le code du jeu est placé ici
function play() {
    //insérer code du jeu
	playerMovement();
	
	
}

function playerMovement() {
	
	ship.x += ship.vx;
	ship.y += ship.vy;
	
}

function calcAngle(x,y,a,vel) {
	
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

//http://www.zekechan.net/asteroids-html5-game-tutorial-1/
