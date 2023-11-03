export class BallShape{
    constructor(ball){
        this.ball = ball
        this.container = new PIXI.Container();
        this.ballGraphics = new PIXI.Graphics();
        this.container.addChild(this.ballGraphics)
        this.redraw()
    }
    redraw(){
        this.ballGraphics.beginFill(0x0000FF);
        this.ballGraphics.drawCircle(0, 0,this.ball.radius);
        this.ballGraphics.endFill();
    }
    update(){
        this.container.position.x=this.ball.body.position[0];
        this.container.position.y=this.ball.body.position[1];
    }
}