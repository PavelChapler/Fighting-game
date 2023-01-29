import { Sprite, Fighter } from "./classes.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gravity = 0.4
const health1 = document.getElementById('health1')
const health2 = document.getElementById('health2')
const timer = document.getElementById('timer')
let countTime = 10

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const shop = new Sprite({
    position: {
        x: 620,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    maxFrames: 6
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png",
})

const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 10
    },
    direction: {
        x: 0,
        y: 0
    },
    imageSrc: '#',
    maxFrames: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 180
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            maxFrames: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            maxFrames: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            maxFrames: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            maxFrames: 2
        },
        attack: {
            imageSrc: './img/samuraiMack/Attack1.png',
            maxFrames: 6
        }
    }
})

const player2 = new Fighter({
    position: {
        x: 150,
        y: 0
    },
    speed: {
        x: 0,
        y: 5
    },
    direction: {
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/Idle.png',
    color: 'blue',
    scale: 2.5,
    maxFrames: 4,
    frameHold: 8,
    offset: {
        x: 215,
        y: 195
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            maxFrames: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            maxFrames: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            maxFrames: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            maxFrames: 2
        },
        attack: {
            imageSrc: './img/kenji/Attack1.png',
            maxFrames: 4
        }
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

export { canvas, ctx, gravity, player1, player2, keys, health1, health2, timer, countTime, background, shop }