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
var play, play_button, play_hover, options, quit;
var buttons = [],
    buttons_texture = [];
app.renderer.autoResize = true;

//Initialisation des images, textures et containers
function setup() {
    
    //fond
    var bg = new Sprite(resources["lib/main menu/background.png"].texture);
    bg.width = gameWidth;
    bg.height = gameHeight;
    
    //titre
    var title = new Sprite(resources["lib/main menu/title.png"].texture);
    title.width = gameWidth * 80 / 100;
    title.height = gameHeight * 20 / 100;
    title.x = gameWidth / 2 - title.width / 2;
    title.y = 7 / 100 * gameHeight;
    
    //mise en place de l'écran menu (titre + fond) dans la scène
    app.stage.addChild(bg, title);
    
    buttons_texture[]{
        TextureCache["lib/main menu/buttons/play.png"],
        TextureCache["lib/main menu/buttons/play_hover.png"],
        TextureCache["lib/main menu/buttons/options.png"],
        TextureCache["lib/main menu/buttons/options_hover.png"],
        TextureCache["lib/main menu/buttons/quit.png"],
        TextureCache["lib/main menu/buttons/quit_hover.png"],
    }
    
    for (var i = 0; i < 3; i++){
        buttons[i] = new Sprite();
        buttons[i].texture = buttons_texture[i*2];
        buttons[i].width = gameWidth * 40 / 100;
        buttons[i].height = gameHeight * 15 / 100;
        buttons[i].x = 
        buttons[i].y =
        buttons[i].interactive = true;
        buttons[i].on('mouseover', function(){this.texture = buttons_texture[i*2];});
        buttons[i].on('mouseout', function(){this.texture = buttons_texture[i*2+1];});
        
    }
    //bouton Jouer
    play = new Sprite();
    play_button = TextureCache["lib/main menu/buttons/play.png"];
    play_hover = TextureCache["lib/main menu/buttons/play_hover.png"];
    play.texture = play_button;
    play.width = gameWidth * 40 / 100;
    play.height = gameHeight * 15 / 100;
    play.x = gameWidth / 2 - play.width / 2;
    play.y = gameHeight * 45 / 100;
    play.interactive = true;
    play.on('mouseover', function () {this.texture = play_hover;});
    play.on('mouseout', function () {this.texture = play_button;});

    //bouton Options 
    options = new Sprite(resources["lib/main menu/buttons/options.png"].texture);
    play_hover = TextureCache["lib/main menu/buttons/play_hover.png"];
    options.width = gameWidth * 40 / 100;
    options.height = gameHeight * 15 / 100;
    options.x = gameWidth / 2 - options.width / 2;
    options.y = gameHeight * 45 / 100 + options.height;
    options.interactive = true;
    options.on('mouseover', function() {this.texture = options_hover;});
    options.on('mouseout', function() {this.texture = options_button;});
    
    //bouton Quitter
    quit = new Sprite(resources["lib/main menu/buttons/quit.png"].texture);
    quit.width = gameWidth * 40 / 100;
    quit.height = gameHeight * 15 / 100;
    quit.x = gameWidth / 2 - quit.width / 2;
    quit.y = gameHeight * 45 / 100 + quit.height * 2;
    quit.interactive = true;
    quit.on('mouseover', function() {this.texture = quit_hover;});
    quit.on('mouseout', function() {this.texture = quit_button;});
    //menuScene = new Container();
    //menuScene.addChild(play, options, quit);
    app.stage.addChild(play, options, quit);

    gameScene = new Container();
    app.stage.addChild(gameScene);

    state = menu;

    gameLoop();
}

//Boucle général du jeu
function gameLoop() {
    //app.renderer.resize(window.innerWidth,window.innerHeight);
    state();
    window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {


}
//Tout le code du jeu est placé ici
function play() {

}

