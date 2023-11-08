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
        
        //Update_fields (Uj koordi a playernek. (Player.js))

        this.player = new Player();
        this.fields = [];

        const field_2v2_1 = new Field(this.world, [120, 200], this.player, 1500, 1050, 300);
        this.fields.push(field_2v2_1);
        const field_3v3_1 = new Field(this.world, [0, 1537.5], this.player, 1750, 1225, 350);
        this.fields.push(field_3v3_1);
        const fieldC_3v3_2 = new Field(this.world, [0, 2962.5], this.player, 1750, 1225, 350);
        this.fields.push(fieldC_3v3_2);
        const field_2v2_2 = new Field(this.world, [120, 4300], this.player, 1500, 1050, 300);
        this.fields.push(field_2v2_2);

        const field_1v1_1 = new Field(this.world, [1660, 0], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_1);
        const field_1v1_2 = new Field(this.world, [1660, 900], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_2);
        const field_1v1_3 = new Field(this.world, [1660, 1800], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_3);
        const field_1v1_4 = new Field(this.world, [1660, 2700], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_4);
        const field_1v1_5 = new Field(this.world, [1660, 3600], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_5);
        const field_1v1_6 = new Field(this.world, [1660, 4500], this.player, 1000, 700, 200);
        this.fields.push(field_1v1_6);

        const field_4v4 = new Field(this.world, [3387, 1493], this.player, 1875, 1312.5, 375);
        this.fields.push(field_4v4);

        const field_5v5 = new Field(this.world, [3420, 3028], this.player, 1937.5, 1356.25, 387.5);
        this.fields.push(field_5v5);
        



        
        
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