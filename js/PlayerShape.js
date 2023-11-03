export class PlayerShape{
    constructor(player){
        this.player = player;
        this.container = new PIXI.Container();
        this.playerGraphics = new PIXI.Graphics();
        this.container.addChild(this.playerGraphics);
        this.redraw();
    }
    redraw(){
        this.playerGraphics.beginFill(0x0000FF);
        this.playerGraphics.drawCircle(0, 0,this.player.radius);
        this.playerGraphics.endFill();
    }
    update(){
        this.container.position.x=this.player.body.position[0];
        this.container.position.y=this.player.body.position[1];
    }
}