const gameWidth = window.innerWidth,
      gameHeight= window.innerHeight;

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

//Chargement des images
//Charger images du menu principal : Fond, boutons etc..
//Charger tilesets et images du jeu : Fond, boutons, effets, animations, personnages, vaisseaux etc...
loader
    .add("lib/main menu/background.png")
    .add("lib/main menu/title.png")
    .add("lib/main menu/buttons/play.png")
    .add("lib/main menu/buttons/play_hover.png")
    .add("lib/main menu/buttons/options.png")
    .add("lib/main menu/buttons/options_hover.png")
    .add("lib/main menu/buttons/quit.png")
    .add("lib/main menu/buttons/quit_hover.png")
    .load(setup);

//variables qui seront utilisé dans plusieurs fonctions
var state;
var menuScene, gameScene;

//Initialisation des images, textures et containers
function setup() {
    
    var bg = new Sprite(resources["lib/main menu/background.png"].texture);
    bg.width = gameWidth;
    bg.height = gameHeight;

    var title = new Sprite(resources["lib/main menu/title.png"].texture);
    title.width = gameWidth*80/100;
    title.height = gameHeight*20/100;
    title.x = gameWidth/2-title.width/2;
    title.y = 7/100*gameHeight;
    
    var play = new Sprite(resources["lib/main menu/buttons/play.png"].texture);
    play.width = gameWidth*40/100;
    play.height = gameHeight*10/100;
    play.x = gameWidth/2-play.width/2;
    play.y = gameHeight*45/100;
    
    var options = new Sprite(resources["lib/main menu/buttons/options.png"].texture);
    options.width = gameWidth*40/100;
    options.height = gameHeight*10/100;
    options.x = gameWidth/2-options.width/2;
    options.y = gameHeight*45/100+options.height*1.5;
    
    var quit = new Sprite(resources["lib/main menu/buttons/quit.png"].texture);
    quit.width = gameWidth*40/100;
    quit.height = gameHeight*10/100;
    quit.x = gameWidth/2-quit.width/2;
    quit.y = gameHeight*45/100+quit.height*1.5*2;
    
    menuScene = new Container();
    menuScene.addChild(bg, title, play, options, quit);
    app.stage.addChild(menuScene);
    
    gameScene = new Container();
    app.stage.addChild(gameScene);
    
    state = menu;

    gameLoop();
}

//Boucle général du jeu
function gameLoop() {

    app.width = window.innerWidth;
    app.height = window.innerHeight;
    
    state();

    window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {
    
}
//Tout le code du jeu est placé ici
function play() {
    
}