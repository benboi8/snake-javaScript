function CreateBoard(width, height) {
    createCanvas(width, height);
}

class Food {
	constructor() {
		this.posX = Math.round((Math.floor(Math.random() * Math.floor(width - 25))) / 25) * 25;
		this.posY = Math.round((Math.floor(Math.random() * Math.floor(height - 25))) / 25) * 25;
	}

	draw() {
		stroke('rgb(200, 25, 25)');
		fill('rgb(200, 25, 25)');
		strokeWeight(4);
		square(this.posX + 1, this.posY + 1, 15);
	}
	
	createNewFood() {
		this.posX = Math.round((Math.floor(Math.random() * Math.floor(width - 25))) / 25) * 25;
		this.posY = Math.round((Math.floor(Math.random() * Math.floor(height - 25))) / 25) * 25;
	}
}

class Snake {
	constructor(startX, startY, dir, len) {
		this.startX = startX;
		this.startY = startY;
		this.posX = startX;
		this.posY = startY;
		this.dir = dir;
		this.len = len * 10;
		this.size = 17
		this.piece = 0;
		this.added = false;
		this.moveAmount = 2;
		this.moved = false;
		this.headMoves = [];
		this.bodyPos = [];
	}
	
	drawHead() {
		fill('rgb(255, 50, 50)');
		stroke('rgb(255, 50, 50)');
		
		this.headPosX = Math.round((Math.floor(this.posX - 25)) / 25) * 25;
		this.headPosY = Math.round(Math.floor(this.posY - 25) / 25) * 25;
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
				
				this.bodyPos.push(this.bodyPosX, this.bodyPosY);
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
			if (key == "w") {
				this.dir = -2;
				this.moved = false;
				return;

			}else if (key == "s") {
				this.dir = 2;
				this.moved = false;
				return;
			}
		}else if ((this.dir == 2 || this.dir == -2) && this.moved) {
			if (key == "d") {
				this.dir = 1;
				this.moved = false;
				return;
				
			}else if (key == "a") {
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
		if ((this.headPosX == foodObj.posX) && (this.headPosY == foodObj.posY)) {
			collidedWithFood = true;
		}

		if (collidedWithFood) {
			foodObj.createNewFood();
			score += 1;
			updateScore();
			this.len+=10;
			collidedWithFood = false;
		}
		
		// collide with walls
		if (this.headPosX - this.size < -17) {
			collidedWithBorder = true;
		}
		if (this.headPosX >= width) {
			collidedWithBorder = true;
		}
		if (this.headPosY - this.size < -17) {
			collidedWithBorder = true;
		}
		if (this.headPosY >= height) {
			collidedWithBorder = true;
		}
		
		if (collidedWithBorder) {
			isGameOver = true;
		}
		
		// collide with body
	}
}


function gameOver() {
	textSize(128);
	fill("white");
	stroke("black");
	text("Game Over", width / 9, height / 1.8);
	textSize(64);
	fill("white");
	stroke("black");
	let text_to_render = "Score: " + score; // change to high score
	text(text_to_render, width / 5, height / 1.4);
}

function updateScore() {
	document.getElementById("ScoreCounter").innerHTML = "Score: " + score; 
}