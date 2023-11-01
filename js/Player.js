import Materials from "./Materials.js";


export class Player{
    constructor(){
        this.speed = 5;
        this.kick = false;
        this.body = new p2.Body({mass: 1, damping: 0, angularDamping: 0, fixedRotation: true});
        this.shape = new p2.Circle({radius: 22, material: Materials.playerMaterial});
        this.body.addShape(this.shape);
        this.body.position = [1700, 500];
    }
}