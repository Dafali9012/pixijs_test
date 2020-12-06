export default class Plane extends PIXI.Container {
    constructor(textureSheet) {
        super();
        this.sprite = new PIXI.AnimatedSprite(textureSheet.animations["plane"]);
        this.sprite.animationSpeed = 0.5;
        this.addChild(this.sprite);
        this.sprite.play();
        this.x = 512;
        this.y = Math.min(Math.max(Math.random()*(288-this.height), 0), 288-this.height);
        this.speed = Math.random()*2+1;
    }

    update() {
        this.x -= this.speed;
    }
}