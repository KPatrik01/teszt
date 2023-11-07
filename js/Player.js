import Materials from "./Materials.js";
import collisionGroups from "./CollisionGroups.js";


export class Player{
    constructor(){
        this.radius = 22;
        this.speed = 200;
        this.kick = false;
        this.body = new p2.Body({mass: 1, damping: 0, angularDamping: 0, fixedRotation: true});
        this.shape = new p2.Circle({radius: this.radius, material: Materials.playerMaterial, collisionGroup: collisionGroups.player, collisionMask: collisionGroups.ball | collisionGroups.fal});
        this.body.addShape(this.shape);
        this.body.position = [1700, 1850];
    }
    processInput(){
        if ( this.input.sprint == true){
            this.speed=480;
        } else {
            this.speed=250;
        }
        this.kick = this.input.kick
        if (this.input.move){
            const finalSpeed = this.speed*Math.min(1,this.input.move)
            this.body.velocity=[
                finalSpeed*Math.cos(this.input.angle),
                finalSpeed*Math.sin(this.input.angle)
            ];
        } else {
            this.body.velocity=[0,0];
        }
    }
}