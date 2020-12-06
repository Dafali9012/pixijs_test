export default class Input {
    constructor() {
        this.keys = {};
        this.keyClicked = false;

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    onKeyDown(key) {
        this.keys[key.keyCode] = true;
    }
    
    onKeyUp(key) {
        this.keys[key.keyCode] = false;
        this.keyClicked = false;
    }

    onKey(keyCode) {
        if(this.keys[keyCode] && !this.keyClicked) {
            this.keyClicked = true;
            return true;
        }
        else return false;
    }
}