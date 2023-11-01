import Materials from "./Materials.js";


export class View{
    constructor(canvas, gameWorld){

        this.directionX = 0;
        this.directionY = 0;
        this.canvas = canvas;
        this.gameWorld = gameWorld;

            //Labda
        this.labda = {
            radius: 8,  // A labda sugara
            szin: "blue",  // A labda színe
        }
    }

    redraw() {
        const ctx = this.canvas.getContext("2d");
    
        // tisztítsuk le a this.canvast minden rajzolás előtt!
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        ctx.fillStyle = "green";
        ctx.fillRect(this.gameWorld.field.balSzel, this.gameWorld.field.felSzel, this.gameWorld.field.palyaSzelesseg, this.gameWorld.field.palyaMagassag);

    
        this.drawWalls();

        ctx.fillStyle = "red";
        ctx.fillRect(this.gameWorld.field.balGoalSensor.position[0]-15, this.gameWorld.field.balGoalSensor.position[1]-this.gameWorld.field.kapuSzelesseg/2, 30, this.gameWorld.field.kapuSzelesseg);
        ctx.fillRect(this.gameWorld.field.jobbGoalSensor.position[0]-15, this.gameWorld.field.jobbGoalSensor.position[1]-this.gameWorld.field.kapuSzelesseg/2, 30, this.gameWorld.field.kapuSzelesseg);

        let szin = this.gameWorld.player.kick ? "red" : "blue";
        // rajzoljuk ki a kört a this.canvasra, adott color-al, adott x és y pozícióra
        this.drawCircle(22, szin, this.gameWorld.player.body.position[0], this.gameWorld.player.body.position[1]);
        // Rajzoljuk ki a labdát
        this.drawCircle(this.labda.radius, this.labda.szin, this.gameWorld.field.ball.body.position[0], this.gameWorld.field.ball.body.position[1]);
    
        // ha van irányunk, nem nulla hosszú, rajzoljuk ki
        const length = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
        if (length > 0) {
            const normX = this.directionX / length;
            const normY = this.directionY / length;
            this.drawDirection(normX, normY);
        }
        // kérjük a böngészőt, hogy szóljon, ha újra rajzolhatunk -> ezért hívjuk amúgy redraw-nak a függvényt
        // újra és újra rajzolunk amikor lehet...
        window.requestAnimationFrame(() => this.redraw());
    }

    drawWalls() {

        const ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        this.drawWall([this.gameWorld.field.balSzel, this.gameWorld.field.felSzel], [this.gameWorld.field.jobbSzel, this.gameWorld.field.felSzel]);
        this.drawWall([this.gameWorld.field.jobbSzel, this.gameWorld.field.felSzel], [this.gameWorld.field.jobbSzel, this.gameWorld.field.alSzel]);
        this.drawWall([this.gameWorld.field.jobbSzel, this.gameWorld.field.alSzel], [this.gameWorld.field.balSzel, this.gameWorld.field.alSzel]);
        this.drawWall([this.gameWorld.field.balSzel, this.gameWorld.field.alSzel], [this.gameWorld.field.balSzel, this.gameWorld.field.felSzel]);
        ctx.lineWidth = 1;
    
    }
    
    drawWall(start, end) {
    
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.stroke();
        ctx.closePath();
    
    }
    
    
    // rajzoljunk egy kört
    drawCircle(radius, szin, x, y) {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = szin;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
    drawDirection(normX, normY) {
        const ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.gameWorld.player.body.position[0], this.gameWorld.player.body.position[1]);
        ctx.lineTo(this.gameWorld.player.body.position[0] + normX * 22, this.gameWorld.player.body.position[1] + normY * 22);
        ctx.stroke();
        ctx.closePath();
    }
}