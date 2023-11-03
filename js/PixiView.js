import { Field } from "./Field.js";
import { FieldShape } from "./FieldShape.js";
import { PlayerShape } from "./PlayerShape.js";
import { InputHandler } from "./InputHandler.js";
import { Camera } from "./Camera.js";

export class PixiView{
    constructor(gameWorld){
        this.gameWorld = gameWorld;
        this.camera = new Camera(this);
        
        this.app = new PIXI.Application({
            background: '#1099bb',
            resizeTo: window,
        });

        document.body.appendChild(this.app.view);
        
        this.inputHandler = new InputHandler();
        this.app.ticker.add((delta) => {
            this.fieldShape.update();
            this.playerShape.update();
            const input = this.inputHandler.getInputFromKeyboard();
            gameWorld.player.input=input;
            this.camera.update();
        });
    }
    createWorld(){
        this.createFields();
        this.spawnPlayer();
    }
    createFields(){
        this.fieldShape = new FieldShape(this.gameWorld.field);
        this.app.stage.addChild(this.fieldShape.container);
        this.fieldShape.redraw();
    }
    spawnPlayer(){
        this.playerShape = new PlayerShape(this.gameWorld.player);
        this.app.stage.addChild(this.playerShape.container);
        this.playerShape.redraw();
    }
}