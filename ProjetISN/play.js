var Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

var app = new Application({
    width: 1280,
    height: 800,
    antialias: true
});

document.body.appendChild(app.view);

function Ship(xpos, ypos, angle, speed, velocity, hp) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.angle = angle;
    this.speed = speed;
    this.velocity = velocity;
    this.hp = hp;
}

var playerShip = new Ship(0, 0, 0, 0, 0, 0);
