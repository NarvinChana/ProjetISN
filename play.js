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
var play, play_button, options_button, quit_button, back_button;
var button_container, showName;
var text, profileName = " ",
    validValue;
var bg, title;
var menuMusic = document.getElementById("menuMusic");
var difficulty = "facile";
var volumeMusic = 50,
    volumeEffect = 50;
app.renderer.autoResize = true;

//chargement des images de base pour affficher l'écran de chargement
loader
    .add('bg 1', "lib/main menu/background_1.png")
    .add('bg 2', "lib/main menu/background_2.png")
    .add("lib/main menu/title.png")
    .add("lib/main menu/loadingFrame.png")
    .add("lib/main menu/unloaded.png")
    .add("lib/main menu/loaded.png")
    .load(preloading)

// fonction de "preload" ==> ecran de chargement
function preloading() {

    //préchargement du fond de base (menu principal)
    bg = new Sprite(TextureCache["lib/main menu/background_1.png"]);
    bg.width = gameWidth;
    bg.height = gameHeight;

    //préchargement de l'image du titre
    title = new Sprite(TextureCache["lib/main menu/title.png"]);
    title.width = gameWidth * 70 / 100;
    title.height = gameHeight * 20 / 100;
    title.x = gameWidth / 2 - title.width / 2;
    title.y = 7 / 100 * gameHeight;

    loadFrame = new Sprite(TextureCache["lib/main menu/loadingFrame.png"]);
    loadFrame.width = gameWidth * 80 / 100;
    loadFrame.height = loadFrame.width / 7.5;
    loadFrame.x = gameWidth / 2 - loadFrame.width / 2;
    loadFrame.y = 75 / 100 * gameHeight;

    unloaded = new Sprite(TextureCache["lib/main menu/unloaded.png"]);
    unloaded.width = gameWidth * 80 / 100;
    unloaded.height = unloaded.width / 7.5;
    unloaded.x = gameWidth / 2 - unloaded.width / 2;
    unloaded.y = 75 / 100 * gameHeight;

    loaded = new Sprite(TextureCache["lib/main menu/loaded.png"]);
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
        .add('option frame', "lib/main menu/buttons/option_frame.png")
        //.add('option title', "lib/main menu/optionTitle.png")
        .add('valid', "lib/main menu/textInput/valid.png")
        .add('invalid', "lib/main menu/textInput/invalid.png")
        .add('less', "lib/main menu/buttons/button_less.png")
        .add('less hover', "lib/main menu/buttons/button_less_hover.png")
        .add('plus', "lib/main menu/buttons/button_plus.png")
        .add('plus hover', "lib/main menu/buttons/button_plus_hover.png")
        .add('left', "lib/main menu/buttons/button_left.png")
        .add('right', "lib/main menu/buttons/button_right.png")
        .add('back', "lib/main menu/buttons/back.png")
        .add('back hover', "lib/main menu/buttons/back_hover.png")
        .add('empty', "lib/main menu/buttons/button_empty.png")
        .add('theme1', "lib/main menu/buttons/theme_orangespace.png")
        .add('theme2', "lib/main menu/buttons/theme_darkspace.png")
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
        case "option":
            option();
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
        optionScene.visible = true;
        option();
        state = "option";
    })
    quit_button.on("click", function () {
        location.reload();
    })

    document.getElementById("menuMusic").play();

    // OPTION MENU INITIALISATION /!\ ==============================================================

    optionFrame = new Sprite();
    optionTitle = new Sprite();
    back_button = new Sprite();
    VMLess = new Sprite();
    VMFrame = new Sprite();
    VMMore = new Sprite();
    VELess = new Sprite();
    VEFrame = new Sprite();
    VEMore = new Sprite();

    button_container_option = new Container();
    button_container_option.addChild(VMLess, VELess, VMMore, VEMore, VMFrame, VEFrame);
    //sprites
    optionFrame.texture = TextureCache['option frame'];
    optionFrame.width = gameWidth * 60 / 100;
    optionFrame.height = gameHeight * 50 / 100;
    optionFrame.x = gameWidth * 20 / 100;
    optionFrame.y = 30 / 100 * gameHeight;

    optionTitle.texture = TextureCache['options button'];
    optionTitle.width = gameWidth * 40 / 100;
    optionTitle.height = gameHeight * 20 / 100;
    optionTitle.x = gameWidth * 30 / 100;
    optionTitle.y = 5 / 100 * gameHeight;

    back_button.texture = TextureCache['back'];
    back_button.width = gameWidth * 16 / 100;
    back_button.height = gameHeight * 8 / 100;
    back_button.x = gameWidth * 42 / 100;
    back_button.y = gameHeight * 84 / 100;
    back_button.interactive = true;

    //description
    volumeMusicDesc = new Text("Volume Musique ", {
        fontFamily: 'PixelOperator',
        fontSize: 40,
        fill: 'black'
    });
    volumeMusicText = new Text(volumeMusic + "%", {
        fontFamily: 'PixelOperator',
        fontSize: 40,
        fill: 'black'
    });

    volumeEffectDesc = new Text("Volume Effets ", {
        fontFamily: 'PixelOperator',
        fontSize: 40,
        fill: 'black'
    });
    volumeEffectText = new Text(volumeEffect + "%", {
        fontFamily: 'PixelOperator',
        fontSize: 40,
        fill: 'black'
    });

    //position
    volumeMusicDesc.x = gameWidth * 23 / 100;
    volumeMusicDesc.y = 35 / 100 * gameHeight;

    volumeEffectDesc.x = gameWidth * 23 / 100;
    volumeEffectDesc.y = 45 / 100 * gameHeight;

    for (var i = 0; i < 4; i++) {
        button_container_option.getChildAt(i).interactive = true;
        if (i === 0 || i === 1) {
            button_container_option.getChildAt(i).texture = TextureCache['less'];
            button_container_option.getChildAt(i).x = optionFrame.x + 2 / 3 * optionFrame.width;
        } else {
            button_container_option.getChildAt(i).texture = TextureCache['plus'];
        }
        if (i === 0 || i === 2) {
            button_container_option.getChildAt(i).y = volumeMusicDesc.y;
        } else {
            button_container_option.getChildAt(i).y = volumeEffectDesc.y;
        }
        button_container_option.getChildAt(i).width = 5 / 100 * gameHeight;
        button_container_option.getChildAt(i).height = 5 / 100 * gameHeight;
    }

    VMFrame.texture = TextureCache['empty'];
    VMFrame.width = 10 / 100 * gameWidth;
    VMFrame.height = 5 / 100 * gameHeight;
    VMFrame.x = VMLess.x + 1.5 * VMLess.width;
    VMFrame.y = volumeMusicDesc.y

    VMMore.x = VMFrame.x + VMFrame.width + .5 * VMLess.width;

    VEFrame.texture = TextureCache['empty'];
    VEFrame.width = 10 / 100 * gameWidth;
    VEFrame.height = 5 / 100 * gameHeight;
    VEFrame.x = VELess.x + 1.5 * VELess.width;
    VEFrame.y = volumeEffectDesc.y

    VEMore.x = VEFrame.x + VEFrame.width + .5 * VELess.width;

    volumeMusicText.x = (VMFrame.x + VMFrame.width / 2) - volumeMusicText.width / 2.5;
    volumeMusicText.y = (volumeMusicDesc.y + volumeMusicDesc.height / 2) - volumeMusicText.height / 2.0;
    volumeEffectText.x = (VEFrame.x + VEFrame.width / 2) - volumeEffectText.width / 2.5;
    volumeEffectText.y = (volumeEffectDesc.y + volumeEffectDesc.height / 2) - volumeEffectText.height / 2.0;

    //event when hover
    back_button.on('mouseover', function () {
        back_button.texture = TextureCache['back hover'];
    });
    back_button.on('mouseout', function () {
        back_button.texture = TextureCache['back'];
    });

    optionScene.addChild(back_button, optionFrame, optionTitle, volumeMusicDesc, volumeEffectDesc, button_container_option, volumeMusicText, volumeEffectText);
    app.stage.addChild(optionScene);
    optionScene.visible = false;

    //triggers
    back_button.on("click", function () {
        optionScene.visible = false;
        title.visible = true;
        menuScene.visible = true;
        menu();
        state = "menu";
    });
    VMLess.on("click", function () {
        VMLess.texture = TextureCache['less hover'];
        if (volumeMusic > 0) {
            volumeMusic -= 10;
        }
        option();
        setTimeout(function () {
            VMLess.texture = TextureCache['less'];
        }, 100);

    });
    VMMore.on("click", function () {
        VMMore.texture = TextureCache['plus hover'];
        if (volumeMusic < 100) {
            volumeMusic += 10;
        }
        option();
        setTimeout(function () {
            VMMore.texture = TextureCache['plus'];
        }, 100);

    });
    VELess.on("click", function () {
        VELess.texture = TextureCache['less hover'];
        if (volumeEffect > 0) {
            volumeEffect -= 10;
        }
        option();
        setTimeout(function () {
            VELess.texture = TextureCache['less'];
        }, 100);

    });
    VEMore.on("click", function () {
        VEMore.texture = TextureCache['plus hover'];
        if (volumeEffect < 100) {
            volumeEffect += 10;
        }
        option();
        setTimeout(function () {
            VEMore.texture = TextureCache['plus'];
        }, 100);

    });
}
//Tout le code du menu principal est placé ici
function menu() {

    if (document.getElementById('inputbox') != null) {
        profileName = document.getElementById('inputbox').value;
    }
}


function option() {
    menuMusic.volume = volumeMusic / 100;
    volumeMusicText.text = volumeMusic + "%";
    volumeEffectText.text = volumeEffect + "%";

}

function initPlay() {

    //Création des sprites du jeu
    ship = new Sprite();
    ship.texture = TextureCache['player ship'];

    keys = [];
    bullets = [];
    enemyBullets = [];
    enemyShips = [];

    bulletSpeed = 15;
    enemyBulletSpeed = 6;

    rotateValue = 0;
    rotateLeft = -2;
    rotateRight = 2;
    rotateScaling = 0.045;

    vel = 0;
    friction = 0.95;
    accelMax = 5;
    accelMin = -5;

    playerScore = 0;
    healthPercent = 100;
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

    score = new Text();
    score.x = gameWidth * 80 / 100;
    score.y = gameHeight * 5 / 100;

    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });

    document.getElementById("gameMusic1").play();

    gameScene.addChild(ship, hbFill, hbEmpty, hbFrame, hbPercent, score);

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
            shoot(ship);
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
        for (var d = enemyShips.length - 1; d >= 0; d--) {
            if (hitTestRectangle(enemyShips[d], bullets[b]) == true) {
                gameScene.removeChild(enemyShips[d]);
                enemyShips.splice(d, 1)
                gameScene.removeChild(bullets[b]);
                playerScore += 100;
            }
        }
    }

    //déplacement des balles ennemis
    for (var b = enemyBullets.length - 1; b >= 0; b--) {
        enemyBullets[b].x += Math.cos(enemyBullets[b].rotation) * enemyBulletSpeed;
        enemyBullets[b].y += Math.sin(enemyBullets[b].rotation) * enemyBulletSpeed;
        if (hitTestRectangle(ship, enemyBullets[b]) == true) {
            healthPercent -= 1;
            gameScene.removeChild(enemyBullets[b]);
            enemyBullets.splice(b, 1);
        }
    }

    //Actualisation du score
    score.text = "Score: " + playerScore, {
        fontFamily: 'PixelOperator',
        fontSize: 45,
        fill: 'black'
    };

    //Actualisation de la barre de vie
    hbPercent.text = healthPercent + "%", {
        fontFamily: 'PixelOperator8-Bold',
        fontSize: 60,
        fill: 'black'
    };
    hbEmpty.height = (100 - healthPercent) / 100 * hbFill.height;
    if (healthPercent == 0) {
        gameScene.visible = false;
        menuScene.visible = true;
        title.visible = true;
        document.getElementById("gameMusic1").pause;
        document.getElementById("gameMusic1").setTime
    }


    //création d'un vaisseau ennemi s'il n'y en a aucun
    if (enemyShips.length == 0) {
        createEnemy();
    }

    //réglage de la difficulté
    if (difficulty == "facile") {
        if (c >= 0.99 && enemyShips.length < 10) {
            createEnemy();
        }
    } else if (difficulty == "difficile") {
        if (c >= 0.98 && enemyShips.length < 40) {
            createEnemy();
        }
    }

    checkBoundaries(ship);

    //déplacement des vaisseaux ennemis
    for (var b = enemyShips.length - 1; b >= 0; b--) {
        enemyShips[b].x += Math.cos(enemyShips[b].rotation) * enemySpeed;
        enemyShips[b].y += Math.sin(enemyShips[b].rotation) * enemySpeed;
        checkBoundaries(enemyShips[b]);
        var randTrajectory = Math.random();
        if (randTrajectory >= 0.60) {
            enemyShips[b].rotation += 0.03;
        } else if (randTrajectory <= 0.40) {
            enemyShips[b].rotation -= 0.03;
        }
        var randShoot = Math.random();
        if (randShoot <= 0.02) {
            enemyShoot(enemyShips[b]);
        }
    }
}

function shoot(startPosition) {
    var bullet = new Sprite();
    bullet.texture = TextureCache['laser1'];
    bullet.scale.set(0.1, 0.1);
    bullet.x = startPosition.x;
    bullet.y = startPosition.y;
    bullet.rotation = startPosition.rotation;
    gameScene.addChild(bullet);
    bullets.push(bullet);
}

function enemyShoot(startPosition) {
    var enemyBullet = new Sprite();
    enemyBullet.texture = TextureCache['laser2'];
    enemyBullet.scale.set(0.1, 0.1);
    enemyBullet.x = startPosition.x;
    enemyBullet.y = startPosition.y;
    enemyBullet.rotation = startPosition.rotation;
    gameScene.addChild(enemyBullet);
    enemyBullets.push(enemyBullet);
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
