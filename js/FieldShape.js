import { BallShape } from "./BallShape.js";


export class FieldShape{
    constructor(field){
        this.field = field
        this.ballShape = new BallShape(field.ball);
        this.container = new PIXI.Container();
        this.backgroundGraphics = new PIXI.Graphics();
        this.container.addChild(this.backgroundGraphics)
        this.container.addChild(this.ballShape.container)
        this.redraw()
    }
    redraw(){
        this.backgroundGraphics.beginFill(0x13B600);
        this.backgroundGraphics.drawRect(this.field.balSzel,this.field.felSzel,this.field.palyaSzelesseg,this.field.palyaMagassag);
        this.backgroundGraphics.endFill();
        this.drawWall([this.field.balSzel, this.field.felSzel], [this.field.jobbSzel, this.field.felSzel]);
        this.drawWall([this.field.jobbSzel, this.field.felSzel], [this.field.jobbSzel, this.field.alSzel]);
        this.drawWall([this.field.jobbSzel, this.field.alSzel], [this.field.balSzel, this.field.alSzel]);
        this.drawWall([this.field.balSzel, this.field.alSzel], [this.field.balSzel, this.field.felSzel]);
    }
    drawWall(start, end) {
        this.backgroundGraphics.lineStyle(5,0xFFFFFF)
        this.backgroundGraphics.moveTo(start[0], start[1]);
        this.backgroundGraphics.lineTo(end[0], end[1]);
    
    }
}