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
var play, options, quit;
var button_container, showName;
var text, inputField, profileName = "",
    confirm, validValue;
var bg, title;
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
        .add('confirm button false', "lib/main menu/textInput/invalid.png")
        .add('confirm button true', "lib/main menu/textInput/valid.png")
        //.add('input field', "lib/main menu/textInput/inputText.png")
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

	inputField = new Sprite();
	
    document.getElementById("inputbox").style.width = gameWidth * 50 / 100;
    document.getElementById("inputbox").style.height = gameHeight * 12 / 100;
    document.getElementById("inputbox").style.left = gameWidth / 2 - gameWidth * 50 / 100 / 2;
    document.getElementById("inputbox").style.top = gameHeight * 70 / 100;
    
    text = new Text('Bienvenue ! Entrez votre pseudo :', {
        fontFamily: 'PixelOperator',
        fontSize: 60,
        fill: 'black'
    });
    text.position.set(gameWidth / 2 - text.width / 2, gameHeight / 2);

    confirm = new Sprite();
    confirm.texture = TextureCache["lib/main menu/textInput/invalid.png"];
    confirm.x = inputField.x + inputField.width;
    confirm.y = inputField.y;
    confirm.width = inputField.width * 15 / 100;
    confirm.height = inputField.height;
    confirm.interactive = true;
    confirm.on("pointerdown", function () {
        if (validValue == true) {
            introScene.visible = false;
            app.stage.addChild(menuScene);
        }
    });
    introScene.addChild(text, confirm);
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

    play = new Sprite();
    options = new Sprite();
    quit = new Sprite;

    button_container.addChild(play, options, quit);

    for (var i = 0; i < 3; i++) {
        button_container.getChildAt(i).texture = buttons_texture[i * 2];
        button_container.getChildAt(i).width = gameWidth * 40 / 100;
        button_container.getChildAt(i).height = gameHeight * 15 / 100;
        button_container.getChildAt(i).x = gameWidth / 2 - button_container.getChildAt(i).width / 2;
        button_container.getChildAt(i).y = gameHeight * 45 / 100 + button_container.getChildAt(i).height * i;
        button_container.getChildAt(i).interactive = true;
    }

    play.on('mouseover', function () {
        play.texture = buttons_texture[1];
    });
    play.on('mouseout', function () {
        play.texture = buttons_texture[0];
    });

    options.on('mouseover', function () {
        options.texture = buttons_texture[3];
    });
    options.on('mouseout', function () {
        options.texture = buttons_texture[2];
    });

    quit.on('mouseover', function () {
        quit.texture = buttons_texture[5];
    });
    quit.on('mouseout', function () {
        quit.texture = buttons_texture[4];
    });
    //mise en place de l'écran menu (titre + fond) dans la scène
    var showName_text = "Bienvenue, " + profileName;
    showName = new Text(showName_text, {
        fontFamily: 'ErasBoldITC',
        fontSize: 40,
        fill: 'black'
    });
    showName.x = gameWidth / 2 - showName.width / 2;
    showName.y = gameHeight * 30 / 100;


    menuScene = new Container();
    menuScene.addChild(button_container, showName);

    gameScene = new Container();
    app.stage.addChild(gameScene);

    state = menu;

    gameLoop();
}

//Boucle général du jeu
function gameLoop() {
    state();
    window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {
    if (profileName.length < 15 && profileName.length > 2) {
        confirm.texture = TextureCache["lib/main menu/textInput/valid.png"];
        validValue = true;
    } else if (profileName.length >= 15 || profileName.length <= 2) {
        confirm.texture = TextureCache["lib/main menu/textInput/invalid.png"];
        validValue = false;
    }
    showName_text = "Bienvenue, " + profileName;
    play.on("click", function () {
        menuScene.visible = false;
        title.visible = false;
        state = play;
    })
    options.on("click", function () {
		title.visible = false;
		menuScene.visible = false;
    })
    quit.on("click", function () {
        location.reload();
    })
}
//Tout le code du jeu est placé ici
function play() {
    //insérer code du jeu
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
