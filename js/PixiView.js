import { Field } from "./Field.js";
import { FieldShape } from "./FieldShape.js";
import { PlayerShape } from "./PlayerShape.js";
import { InputHandler } from "./InputHandler.js";
import { Camera } from "./Camera.js";

export class PixiView{
    constructor(gameWorld){
        this.gameWorld = gameWorld;
        this.fieldShapes = []
        this.app = new PIXI.Application({
            background: '#1099bb',
            resizeTo: window,
        });
        this.camera = new Camera(this);

        document.body.appendChild(this.app.view);
        
        this.inputHandler = new InputHandler(this.camera,this);
        this.app.ticker.add((delta) => {
            this.fieldShapes.forEach(fieldshape => {
                fieldshape.update();
            });
            this.playerShape.update();
            const input = this.inputHandler.getInput(this.gameWorld.player);
            gameWorld.player.input=input;
            this.camera.update();
        });
    }
    createWorld(){
        this.createPlayer();
        this.createFields();
        this.spawnPlayer();
    }
    createPlayer(){
        this.playerShape = new PlayerShape(this.gameWorld.player);
    }
    spawnPlayer(){
        this.app.stage.addChild(this.playerShape.container);
        this.playerShape.redraw();
    }
    createFields(){
        this.gameWorld.fields.forEach(field => {
            const fieldshape = new FieldShape(field,this.app.ticker.deltaMS,this.playerShape,this);
            this.fieldShapes.push(fieldshape);
            this.app.stage.addChild(fieldshape.container);
            fieldshape.redraw();
        });
    }
}