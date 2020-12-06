import Player from "./Player.js";
import Plane from "./Plane.js"
import hitTest from "./util/hitTest.js"
import Input from "./util/Input.js";

export default class Game {
    constructor() {
        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app.renderer.backgroundColor = 0xfa8072;
        document.body.appendChild(this.app.view);

        let loader = new PIXI.Loader();

        loader
        .add("./res/flappy_sheet.json")
        .load((loader, resources)=>{
            this.textureSheet = resources["./res/flappy_sheet.json"].spritesheet;

            this.setupParallaxBackground();

            this.player = new Player(this.textureSheet);
            this.player.x = (512-this.player.width)/2;
            this.player.y = 0;
            this.app.stage.addChild(this.player);

            this.planeTimer = 0;
            this.planes = [];

            this.input = new Input();
            this.app.ticker.add(delta=>this.update(delta));
        });
    }

    setupParallaxBackground() {
        this.backgroundLayer = new PIXI.Container();
        this.backgroundLayer.addChild(new PIXI.Sprite(this.textureSheet.textures["bg"]));
        this.backgroundLayer.addChild(new PIXI.Sprite(this.textureSheet.textures["bg"]));
        this.backgroundLayer.getChildAt(1).x = 512;
        this.app.stage.addChild(this.backgroundLayer);
    }

    update(delta) {
        this.backgroundLayer.x = (this.backgroundLayer.x-2)%-512;
        this.player.update(delta, this.input);
        if(this.planeTimer==0) {
            this.planes.push(new Plane(this.textureSheet));
            this.app.stage.addChild(this.planes[this.planes.length-1]);
        }
        this.planeTimer = (this.planeTimer+1)%165;
        this.planes.forEach(item=>{
            item.update();
            if(item.x < 0 - item.width) {
                this.planes.splice(this.planes.indexOf(item),1);
                this.app.stage.removeChild(item);
            }
            //if(hitTest(this.player, item)) console.log("boom");
        });
    }
}