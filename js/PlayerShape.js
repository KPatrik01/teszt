export class PlayerShape{
    constructor(player){
        this.player = player;
        this.container = new PIXI.Container();
        this.playerGraphics = new PIXI.Graphics();
        this.playerBelsoGraphics = new PIXI.Graphics();
        this.kickGraphics = new PIXI.Graphics();
        this.staminaGraphics = new PIXI.Graphics();
        this.resetGraphics = new PIXI.Graphics();
        this.container.addChild(this.resetGraphics);
        this.container.addChild(this.kickGraphics);
        this.container.addChild(this.playerGraphics);
        this.container.addChild(this.playerBelsoGraphics);
        this.container.addChild(this.staminaGraphics);
        let style = {
            fill: [
                "#b30000",
                "#651a1a"
            ],
            fontSize: 20,
            fontWeight: "bold",
            miterLimit: 0,
            stroke: "#b0b0b0",
            strokeThickness: 4
        }
        this.newPlayerName = new PIXI.Text(this.player.playerName,style);
        this.newPlayerName.x = this.container.position.x;
        this.newPlayerName.y = this.container.position.y-50;
        this.newPlayerName.anchor.x = 0.5;
        this.container.addChild(this.newPlayerName);
        this.redraw();
    }
    redraw(){
        this.kickGraphics.beginFill(0xFFFFFF);
        this.kickGraphics.drawCircle(0, 0,this.player.radius+1);
        this.kickGraphics.endFill();
        this.playerGraphics.beginFill(0x444444);
        this.playerGraphics.drawCircle(0, 0,this.player.radius);
        this.playerGraphics.endFill();
        this.playerBelsoGraphics.beginFill(0xFFFFFF);
        this.playerBelsoGraphics.drawCircle(0, 0, this.player.radius-3);
        this.playerBelsoGraphics.endFill();
    }
    update(){
        this.container.position.x=this.player.body.position[0];
        this.container.position.y=this.player.body.position[1];
        this.kickGraphics.visible = this.player.kick;
        this.drawStamina();
    }
    drawStamina(){
        this.staminaGraphics.clear()
        this.staminaGraphics.beginFill(0x0000DD);
        this.staminaGraphics.drawRect(-20,30,this.player.stamina/2.5,5);
        this.staminaGraphics.endFill();
    }
}