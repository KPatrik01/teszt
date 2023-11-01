import Materials from "./Materials.js";


export class Ball{
    constructor(){
        this.speed = 5;
        this.body = new p2.Body({mass: 4, damping: 0.6, angularDamping: 0.4});
        this.shape = new p2.Circle({radius: 8, material: Materials.ballMaterial});
        this.body.addShape(this.shape);
        this.body.position = [1050, 500];
    }
}