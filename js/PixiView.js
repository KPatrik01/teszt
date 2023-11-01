import { Field } from "./Field.js";
import { FieldShape } from "./FieldShape.js";

export class PixiView{
    constructor(gameWorld){
        this.gameWorld = gameWorld;
        this.fieldShape = new FieldShape();
        
        const app = new PIXI.Application({
            background: '#1099bb',
            resizeTo: window,
        });

        document.body.appendChild(app.view);

        app.stage.addChild(this.fieldShape.container);
        app.ticker.add((delta) => {
            this.fieldShape.redraw();
        });
    }
}