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
var introScene, menuScene, gameScene;
var buttons_texture = [];
var play, options, quit;
var button_container;
var welcome, text, inputField, inputText, input;
var bg, title;
app.renderer.autoResize = true;
//Initialisation des images, textures et containers
function setup() {
    //fond
    bg = new Sprite(resources["lib/main menu/background.png"].texture);
    bg.width = gameWidth;
    bg.height = gameHeight;
    /*
    //intro
    welcome = new Sprite(resources["lib/main menu/title.png"].texture);
    welcome.width = gameWidth * 80 / 100;
    welcome.height = gameHeight * 20 / 100;
    welcome.x = gameWidth / 2 - welcome.width / 2;
    welcome.y = 7 / 100 * gameHeight;
    
    text = new Text('Bienvenue à Space Attack!! Veuillez rentrer un nom d\'utilisateur' ,{fontFamily : 'Arial', fontSize: 24, fill : 'black', align : 'center'});
    text.position.set(gameWidth/2-24*15,gameHeight/2);
    
    inputField = new Sprite(resources["lib/main menu/buttons/play.png"].texture);
    inputField.interactive = true;
    inputField.width = 300;
    inputField.height = 300;
    inputField.position.set(gameWidth/2,gameHeight/2);
    
    input = new Text(inputText,{fontFamily : 'Arial', fontSize: 24, fill : 'black', align : 'center'});
    input.position.set(gameWidth/2,gameHeight/2);
    
    */
    
    
    
    
    
    
    
    
    //titre
    title = new Sprite(resources["lib/main menu/title.png"].texture);
    title.width = gameWidth * 80 / 100;
    title.height = gameHeight * 20 / 100;
    title.x = gameWidth / 2 - title.width / 2;
    title.y = 7 / 100 * gameHeight;
    
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
    
    for(var i = 0; i < 3; i++) {
        button_container.getChildAt(i).texture = buttons_texture[i*2];
        button_container.getChildAt(i).width = gameWidth * 40 / 100;
        button_container.getChildAt(i).height = gameHeight * 15 / 100;
        button_container.getChildAt(i).x = gameWidth / 2 - button_container.getChildAt(i).width / 2;
        button_container.getChildAt(i).y = gameHeight * 45/100 + button_container.getChildAt(i).height * i; 
        button_container.getChildAt(i).interactive = true;
        button_container.getChildAt(i).buttonMode = true;
    }
    
    play.on('mouseover', function(){play.texture = buttons_texture[1];});
    play.on('mouseout', function(){play.texture = buttons_texture[0];});
    
    options.on('mouseover', function(){options.texture = buttons_texture[3];});
    options.on('mouseout', function(){options.texture = buttons_texture[2];});
    
    quit.on('mouseover', function(){quit.texture = buttons_texture[5];});
    quit.on('mouseout', function(){quit.texture = buttons_texture[4];});
    //mise en place de l'écran menu (titre + fond) dans la scène
    
    app.stage.addChild(bg);
    
    /*introScene = new Container();
    introScene.addChild(welcome,text);
    app.stage.addChild(inputField,input);
    app.stage.addChild(introScene);
    */
    menuScene = new Container();
    menuScene.addChild(welcome,title,button_container);
    app.stage.addChild(menuScene);
    
    gameScene = new Container();
    app.stage.addChild(gameScene);

    state = menu;

    gameLoop();
}

//Boucle général du jeu
function gameLoop() {

    state();
    //window.requestAnimationFrame(gameLoop);
}

//Tout le code du menu principal est placé ici
function menu() {
    /*
    button_container.visible = false;
    title.visible = false;
    
    var tempText;
    var x = 0;
    window.addEventListener("keypress",function(e){
        tempText = e.keyCode;
        x+=1;
        if(tempText == 8){
            x -= 2;    
        }
    });
    inputText.replace(inputText.substring(x,x+1),String.fromCharCode(tempText));
    console.log(inputText);
    */
    
    play.on("click", function() {
        menuScene.visible = false;
    })
    options.on("click", function(){
        button_container.visible = false;
    })
    quit.on("click", function(){
        
    })

}
//Tout le code du jeu est placé ici
function play() {

}