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

loader
.add("lib/tilesets/09.png")
.load(setup);
var cat;
function setup(){
	/*let texture = PIXI.utils.TextureCache["images/tilesets/09.png"];
	
	let rectangle = new PIXI.Rectangle(0, 0, 32, 32);
	
	PIXI.texture.frame = rectangle;*/
	
	cat = new Sprite(resources["lib/tilesets/09.png"].texture);
	
	cat.x = 500;
	cat.y = 100;
	
	app.stage.addChild(cat);
	
	app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
	
}