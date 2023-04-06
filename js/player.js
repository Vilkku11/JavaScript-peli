export default class Player {
    constructor(game, canvasWidth) {
        this.game = game;
        this.width = 80;
        this.height = 120;
        this.image = document.getElementById("player");
        this.x = [-canvasWidth, 0, canvasWidth];
        this.y = 0;

        this.accelerationX = 0.3;   //täytyy hioa näitä arvoja
        this.minSpeedX = -3.2;        //täytyy hioa näitä arvoja
        this.maxSpeedX = 3.2;         //täytyy hioa näitä arvoja
        this.gravity = 0.03;        //täytyy hioa näitä arvoja
        this.minSpeedY = -3.8;        //täytyy hioa näitä arvoja
        this.maxSpeedY = 3;         //täytyy hioa näitä arvoja

        this.speedX = 0;
        this.speedY = this.minSpeedY;
    }



    //lasketaan hahmoon liittyviä asioita
    calcSpeed() {
        //Lasketaan X-akselin nopeus
        if (this.game.keys.includes("ArrowLeft")) {
            if(this.speedX > this.minSpeedX) {
                if((this.speedX + (this.accelerationX * -1)) < this.minSpeedX) { //Katsotaan että tippuisiko vauhti alle minimin,
                    this.speedX = this.minSpeedX;           //Jos niin tapahtuu niin pistetään vauhti minimiin 
                } else {                                    //Muuten lisätään normaalisti

                    this.speedX -= this.accelerationX;                  //alkukiihtyvyys kunnes päästään maksimi nopeuteen
                }
            }
        } else if (this.game.keys.includes("ArrowRight")) {
            if(this.speedX < this.maxSpeedX) {
                if((this.speedX + this.accelerationX) > this.maxSpeedX) { //Katsotaan että tippuisiko vauhti alle minimin,
                    this.speedX = this.maxSpeedX;           //Jos niin tapahtuu niin pistetään vauhti minimiin 
                } else {                                    //Muuten lisätään normaalisti

                    this.speedX += this.accelerationX;                  //alkukiihtyvyys kunnes päästään maksimi nopeuteen
                }
            }
        } else if (this.speedX !== 0) {     //Hidastetaan pelaajan X-nopeuttaa, jos ei paineta nuolinäppäimiä
            if(this.speedX < 0) {
                if((this.speedX + 0.5) > 0) {
                    this.speedX = 0;
                } else {
                    this.speedX += 0.5;
                }
            } else {
                if((this.speedX - 0.5) < 0) {
                    this.speedX = 0;
                } else {
                    this.speedX -= 0.5;
                }
            }
        }

        



        //laskentaan hahmon Y-nopeus
        if(this.speedY !== this.maxSpeedY) {
            if((this.speedY + this.gravity > this.maxSpeedY)) {
                this.speedY = this.maxSpeedY;
            } else {
                this.speedY += this.gravity;
            }
        }
    }

    draw(context) { //pirretään pelaaja näytölle
        this.x.forEach(x => {
            context.fillRect(x, this.y, this.width, this.height);
            context.drawImage(this.image, x, this.y, this.width, this.height);
        })
          
    }
}