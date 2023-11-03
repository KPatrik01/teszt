import { World } from "./World.js";
import { View } from "./CanvasView.js";
import { PixiView } from "./PixiView.js";
document.getElementById("Start").addEventListener("click", ()=> startGame());


let targetX = 30;
let targetY = 30;
let szin = "red";
let kulsoSzin = "white";
let directionX = 0;
let directionY = 0;
let isMouse = false;
let loves = false;


let gameWorld = new World();

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
    const pixiView = new PixiView(gameWorld);
    pixiView.createWorld()
    menu.style.display = "none";



    


    // ez lesz a játéklogika loop
    window.setInterval(() => {
        // csak akkor számítunk irányt a körnek egérből, ha az isMouse beállítás igaz!
        if (isMouse == true) {
            // kiszámoljuk merre menjen a kör, egér alapján, targetX és Y segítségével
            calculateDirectionFromMouse();
        }

        // a fizikát is beröffentjük, 
        // ez a függvényhívás frissíti a fizikát újra és újra
        gameWorld.calculatePhysics(directionX, directionY, loves);
    }, 1000 / 60); // ilyen időközönként, 1000/60 -> 60 fps-es fizika. minél nagyobb az fps, annál pontosabb a fizika, de annál több CPU kell neki


        // figyeljük, ha valaki a canvas-on mozgatja a kurzorját
    // gameCanvas.addEventListener("mousemove", e => { // e az a mouse event
    //         // frissítsük be a célpontunk koordinátáit. 
    //     targetX = e.offsetX; // e.offsetX az az egér aktuális x pozíciója
    //     targetY = e.offsetY; // e.offsetY az az egér aktuális y pozíciója
    // });


    // gameCanvas.addEventListener("mousedown", e => {

    //     if(e.button == 0){
    //         gameWorld.player.speed = 8;
    //     } else {
    //         if (e.button == 2) {
    //             loves = true;
    //             gameWorld.player.kick = true;
    //             kulsoSzin = "red"
    //         }
    //     }

        

    // });
    
    // gameCanvas.addEventListener("mouseup", e => {

    //     if(e.button == 0){
    //         gameWorld.player.speed = 5;
    //     } else {
    //         if (e.button == 2) {
    //             loves = false;
    //             gameWorld.player.kick = false;
    //             kulsoSzin = "white";
    //         }
    //     }

    // });


    // figyeljük a billentyű lenyomást
//     document.addEventListener("keydown", e => {
//         // megnyomta az m-et?
//         if(e.key === "m") {
//             // kapcsoljuk át -> ! jel ellenkezőjére állítja, így fog müködni tovább a program
//             isMouse = !isMouse;

//             // le kell nulláznunk az irányokat, mert h nem, megy tovább a kör a target irányba ész nélkül
//             directionX = 0;
//             directionY = 0;
//             gameWorld.player.body.velocity[0] = 0;
//             gameWorld.player.body.velocity[1] = 0;
//         }

//         // ha mouse irányítás van, return -> nincs több tennivaló
//         if (isMouse) {
//             return;
//         }


//         if(e.key === "c") {
//             gameWorld.player.speed = 8;
//         }

//         if(e.key === "x") {
//             loves = true;
//             gameWorld.player.kick = true;
//             szin = "green";
//         }

//         // kezeljük le az irányokat
//         if (e.key == "ArrowRight") {
//             directionX = 1;
//         }
//         if (e.key == "ArrowLeft") {
//             directionX = -1;
//         }
//         if (e.key == "ArrowUp") {
//             directionY = -1;
//         }
//         if (e.key == "ArrowDown") {
//             directionY = 1;
//         }
//     });

//     document.addEventListener("keyup", e => {
//         gameWorld.player.speed = 5;

//         if(e.key === "x") {
//             loves = false;
//             gameWorld.player.kick = false;
//             szin = "red";
//         }

//         if (e.key == "ArrowRight") {
//             directionX = 0;
//             gameWorld.player.body.velocity[0] = 0;
//         }
//         if (e.key == "ArrowLeft") {
//             directionX = 0;
//             gameWorld.player.body.velocity[0] = 0;
//         }
//         if (e.key == "ArrowUp") {
//             directionY = 0;
//             gameWorld.player.body.velocity[1] = 0;
//         }
//         if (e.key == "ArrowDown") {
//             directionY = 0;
//             gameWorld.player.body.velocity[1] = 0;
//         }
//     });



}

function calculateDirectionFromMouse() {
    // merre is kéne a körnek mennie?
    // a dir az az vektor, ami összeköti a célpontot és a kör aktuális pozícióját
    // ezen a vektoron kellene a körnek haladnia
    const dirX = (targetX - gameWorld.player.body.position[0]); // EZ NEM EGYSÉGVEKTOR MÉG!
    const dirY = (targetY - gameWorld.player.body.position[1]); // EZ NEM EGYSÉGKEVTOR MÉG!
    
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
        gameWorld.player.body.velocity = [0, 0];
        // nem kell menni -> legyen az irány 0,0 azaz semerre se mutasson az irányvektor
        // a fizika nem fogja sehova se továbbpakolni a kört így szerencsére :)
        directionX = 0;
        directionY = 0;
    }
}

