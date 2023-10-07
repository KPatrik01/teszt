let targetX = 30;
let targetY = 30;
let speed = 5;
let lastTick = Date.now();
let szin = "red";
let kulsoSzin = "white";
let directionX = 0;
let directionY = 0;
let isMouse = false;
let loves = false;
let material = new p2.Material();
let playerMaterial = new p2.Material();
let falMaterial = new p2.Material();
let world = new p2.World({gravity: [0, 0]});
world.addContactMaterial(new p2.ContactMaterial(playerMaterial, material, {friction: 500, restitution: 0}));
world.addContactMaterial(new p2.ContactMaterial(playerMaterial, falMaterial, {friction: 0, stiffness: Number.POSITIVE_INFINITY}))
let body = new p2.Body({mass: 4, damping: 0.6, angularDamping: 0.4});
let shape = new p2.Circle({radius: 8, material: material});
let playerBody = new p2.Body({mass: 1, damping: 0, angularDamping: 0, fixedRotation: true});
let playerShape = new p2.Circle({radius: 22, material: playerMaterial});
let fal1 = new p2.Body();
let fal1Shape = new p2.Plane({material: falMaterial});
let fal2 = new p2.Body();
let fal2Shape = new p2.Plane({material: falMaterial});
let fal3 = new p2.Body();
let fal3Shape = new p2.Plane({material: falMaterial});
let fal4 = new p2.Body();
let fal4Shape = new p2.Plane({material: falMaterial});

function settingsPage() {
    if(menu.style.display = "block") {
        menu.style.display = "none";
        back.style.display = "block";
        beallitasok.style.display = "block";
    }

}

function backPage() {
    if(beallitasok.style.display = "block") {
        beallitasok.style.display = "none";
        menu.style.display = "block";
        back.style.display = "none";
    }

}



function startGame() {
    const gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    gameCanvas.style.display = "block";
    menu.style.display = "none";
    hatterJs.style.display = "none";
    hatterLogo.style.display = "none";
    footerJs.style.display = "none";
    footerJsVer.style.display = "none";

    body.addShape(shape);
    fal1.addShape(fal1Shape, [0, 0], 0);
    fal2.addShape(fal2Shape, [0, 0], -Math.PI/2);
    fal3.addShape(fal3Shape, [1000, 0], Math.PI/2);
    fal4.addShape(fal4Shape, [1000, 800], Math.PI);
    world.addBody(body);
    body.position = [200, 200];
    playerBody.addShape(playerShape);
    world.addBody(playerBody);
    world.addBody(fal1);
    world.addBody(fal2);
    world.addBody(fal3);
    world.addBody(fal4);
    playerBody.position = [100, 100];

    

    redraw(gameCanvas);

        // ez lesz a játéklogika loop
        window.setInterval(() => {
            // csak akkor számítunk irányt a körnek egérből, ha az isMouse beállítás igaz!
            if (isMouse == true) {
                // kiszámoljuk merre menjen a kör, egér alapján, targetX és Y segítségével
                calculateDirectionFromMouse();
            }
    
            // a fizikát is beröffentjük, 
            // ez a függvényhívás frissíti a fizikát újra és újra
            calculatePhysics();
        }, 1000 / 60); // ilyen időközönként, 1000/60 -> 60 fps-es fizika. minél nagyobb az fps, annál pontosabb a fizika, de annál több CPU kell neki


        // figyeljük, ha valaki a canvas-on mozgatja a kurzorját
    gameCanvas.addEventListener("mousemove", e => { // e az a mouse event
            // frissítsük be a célpontunk koordinátáit. 
        targetX = e.offsetX; // e.offsetX az az egér aktuális x pozíciója
        targetY = e.offsetY; // e.offsetY az az egér aktuális y pozíciója
    });


    gameCanvas.addEventListener("mousedown", e => {

        if(e.button == 0){
            speed = 8;
        } else {
            if (e.button == 2) {
                loves = true;
                szin = "green";
                kulsoSzin = "red"
            }
        }

        

    });
    
    gameCanvas.addEventListener("mouseup", e => {

        if(e.button == 0){
            speed = 5;
        } else {
            if (e.button == 2) {
                loves = false;
                szin = "red";
                kulsoSzin = "white";
            }
        }

    });


    // figyeljük a billentyű lenyomást
    document.addEventListener("keydown", e => {
        // megnyomta az m-et?
        if(e.key === "m") {
            // kapcsoljuk át -> ! jel ellenkezőjére állítja, így fog müködni tovább a program
            isMouse = !isMouse;

            // le kell nulláznunk az irányokat, mert h nem, megy tovább a kör a target irányba ész nélkül
            directionX = 0;
            directionY = 0;
            playerBody.velocity[0] = 0;
            playerBody.velocity[1] = 0;
        }

        // ha mouse irányítás van, return -> nincs több tennivaló
        if (isMouse) {
            return;
        }


        if(e.key === "c") {
            speed = 8;
        }

        if(e.key === "x") {
            szin = "green";
        }

        // kezeljük le az irányokat
        if (e.key == "ArrowRight") {
            directionX = 1;
        }
        if (e.key == "ArrowLeft") {
            directionX = -1;
        }
        if (e.key == "ArrowUp") {
            directionY = -1;
        }
        if (e.key == "ArrowDown") {
            directionY = 1;
        }
    });

    document.addEventListener("keyup", e => {
        speed = 5;

        if(e.key === "x") {
            szin = "red";
        }

        if (e.key == "ArrowRight") {
            directionX = 0;
            playerBody.velocity[0] = 0;
        }
        if (e.key == "ArrowLeft") {
            directionX = 0;
            playerBody.velocity[0] = 0;
        }
        if (e.key == "ArrowUp") {
            directionY = 0;
            playerBody.velocity[1] = 0;
        }
        if (e.key == "ArrowDown") {
            directionY = 0;
            playerBody.velocity[1] = 0;
        }
    });



}

function calculateDirectionFromMouse() {
    // merre is kéne a körnek mennie?
    // a dir az az vektor, ami összeköti a célpontot és a kör aktuális pozícióját
    // ezen a vektoron kellene a körnek haladnia
    const dirX = (targetX - playerBody.position[0]); // EZ NEM EGYSÉGVEKTOR MÉG!
    const dirY = (targetY - playerBody.position[1]); // EZ NEM EGYSÉGKEVTOR MÉG!
    
    // milyen messze vagyunk ?
    const length = Math.sqrt(dirX * dirX + dirY * dirY);

    if (length > 5) {
        // menni kell valamilyen irányba ->
        // legyen a directionX a dirX, de egységvektor kell -> le kell osztani a dir  egységvektor
        directionX = dirX;

        // ugyanez y-ra
        directionY = dirY;
        // ezek után a fizika majd pakolgatja a jó irányba a kört!
        
    } else {
        playerBody.velocity = [0, 0];
        // nem kell menni -> legyen az irány 0,0 azaz semerre se mutasson az irányvektor
        // a fizika nem fogja sehova se továbbpakolni a kört így szerencsére :)
        directionX = 0;
        directionY = 0;
    }
}

function calculatePhysics() {
    const deltaTime = Date.now() - lastTick;
    world.step(deltaTime / 1000)

    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    playerBody.velocity = [0, 0];
    if (length > 0) {
        const normX = directionX / length;
        const normY = directionY / length;

        // x += normX * speed * deltaTime / 100;
        // y += normY * speed * deltaTime / 100;
        playerBody.velocity = [normX * speed * 50, normY * speed * 50];

    }

    let tortentLoves = loves && world.overlapKeeper.bodiesAreOverlapping(playerBody, body);
    if (tortentLoves) {

        let lovesX = body.position[0] - playerBody.position[0];
        let lovesY = body.position[1] - playerBody.position[1];
        let normalizaltLoves = p2.vec2.create();
        p2.vec2.normalize(normalizaltLoves, [lovesX, lovesY])

        body.velocity[0] = normalizaltLoves[0] * 1000;
        body.velocity[1] = normalizaltLoves[1] * 1000;

    }
    lastTick = Date.now();
}

function redraw(canvas) {
    const ctx = canvas.getContext("2d");

    // tisztítsuk le a canvast minden rajzolás előtt!
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 1000, 800);


    drawWalls(canvas);

    // rajzoljuk ki a kört a canvasra, adott color-al, adott x és y pozícióra
    drawCircle(canvas, 22, szin, playerBody.position[0], playerBody.position[1]);
    // Rajzoljuk ki a labdát
    drawCircle(canvas, labda.radius, labda.szin, body.position[0], body.position[1]);

    // ha van irányunk, nem nulla hosszú, rajzoljuk ki
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    if (length > 0) {
        const normX = directionX / length;
        const normY = directionY / length;
        drawDirection(canvas, normX, normY);
    }
    // kérjük a böngészőt, hogy szóljon, ha újra rajzolhatunk -> ezért hívjuk amúgy redraw-nak a függvényt
    // újra és újra rajzolunk amikor lehet...
    window.requestAnimationFrame(() => redraw(canvas));
}

function drawWalls(canvas) {

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    drawWall(canvas, [0, 0], [1000, 0]);
    drawWall(canvas, [1000, 0], [1000, 800]);
    drawWall(canvas, [1000, 800], [0, 800]);
    drawWall(canvas, [0, 800], [0, 0]);
    ctx.lineWidth = 1;

}

function drawWall(canvas, start, end) {

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();

}


//Labda
const labda = {
    radius: 8,  // A labda sugara
    szin: "blue",  // A labda színe
  };

// rajzoljunk egy kört
function drawCircle(canvas, radius, szin, x, y) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = szin;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawDirection(canvas, normX, normY) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(playerBody.position[0], playerBody.position[1]);
    ctx.lineTo(playerBody.position[0] + normX * 22, playerBody.position[1] + normY * 22);
    ctx.stroke();
    ctx.closePath();
}
