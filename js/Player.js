import Materials from "./Materials.js";
import collisionGroups from "./CollisionGroups.js";


export class Player{
    constructor(){
        this.radius = 22;
        this.speed = 250;
        this.stamina = 100;
        this.kick = false;
        this.body = new p2.Body({mass: 1, damping: 0, angularDamping: 0, fixedRotation: true});
        this.shape = new p2.Circle({radius: this.radius, material: Materials.playerMaterial, collisionGroup: collisionGroups.player, collisionMask: collisionGroups.ball | collisionGroups.fal});
        this.body.addShape(this.shape);
        this.body.position = [1660, 2250];
    }
    processInput(){
        if ( this.input.sprint == true){
            if (this.stamina >= 1) {
                this.speed=450;
                this.stamina = Math.max(0,this.stamina-1);
                console.log(this.stamina);
            } else if (this.stamina < 1) {
                this.speed = 250
                this.stamina = Math.min(100,this.stamina+0.25);
                console.log(this.stamina)
            }
        } else {
            this.speed=250;
            this.stamina = Math.min(100,this.stamina+0.75);
            console.log(this.stamina)
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