import Materials from "./Materials.js";
import collisionGroups from "./CollisionGroups.js";


export class Ball{
    constructor(position){
        this.position = position;
        this.radius=8;
        this.body = new p2.Body({mass: 4, damping: 0.6, angularDamping: 0.4});
        this.shape = new p2.Circle({radius: this.radius, material: Materials.ballMaterial, collisionGroup: collisionGroups.ball, collisionMask: collisionGroups.player | collisionGroups.fal});
        this.body.addShape(this.shape);
        this.body.position = this.position;
        this.body.velocity=[0,0];
    }
}