


export class InputHandler{
    constructor(camera,view){
        this.isMouse = true;
        this.camera = camera;
        this.view = view;
        this.mousePos = {x: 0, y: 0};
        this.mouseLeft = false;
        this.mouseRight = false;
        this.keyPressed = new Map();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.view.app.view.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.view.app.view.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.view.app.view.addEventListener("mouseup", this.onMouseUp.bind(this));
    }
    onKeyDown(e){
        this.keyPressed.set(e.key.toLowerCase(), true);
        if (this.isPressed("m")){
            this.isMouse=!this.isMouse;
        }
    }
    onKeyUp(e){
        this.keyPressed.set(e.key.toLowerCase(), false);
    }
    onMouseMove(e){
        this.mousePos.x = e.offsetX;
        this.mousePos.y = e.offsetY;
    }
    onMouseDown(e){
        if(e.buttons & 1){
            this.mouseLeft = true;
        }
        if(e.buttons & 2){
            this.mouseRight = true;
        }
    }
    onMouseUp(e){
        if(!(e.buttons & 1)){
            this.mouseLeft = false;
        }
        if(!(e.buttons & 2)){
            this.mouseRight = false;
        }
    }
    getInput(player){
        if(this.isMouse){
            return this.getInputFromMouse(player);
        } else {
            return this.getInputFromKeyboard();
        }
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
        let sprint=this.isPressed("c") || this.isPressed("q");
        return {
            move: (dirX!=0 || dirY!=0),
            angle: Math.atan2(dirY,dirX),
            kick: kick,
            sprint: sprint
        }
    }
    getInputFromMouse(player){
        const playerScreenPos = this.camera.modelToScreen({x: player.body.position[0], y: player.body.position[1]});
        const diff = {
            x: this.mousePos.x - playerScreenPos.x,
            y: this.mousePos.y - playerScreenPos.y
        }
        const distance = Math.sqrt(diff.x*diff.x + diff.y*diff.y);
        const velocity = Math.max(0,Math.min(1,(distance-player.radius)/player.radius));
        return {
            move: velocity,
            angle: Math.atan2(diff.y,diff.x),
            kick: this.mouseRight,
            sprint: this.mouseLeft
        }
    }
    isPressed(keyCode){
        return this.keyPressed.get(keyCode.toLowerCase()) == true;
    }
}