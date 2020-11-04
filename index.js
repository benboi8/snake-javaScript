function CreateBoard(width, height) {
    createCanvas(width, height);
}

class Food {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
	}

	draw() {
		stroke('red');
		fill('red');
		strokeWeight(4);
		square(this.posX, this.posY, 17);
	}
}

class Snake {
	constructor(startX, startY, dir, len) {
		this.startX = startX;
		this.startY = startY;
		this.posX = startX;
		this.posY = startY;
		this.dir = dir;
		this.len = len;
		this.piece = 0;
		this.added = false;
		this.moveAmount = 2.5;
		this.body_parts = []
	}
	
	drawHead() {
		fill('rgb(255, 50, 50)');
		stroke('rgb(255, 50, 50)');
		
		square(this.posX, this.posY, 17);
		this.headPosX = this.posX;
		this.headPosY = this.posY;
	}
	
	drawBody() {
		/*for (var i = 0; i <= 3; i++) {
			fill('green');
			stroke('green');
			if (this.dir == 1){
				var posX = Math.round(this.posX / 20) * 20;
				square(this.posX - 21 * i, this.posY, 17);
			}else if (this.dir == -1){
				square(this.posX + 21 * i, this.posY, 17);
			}else if (this.dir == 2){
				square(this.posX, this.posY - 21 * i, 17);
			}else if (this.dir == -2){
				square(this.posX, this.posY + 21 * i, 17);
			}
		}*/
	}

	updatePos() {
		if (this.dir == 1) {
			this.posX += this.moveAmount;
		}else if (this.dir == -1) {
			this.posX -= this.moveAmount;
		}else if (this.dir == 2) {
			this.posY += this.moveAmount;
		}else if (this.dir == -2) {
			this.posY -= this.moveAmount;
		}
	}
	
	updateDirection() {
		if (key == "d") {
			this.dir = 1;
		}else if (key == "a") {
			this.dir = -1;
		}else if (key == "w") {
			this.dir = -2;
		}else if (key == "s") {
			this.dir = 2;
		}
		else if (key == "r") {  // restart
		this.posX = this.startX;
		this.posY = this.startY;
		this.dir = 1;
		this.len = 10;
		this.piece = 0;
		this.body_parts = [];
		}
	}
	
	foodCollide(foodPosX, foodPosY) {
		if (this.headPosX == foodPosX) {
			if (this.headPosY == foodPosY) {
				console.log("True");
			}
		}
	}
}