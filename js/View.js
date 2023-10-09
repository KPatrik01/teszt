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
        ctx.fillRect(0, 0, 1000, 800);
    
    
        this.drawWalls(this.canvas);
    
        // rajzoljuk ki a kört a this.canvasra, adott color-al, adott x és y pozícióra
        this.drawCircle(this.canvas, 22, "blue", this.gameWorld.player.body.position[0], this.gameWorld.player.body.position[1]);
        // Rajzoljuk ki a labdát
        this.drawCircle(this.canvas, this.labda.radius, this.labda.szin, this.gameWorld.ball.body.position[0], this.gameWorld.ball.body.position[1]);
    
        // ha van irányunk, nem nulla hosszú, rajzoljuk ki
        const length = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
        if (length > 0) {
            const normX = this.directionX / length;
            const normY = this.directionY / length;
            this.drawDirection(this.canvas, normX, normY);
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
        this.drawWall(this.canvas, [0, 0], [1000, 0]);
        this.drawWall(this.canvas, [1000, 0], [1000, 800]);
        this.drawWall(this.canvas, [1000, 800], [0, 800]);
        this.drawWall(this.canvas, [0, 800], [0, 0]);
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