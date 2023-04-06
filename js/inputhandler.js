export default class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener("keydown", e => {
            if ((   (e.key === "ArrowLeft") ||  //katsotaan painetaanko vasenta tai oikeaa nuolinäppäintä
                    (e.key === "ArrowRight")    //ja lisätään tieto että ne ovat pianettuina
            ) && this.game.keys.indexOf(e.key) === -1) {// paitsi jos ne ovat jo painettuina
                this.game.keys.push(e.key);
            }
        });

        window.addEventListener("keyup", e => {         //katsotaan koska vapautetaan nuolinäppäimet,
            if (this.game.keys.indexOf(e.key) > -1) {   //ja poistetaan tieto että ne ovat painettuina
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
    }
}