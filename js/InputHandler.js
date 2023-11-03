export class InputHandler{
    constructor(){
        this.keyPressed = new Map();
        window.addEventListener("keydown", this.onKeyDown.bind(this))
        window.addEventListener("keyup", this.onKeyUp.bind(this))
    }
    onKeyDown(e){
        this.keyPressed.set(e.key.toLowerCase(), true);
    }
    onKeyUp(e){
        this.keyPressed.set(e.key.toLowerCase(), false);
    }
    getInput(){

    }
    getInputFromKeyboard(){
        let dirX = 0;
        let dirY = 0;
        if (this.isPressed("a") || this.isPressed("arrowLeft")){
            dirX-=1;
        }
        if (this.isPressed("d") || this.isPressed("arrowRight")){
            dirX+=1;
        }
        if (this.isPressed("w") || this.isPressed("arrowUp")){
            dirY-=1;
        }
        if (this.isPressed("s") || this.isPressed("arrowDown")){
            dirY+=1;
        }
        let kick=this.isPressed(" ") || this.isPressed("x");
        return {
            move: (dirX!=0 || dirY!=0),
            angle: Math.atan2(dirY,dirX),
            kick: kick
        }
    }
    isPressed(keyCode){
        return this.keyPressed.get(keyCode.toLowerCase()) == true;
    }
}