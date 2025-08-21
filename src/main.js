import { Preloader } from './Preloader';
import { Play } from './Play';
import { Menu } from './Menu';
import Phaser from 'phaser';

const config = {
    title: 'Casita Robada!',
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#192a56',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Menu,
        Play
    ]
};

new Phaser.Game(config);
