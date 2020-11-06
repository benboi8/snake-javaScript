let width = 800 - 6, height = 600 - 6;

function setup() {
  CreateBoard(width, height)
}

let score = 0;

let posX = width/2, posY = height/2;
let food = new Food();

let snake = new Snake(206, (height + 6) / 2, 1, 10);

let paused = false;
let isGameOver = false;


function draw() {
	if (!paused) {
		background(55, 55, 55);
	}
	frameRate(60);
	
	if (!isGameOver) {
		snake.drawBody();
		
		food.draw();
		
		snake.drawHead();
		
		if (!paused) {
			snake.Collide(food);
			snake.updatePos();	
		}else {
			textSize(128);
			fill("white");
			stroke(0);
			text("Paused", width / 4, height / 1.8);
		}
	}else {
		gameOver();
	}
	
}

function keyPressed() {
	if (keyCode == ESCAPE) {
		paused = !paused
	}else if(!paused) {
		snake.updateDirection();
	}
}