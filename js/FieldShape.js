export class FieldShape{
    constructor(field){
        this.field = field
        this.container = new PIXI.Container();
        this.backgroundGraphics = new PIXI.Graphics();
        this.container.addChild(this.backgroundGraphics)
        this.redraw()
    }
    redraw(){
        this.backgroundGraphics.beginFill(0x13B600);
        this.backgroundGraphics.drawRect(this.field.balSzel,this.field.felSzel,this.field.palyaSzelesseg,this.field.palyaMagassag);
        this.backgroundGraphics.endFill();
    }
}