import InputHandler from "./inputhandler.js";
import Platform from "./platform.js";
import MovingPlatform from "./movingPlatform.js";
import UI from "./ui.js";
import Player from "./player.js";

import { setPlayerScore } from "../game-over/index.js";
import { fetchHighScores } from "../game-over/index.js";
import { postHighScore } from "../game-over/index.js";

export default class Game {
  constructor(width, height) {
    this.backgroundImage = document.getElementById("background");
    this.mainMenuCard = document.getElementById("mainMenuCard");
    this.gameOverCard = document.getElementById("gameOverCard");
    this.gameCanvas = document.getElementById("gameCanvas");
    this.mainMenu = false;
    this.gameOver = false;
    this.width = width;
    this.height = height;
    this.input = new InputHandler(this);
    this.player = new Player(this, width);
    this.ui = new UI(this);
    this.platforms = [];
    this.keys = [];
    this.points = 0;
    this.touchedMidwayPoint = false;
    this.highestPointReached = 0;
    this.maxJumpHeight = 0;
    this.movingPlatCount = 0;
    this.platsAfterLastMovingPlat = 0;
  }

  checkCollison(rect1, rect2) {
    //palauttaa toden jos kaksi neliötä ovat toistensa sisällä
    return (
      rect1.x < rect2.x + rect2.width + 10 &&
      rect1.x + rect1.width + 10 > rect2.x &&
      rect1.y < rect2.y + rect2.height + 10 &&
      rect1.height + rect1.y + 10 > rect2.y
    );
  }

  checkPlayerBottomCollision(rectBottom, rectFull) {
    //palauttaa toden, jos minkään pelaajan alareuna on recFullin sisällä
    let hit = false;
    rectBottom.x.forEach((x) => {
      if (
        x < rectFull.x + rectFull.width &&
        x + rectBottom.width > rectFull.x &&
        rectBottom.y + rectBottom.height >= rectFull.y &&
        rectBottom.y + rectBottom.height <= rectFull.y + rectFull.height
      ) {
        hit = true;
      }
    });
    return hit;
  }

  startUp() {
    //pelaajan aloitus koordinaatit ja alustetaan pelaajan tiedot
    let startingX = (this.width - this.player.width) * 0.5;
    let startingY =
      Math.floor(Math.random() * 51) + this.height - this.player.height - 50;
    this.player.x = [startingX - this.width, startingX, startingX + this.width];
    this.player.y = startingY;
    this.player.speedY = this.player.minSpeedY;
    this.maxJumpHeight =
      (this.player.minSpeedY * this.player.minSpeedY) /
      (2 * this.player.gravity);

    //käytetään pisteiden laskemiseen enne kuin pelaaja pääsee
    //ensimmäistä kertaa näytön puoleenväliin
    this.highestPointReached = this.player.y;

    //luodaan platformeja alkuun
    //ensimmäinen pelaajan alle
    this.platforms.push(new Platform(this, startingX - 10, startingY + 100));

    //loput aloitus platformit
    for (let i = startingY; i > 0; i -= 60) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = i - Math.floor(Math.random() * 33);
      this.platforms.push(new Platform(this, x, y));
    }
  }

  update() {
    let rollDown = 0;
    rollDown = this.updatePlayer();
    this.updatePlatforms(rollDown);
    this.calcPoints(rollDown);
    this.createPlatforms();

    //katsotaan tippuiko pelaaja näytön alle, silloin hän hävisi pelin
    if (this.player.y > this.height - this.player.height / 2) {
      this.gameOver = true;

      // Set, fetch, and send scores
      setPlayerScore(this.points);

      // NOTE SET NAME LATER!!!!
      //postHighScore("tester123O", this.points);

      fetchHighScores();

      // set gameCavas hidden and gameOver visible
      this.gameOverCard.style.visibility = "";
      this.gameCanvas.style.visibility = "hidden";
    }
  }

  calcPoints(rollDown) {
    //lasketaan pelaajan pisteet, kunnes pelaaja osuu ensimmäisen kerran näytön puoleen väliin.
    //Pisteet lasketaan käyttämällä pelaajan vauhtia
    if (!this.touchedMidwayPoint) {
      if (this.highestPointReached > this.player.y) {
        this.highestPointReached = this.player.y;
        this.points += this.player.speedY * -1;
      }
    } else {
      //lasketaan pisteet uudella tavalla
      this.points += rollDown;
    }
  }

  updatePlayer() {
    let rollDown = 0;
    //katsotaan osuuko pelaajan alaosa platformiin ja onko liike alaspäin
    //jos osuu, niin annetaan liikettä ylöspäin
    this.platforms.forEach((platform) => {
      if (
        this.checkPlayerBottomCollision(this.player, platform) &&
        this.player.speedY > 0
      ) {
        this.player.speedY = this.player.minSpeedY;
      }
    });

    //päivitetään pelaajan sijainti
    this.player.calcSpeed();

    //lasketaan hahmon uusi X-sijainti
    for (let i = 0; i < this.player.x.length; i++) {
      this.player.x[i] += this.player.speedX;
    }

    //jos pelaaja menee vasemman reunan ylitse,
    //poistetaan vasemman puolisin hahmo ja luodaan oikealle yksi lisää
    if (this.player.x[1] < 0 - this.player.width) {
      this.player.x.splice(0, 1);
      this.player.x.push(this.player.x[1] + this.width);
    } else if (this.player.x[1] > this.width) {
      //jos pelaaja menee oikean reunan ylitse,
      //poistetaan oiekan puolisin hahmo ja luodaan vasemalle yksi lisää
      this.player.x.splice(2, 1);
      this.player.x.unshift(this.player.x[0] - this.width);
    }

    //lasketaan hahmon uusi Y-sijainti
    //Jos pelaajan keskikohta meni näytön puolen välin ylitse,
    //silloin vieritetään muuta maailmaa alaspäin ja pidetään pelaaja paikallaan
    if (
      this.player.y + this.player.speedY <=
      this.height * 0.5 - this.player.height * 0.5
    ) {
      this.touchedMidwayPoint = true;
      this.player.y = (this.height - this.player.height) * 0.5;
      rollDown =
        (this.height - this.player.height) * 0.5 -
        this.player.y -
        this.player.speedY;
    } else {
      this.player.y += this.player.speedY;
    }
    return rollDown;
  }

  createPlatforms() {
    //katsotaan tarviiko luoda platformeja
    if (
      this.points < 1500 &&
      this.platforms[this.platforms.length - 1].y > 27
    ) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = Math.floor(Math.random() * -33);
      this.platforms.push(new Platform(this, x, y));
    } else if (
      this.points < 4000 &&
      this.platforms[this.platforms.length - 1].y > 40
    ) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = Math.floor(Math.random() * -50);
      this.platforms.push(new Platform(this, x, y));
    } else if (
      this.points < 6000 &&
      this.platforms[this.platforms.length - 1].y > 40
    ) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = Math.floor(Math.random() * -90);

      if (
        Math.floor(Math.random() * 7) === 6 &&
        this.platsAfterLastMovingPlat > 3
      ) {
        this.platforms.push(new MovingPlatform(this, x, y));
        this.platsAfterLastMovingPlat = 0;
      } else {
        this.platforms.push(new Platform(this, x, y));
        this.platsAfterLastMovingPlat++;
      }
    } else if (
      this.points < 10000 &&
      this.platforms[this.platforms.length - 1].y > 90
    ) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = Math.floor(Math.random() * -60);

      if (this.movingPlatCount > 0) {
        //katsotaan pitääkö luoda liikkuvia platformeja settiin
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount--;
      } else if (
        Math.floor(Math.random() * 7) === 6 &&
        this.platsAfterLastMovingPlat > 4
      ) {
        //luodaan uusi setti liikkuvia platformeja kunhan viime setistä välissä oli 3 normaalia platformia
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount = 1;
        this.platsAfterLastMovingPlat = 0;
      } else {
        this.platforms.push(new Platform(this, x, y));
        this.platsAfterLastMovingPlat++;
      }
    } else if (
      this.points < 15000 &&
      this.platforms[this.platforms.length - 1].y > 90
    ) {
      let x = Math.floor(
        Math.random() * (this.width - this.platforms[0].width)
      );
      let y = Math.floor(Math.random() * (this.maxJumpHeight - 90 - 50) * -1);

      if (this.movingPlatCount > 0) {
        //katsotaan pitääkö luoda liikkuvia platformeja settiin
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount--;
      } else if (
        Math.floor(Math.random() * 5) === 6 &&
        this.platsAfterLastMovingPlat > 3
      ) {
        //luodaan uusi setti liikkuvia platformeja kunhan viime setistä välissä oli 3 normaalia platformia
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount = 2;
        this.platsAfterLastMovingPlat = 0;
      } else {
        this.platforms.push(new Platform(this, x, y));
        this.platsAfterLastMovingPlat++;
      }
    } else if (
      this.platforms[this.platforms.length - 1].y >
      this.maxJumpHeight - 20
    ) {
      //viimeinen vaikeus taso
      let x = 0;

      //katsotaan että x-koordinaatti ei ole liian samanlainen kuin viimeksi
      do {
        x = Math.floor(Math.random() * (this.width - this.platforms[0].width));
      } while (
        !(
          x < this.platforms[this.platforms.length - 1].x - 100 ||
          x > this.platforms[this.platforms.length - 1].x + 100
        )
      );

      let y = Math.floor(Math.random() * -18);
      if (this.movingPlatCount > 0) {
        //katsotaan pitääkö luoda liikkuvia platformeja settiin
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount--;
      } else if (
        Math.floor(Math.random() * 3) === 2 &&
        this.platsAfterLastMovingPlat > 3
      ) {
        //luodaan uusi setti liikkuvia platformeja kunhan viime setistä välissä oli 3 normaalia platformia
        this.platforms.push(new MovingPlatform(this, x, y));
        this.movingPlatCount = 3;
        this.platsAfterLastMovingPlat = 0;
      } else {
        this.platforms.push(new Platform(this, x, y));
        this.platsAfterLastMovingPlat++;
      }
    }
  }

  updatePlatforms(rollDown) {
    this.platforms.forEach((platform) => {
      platform.update(this.width, rollDown);
    });

    //tarkistetaan mitkä platformit pitää poistaa
    this.platforms.forEach((platform) => {
      platform.checkForDeletion(this.width, this.height);
    });

    //poistetaan kaikki platformit mitkä ovat merkattuja
    this.platforms = this.platforms.filter(
      (platform) => !platform.markedForDeletion
    );
  }

  draw(context) {
    context.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    this.platforms.forEach((platform) => {
      platform.draw(context);
    });
    this.player.draw(context);
    this.ui.draw(context);
  }
}
