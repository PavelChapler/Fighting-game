const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gravity = 0.3

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({position, speed, direction, color = 'red'}) {
        this.position = position;
        this.speed = speed;
        this.height = 150;
        this.width = 50;
        this.color = color;
        this.lastkey;
        this.attackBox = {
            position: {
                y: this.position.y,
                x: this.position.x
            },
            direction,
            height: 50,
            width: 100,
            
        }
        this.isAttacking = false;
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        //draw attackBox
        // if (this.isAttacking) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // } 
    }

    update() {  
        this.draw()
        this.position.y += this.speed.y
        this.position.x += this.speed.x

        //for postiton attackBox
        this.attackBox.position.y = this.position.y
        this.attackBox.position.x = this.position.x + this.attackBox.direction.x

        //for gravity
        if (this.position.y + this.height + this.speed.y >= canvas.height) {
            this.speed.y = 0
        } else this.speed.y += gravity //увеличиваем скорость со временем
    } 

    attackOn() {
        //прописать здесь функцию рассчитывающую разный урон в зависимости от попадания
        this.isAttacking = true
        setTimeout(() => this.isAttacking = false, 200)
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
    },
    direction: {
        x: 0,
        y: 0
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

function attack (hero, enemy) {
    return (hero.attackBox.position.x + hero.attackBox.width >= enemy.position.x &&
        hero.attackBox.position.x <= enemy.position.x + enemy.width &&
        hero.attackBox.position.y + hero.attackBox.height >= enemy.position.y &&
        hero.attackBox.position.y <= enemy.position.y + enemy.height &&
        hero.isAttacking)
}

function animate () {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    //player movement
    if (keys.d.pressed && player1.lastkey === 'd') {
        player1.speed.x = 5
    } else if (keys.a.pressed && player1.lastkey === 'a') {
        player1.speed.x = -5
    } else player1.speed.x = 0
    
    //player2 movement
    if (keys.ArrowRight.pressed && player2.lastkey === 'ArrowRight') {
        player2.speed.x = 5
    } else if (keys.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft') {
        player2.speed.x = -5
    } else player2.speed.x = 0

    //change of positions at the collision
    if (player1.attackBox.position.x >= player2.position.x + player2.width) {
        player1.attackBox.position.x = player1.position.x -50
        player2.attackBox.position.x = player2.position.x
    } 
    //player attatck
    if (attack(player1, player2) && player1.isAttacking) {
        console.log('damage hero')
    }
    if (attack(player2, player1) && player2.isAttacking) {
        console.log('damage enemy')
    }

    
    
    
}
animate()




window.addEventListener('keydown', function (e) {
    switch(e.key) {
        case 'd':
            keys.d.pressed = true
            player1.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player1.lastkey = 'a'
            break
        case 'w':
            player1.speed.y = -10
            break
        case ' ':
            player1.attackOn()
            break


        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            player2.speed.y = -10
            break
        case 'Enter':
            player2.attackOn()
            break
    }

})
window.addEventListener('keyup', function (e) {
    switch(e.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break 
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})

