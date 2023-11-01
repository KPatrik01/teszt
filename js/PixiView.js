import { Field } from "./Field.js";
import { FieldShape } from "./FieldShape.js";

export class PixiView{
    constructor(gameWorld){
        this.gameWorld = gameWorld;
        
        this.app = new PIXI.Application({
            background: '#1099bb',
            resizeTo: window,
        });

        document.body.appendChild(this.app.view);
    }
    createWorld(){
        this.createFields()
    }
    createFields(){
        this.fieldShape = new FieldShape(this.gameWorld.field);
        this.app.stage.addChild(this.fieldShape.container);
        this.fieldShape.redraw()
    }
}