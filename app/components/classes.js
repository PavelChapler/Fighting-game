import {ctx, gravity, canvas, shop} from "./variables.js"

class Sprite {
    constructor({position, imageSrc, scale = 1, maxFrames = 1, currentFrame = 0}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = currentFrame
        this.frameElapsed = 0
        this.frameHold = 10
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.image.width / this.maxFrames,
            0,
            this.image.width / this.maxFrames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.maxFrames) * this.scale,
            this.image.height * this.scale,
        )
    }

    update() {
        this.draw()

        this.frameElapsed++

        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++
            } else this.currentFrame = 0
        }
    }
}

class Fighter {
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
        this.countJump = 2
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
        if (this.position.y + this.height + this.speed.y >= canvas.height - 96) {
            this.speed.y = 0
            this.countJump = 2
        } else this.speed.y += gravity //увеличиваем скорость со временем
    }

    attackOn() {
        //прописать здесь функцию рассчитывающую разный урон в зависимости от попадания
        this.isAttacking = true
        setTimeout(() => this.isAttacking = false, 200)
    }

}

export { Sprite, Fighter }