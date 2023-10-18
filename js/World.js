import Materials from "./Materials.js";
import { Ball } from "./Ball.js";
import { Player } from "./Player.js";


export class World{
    constructor(){
        this.lastTick = Date.now();
        this.world = new p2.World({gravity: [0, 0]});
        this.falFelso = new p2.Body();
        this.falFelsoShape = new p2.Plane({material: Materials.falMaterial});
        this.falBal = new p2.Body();
        this.falBalShape = new p2.Plane({material: Materials.falMaterial});
        this.falJobb = new p2.Body();
        this.falJobbShape = new p2.Plane({material: Materials.falMaterial});
        this.falAlso = new p2.Body();
        this.falAlsoShape = new p2.Plane({material: Materials.falMaterial});

        this.palyaSzelesseg = 1000;
        this.palyaMagassag = 800;
        this.balSzel = window.innerWidth/2-this.palyaSzelesseg/2;
        this.jobbSzel = window.innerWidth/2+this.palyaSzelesseg/2;
        this.alSzel = window.innerHeight/2+this.palyaMagassag/2;
        this.felSzel = window.innerHeight/2-this.palyaMagassag/2;



        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.ballMaterial, {friction: 500, restitution: 0}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}));
        this.falFelso.addShape(this.falFelsoShape, [this.balSzel, this.felSzel], 0);
        this.falBal.addShape(this.falBalShape, [this.balSzel, this.felSzel], -Math.PI/2);
        this.falJobb.addShape(this.falJobbShape, [this.jobbSzel, this.alSzel], Math.PI/2);
        this.falAlso.addShape(this.falAlsoShape, [this.jobbSzel, this.alSzel], Math.PI);
        
        this.world.addBody(this.falFelso);
        this.world.addBody(this.falBal);
        this.world.addBody(this.falJobb);
        this.world.addBody(this.falAlso);

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