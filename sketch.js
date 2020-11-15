let width = 800, height = 800;

function setup() {
  CreateBoard(width, height)
}

let score = 0;
let speed = 6;

let allFood = [];
let numOfFood = 1;
for (let i = 0; i < numOfFood; i++) {
	allFood.push(new Food());
}

let snake = new Snake(200, height / 2, 1, 3);

let paused = false;
let isGameOver = false;

let counter = 0;


function draw() {
	if (!paused) {
		background(55, 55, 55);
	}
	frameRate(60);
	
	if (!isGameOver) {
		snake.drawBody();
		
		for (let i = 0; i < allFood.length; i++) {
			allFood[i].draw(i);
		}
		
		snake.drawHead();
		
		
		if (!paused) {
			for (let i = 0; i < allFood.length; i++) {
				snake.Collide(allFood[i]);
			}
			if (counter >= speed) {
				snake.updatePos();	
				counter = 0;
			}
			counter++;
			
		}else {
			textSize(128);
			strokeWeight(6);
			fill("#cdcdcd");
			stroke("#202020");
			text("Paused", width / 4, height / 1.8);
		}
	}else {
		gameOver();
	}
	
}

function keyPressed() {
	if (keyCode == ESCAPE) {
		paused = !paused;
	}else if(!paused) {
		snake.updateDirection();
	}
}