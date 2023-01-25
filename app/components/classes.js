import {ctx, gravity, canvas} from "./variables.js"

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
        this.health = 100
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        //draw attackBox
        if (this.isAttacking) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
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

export default Sprite