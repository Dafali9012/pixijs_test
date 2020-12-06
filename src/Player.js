export default class Player extends PIXI.Container {

    constructor(textureSheet) {
        super();
        this.textureSheet = textureSheet;
        this.sprite = new PIXI.AnimatedSprite([textureSheet.textures["flap_0"]]);
        this.sprite.animationSpeed = 0.2;
        this.sprite.loop = false;
        this.addChild(this.sprite);
        this.y = 0;
        this.vy = 0;
        this.vyMin = -8;

        this.sound = new Audio("./res/exp.wav");

        this.sprite.onComplete = () => {
            this.sprite.gotoAndStop(0);
        };
    }

    setTexture(texture) {
        this.sprite.textures = texture;
        this.sprite.play();
    }

    collision() {
        if(this.y >= 288-32) this.y = 288-32;
    }

    die() {
        this.sprite.textures = this.textureSheet.animations["death"];
        this.sprite.play();
        this.sound.currentTime = 0;
        this.sound.play();
    }

    update(delta, input) {
        this.vy = Math.max(this.vy-0.2, this.vyMin);
        this.y -= this.vy;
        if(input.onKey(38)) {
            this.sprite.textures = this.textureSheet.animations["flap"];
            this.sprite.play();
            this.vy = 5;
        }
        if(input.onKey(40)) {
            this.die();
        }
        this.collision();
    }
}