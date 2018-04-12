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
var text, profileName = " ",
    validValue;
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
        .add('player ship', "lib/ships/player_ship.png")
        .add('ally laser', "lib/ships/particles/laser1.png")
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

    //Création des éléments du menu principal
    play_button = new Sprite();
    options_button = new Sprite();
    quit_button = new Sprite;
    button_container = new Container();
    showName = new Text(profileName, {
        fontFamily: 'PixelOperator',
        fontSize: 60,
        fill: 'black'
    });

    //Création des sprites du jeu
    ship = new Sprite();

    menuScene = new Container();
    gameScene = new Container();


    state = "menu";

    initMenu();

    gameLoop();

}

//Boucle général du jeu
function gameLoop() {
    switch (state) {
        case "menu":
            menu();
            break;
        case "play":
            play();
            break;
    }
    window.requestAnimationFrame(gameLoop);
}

//L'initialization du menu principal
function initMenu() {

    buttons_texture = [
        TextureCache["lib/main menu/buttons/play.png"],
        TextureCache["lib/main menu/buttons/play_hover.png"],
        TextureCache["lib/main menu/buttons/options.png"],
        TextureCache["lib/main menu/buttons/options_hover.png"],
        TextureCache["lib/main menu/buttons/quit.png"],
        TextureCache["lib/main menu/buttons/quit_hover.png"]
    ]

    text.position.set(gameWidth / 2 - text.width / 2, gameHeight * 33 / 100);
    introScene.addChild(text);
    app.stage.addChild(introScene);

    showName.y = gameHeight * 33 / 100;

    button_container.addChild(play_button, options_button, quit_button);
    menuScene.addChild(button_container, showName);

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

    gameScene.addChild(ship);
    app.stage.addChild(menuScene, gameScene);

    menuScene.visible = false;
    gameScene.visible = false;

    document.getElementById("inputbox").addEventListener("keyup", function (event) {
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

//Tout le code du menu principal est placé ici
function menu() {

    if (document.getElementById('inputbox') != null) {
        profileName = document.getElementById('inputbox').value;
    }

    play_button.on("click", function () {
        menuScene.visible = false;
        title.visible = false;
        gameScene.visible = true;
        initPlay();
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

function initPlay() {

    ship.texture = TextureCache['enemy ship'];

    document.getElementById('jeu').style.cursor = 'none';

    keys = [];
    bullets = [];
    bulletSpeed = 15;

    rotateValue = 0;
    rotateLeft = -2;
    rotateRight = 2;
    rotateScaling = 0.045;

    vel = 0;
    friction = 0.95;
    accelMax = 5;
    accelMin = -5;

    ship.scale.set(0.18, 0.18);
    ship.x = gameWidth / 2 - ship.width / 2;
    ship.y = gameHeight / 2 - ship.height / 2;
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;

    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });

}

//Tout le code du jeu est placé ici
function play() {
    //left/right
    if (keys[100]) {
        ship.rotation = ship.rotation + rotateLeft * rotateScaling;
    }
    if (keys[102]) {
        ship.rotation = ship.rotation + rotateRight * rotateScaling;
    }
    if (keys[104]) {
        if (vel <= accelMax) {
            vel++;
        }
    }
    if (keys[101]) {
        if (vel >= accelMin) {
            vel--;
        }
    }
    if (keys[32]) {
        shoot(ship);
    }
	
	if (keys[66]) {
		ship.scale.set(0.1,0.1);
		vel += 2;
		bulletSpeed = 20;
	}
	else if (keys[66] === false) {
		ship.scale.set(0.18,0.18);
		bulletSpeed = 15;
	}
    vel *= friction;

    ship.x += Math.cos(ship.rotation) * vel;
    ship.y += Math.sin(ship.rotation) * vel;

    for (var b = bullets.length - 1; b >= 0; b--) {
        bullets[b].x += Math.cos(bullets[b].rotation) * bulletSpeed;
        bullets[b].y += Math.sin(bullets[b].rotation) * bulletSpeed;
		if(bullets[b].x < 0 || bullets[b].x > gameWidth || bullets[b].y < 0 || bullets[b].y > gameHeight) {
			gameScene.removeChild(bullets[b]);
		}
    }
	
	if (ship.x < 0) {
		ship.x = gameWidth;
	}
	else if (ship.x > gameWidth) {
		ship.x = 0;
	}
	else if (ship.y < 0) {
		ship.y = gameHeight;
	}
	else if (ship.y > gameHeight) {
		ship.y = 0;
	}
}

function shoot(startPosition) {
    var bullet = new Sprite();
    bullet.texture = TextureCache['ally laser'];
    bullet.scale.set(0.1, 0.1);
    bullet.x = startPosition.x;
    bullet.y = startPosition.y;
    bullet.rotation = startPosition.rotation;
    gameScene.addChild(bullet);
    bullets.push(bullet);
}
