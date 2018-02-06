var Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

var app = new Application({
    width: 1024,
    height: 720,
    antialias: true
});

document.body.appendChild(app.view);

loader.add("lib/cat.png").load(draw);

function draw() {
    let cat = new Sprite(resources["lib/cat.png"].texture);
    app.stage.addChild(cat);
}
