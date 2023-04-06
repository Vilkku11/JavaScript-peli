import Platform from "./platform.js";
export default class MovingPlatform extends Platform {
    constructor(game, xPos, yPos) {
        super(game, xPos, yPos);
        this.image = document.getElementById("movingPlatform");
        this.speedX = 2;
    }

    update(canvasWidth, yChange) {  //päivitetään platformin sijainteja
        //päivitetään x-akselin sijainti
        if(this.x + this.speedX >= canvasWidth - this.width) {
            this.x = canvasWidth - this.width;
            this.speedX *= -1;
        } else if (this.x + this.speedX <= 0) {
            this.x = 0;
            this.speedX *= -1;
        } else {
            this.x += this.speedX;
        }

        //päivitetään platformin sijanti y-akselilla
        this.y += yChange;
    }


    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}