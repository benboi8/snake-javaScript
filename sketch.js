let width = 800, height = 600;

function setup() {
  CreateBoard(width, height)
}

let posX = width/2, posY = height/2;
let foodPosX = Math.round((Math.floor(Math.random() * Math.floor(width - 25))) / 25) * 25;
let foodPosY = Math.round((Math.floor(Math.random() * Math.floor(height - 25))) / 25) * 25;
let food = new Food(foodPosX + 4, foodPosY + 4);

let snake = new Snake(200, height / 2, 1, 20);

let paused = false;

function draw() {
	background(55, 55, 55);
	frameRate(60);
	
	snake.drawBody();
	snake.drawHead();
	
	// snake.addBodyPart();
	
	if (!paused) {
		snake.updatePos();	
		snake.foodCollide(foodPosX, foodPosY);
	}else {
		textSize(128);
		fill("white");
		text("Paused", width / 4, height / 1.8);
	}
	
	/*for (var i = 0; i < width; i+=25) {
		strokeWeight(4);
		stroke('rgb(200, 200, 200)');
		line(i, 0, i, height);
	}
	
	for (var i = 0; i < height; i+=25) {
		strokeWeight(4);
		stroke('rgb(200, 200, 200)');
		line(0, i, width, i);
	}*/
	
	food.draw();
}

function keyPressed() {
	if (keyCode == ESCAPE) {
		paused = !paused
	}else if(!paused) {
		snake.updateDirection();
	}
}