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

        //falak rajzolása
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
        
        //Kapufa rajzolása
        this.drawPost(this.field.jobbFelsoKapufa.position,this.field.jobbFelsoKapufaShape.radius);
        this.drawPost(this.field.jobbAlsoKapufa.position,this.field.jobbAlsoKapufaShape.radius);
        this.drawPost(this.field.balFelsoKapufa.position,this.field.balFelsoKapufaShape.radius);
        this.drawPost(this.field.balAlsoKapufa.position,this.field.balAlsoKapufaShape.radius);

        //vonalak rajzolása
        this.drawPitchLine([this.field.balSzel + this.field.palyaSzelesseg/2, this.field.felSzel], [this.field.balSzel + this.field.palyaSzelesseg/2, this.field.alSzel]);
        this.drawCircle(this.field.balSzel + this.field.palyaSzelesseg/2, this.field.felSzel + this.field.palyaMagassag/2, this.field.kapuSzelesseg/2 + this.field.verticalFalHosszusag/8, false);
        this.drawPitchLine([this.field.balSzel, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8], [this.field.balSzel + this.field.verticalFalHosszusag/4, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.balSzel + this.field.verticalFalHosszusag/4, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8], [this.field.balSzel + this.field.verticalFalHosszusag/4, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.balSzel + this.field.verticalFalHosszusag/4, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8], [this.field.balSzel, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.balSzel, this.field.felSzel + this.field.verticalFalHosszusag/2], [this.field.balSzel + this.field.verticalFalHosszusag/2 + this.field.verticalFalHosszusag/4, this.field.felSzel + this.field.verticalFalHosszusag/2]);
        this.drawPitchLine([this.field.balSzel + this.field.verticalFalHosszusag/2 + this.field.verticalFalHosszusag/4, this.field.felSzel + this.field.verticalFalHosszusag/2], [this.field.balSzel + this.field.verticalFalHosszusag/2 + this.field.verticalFalHosszusag/4, this.field.alSzel - this.field.verticalFalHosszusag/2]);
        this.drawPitchLine([this.field.balSzel + this.field.verticalFalHosszusag/2 + this.field.verticalFalHosszusag/4, this.field.alSzel - this.field.verticalFalHosszusag/2], [this.field.balSzel, this.field.alSzel - this.field.verticalFalHosszusag/2]);
        this.drawPitchLine([this.field.jobbSzel, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8], [this.field.jobbSzel - this.field.verticalFalHosszusag/4, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.jobbSzel - this.field.verticalFalHosszusag/4, this.field.balFelsoKapufa.position[1] - this.field.verticalFalHosszusag/8], [this.field.jobbSzel - this.field.verticalFalHosszusag/4, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.jobbSzel - this.field.verticalFalHosszusag/4, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8], [this.field.jobbSzel, this.field.balAlsoKapufa.position[1] + this.field.verticalFalHosszusag/8]);
        this.drawPitchLine([this.field.jobbSzel, this.field.felSzel + this.field.verticalFalHosszusag/2], [this.field.jobbSzel - this.field.verticalFalHosszusag/2 - this.field.verticalFalHosszusag/4, this.field.felSzel + this.field.verticalFalHosszusag/2]);
        this.drawPitchLine([this.field.jobbSzel - this.field.verticalFalHosszusag/2 - this.field.verticalFalHosszusag/4, this.field.felSzel + this.field.verticalFalHosszusag/2], [this.field.jobbSzel - this.field.verticalFalHosszusag/2 - this.field.verticalFalHosszusag/4, this.field.alSzel - this.field.verticalFalHosszusag/2]);
        this.drawPitchLine([this.field.jobbSzel - this.field.verticalFalHosszusag/2 - this.field.verticalFalHosszusag/4, this.field.alSzel - this.field.verticalFalHosszusag/2], [this.field.jobbSzel, this.field.alSzel - this.field.verticalFalHosszusag/2]);
        this.drawCircle(this.field.balSzel + this.field.palyaSzelesseg/2, this.field.felSzel + this.field.palyaMagassag/2,3,true);
        this.drawCircle(this.field.balSzel + this.field.verticalFalHosszusag/2, this.field.felSzel + this.field.palyaMagassag/2,3,true);
        this.drawCircle(this.field.jobbSzel - this.field.verticalFalHosszusag/2, this.field.felSzel + this.field.palyaMagassag/2,3,true);
        this.backgroundGraphics.lineStyle(3,0xFFFFFF);
        this.backgroundGraphics.arc(this.field.balSzel + this.field.verticalFalHosszusag/2, this.field.felSzel + this.field.palyaMagassag/2,this.field.kapuSzelesseg/2 + this.field.verticalFalHosszusag/8, 5.21, 1.075);
        this.backgroundGraphics.lineTo();
        this.backgroundGraphics.arc(this.field.jobbSzel - this.field.verticalFalHosszusag/2, this.field.felSzel + this.field.palyaMagassag/2,this.field.kapuSzelesseg/2 + this.field.verticalFalHosszusag/8, 2.07, 4.22);
        this.backgroundGraphics.lineTo();
        this.backgroundGraphics.arc(this.field.balSzel, this.field.felSzel,this.field.verticalFalHosszusag/8,0,Math.PI/2);
        this.backgroundGraphics.lineTo();
        this.backgroundGraphics.arc(this.field.jobbSzel, this.field.felSzel,this.field.verticalFalHosszusag/8,3.1,Math.PI/2,true);
        this.backgroundGraphics.lineTo();
        this.backgroundGraphics.arc(this.field.balSzel, this.field.alSzel,this.field.verticalFalHosszusag/8,4.7,0);
        this.backgroundGraphics.lineTo();
        this.backgroundGraphics.arc(this.field.jobbSzel, this.field.alSzel,this.field.verticalFalHosszusag/8,Math.PI,4.7);


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
    drawCircle(posX,posY,radius,fill){
        if (fill){
            this.backgroundGraphics.beginFill(0xFFFFFF);
        }
        this.backgroundGraphics.lineStyle(3,0xFFFFFF);
        this.backgroundGraphics.drawCircle(posX,posY,radius);
        if (fill){
            this.backgroundGraphics.endFill();
        }
    }
    drawPost(position,radius) {
        let positionX=position[0];
        let positionY=position[1];
        this.backgroundGraphics.beginFill(0xFFFFFF);
        this.backgroundGraphics.drawCircle(positionX,positionY,radius);
        this.backgroundGraphics.endFill();
    }
    drawPitchLine(start, end){
        this.backgroundGraphics.lineStyle(3,0xFFFFFF);
        this.backgroundGraphics.moveTo(start[0], start[1]);
        this.backgroundGraphics.lineTo(end[0], end[1]);
    }
    update(){
        this.ballShape.update();
    }
}