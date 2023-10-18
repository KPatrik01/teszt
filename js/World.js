import Materials from "./Materials.js";
import { Ball } from "./Ball.js";
import { Player } from "./Player.js";


export class World{
    constructor(){
        this.lastTick = Date.now();
        this.world = new p2.World({gravity: [0, 0]});
        this.palyaSzelesseg = 1000;
        this.palyaMagassag = 800;
        this.kapuSzelesseg = 200;
        this.verticalFalHosszusag = (this.palyaMagassag - this.kapuSzelesseg)/2
        this.balSzel = window.innerWidth/2-this.palyaSzelesseg/2;
        this.jobbSzel = window.innerWidth/2+this.palyaSzelesseg/2;
        this.alSzel = window.innerHeight/2+this.palyaMagassag/2;
        this.felSzel = window.innerHeight/2-this.palyaMagassag/2;
        this.falFelso = new p2.Body();
        this.falFelsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30});

        this.falBalFelso = new p2.Body();
        this.falBalFelsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});
        this.falBalAlso = new p2.Body();
        this.falBalAlsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});

        this.falJobb = new p2.Body();
        this.falJobbShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.palyaMagassag+30});
        
        this.falAlso = new p2.Body();
        this.falAlsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30});
        this.falFelso.position = [this.balSzel+this.palyaSzelesseg/2, this.felSzel-10];

        this.falBalFelso.position = [this.balSzel-10, this.felSzel+this.verticalFalHosszusag/2];
        this.falBalAlso.position = [this.balSzel-10, this.alSzel-this.verticalFalHosszusag/2];

        this.falJobb.position = [this.jobbSzel+10, this.felSzel+this.palyaMagassag/2];
        this.falAlso.position = [this.balSzel+this.palyaSzelesseg/2, this.alSzel+10];
        



        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.ballMaterial, {friction: 500, restitution: 0}));
        this.world.addContactMaterial(new p2.ContactMaterial(Materials.playerMaterial, Materials.falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}));
        this.falFelso.addShape(this.falFelsoShape, [0, 0], 0);

        this.falBalFelso.addShape(this.falBalFelsoShape, [0, 0], 0);
        this.falBalAlso.addShape(this.falBalAlsoShape, [0, 0], 0);

        this.falJobb.addShape(this.falJobbShape, [0, 0], 0);
        this.falAlso.addShape(this.falAlsoShape, [0, 0], 0);
        
        this.world.addBody(this.falFelso);

        this.world.addBody(this.falBalFelso);
        this.world.addBody(this.falBalAlso);

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