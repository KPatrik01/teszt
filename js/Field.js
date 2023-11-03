import Materials from "./Materials.js";
import { Ball } from "./Ball.js";


export class Field{
    constructor(world, position,player){
        this.world = world;
        this.position = position;
        this.player = player;
        this.palyaSzelesseg = 1000;
        this.palyaMagassag = 700;
        this.kapuSzelesseg = 200;
        this.verticalFalHosszusag = (this.palyaMagassag - this.kapuSzelesseg)/2
        this.balSzel = this.position[0]-this.palyaSzelesseg/2;
        this.jobbSzel = this.position[0]+this.palyaSzelesseg/2;
        this.alSzel = this.position[1]+this.palyaMagassag/2;
        this.felSzel = this.position[1]-this.palyaMagassag/2;

        this.balGoalSensor = new p2.Body({collisionResponse: false});
        this.balGoalSensorShape = new p2.Box({width: 30, height: this.kapuSzelesseg});
        this.jobbGoalSensor = new p2.Body({collisionResponse: false});
        this.jobbGoalSensorShape = new p2.Box({width: 30, height: this.kapuSzelesseg});

        this.falFelso = new p2.Body();
        this.falFelsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30});
        this.falAlso = new p2.Body();
        this.falAlsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30})

        this.falBalFelso = new p2.Body();
        this.falBalFelsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});
        this.falBalAlso = new p2.Body();
        this.falBalAlsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});

        this.falJobbFelso = new p2.Body();
        this.falJobbFelsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});
        this.falJobbAlso = new p2.Body();
        this.falJobbAlsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag});

        this.balGoalSensor.position = [this.balSzel-30, this.felSzel+this.palyaMagassag/2];
        this.jobbGoalSensor.position = [this.jobbSzel+30, this.felSzel+this.palyaMagassag/2];

        this.falFelso.position = [this.balSzel+this.palyaSzelesseg/2, this.felSzel-10];
        this.falAlso.position = [this.balSzel+this.palyaSzelesseg/2, this.alSzel+10];

        this.falBalFelso.position = [this.balSzel-10, this.felSzel+this.verticalFalHosszusag/2];
        this.falBalAlso.position = [this.balSzel-10, this.alSzel-this.verticalFalHosszusag/2];
        this.falJobbFelso.position = [this.jobbSzel+10, this.felSzel+this.verticalFalHosszusag/2];
        this.falJobbAlso.position = [this.jobbSzel+10, this.alSzel-this.verticalFalHosszusag/2];


        this.falFelso.addShape(this.falFelsoShape, [0, 0], 0);
        this.falAlso.addShape(this.falAlsoShape, [0, 0], 0);

        this.balGoalSensor.addShape(this.balGoalSensorShape, [0, 0], 0);
        this.falBalFelso.addShape(this.falBalFelsoShape, [0, 0], 0);
        this.falBalAlso.addShape(this.falBalAlsoShape, [0, 0], 0);

        this.jobbGoalSensor.addShape(this.jobbGoalSensorShape, [0, 0], 0);
        this.falJobbFelso.addShape(this.falJobbFelsoShape, [0, 0], 0);
        this.falJobbAlso.addShape(this.falJobbAlsoShape, [0, 0], 0);
        
        this.world.addBody(this.balGoalSensor);
        this.world.addBody(this.jobbGoalSensor);
        this.world.addBody(this.falFelso);
        this.world.addBody(this.falAlso);

        this.world.addBody(this.falBalFelso);
        this.world.addBody(this.falBalAlso);

        this.world.addBody(this.falJobbFelso);
        this.world.addBody(this.falJobbAlso);


        this.ball = new Ball(this.position);


        this.world.addBody(this.ball.body);

        this.world.on("beginContact", event => {

            const bodies = [event.bodyA, event.bodyB];
            const shapes = [event.shapeA, event.shapeB];

            const ballIndex = bodies.findIndex(body => body == this.ball.body);
            if(ballIndex < 0) {
                return;
            }

            const other = bodies[1-ballIndex];

            if(other == this.balGoalSensor || other == this.jobbGoalSensor) {
                console.log("GOAL");
                this.ball.body.position = [1050, 500];
                this.ball.body.velocity = [0, 0];
                
            }

        })
        
    }

    calculatePhysics(){
        let tortentLoves = this.player.kick && this.world.overlapKeeper.bodiesAreOverlapping(this.player.body, this.ball.body);
        if (tortentLoves) {
    
            let lovesX = this.ball.body.position[0] - this.player.body.position[0];
            let lovesY = this.ball.body.position[1] - this.player.body.position[1];
            let normalizaltLoves = p2.vec2.create();
            p2.vec2.normalize(normalizaltLoves, [lovesX, lovesY])
    
            this.ball.body.velocity[0] = normalizaltLoves[0] * 1000;
            this.ball.body.velocity[1] = normalizaltLoves[1] * 1000;
    
        }
    }
}