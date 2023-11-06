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
        this.drawWall([this.field.jobbSzel, this.field.felSzel], [this.field.jobbFelsoKapufa.position[0], this.field.jobbFelsoKapufa.position[1]]);
        this.drawGoal([this.field.jobbFelsoKapufa.position[0], this.field.jobbFelsoKapufa.position[1]], [this.field.jobbAlsoKapufa.position[0], this.field.jobbAlsoKapufa.position[1]]);
        this.drawWall([this.field.jobbAlsoKapufa.position[0], this.field.jobbAlsoKapufa.position[1]], [this.field.jobbSzel, this.field.alSzel]);
        this.drawWall([this.field.jobbSzel, this.field.alSzel], [this.field.balSzel, this.field.alSzel]);
        this.drawWall([this.field.balSzel, this.field.alSzel], [this.field.balAlsoKapufa.position[0], this.field.balAlsoKapufa.position[1]]);
        this.drawGoal([this.field.balAlsoKapufa.position[0], this.field.balAlsoKapufa.position[1]], [this.field.balFelsoKapufa.position[0], this.field.balFelsoKapufa.position[1]]);
        this.drawWall([this.field.balFelsoKapufa.position[0], this.field.balFelsoKapufa.position[1]], [this.field.balSzel, this.field.felSzel]);
        this.drawWall([this.field.jobbFelsoKapufa.position[0], this.field.jobbFelsoKapufa.position[1]], [this.field.jobbFelsoKapufa.position[0]+this.field.verticalFalHosszusag/8, this.field.jobbFelsoKapufa.position[1]])
        this.drawWall([this.field.jobbFelsoKapufa.position[0]+this.field.verticalFalHosszusag/8, this.field.jobbFelsoKapufa.position[1]], [this.field.jobbAlsoKapufa.position[0]+this.field.verticalFalHosszusag/8,this.field.jobbAlsoKapufa.position[1]])
        this.drawWall([this.field.jobbAlsoKapufa.position[0]+this.field.verticalFalHosszusag/8,this.field.jobbAlsoKapufa.position[1]], [this.field.jobbAlsoKapufa.position[0], this.field.jobbAlsoKapufa.position[1]])
        this.drawWall([this.field.balFelsoKapufa.position[0], this.field.balFelsoKapufa.position[1]], [this.field.balFelsoKapufa.position[0]-this.field.verticalFalHosszusag/8, this.field.balFelsoKapufa.position[1]])
        this.drawWall([this.field.balFelsoKapufa.position[0]-this.field.verticalFalHosszusag/8, this.field.balFelsoKapufa.position[1]], [this.field.balAlsoKapufa.position[0]-this.field.verticalFalHosszusag/8,this.field.balAlsoKapufa.position[1]])
        this.drawWall([this.field.balAlsoKapufa.position[0]-this.field.verticalFalHosszusag/8,this.field.balAlsoKapufa.position[1]], [this.field.balAlsoKapufa.position[0], this.field.balAlsoKapufa.position[1]])
        this.drawPost(this.field.jobbFelsoKapufa.position,this.field.jobbFelsoKapufaShape.radius);
        this.drawPost(this.field.jobbAlsoKapufa.position,this.field.jobbAlsoKapufaShape.radius);
        this.drawPost(this.field.balFelsoKapufa.position,this.field.balFelsoKapufaShape.radius);
        this.drawPost(this.field.balAlsoKapufa.position,this.field.balAlsoKapufaShape.radius);
        this.ballShape.redraw()
    }
    drawWall(start, end) {
        this.backgroundGraphics.lineStyle(5,0xFFFFFF);
        this.backgroundGraphics.moveTo(start[0], start[1]);
        this.backgroundGraphics.lineTo(end[0], end[1]);
    }
    drawGoal(start, end) {
        this.backgroundGraphics.lineStyle(5,0x777777);
        this.backgroundGraphics.moveTo(start[0], start[1]);
        this.backgroundGraphics.lineTo(end[0], end[1]);
    }
    drawPost(position,radius) {
        let positionX=position[0];
        let positionY=position[1];
        this.backgroundGraphics.beginFill(0xFFFFFF);
        this.backgroundGraphics.drawCircle(positionX,positionY,radius);
        this.backgroundGraphics.endFill();
    }
    update(){
        this.ballShape.update();
    }
}