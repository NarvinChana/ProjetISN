//Déclaration de la taille du fenêtre de jeu
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


//variables qui seront utilisées dans plusieurs fonctions
var state;
var introScene, menuScene, gameScene, optionScene;
var buttons_texture = [];
var play, play_button, options_button, quit_button;
var button_container, showName;
var text, profileName = " ",
    validValue;
var healthPercent = 100;
var bg, title;
var difficulty = "facile";
app.renderer.autoResize = true;

//chargement des images de base pour affficher l'écran de chargement
loader
    .add("lib/main menu/background_1.png")
    .add("lib/main menu/title.png")
    .add("lib/main menu/loadingFrame.png")
    .add("lib/main menu/unloaded.png")
    .add("lib/main menu/loaded.png")
    .load(preloading)

// fonction de "preload" ==> ecran de chargement
function preloading() {

    //préchargement du fond de base (menu principal)
    bg = new Sprite(resources["lib/main menu/background_1.png"].texture);
    bg.width = gameWidth;
    bg.height = gameHeight;

    //préchargement de l'image du titre
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
        .add('bg 2', "lib/main menu/background_2.png")
        //boutons menu
        .add('play button', "lib/main menu/buttons/play.png")
        .add('play hover button', "lib/main menu/buttons/play_hover.png")
        .add('options button', "lib/main menu/buttons/options.png")
        .add('options hover button', "lib/main menu/buttons/options_hover.png")
        .add('quit button', "lib/main menu/buttons/quit.png")
        .add('quit hover button', "lib/main menu/buttons/quit_hover.png")
        //vaisseaux
        .add('player ship', "lib/ships/player_ship.png")
        .add('enemy ship', "lib/ships/enemy_ship.png")
        //laser
        .add('laser1', "lib/ships/particles/laser1.png")
        .add('laser2', "lib/ships/particles/laser2.png")
        .add('pew1', "lib/sounds/laser1.mp3")
        //bar de vie
        .add('hb frame', "lib/HUD/hb_frame.png")
        .add('hb empty', "lib/HUD/hb_empty.png")
        .add('hb fill', "lib/HUD/hb_fill.png")
        //difficultés
        .add('easy', "lib/main menu/buttons/easy.png")
        .add('medium', "lib/main menu/buttons/medium.png")
        .add('hard', "lib/main menu/buttons/hard.png")
        .add('very hard', "lib/main menu/buttons/veryhard.png")
        .add('extreme', "lib/main menu/buttons/extreme.png")
        //boutons options
        .add('valid', "lib/main menu/textInput/valid.png")
        .add('invalid', "lib/main menu/textInput/invalid.png")
        .add('less', "lib/main menu/buttons/button_less.png")
        .add('plus', "lib/main menu/buttons/button_plus.png")
        .add('left', "lib/main menu/buttons/button_left.png")
        .add('right', "lib/main menu/buttons/button_right.png")
        .add('theme1' "lib/main menu/buttons/theme_orangespace.png")
        .add('theme2' "lib/main menu/buttons/theme_darkspace.png")
        .on("progress", loadProgressHandler)
        .on('complete', function (e) {
            load_container.visible = false;
        })
        .load(setup);
}

//état d'avancement de la barre de chargement
function loadProgressHandler(loader, resource) {
    console.log("loading " + resource.name);
    console.log("progress: " + Math.round(loader.progress) + "%");
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
    optionScene = new Container();
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

    app.stage.addChild(menuScene);

    menuScene.visible = false;

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

    play_button.on("click", function () {
        menuScene.visible = false;
        title.visible = false;
        gameScene.visible = true;
        document.getElementById("menuMusic").pause();
        document.getElementById("menuMusic").currentTime = 0;
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

    document.getElementById("menuMusic").play();
}

//Tout le code du menu principal est placé ici
function menu() {

    if (document.getElementById('inputbox') != null) {
        profileName = document.getElementById('inputbox').value;
    }
}

function initPlay() {

    //Création des sprites du jeu
    ship = new Sprite();
    ship.texture = TextureCache['player ship'];

    document.getElementById('jeu').style.cursor = 'none';

    keys = [];
    bullets = [];
    enemyShips = [];

    bulletSpeed = 15;

    rotateValue = 0;
    rotateLeft = -2;
    rotateRight = 2;
    rotateScaling = 0.045;

    vel = 0;
    friction = 0.95;
    accelMax = 5;
    accelMin = -5;

    shipHealth = 100;
    ship.scale.set(0.18, 0.18);
    ship.x = gameWidth / 2 - ship.width / 2;
    ship.y = gameHeight / 2 - ship.height / 2;
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;
    shootDelay = 0;

    createEnemy();
    enemySpeed = 2;

    //bar de vie du joueur
    hbFrame = new Sprite();
    hbEmpty = new Sprite();
    hbFill = new Sprite();
    hbPercent = new Text();

    //mise en place de la barre de vie
    hbPercent.text = healthPercent + "%", {
        fontFamily: 'PixelOperator8-Bold',
        fontSize: 60,
        fill: 'black'
    };

    hbFrame.texture = TextureCache['hb frame'];
    hbFrame.width = gameWidth * 5 / 100;
    hbFrame.height = gameHeight * 90 / 100;
    hbFrame.x = gameWidth / 100;
    hbFrame.y = 10 / 100 * gameHeight;

    hbFill.texture = TextureCache['hb fill'];
    hbFill.width = hbFrame.width;
    hbFill.height = hbFrame.height;
    hbFill.x = hbFrame.x;
    hbFill.y = hbFrame.y;

    hbEmpty.texture = TextureCache['hb empty'];
    hbEmpty.width = hbFrame.width;
    hbEmpty.height = 0;
    hbEmpty.x = hbFrame.x;
    hbEmpty.y = hbFrame.y;

    hbPercent.x = gameWidth / 100;
    hbPercent.y = 4 / 100 * gameHeight;
    hbPercent.width = hbFrame.width;
    hbPercent.height = gameHeight * 6 / 100;

    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });

    document.getElementById("gameMusic1").play();

    gameScene.addChild(ship, hbFill, hbEmpty, hbFrame, hbPercent);

    app.stage.addChild(gameScene);
}

//Tout le code du jeu est placé ici
function play() {

    var c = Math.random();
    //tourner à gauche
    if (keys[81]) {
        ship.rotation = ship.rotation + rotateLeft * rotateScaling;
    }
    //tourner à droite
    if (keys[68]) {
        ship.rotation = ship.rotation + rotateRight * rotateScaling;
    }
    //accélerer
    if (keys[90]) {
        if (vel <= accelMax) {
            vel++;
        }
    }
    //reculer
    if (keys[83]) {
        if (vel >= accelMin) {
            vel--;
        }
    }
    //tirer
    if (keys[32]) {
        shootDelay++;
        if (shootDelay % 10 === 0) {
            shoot(ship, 1);
            PIXI.sound.play('pew1');
        }
    }

    //boost
    if (keys[66]) {
        ship.scale.set(0.1, 0.1);
        vel += 2;
        bulletSpeed = 20;
    } else if (keys[66] === false) {
        ship.scale.set(0.18, 0.18);
        bulletSpeed = 15;
    }

    //application d'un réduction de mouvement
    vel *= friction;

    //avancement du vaisseau
    ship.x += Math.cos(ship.rotation) * vel;
    ship.y += Math.sin(ship.rotation) * vel;

    //Actualisation du trajectoire des balles
    for (var b = bullets.length - 1; b >= 0; b--) {
        bullets[b].x += Math.cos(bullets[b].rotation) * bulletSpeed;
        bullets[b].y += Math.sin(bullets[b].rotation) * bulletSpeed;
        if (bullets[b].x < 0 || bullets[b].x > gameWidth || bullets[b].y < 0 || bullets[b].y > gameHeight) {
            gameScene.removeChild(bullets[b]);
        }
        if (hitTestRectangle(ship, bullets[b]) == true) {
            healthPercent -= 10;
        }
        for (var d = enemyShips.length - 1; d >= 0; d--) {
            if (hitTestRectangle(enemyShips[d], bullets[b]) == true) {
                gameScene.removeChild(enemyShips[d]);
                enemyShips.splice(d, 1)
            }
        }
    }

    if (enemyShips.length == 0) {
        createEnemy();
    }

    //if (healthPercent == 0) {
    //    gameScene.removeChild(ship);
    //}

    if (difficulty == "facile") {
        if (c >= 0.99 && enemyShips.length < 20) {
            createEnemy();
        }
        for (var b = enemyShips.length - 1; b >= 0; b--) {
            var randShoot = Math.random();
            if (Math.random <= 0.15) {
                shoot(enemyShips[b], 2);
            }
        }
    } else if (difficulty == "difficile") {
        if (c >= 0.98 && enemyShips.length < 40) {
            createEnemy();
        }
        for (var b = enemyShips.length - 1; b >= 0; b--) {
            var randShoot = Math.random();
            if (Math.random <= 0.25) {
                shoot(enemyShips[b], 2);
            }
        }
    }

    checkBoundaries(ship);

    for (var b = enemyShips.length - 1; b >= 0; b--) {
        checkBoundaries(enemyShips[b]);
        enemyShips[b].x += Math.cos(enemyShips[b].rotation) * enemySpeed;
        enemyShips[b].y += Math.sin(enemyShips[b].rotation) * enemySpeed;
        if (enemyShips[b].x < 0 || enemyShips[b].x > gameWidth || enemyShips[b].y < 0 || enemyShips[b].y > gameHeight) {
            gameScene.removeChild(enemyShips[b]);
        }
        var randTrajectory = Math.random();
        if (randTrajectory >= 0.60) {
            enemyShips[b].rotation += 0.03;
        } else if (randTrajectory <= 0.40) {
            enemyShips[b].rotation -= 0.03;
        }
    }
}

function shoot(startPosition, laser) {
    var bullet = new Sprite();
    if (laser == 1) {
        bullet.texture = TextureCache['laser1'];
    } else if (laser == 2) {
        bullet.texture = TextureCache['laser2'];
    }
    bullet.scale.set(0.1, 0.1);
    bullet.x = startPosition.x;
    bullet.y = startPosition.y;
    bullet.rotation = startPosition.rotation;
    gameScene.addChild(bullet);
    bullets.push(bullet);
}

function checkBoundaries(object) {
    if (object.x < 0) {
        object.x = gameWidth;
    } else if (object.x > gameWidth) {
        object.x = 0;
    } else if (object.y < 0) {
        object.y = gameHeight;
    } else if (object.y > gameHeight) {
        object.y = 0;
    }
}

function createEnemy() {
    var b = Math.random();
    var enemyShip = new Sprite();
    enemyShip.texture = TextureCache['enemy ship'];
    enemyShip.scale.set(0.1, 0.1);
    enemyShip.anchor.x = 0.5;
    enemyShip.anchor.y = 0.5;
    if (b >= 0.75) {
        enemyShip.rotation = 0;
        enemyShip.x = 0;
        enemyShip.y = (Math.random() * 100) / 100 * gameHeight;
    } else if (b < 0.25) {
        enemyShip.rotation = Math.PI / 2;
        enemyShip.x = (Math.random() * 100) / 100 * gameWidth;
        enemyShip.y = 0;
    } else if (b > 0.25 && b <= 0.50) {
        enemyShip.rotation = -Math.PI / 2;
        enemyShip.x = (Math.random() * 100) / 100 * gameWidth;
        enemyShip.y = gameHeight;
    } else if (b < 0.50 && b <= 0.75) {
        enemyShip.rotation = 2 * Math.PI;
        enemyShip.x = gameWidth;
        enemyShip.y = (Math.random() * 100) / 100 * gameHeight;
    }
    gameScene.addChild(enemyShip);
    enemyShips.push(enemyShip);
}

function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};
