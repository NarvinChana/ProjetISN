var Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

var app = new Application({
    width: 1920,
    height: 1080,
    antialias: true
});

function resizeGame() {
    var aspectRatio = 4 / 3;

    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var newaspectRatio = newWidth / newHeight;

    if (newaspectRatio > aspectRatio) {
        newWidth = newHeight * aspectRatio;
        jeu.style.width = newWidth + 'px';
        jeu.style.height = newHeight + 'px';
    } else {
        newHeight = newWidth / aspectRatio;
        jeu.style.width = newWidth + 'px';
        jeu.style.height = newHeight + 'px';
    }
    jeu.style.marginTop = (-newHeight / 2) + 'px';
    jeu.style.marginLeft = (-newWidth / 2) + 'px';

    app.width = newWidth;
    app.height = newHeight;
}



function run() {
    document.getElementById("jeu").appendChild(app.view);

    function Ship(xpos, ypos, angle, speed, velocity, hp) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.angle = angle;
        this.speed = speed;
        this.velocity = velocity;
        this.hp = hp;
    }

    function Projectile(xpos, ypos, angle, speed, velocity) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.angle = angle;
        this.speed = speed;
        this.velocity = velocity;
    }

    var playerShip = new Ship(0, 0, 0, 0, 0, 0);

}

function update() {

}

function draw() {

}

function init() {
    resizeGame();
}

window.onload = function () {
    init();
    run();
}
