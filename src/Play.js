/**
* Casita Robada
* Reglas del juego:
*   Objetivo del juego:
*   - El objetivo principal es acumular la mayor cantidad de cartas posible en tu "casita".
*   
*   Preparación:
*   - Se utiliza una baraja de naipes españoles. 
*   - Se reparten tres cartas a cada jugador.
*   - Se colocan cuatro cartas boca arriba en el centro de la mesa.
*   
*   Desarrollo del juego (por turnos):
*   -  Cada jugador, en su turno, revisa las cartas que tiene en la mano y las compara con las de la mesa.
*   -  Si una de tus cartas coincide en número con una carta en la mesa, puedes tomarla y colocar ambas boca arriba a un lado, formando tu "casita".
*   -  Si tu carta coincide con la carta superior de la "casita" de otro jugador, puedes "robarle" toda su casita y sumarla a la tuya. La casita robada se apila con la tuya, siempre con la carta superior visible.
*   -  Si no puedes tomar ni robar ninguna carta, debes descartar una de tus cartas y colocarla boca arriba en el centro de la mesa.
*   -  Cuando un jugador se queda sin cartas en la mano, el repartidor le da tres cartas nuevas. El juego continúa hasta que se termina todo el mazo.
*
*   Final del juego:
*   - Cuando no quedan cartas para repartir, el juego termina.
*   - El último jugador que ha "levantado" cartas se lleva las que queden en el centro de la mesa.
*   - Para determinar al ganador, cada jugador cuenta el total de cartas en su casita.
*   - El jugador con más cartas en su casita gana la partida.
**/
import { createCard } from './createCard';
import Phaser from 'phaser';

export class Play extends Phaser.Scene {
    // All cards names
    cardNames = Array.from({ length: 40 }, (_, i) => `card_${i + 1}`);
    // Cards Game Objects
    cards = [];

    // History of card opened
    cardOpened = undefined;

    // Can play the game
    canMove = false;

    // Game variables
    lives = 0;

    // Grid configuration
    gridConfiguration = {
        x: 113,
        y: 102,
        paddingX: 10,
        paddingY: 10
    }

    playerCards = [];


    constructor() {
        super({
            key: 'Play'
        });
    }


    init(data) {
        this.roomId = data && data.roomId ? data.roomId : null;
        // Fadein camera
        this.cameras.main.fadeIn(500);
        this.lives = 10;
        this.volumeButton();
    }

    create() {
        const backgroudScale = 1.25;
        // Background image
        this.add.image(20, this.gridConfiguration.y - 50, "background")
         .setScale(backgroudScale,backgroudScale)
         .setOrigin(0);

        const titleText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2,
            "Casita Robada\nClick para Jugar",
            { align: "center", strokeThickness: 4, fontSize: 40, fontStyle: "bold", color: "#8c7ae6" }
        )
            .setOrigin(.5)
            .setDepth(3)
            .setInteractive();
        // title tween like retro arcade
        this.add.tween({
            targets: titleText,
            duration: 800,
            ease: (value) => (value > .8),
            alpha: 0,
            repeat: -1,
            yoyo: true,
        });

        // Text Events
        titleText.on(Phaser.Input.Events.POINTER_OVER, () => {
            titleText.setColor("#9c88ff");
            this.input.setDefaultCursor("pointer");
        });
        titleText.on(Phaser.Input.Events.POINTER_OUT, () => {
            titleText.setColor("#8c7ae6");
            this.input.setDefaultCursor("default");
        });
        titleText.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.sound.play("whoosh", { volume: 1.3 });
            this.add.tween({
                targets: titleText,
                ease: Phaser.Math.Easing.Bounce.InOut,
                y: -1000,
                onComplete: () => {
                    if (!this.sound.get("theme-song")) {
                        this.sound.play("theme-song", { loop: true, volume: .5 });
                    }
                    this.startGame();
                }
            })
        });
    }

    restartGame() {
        this.cardOpened = undefined;
        this.cameras.main.fadeOut(200 * this.cards.length);
        this.cards.reverse().map((card, index) => {
            this.add.tween({
                targets: card.gameObject,
                duration: 500,
                y: 1000,
                delay: index * 100,
                onComplete: () => {
                    card.gameObject.destroy();
                }
            })
        });

        this.time.addEvent({
            delay: 200 * this.cards.length,
            callback: () => {
                this.cards = [];
                this.canMove = false;
                this.scene.restart();
                this.sound.play("card-slide", { volume: 1.2 });
            }
        })
    }

    createGridCards() {
        // Phaser random array position
        const gridCardNames = Phaser.Utils.Array.Shuffle([...this.cardNames]);

        return gridCardNames.map((name, index) => {
            const newCard = createCard({
                scene: this,
                x: this.gridConfiguration.x + (98 + this.gridConfiguration.paddingX) * (index % 4),
                y: -1000,
                frontTexture: name,
                cardName: name
            });
            this.add.tween({
                targets: newCard.gameObject,
                duration: 800,
                delay: index * 100,
                onStart: () => this.sound.play("card-slide", { volume: 1.2 }),
                y: this.gridConfiguration.y + (128 + this.gridConfiguration.paddingY) * Math.floor(index / 4)
            })
            return newCard;
        });
    }

    createHearts() {
        return Array.from(new Array(this.lives)).map((el, index) => {
            const heart = this.add.image(this.sys.game.scale.width + 1000, 20, "heart")
                .setScale(2)

            this.add.tween({
                targets: heart,
                ease: Phaser.Math.Easing.Expo.InOut,
                duration: 1000,
                delay: 1000 + index * 200,
                x: 140 + 30 * index // marginLeft + spaceBetween * index
            });
            return heart;
        });
    }


    volumeButton() {
        const volumeIcon = this.add.image(25, 25, "volume-icon").setName("volume-icon");
        volumeIcon.setInteractive();

        // Mouse enter
        volumeIcon.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.input.setDefaultCursor("pointer");
        });
        // Mouse leave
        volumeIcon.on(Phaser.Input.Events.POINTER_OUT, () => {
            console.log("Mouse leave");
            this.input.setDefaultCursor("default");
        });


        volumeIcon.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.sound.volume === 0) {
                this.sound.setVolume(1);
                volumeIcon.setTexture("volume-icon");
                volumeIcon.setAlpha(1);
            } else {
                this.sound.setVolume(0);
                volumeIcon.setTexture("volume-icon_off");
                volumeIcon.setAlpha(.5)
            }
        });
        this.sound.setVolume(0);
    }

    startGame() {

        // WinnerText and GameOverText
        const winnerText = this.add.text(this.sys.game.scale.width / 2, -1000, "YOU WIN",
            { align: "center", strokeThickness: 4, fontSize: 40, fontStyle: "bold", color: "#8c7ae6" }
        ).setOrigin(.5)
            .setDepth(3)
            .setInteractive();

        const gameOverText = this.add.text(this.sys.game.scale.width / 2, -1000,
            "GAME OVER\nClick to restart",
            { align: "center", strokeThickness: 4, fontSize: 40, fontStyle: "bold", color: "#ff0000" }
        )
            .setName("gameOverText")
            .setDepth(3)
            .setOrigin(.5)
            .setInteractive();

        // Start lifes images
        const hearts = this.createHearts();

        // Create a grid of cards
        this.cards = this.createGridCards();

        // Start canMove
        this.time.addEvent({
            delay: 200 * this.cards.length,
            callback: () => {
                this.canMove = true;
            }
        });

        // Game Logic
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            if (this.canMove) {
                const card = this.cards.find(card => card.gameObject.hasFaceAt(pointer.x, pointer.y));
                if (card) {
                    this.input.setDefaultCursor("pointer");
                } else {
                    if (go[0]) {
                        if (go[0].name !== "volume-icon") {
                            this.input.setDefaultCursor("pointer");
                        }
                    } else {
                        this.input.setDefaultCursor("default");
                    }
                }
            }
        });
        this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer) => {
            if (this.canMove && this.cards.length) {
                const card = this.cards.find(card => card.gameObject.hasFaceAt(pointer.x, pointer.y));

                if (card) {
                    this.canMove = false;

                    // Detect if there is a card opened
                    if (this.cardOpened !== undefined) {
                        // If the card is the same that the opened not do anything
                        if (this.cardOpened.gameObject.x === card.gameObject.x && this.cardOpened.gameObject.y === card.gameObject.y) {
                            this.canMove = true;
                            return false;
                        }

                        card.flip(() => {
                            if (this.cardOpened.cardName === card.cardName) {
                                // ------- Match -------
                                this.sound.play("card-match");
                                // Destroy card selected and card opened from history
                                this.cardOpened.destroy();
                                card.destroy();

                                // remove card destroyed from array
                                this.cards = this.cards.filter(cardLocal => cardLocal.cardName !== card.cardName);
                                // reset history card opened
                                this.cardOpened = undefined;
                                this.canMove = true;

                            } else {
                                // ------- No match -------
                                this.sound.play("card-mismatch");
                                this.cameras.main.shake(600, 0.01);
                                // remove life and heart
                                const lastHeart = hearts[hearts.length - 1];
                                this.add.tween({
                                    targets: lastHeart,
                                    ease: Phaser.Math.Easing.Expo.InOut,
                                    duration: 1000,
                                    y: - 1000,
                                    onComplete: () => {
                                        lastHeart.destroy();
                                        hearts.pop();
                                    }
                                });
                                this.lives -= 1;
                                // Flip last card selected and flip the card opened from history and reset history
                                card.flip();
                                this.cardOpened.flip(() => {
                                    this.cardOpened = undefined;
                                    this.canMove = true;

                                });
                            }

                            // Check if the game is over
                            if (this.lives === 0) {
                                // Show Game Over text
                                this.sound.play("whoosh", { volume: 1.3 });
                                this.add.tween({
                                    targets: gameOverText,
                                    ease: Phaser.Math.Easing.Bounce.Out,
                                    y: this.sys.game.scale.height / 2,
                                });

                                this.canMove = false;
                            }

                            // Check if the game is won
                            if (this.cards.length === 0) {
                                this.sound.play("whoosh", { volume: 1.3 });
                                this.sound.play("victory");

                                this.add.tween({
                                    targets: winnerText,
                                    ease: Phaser.Math.Easing.Bounce.Out,
                                    y: this.sys.game.scale.height / 2,
                                });
                                this.canMove = false;
                            }
                        });

                    } else if (this.cardOpened === undefined && this.lives > 0 && this.cards.length > 0) {
                        // If there is not a card opened save the card selected
                        card.flip(() => {
                            this.canMove = true;
                        });
                        this.cardOpened = card;
                    }
                }
            }

        });


        // Text events
        winnerText.on(Phaser.Input.Events.POINTER_OVER, () => {
            winnerText.setColor("#FF7F50");
            this.input.setDefaultCursor("pointer");
        });
        winnerText.on(Phaser.Input.Events.POINTER_OUT, () => {
            winnerText.setColor("#8c7ae6");
            this.input.setDefaultCursor("default");
        });
        winnerText.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.sound.play("whoosh", { volume: 1.3 });
            this.add.tween({
                targets: winnerText,
                ease: Phaser.Math.Easing.Bounce.InOut,
                y: -1000,
                onComplete: () => {
                    this.restartGame();
                }
            })
        });

        gameOverText.on(Phaser.Input.Events.POINTER_OVER, () => {
            gameOverText.setColor("#FF7F50");
            this.input.setDefaultCursor("pointer");
        });

        gameOverText.on(Phaser.Input.Events.POINTER_OUT, () => {
            gameOverText.setColor("#8c7ae6");
            this.input.setDefaultCursor("default");
        });

        gameOverText.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: gameOverText,
                ease: Phaser.Math.Easing.Bounce.InOut,
                y: -1000,
                onComplete: () => {
                    this.restartGame();
                }
            })
        });
    }

}
