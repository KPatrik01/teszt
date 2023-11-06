import Materials from "./Materials.js";
import { Player } from "./Player.js";
import { Field } from "./Field.js";


export class World{
    constructor(){
        this.lastTick = Date.now();
        this.world = new p2.World({gravity: [0, 0]});
        
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.ballMaterial, {friction: 500, restitution: 0}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.falMaterial, Materials.ballMaterial, {friction: 0, restitution: 0.5}));
        

        this.player = new Player();
        const field1 = new Field(this.world, [1050, 500], this.player, 1000, 700, 200);
        this.fields = [];
        this.fields.push(field1);
        const field2 = new Field(this.world, [2500, 700], this.player, 1500, 1050, 300);
        this.fields.push(field2);

        
        
        this.world.addBody(this.player.body);
    }

    calculatePhysics() {
        const deltaTime = Date.now() - this.lastTick;
        this.world.step(deltaTime / 1000)
        this.player.processInput()
        this.fields.forEach(field => {
            field.calculatePhysics();
        })
        this.lastTick = Date.now();

    }
}