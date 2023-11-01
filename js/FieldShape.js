export class FieldShape{
    constructor(){
        this.container = new PIXI.Container();
        this.korGraphics = new PIXI.Graphics();
        this.container.addChild(this.korGraphics)
        this.szinek=[0xFFFFFF,0xFF0000,0x0000FF,0x00FF00,0x000000];
        this.szinMost=0
        this.redraw()
    }
    redraw(){
        this.korGraphics.beginFill(this.szinek[this.szinMost]);
        this.korGraphics.drawCircle(1000,500,30);
        this.korGraphics.endFill();
        this.szinMost=(this.szinMost+1)%5;
    }
}