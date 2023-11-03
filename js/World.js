import Materials from "./Materials.js";
import { Player } from "./Player.js";
import { Field } from "./Field.js";


export class World{
    constructor(){
        this.lastTick = Date.now();
        this.world = new p2.World({gravity: [0, 0]});
        
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.ballMaterial, {friction: 500, restitution: 0}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}));
        

        this.player = new Player();
        this.field = new Field(this.world, [1050, 500], this.player);
        
        
        this.world.addBody(this.player.body);
    }

    calculatePhysics() {
        const deltaTime = Date.now() - this.lastTick;
        this.world.step(deltaTime / 1000)
        this.player.processInput()
        this.field.calculatePhysics()
        this.lastTick = Date.now();
    }
}