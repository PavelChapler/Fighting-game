const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gravity = 0.3

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({position, speed}) {
        this.position = position;
        this.speed = speed;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {  
        this.draw()
        this.position.y += this.speed.y
        
        if (this.position.y + this.height + this.speed.y >= canvas.height) {
            this.speed.y = 0
        } else this.speed.y += gravity
    }
}

const player1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 10
    }
})

const player2 = new Sprite({
    position: {
        x: canvas.width - 50,
        y: 0
    },
    speed: {
        x: 0,
        y: 5
    }
})



function animate () {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()
}
animate()



