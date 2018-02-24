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
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
});
document.getElementById("jeu").appendChild(app.view);

//Chargement des images
//Charger images du menu principal : Fond, boutons etc..
//Charger tilesets et images du jeu : Fond, boutons, effets, animations, personnages, vaisseaux etc...
loader
    .add("lib/tilesets/INSERTNAME.png")
    .load(setup);

//variables qui seront utilisé dans plusieurs fonctions
var cat, state;

//Initialisation des images, textures et containers
function setup() {

    cat = new Sprite(resources["lib/tilesets/INSERTNAME.png"].texture);

    cat.x = 200;
    cat.y = 100;

    app.stage.addChild(cat);

    state = menu;

    menuScene = new Container();
    app.stage.addChild(menuScene);
    
    gameScene = new Container();
    app.stage.addChild(gameScene);

    gameLoop();
}

//Boucle général du jeu
function gameLoop() {

    state();

    window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {
    
}
//Tout le code du jeu est placé ici
function play() {
    
}