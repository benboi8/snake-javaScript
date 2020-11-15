function CreateBoard(width, height) {
    createCanvas(width, height);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
	let result = Math.floor(Math.random() * (max - min + 1));
	return result;
}

function Round(numToRound, multiplier=25) {
	return (Math.ceil(numToRound / multiplier) * multiplier) - multiplier;
}


class Food {
	constructor(size=20) {
		this.size = size;
		this.posX = 500
		this.posY = height / 2
	}

	draw(index) {
		stroke('rgb(212, 30, 17)');
		fill('rgb(212, 30, 17)');
		strokeWeight(4);
		square(this.posX, this.posY, this.size);
		
		/*
		textSize(16);
		fill("white");
		stroke(0);
		text(index, this.posX, this.posY);
		*/
	}
	
	createNewFood(falseMoves) {
		let validMove = false;
		let currentValidMoves = [];
		while (!validMove) {
			this.posX = Round(getRandomInt(this.size, width - this.size));
			this.posY = Round(getRandomInt(this.size, height - this.size));
			for (let i = 0; i < falseMoves.length; i++) {
				let headPos = falseMoves[i].split(":");
				
				let headPosXString = headPos[0];
				let headPosYString = headPos[1];
				
				let bodyPosX = parseInt(headPosXString);
				let bodyPosY = parseInt(headPosYString);

				if (this.posX == bodyPosX && this.posY == bodyPosY) {
					this.posX = Round(getRandomInt(this.size, width - this.size));
					this.posY = Round(getRandomInt(this.size, height - this.size));
					currentValidMoves.push(false);
				}else {
					currentValidMoves.push(true);
				}
			}
			let isValid = true;
			for (let i = 0; i < currentValidMoves.length; i++) {
				if (currentValidMoves[i] == false) {
					isValid = false;
					currentValidMoves = [];
					this.posX = Round(getRandomInt(this.size, width - this.size));
					this.posY = Round(getRandomInt(this.size, height - this.size));
				}
			}
			if (isValid) {
				validMove = true;
			}else {
				this.posX = Round(getRandomInt(this.size, width - this.size));
				this.posY = Round(getRandomInt(this.size, height - this.size));
			}
		}
	}
}

class Snake {
	constructor(startX, startY, dir, len) {
		this.startX = startX;
		this.startY = startY;
		this.posX = startX;
		this.posY = startY;
		this.dir = dir;
		this.len = len * speed;
		this.size = 20;
		this.piece = 0;
		this.added = false;
		this.moveAmount = 25;
		this.moved = false;
		this.headMoves = [];
		this.bodyMoves = [];
	}
	
	drawHead() {
		fill('rgb(0, 255, 0)');
		stroke('rgb(0, 255, 0)');
		strokeWeight(4);
		
		this.headPosX = this.posX;
		this.headPosY = this.posY;
		square(this.headPosX, this.headPosY, this.size);
		
		let headPosXString = this.headPosX.toString();
		let headPosYString = this.headPosY.toString();
		let headPosString = headPosXString + ":" + headPosYString;
		
		if (!paused) {
			this.headMoves.push(headPosString);
		}

	}
	
	drawBody() {
		stroke('rgb(50, 255, 50)');
		fill('rgb(50, 255, 50)');
		strokeWeight(4);
		
		for (let i = 0; i < this.headMoves.length; i++) {
			let headPos = this.headMoves[i].split(":");
			
			let headPosXString = headPos[0];
			let headPosYString = headPos[1];
			
			this.bodyPosX = parseInt(headPosXString);
			this.bodyPosY = parseInt(headPosYString);
			
			square(this.bodyPosX, this.bodyPosY, this.size);
			
			if (!paused) {
				if (this.headMoves.length >= this.len) {
					this.headMoves.shift();
				}
				for (let j = 0; j < this.bodyMoves.length; j++) {
					if (this.bodyMoves[i] != this.headMoves[i]) {
						this.bodyMoves.shift();
					}
				}
				if (this.bodyPosX != this.headPosX && this.bodyPosY != this.headPosY) {
					let bodyPosXString = this.bodyPosX.toString();
					let bodyPosYString = this.bodyPosY.toString();
					this.bodyMoves.push(bodyPosXString + ":" + bodyPosYString);
					console.log(this.bodyMoves);
				}
			}
		}
	}

	updatePos() {
		if (this.dir == 1) {
			this.posX += this.moveAmount;
			this.moved = true;
		}else if (this.dir == -1) {
			this.posX -= this.moveAmount;
			this.moved = true;
		}else if (this.dir == 2) {
			this.posY += this.moveAmount;
			this.moved = true;
		}else if (this.dir == -2) {
			this.posY -= this.moveAmount;
			this.moved = true;
		}
		
		
	}
	
	updateDirection() {
		if ((this.dir == 1 || this.dir == -1) && this.moved) {
			if (key == "w" || keyCode === UP_ARROW) {
				this.dir = -2;
				this.moved = false;
				return;

			}else if (key == "s" || keyCode === DOWN_ARROW) {
				this.dir = 2;
				this.moved = false;
				return;
			}
		}else if ((this.dir == 2 || this.dir == -2) && this.moved) {
			if (key == "d" || keyCode === RIGHT_ARROW) {
				this.dir = 1;
				this.moved = false;
				return;
				
			}else if (key == "a" || keyCode === LEFT_ARROW) {
				this.dir = -1;
				this.moved = false;
				return;
			}
		}
	}
	
	Collide(foodObj) {
		// collide with food
		let collidedWithFood = false;
		let collidedWithBorder = false;
		let collidedWithBody = false;
		if ((this.headPosX == foodObj.posX) && (this.headPosY == foodObj.posY)) {
			collidedWithFood = true;
		}

		if (collidedWithFood) {
			foodObj.createNewFood(this.headMoves);
			score += 1;
			updateScore();
			this.len+=speed;
			collidedWithFood = false;
		}
		
		// collide with walls
		if (this.headPosX - this.size < -this.size) {
			collidedWithBorder = true;
		}
		if (this.headPosX >= width) {
			collidedWithBorder = true;
		}
		if (this.headPosY - this.size < -this.size) {
			collidedWithBorder = true;
		}
		if (this.headPosY >= height) {
			collidedWithBorder = true;
		}
		
		if (collidedWithBorder) {
			isGameOver = true;
		}
		
		// collide with body
		for (let i = 0; i < this.bodyMoves.length; i++) {
			let bodyPos = this.bodyMoves[i].split(":");
		
			let bodyPosXString = bodyPos[0];
			let bodyPosYString = bodyPos[1];
			
			let bodyPosX = parseInt(bodyPosXString);
			let bodyPosY = parseInt(bodyPosYString);
		
			stroke("rgb(0, 0, 255)");
			fill("rgb(0, 0, 255)")
			square(bodyPosX + 5, bodyPosY + 5, 10);
			textSize(16);
			fill("white");
			stroke(0);
			text(i, bodyPosX, bodyPosY);
			
			if (this.headPosX == bodyPosX && this.headPosY == bodyPosY) {
				collidedWithBody = true;
			}
		}
		
		if (collidedWithBody) {
			isGameOver = true;
		}
	}
}


function gameOver() {
	textSize(128);
	strokeWeight(6);
	fill("#cdcdcd");
	stroke("#202020");
	text("Game Over", width / 9, height / 1.8);
	textSize(64);
	fill("#cdcdcd");
	stroke("#202020");
	let text_to_render = "Score: " + score; // change to high score
	text(text_to_render, width / 5, height / 1.4);
	if (key === "r") {
		restartGame();
	}
}

function restartGame() {
	isGameOver = false;
	score = 0;
	speed = 7;

	allFood = [];
	numOfFood = 1;
	for (let i = 0; i < numOfFood; i++) {
		allFood.push(new Food());
	}

	snake = new Snake(200, height / 2, 1, 2);

	paused = false;
	isGameOver = false;

	counter = 0;
}

function updateScore() {
	document.getElementById("ScoreCounter").innerHTML = "Score: " + score;
}