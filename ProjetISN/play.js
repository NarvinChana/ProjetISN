var Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    resources = PIXI.loader.resources;

var app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
});
document.getElementById("jeu").appendChild(app.view);

loader.add("lib/tilesets/09.png").load(setup);

function setup(){
	let texture = TextureCache["images/tilesets/09.png"];
	
	let rectangle = new PIXI.Rectangle(192,195,91,19);
}

