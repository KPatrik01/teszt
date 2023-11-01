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

    calculatePhysics(directionX, directionY, loves) {
        const deltaTime = Date.now() - this.lastTick;
        this.world.step(deltaTime / 1000)
    
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        this.player.body.velocity = [0, 0];
        if (length > 0) {
            const normX = directionX / length;
            const normY = directionY / length;
    
            // x += normX * player.speed * deltaTime / 100;
            // y += normY * player.speed * deltaTime / 100;
            this.player.body.velocity = [normX * this.player.speed * 50, normY * this.player.speed * 50];
    
        }
    
        this.field.calculatePhysics(loves)
        this.lastTick = Date.now();
    }
}