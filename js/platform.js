export default class Platform {
  constructor(game, xPos, yPos) {
    this.game = game;
    this.markedForDeletion = false;
    this.image = document.getElementById("platform");
    this.width = 100;
    this.height = 10;
    this.x = xPos;
    this.y = yPos;
  }

    
  update(canvasWidth, yChange) {  //päivitetään platformin sijainteja
    this.y += yChange;
  }

  checkForDeletion(canvasWidth, canvasHeight) {
    //merkataan platform poistettavaksi jos se tippuu näytön alle
    //tai jos menee näytön reunojen ylitse
    if(this.y > canvasHeight || 
      (this.x + this.width) > canvasWidth || 
      this.x < 0) {
        this.markedForDeletion = true;
      }
  }


  //piirretään platform näytölle
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}