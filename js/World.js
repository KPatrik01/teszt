import Materials from "./Materials.js";


export class World{
    world = new p2.World({gravity: [0, 0]});
    fal1 = new p2.Body();
    fal1Shape = new p2.Plane({material: Materials.falMaterial});
    fal2 = new p2.Body();
    fal2Shape = new p2.Plane({material: Materials.falMaterial});
    fal3 = new p2.Body();
    fal3Shape = new p2.Plane({material: Materials.falMaterial});
    fal4 = new p2.Body();
    fal4Shape = new p2.Plane({material: Materials.falMaterial});
    constructor(){
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.ballMaterial, {friction: 500, restitution: 0}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}));
        this.fal1.addShape(this.fal1Shape, [0, 0], 0);
        this.fal2.addShape(this.fal2Shape, [0, 0], -Math.PI/2);
        this.fal3.addShape(this.fal3Shape, [1000, 0], Math.PI/2);
        this.fal4.addShape(this.fal4Shape, [1000, 800], Math.PI);
        this.world.addBody(this.fal1);
        this.world.addBody(this.fal2);
        this.world.addBody(this.fal3);
        this.world.addBody(this.fal4);
    }
}