export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Hevletica";
    this.color = "black";
  }

  //piirretään UI näytölle
  draw(context) {
    //Valitaan textin tyyli ja fontin koko
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Points: " + Math.floor(this.game.points), 20, 40);
  }
}