import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preloader'
        });
    }

    preload() {
        this.load.setPath("assets/");

        this.load.image("volume-icon", "ui/volume-icon.png");
        this.load.image("volume-icon_off", "ui/volume-icon_off.png");

        this.load.audio("theme-song", "audio/fat-caps-audionatix.mp3");
        this.load.audio("whoosh", "audio/whoosh.mp3");
        this.load.audio("card-flip", "audio/card-flip.mp3");
        this.load.audio("card-match", "audio/card-match.mp3");
        this.load.audio("card-mismatch", "audio/card-mismatch.mp3");
        this.load.audio("card-slide", "audio/card-slide.mp3");
        this.load.audio("victory", "audio/victory.mp3");
        this.load.image("background");
        this.load.image("card-back", "cards/spanish_deck/back.png");

        // this.load.image("card-0", "cards/card-0.png");
        // this.load.image("card-1", "cards/card-1.png");
        // this.load.image("card-2", "cards/card-2.png");
        // this.load.image("card-3", "cards/card-3.png");
        // this.load.image("card-4", "cards/card-4.png");
        // this.load.image("card-5", "cards/card-5.png");

        this.load.image("card_1", "cards/spanish_deck/1.png");
        this.load.image("card_2", "cards/spanish_deck/2.png");
        this.load.image("card_3", "cards/spanish_deck/3.png");
        this.load.image("card_4", "cards/spanish_deck/4.png");
        this.load.image("card_5", "cards/spanish_deck/5.png");
        this.load.image("card_6", "cards/spanish_deck/6.png");
        this.load.image("card_7", "cards/spanish_deck/7.png");
        this.load.image("card_8", "cards/spanish_deck/8.png");
        this.load.image("card_9", "cards/spanish_deck/9.png");
        this.load.image("card_10", "cards/spanish_deck/10.png");
        this.load.image("card_11", "cards/spanish_deck/11.png");
        this.load.image("card_12", "cards/spanish_deck/12.png");
        this.load.image("card_13", "cards/spanish_deck/13.png");
        this.load.image("card_14", "cards/spanish_deck/14.png");
        this.load.image("card_15", "cards/spanish_deck/15.png");
        this.load.image("card_16", "cards/spanish_deck/16.png");
        this.load.image("card_17", "cards/spanish_deck/17.png");
        this.load.image("card_18", "cards/spanish_deck/18.png");
        this.load.image("card_19", "cards/spanish_deck/19.png");
        this.load.image("card_20", "cards/spanish_deck/20.png");
        this.load.image("card_21", "cards/spanish_deck/21.png");
        this.load.image("card_22", "cards/spanish_deck/22.png");
        this.load.image("card_23", "cards/spanish_deck/23.png");
        this.load.image("card_24", "cards/spanish_deck/24.png");
        this.load.image("card_25", "cards/spanish_deck/25.png");
        this.load.image("card_26", "cards/spanish_deck/26.png");
        this.load.image("card_27", "cards/spanish_deck/27.png");
        this.load.image("card_28", "cards/spanish_deck/28.png");
        this.load.image("card_29", "cards/spanish_deck/29.png");
        this.load.image("card_30", "cards/spanish_deck/30.png");
        this.load.image("card_31", "cards/spanish_deck/31.png");
        this.load.image("card_32", "cards/spanish_deck/32.png");
        this.load.image("card_33", "cards/spanish_deck/33.png");
        this.load.image("card_34", "cards/spanish_deck/34.png");
        this.load.image("card_35", "cards/spanish_deck/35.png");
        this.load.image("card_36", "cards/spanish_deck/36.png");
        this.load.image("card_37", "cards/spanish_deck/37.png");
        this.load.image("card_38", "cards/spanish_deck/38.png");
        this.load.image("card_39", "cards/spanish_deck/39.png");
        this.load.image("card_40", "cards/spanish_deck/40.png");

        this.load.image("heart", "ui/heart.png");

    }

    create() {
        this.scene.start("Play");
    }
}
