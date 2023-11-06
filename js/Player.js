import Materials from "./Materials.js";
import collisionGroups from "./CollisionGroups.js";


export class Player{
    constructor(){
        this.radius = 22;
        this.speed = 250;
        this.kick = false;
        this.body = new p2.Body({mass: 1, damping: 0, angularDamping: 0, fixedRotation: true});
        this.shape = new p2.Circle({radius: this.radius, material: Materials.playerMaterial, collisionGroup: collisionGroups.player, collisionMask: collisionGroups.ball | collisionGroups.fal});
        this.body.addShape(this.shape);
        this.body.position = [1000, 500];
    }
    processInput(){
        if ( this.input.sprint == true){
            this.speed=480;
        } else {
            this.speed=250;
        }
        this.kick = this.input.kick
        if (this.input.move == true){
            this.body.velocity=[
                this.speed*Math.cos(this.input.angle),
                this.speed*Math.sin(this.input.angle)
            ];
        } else {
            this.body.velocity=[0,0];
        }
    }
}