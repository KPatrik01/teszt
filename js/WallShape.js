export class WallShape{
    constructor(){
        this.container = new PIXI.Container();
        this.wallGraphics = new PIXI.Graphics();
        this.container.addChild(this.wallGraphics);

        this.redraw();
    }
    redraw(){
        this.drawWall([-1250-20,-600-20],[4750+20,-600-20]);
        this.drawWall([4750+20,-600-20],[4750+20,5100+20]);
        this.drawWall([4750+20,5100+20],[-1250-20,5100+20]);
        this.drawWall([-1250-20,5100+20],[-1250-20,-600-20]);
    }
    drawWall(start, end) {
        this.wallGraphics.lineStyle(10,0xFFFFFF);
        this.wallGraphics.moveTo(start[0], start[1]);
        this.wallGraphics.lineTo(end[0], end[1]);
    }
}