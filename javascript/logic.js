  
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// VARIABLES
let apples = [];
let frames = 0;
let points = 0;
let requestID;
let isWin = false;
canvas.width = 1170;
canvas.height = 700;
document.body.appendChild(canvas);

// START BUTTON

var playing = false;
var startButton;

function startGame() {
    startButton.startGame();
    playing = true;
}


class Background {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.background = new Image();
        this.background.src = "../images/FONDO.jpg"
    }
    draw() {
        ctx.drawImage(this.background, 0, 0, this.width, this.height)
    }
}

// WON / LOST

class Status {
    constructor (width, height, x, y, img) {
    this.width = width;
    this.height = height;
    this.img = new Image ();
    this.img.src = img;
    this.x = x;
    this.y = y;
}
draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}
}

// LUIGI

class Luigi {
    constructor (width, height) {
        this.x = 400;
        this.y = 300;
        this.width = width;
        this.height = height;
        this.form = new Image();
        this.form.src = "../images/LUIGI.png"
        this.speed = 2;
    }
    draw() {
        ctx.drawImage(this.form, this.x, this.y, this.width, this.height)
    }
    collision(enemy) {
        return (this.x < enemy.x + enemy.width && 
            this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && 
            this.y + this.height > enemy.y)
    }
}

// ENEMIES

class Enemies {
    constructor (width, height, x) {
        this.x = x;
        this.y = 5;
        this.width = width;
        this.height = height;
        this.form = new Image();
        this.form.src = "../images/APPLE.png" 
    }
    draw() {
        this.y += 5
        ctx.drawImage(this.form, this.x, this.y, this.width, this.height)
    }
}

// CONTROLS

addEventListener("keydown", (e) => {
    e.preventDefault();
switch (e.keyCode) {
    case 38:
        if (luigi.y < 0) {
            return false
        }
        luigi.y -= luigi.speed * 9;        
        break;
        case 40:
            if (luigi.y + luigi.height > canvas.height) {
                return false
            }
        luigi.y += luigi.speed * 9;
        break;
        case 37:
            if (luigi.x < 0) {
                return false
            }
        luigi.x -= luigi.speed * 9;
        break;
        case 39:
            if (luigi.x + luigi.width > canvas.width) {
                return false
            }
        luigi.x += luigi.speed * 9;
        break;
    default:
        break;
}
});

const fondo = new Background ()
const luigi = new Luigi (200, 200)
const letreroPierdo = new Status (400, 400, 370, 290, "./../images/over.png")

updateGame = () => {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fondo.draw()
    luigi.draw()
    generateApples()
    drawApples()
    score()
    if (points >= 100) {
        isWin=true
        requestID=undefined
        //letreroGano.drwa
    }
   
    if (!requestID) {
            letreroPierdo.draw()
        //gameOver();

    }else{
        requestID = requestAnimationFrame(updateGame);
    }

    

}

// FUNCIÓN PARA GENERAR MUCHAS MANZANAS

generateApples = () => {
    const x = Math.floor(Math.random() * 18)
    const enemy = new Enemies (50, 50, x * 64)
    if (frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0) apples.push(enemy)
}

drawApples = () => {
    apples.forEach( (apple, index) => {
        if (apple.y > canvas.height) {
            points += 10
            return apples.splice(index, 1)
        }
        if (luigi.collision(apple)) {
            isWin=false
            requestID=undefined
        }
        apple.draw()
    })
}

gameOver = () => {

  
    console.log(isWin ? "You won!" : "Game Over")
    letrero.draw();
    
}

// SCORE

    score = () => {
        
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score: " + points, 8, 20);
    }

window.onload = () => {
    document.getElementById("startButton").onclick = () => {
        requestID = requestAnimationFrame(updateGame);

    }
}