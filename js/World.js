import Materials from "./Materials.js";
import { Ball } from "./Ball.js";
import { Player } from "./Player.js";


export class World{
    constructor(){
        this.lastTick = Date.now();
        this.world = new p2.World({gravity: [0, 0]});
        this.fal1 = new p2.Body();
        this.fal1Shape = new p2.Plane({material: Materials.falMaterial});
        this.fal2 = new p2.Body();
        this.fal2Shape = new p2.Plane({material: Materials.falMaterial});
        this.fal3 = new p2.Body();
        this.fal3Shape = new p2.Plane({material: Materials.falMaterial});
        this.fal4 = new p2.Body();
        this.fal4Shape = new p2.Plane({material: Materials.falMaterial});
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
        this.ball = new Ball();
        this.player = new Player();
        this.world.addBody(this.ball.body);
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
    
            // x += normX * ball.speed * deltaTime / 100;
            // y += normY * ball.speed * deltaTime / 100;
            this.player.body.velocity = [normX * this.ball.speed * 50, normY * this.ball.speed * 50];
    
        }
    
        let tortentLoves = loves && this.world.overlapKeeper.bodiesAreOverlapping(this.player.body, this.ball.body);
        if (tortentLoves) {
    
            let lovesX = this.ball.body.position[0] - this.player.body.position[0];
            let lovesY = this.ball.body.position[1] - this.player.body.position[1];
            let normalizaltLoves = p2.vec2.create();
            p2.vec2.normalize(normalizaltLoves, [lovesX, lovesY])
    
            this.ball.body.velocity[0] = normalizaltLoves[0] * 1000;
            this.ball.body.velocity[1] = normalizaltLoves[1] * 1000;
    
        }
        this.lastTick = Date.now();
    }
}