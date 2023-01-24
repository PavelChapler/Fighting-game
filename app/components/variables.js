import Sprite from "./classes.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gravity = 0.3
const health1 = document.getElementById('health1')
const health2 = document.getElementById('health2')

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const player1 = new Sprite({
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
    }
})

const player2 = new Sprite({
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
    color: 'blue'
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

export { canvas, ctx, gravity, player1, player2, keys, health1, health2 }