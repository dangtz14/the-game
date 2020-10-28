  
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// VARIABLES
let apples = [];
let frames = 0;
let score = 0;

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

// LUIGI IMAGE

const luigiImg = {

}

// LUIGI

class Luigi {
    constructor (width, height) {
        this.x = 100;
        this.y = 100;
        this.width = width;
        this.height = height;
        this.form = new Image();
        this.form.src = "../images/LUIGI.png" 
    }
    draw() {
        ctx.drawImage(this.form, this.x, this.y, this.width, this.height)
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
let update = function (modifier) {
	if (38 in keysDown) {
		luigi.y -= luigi.speed * modifier;
	}
	if (40 in keysDown) {
		luigi.y += luigi.speed * modifier;
	}
	if (37 in keysDown) {
		luigi.x -= luigi.speed * modifier;
	}
	if (39 in keysDown) {
		luigi.x += luigi.speed * modifier;
    }
}

// COLLISION (GAME OVER) // COMENTED DUE TO ERROR ON PAGE

// if (
//     luigi.x <= (apple.x + 32)
//     && apple.x <= (luigi.x + 32)
//     && luigi.y <= (apple.y + 32)
//     && apple.y <= (luigi.y + 32)
// ) {
//     reset();
// };

// UPDATE GAME

const fondo = new Background ()
const luigi = new Luigi ()

updateGame = () => {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    luigi.draw()
    fondo.draw()
    generateApples()
    drawApples()
    //gameArea.score()
    requestAnimationFrame(updateGame);
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
            //score += 10
            return apples.splice(index, 1)
        }
        apple.draw()
    })
}

// SCORE
// var gameArea = {

//     score: function () {
//         var points = Math.floor(this.frames / 5);
//         ctx.fillStyle = "rgb(250, 250, 250)";
//         ctx.font = "24px Helvetica";
//         ctx.textAlign = "left";
//         ctx.textBaseline = "top";
//         ctx.fillText("Score: " + points, 8, 20);
//         }
//     };
//drawScore();
    
   

updateGame();