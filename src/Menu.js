import Phaser from 'phaser';

export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        // this.add.image(0, 0, "background").setOrigin(0);

        const titleText = this.add.text(
            this.sys.game.scale.width / 2,
            100,
            "Casita Robada",
            { align: "center", strokeThickness: 4, fontSize: 40, fontStyle: "bold", color: "#8c7ae6" }
        ).setOrigin(.5);

        // Crear input HTML para el ID de la sala
       // const input = document.createElement('input');
       // input.type = 'text';
       // input.placeholder = 'ID de la sala';
       // input.style.position = 'absolute';
       // input.style.left = `${this.sys.game.canvas.offsetLeft + this.sys.game.scale.width / 2 - 100}px`;
       // input.style.top = `${this.sys.game.canvas.offsetTop + 400}px`;
       // input.style.width = '200px';
       // input.style.fontSize = '20px';
       // document.body.appendChild(input);

        // Botón para jugar
        const playButton = this.add.text(
            this.sys.game.scale.width / 2,
            300,
            "Jugar",
            { align: "center", strokeThickness: 4, fontSize: 32, fontStyle: "bold", color: "#44bd32", backgroundColor: "#fff" }
        ).setOrigin(.5).setInteractive();

        playButton.on('pointerdown', () => {
           // const roomId = input.value.trim();
           // document.body.removeChild(input);
           // this.scene.start('Play', { roomId });
            this.scene.start('Play');
        });
    }

    shutdown() {
        // Limpiar el input si la escena se destruye
        const input = document.querySelector('input[placeholder="ID de la sala"]');
        if (input) document.body.removeChild(input);
    }
}
