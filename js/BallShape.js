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
        this.ballGraphics.drawCircle(this.ball.body.position[0],this.ball.body.position[1],this.ball.radius);
        this.ballGraphics.endFill();
    }
}