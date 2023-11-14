import Materials from "./Materials.js";
import collisionGroups from "./CollisionGroups.js";

export class Wall{
    constructor(world){
        this.world = world
        this.kulsoFalFelso = new p2.Body();
        this.kulsoFalFelsoShape = new p2.Box({material: Materials.falMaterial, width: 7000, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.player});
        this.kulsoFalFelso.position = [1660, -600-30];
        this.kulsoFalFelso.addShape(this.kulsoFalFelsoShape, [0, 0], 0);
        this.world.addBody(this.kulsoFalFelso);

        this.kulsoFalAlso = new p2.Body();
        this.kulsoFalAlsoShape = new p2.Box({material: Materials.falMaterial, width: 7000, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.player});
        this.kulsoFalAlso.position = [1660, 5100+30];
        this.kulsoFalAlso.addShape(this.kulsoFalAlsoShape, [0, 0], 0);
        this.world.addBody(this.kulsoFalAlso);

        this.kulsoFalBal = new p2.Body();
        this.kulsoFalBalShape = new p2.Box({material: Materials.falMaterial, width: 30, height: 6000, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.player});
        this.kulsoFalBal.position = [-1250-30, 2250];
        this.kulsoFalBal.addShape(this.kulsoFalBalShape, [0, 0], 0);
        this.world.addBody(this.kulsoFalBal);

        this.kulsoFalJobb = new p2.Body();
        this.kulsoFalJobbShape = new p2.Box({material: Materials.falMaterial, width: 30, height: 6000, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.player});
        this.kulsoFalJobb.position = [4750+30, 2250];
        this.kulsoFalJobb.addShape(this.kulsoFalJobbShape, [0, 0], 0);
        this.world.addBody(this.kulsoFalJobb);



    }

}