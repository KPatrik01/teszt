import Materials from "./Materials.js";
import { Ball } from "./Ball.js";
import collisionGroups from "./CollisionGroups.js";
import { FieldShape } from "./FieldShape.js";
import * as pixiView from "./PixiView.js"


export class Field{
    constructor(world, position,player, palyaSzelesseg, palyaMagassag, kapuSzelesseg){
        this.world = world;
        this.position = position;
        this.player = player;
        this.palyaSzelesseg = palyaSzelesseg;
        this.palyaMagassag = palyaMagassag;
        this.kapuSzelesseg = kapuSzelesseg;
        this.postRadius = 3;
        this.verticalFalHosszusag = (this.palyaMagassag - this.kapuSzelesseg)/2
        this.balSzel = this.position[0]-this.palyaSzelesseg/2;
        this.jobbSzel = this.position[0]+this.palyaSzelesseg/2;
        this.alSzel = this.position[1]+this.palyaMagassag/2;
        this.felSzel = this.position[1]-this.palyaMagassag/2;
        this.balGol = 0;
        this.jobbGol = 0;
        

        //Fal és Gól szenzor
        this.balGoalSensor = new p2.Body({collisionResponse: false});
        this.balGoalSensorShape = new p2.Box({width: 30, height: this.kapuSzelesseg, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});
        this.jobbGoalSensor = new p2.Body({collisionResponse: false});
        this.jobbGoalSensorShape = new p2.Box({width: 30, height: this.kapuSzelesseg, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});

        this.falFelso = new p2.Body();
        this.falFelsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});
        this.falAlso = new p2.Body();
        this.falAlsoShape = new p2.Box({material: Materials.falMaterial, width: this.palyaSzelesseg+30, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})

        this.falBalFelso = new p2.Body();
        this.falBalFelsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});
        this.falBalAlso = new p2.Body();
        this.falBalAlsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});

        this.falJobbFelso = new p2.Body();
        this.falJobbFelsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});
        this.falJobbAlso = new p2.Body();
        this.falJobbAlsoShape = new p2.Box({material: Materials.falMaterial, width: 30, height: this.verticalFalHosszusag, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball});

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

        //Kapufa
        this.balFelsoKapufa = new p2.Body();
        this.balAlsoKapufa = new p2.Body();
        this.jobbFelsoKapufa = new p2.Body();
        this.jobbAlsoKapufa = new p2.Body();
        this.balFelsoKapufaShape = new p2.Circle({material: Materials.falMaterial, radius: this.postRadius, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball | collisionGroups.player})
        this.balAlsoKapufaShape =  new p2.Circle({material: Materials.falMaterial, radius: this.postRadius, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball | collisionGroups.player})
        this.jobbFelsoKapufaShape  =  new p2.Circle({material: Materials.falMaterial, radius: this.postRadius, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball | collisionGroups.player})
        this.jobbAlsoKapufaShape  =  new p2.Circle({material: Materials.falMaterial, radius: this.postRadius, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball | collisionGroups.player})
        this.balFelsoKapufa.position = [this.balSzel, this.felSzel+this.verticalFalHosszusag];
        this.balAlsoKapufa.position = [this.balSzel, this.alSzel-this.verticalFalHosszusag];
        this.jobbFelsoKapufa.position = [this.jobbSzel, this.felSzel+this.verticalFalHosszusag];
        this.jobbAlsoKapufa.position = [this.jobbSzel, this.alSzel-this.verticalFalHosszusag];

        this.balFelsoKapufa.addShape(this.balFelsoKapufaShape, [0, 0], 0);
        this.balAlsoKapufa.addShape(this.balAlsoKapufaShape, [0, 0], 0);
        this.jobbFelsoKapufa.addShape(this.jobbFelsoKapufaShape, [0, 0], 0);
        this.jobbAlsoKapufa.addShape(this.jobbAlsoKapufaShape, [0, 0], 0);

        this.world.addBody(this.balFelsoKapufa);
        this.world.addBody(this.balAlsoKapufa);
        this.world.addBody(this.jobbFelsoKapufa);
        this.world.addBody(this.jobbAlsoKapufa);

        //Kapu falai

        this.balKapuFal1 = new p2.Body();
        this.balKapuFal2 = new p2.Body();
        this.balKapuFal3 = new p2.Body();
        this.jobbKapuFal1 = new p2.Body();
        this.jobbKapuFal2 = new p2.Body();
        this.jobbKapuFal3 = new p2.Body();
        this.balKapuFal1Shape = new p2.Box({
            material: Materials.goalMaterial, 
            width: this.verticalFalHosszusag/8, 
            height: 30, 
            collisionGroup: collisionGroups.fal, 
            collisionMask: collisionGroups.ball
        })
        this.balKapuFal2Shape = new p2.Box({
            material: Materials.goalMaterial, width: 30, height: this.kapuSzelesseg, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})
        this.balKapuFal3Shape = new p2.Box({material: Materials.goalMaterial, width: this.verticalFalHosszusag/8, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})
        this.jobbKapuFal1Shape = new p2.Box({material: Materials.goalMaterial, width: this.verticalFalHosszusag/8, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})
        this.jobbKapuFal2Shape = new p2.Box({material: Materials.goalMaterial, width: 30, height: this.kapuSzelesseg, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})
        this.jobbKapuFal3Shape = new p2.Box({material: Materials.goalMaterial, width: this.verticalFalHosszusag/8, height: 30, collisionGroup: collisionGroups.fal, collisionMask: collisionGroups.ball})

        this.balKapuFal1.position = [this.balSzel - this.verticalFalHosszusag/16, this.felSzel + this.verticalFalHosszusag-10];
        this.balKapuFal2.position = [this.balSzel - (this.verticalFalHosszusag/8)-10, this.felSzel + this.palyaMagassag/2];
        this.balKapuFal3.position = [this.balSzel - this.verticalFalHosszusag/16, this.alSzel - this.verticalFalHosszusag+10];
        this.jobbKapuFal1.position = [this.jobbSzel + this.verticalFalHosszusag/16, this.felSzel + this.verticalFalHosszusag-10];
        this.jobbKapuFal2.position = [this.jobbSzel + (this.verticalFalHosszusag/8)+10, this.felSzel + this.palyaMagassag/2];
        this.jobbKapuFal3.position = [this.jobbSzel + this.verticalFalHosszusag/16, this.alSzel - this.verticalFalHosszusag+10];

        this.balKapuFal1.addShape(this.balKapuFal1Shape, [0, 0], 0);
        this.balKapuFal2.addShape(this.balKapuFal2Shape, [0, 0], 0);
        this.balKapuFal3.addShape(this.balKapuFal3Shape, [0, 0], 0);
        this.jobbKapuFal1.addShape(this.jobbKapuFal1Shape, [0, 0], 0);
        this.jobbKapuFal2.addShape(this.jobbKapuFal2Shape, [0, 0], 0);
        this.jobbKapuFal3.addShape(this.jobbKapuFal3Shape, [0, 0], 0);

        this.world.addBody(this.jobbKapuFal1);
        this.world.addBody(this.jobbKapuFal2);
        this.world.addBody(this.jobbKapuFal3);
        this.world.addBody(this.balKapuFal1);
        this.world.addBody(this.balKapuFal2);
        this.world.addBody(this.balKapuFal3);


        this.resetButton = new p2.Body({collisionResponse: false});
        this.resetButtonShape = new p2.Circle({radius: this.postRadius, collisionGroup: collisionGroups.button, collisionMask: collisionGroups.player});
        this.resetButton.position = [this.balSzel + this.palyaSzelesseg/2, this.felSzel - 20];
        this.resetButton.addShape(this.resetButtonShape, [0, 0], 0);
        this.world.addBody(this.resetButton);



        this.ball = new Ball([this.position[0],this.position[1]]);


        this.world.addBody(this.ball.body);

        this.world.on("beginContact", event => {

            const bodies = [event.bodyA, event.bodyB];
            const shapes = [event.shapeA, event.shapeB];

            const ballIndex = bodies.findIndex(body => body == this.ball.body);
            const buttonIndex = bodies.findIndex(body => body == this.resetButton);
            const playerIndex = bodies.findIndex(body => body == this.player.body);
            if (buttonIndex >= 0 && playerIndex >= 0){
                this.reset=true;
            }
            if(ballIndex < 0) {
                return;
            }

            const other = bodies[1-ballIndex];

            if(other == this.balGoalSensor) {
                this.jobbGol+=1;
                this.resultText = this.balGol+" - "+this.jobbGol;
                setTimeout(()=> this.resetBall(),2000);
            }
            if(other == this.jobbGoalSensor) {
                this.balGol+=1;
                this.resultText = this.balGol+" - "+this.jobbGol;
                setTimeout(()=> this.resetBall(),2000);
            }

        });
        this.world.on("endContact", event => {
            const bodies = [event.bodyA, event.bodyB];
            const buttonIndex = bodies.findIndex(body => body == this.resetButton);
            const playerIndex = bodies.findIndex(body => body == this.player.body);
            if (buttonIndex >= 0 && playerIndex >= 0){
                this.reset=false;
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
    resetBall(){
        this.ball.body.position[0] = this.position[0];
        this.ball.body.position[1] = this.position[1];
        this.ball.body.velocity = [0, 0];
    }
    resetMatch(){
        this.balGol = 0;
        this.jobbGol = 0;
        this.resetBall();
    }

    
}

