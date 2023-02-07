import {ctx, gravity, canvas, shop} from "./variables.js"

class Sprite {
    constructor({
            position, imageSrc = '#', scale = 1, maxFrames = 1,
            currentFrame = 0, offset = {x: 0, y: 0}
    }) {
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
        this.offset = offset
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.image.width / this.maxFrames,
            0,
            this.image.width / this.maxFrames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
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

class Fighter extends Sprite{
    constructor({
            position, speed, direction, color = 'red',
            imageSrc ='#', scale = 1, maxFrames = 1,
            currentFrame = 0, offset = {x: 0, y: 0}, sprites,
            frameHold = 5
    }) {
        super({imageSrc, scale, maxFrames, currentFrame})
        this.position = position;
        this.speed = speed;
        this.height = 160;
        this.width = 50;
        this.color = color;
        this.lastkey;
        this.attackBox = {
            position: {
                y: this.position.y,
                x: this.position.x
            },
            direction,
            height: 70,
            width: 130,

        }
        this.isAttacking = false;
        this.alreadyAttack = false;
        this.health = 100
        this.countJump = 2
        this.frameElapsed = 0
        this.frameHold = frameHold
        this.offset = offset
        this.sprites = sprites
        for (let sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        this.isLive = true
        this.score = 0
    }

    animateFrames() {
        this.frameElapsed++

        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++
            } else this.currentFrame = 0
        }
    }

    update() {
        this.draw()

        if (this.isLive) this.animateFrames()
        if (!this.isLive) return

        this.position.y += this.speed.y
        this.position.x += this.speed.x

        //for postiton attackBox
        this.attackBox.position.y = this.position.y + this.attackBox.direction.y
        this.attackBox.position.x = this.position.x + this.attackBox.direction.x
        //attackBox
        // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        //for gravity
        if (this.position.y + this.height + this.speed.y >= canvas.height - 80) {
            this.speed.y = 0
            this.countJump = 2
        } else this.speed.y += gravity //увеличиваем скорость со временем
    }

    attackOn() {
        //прописать здесь функцию рассчитывающую разный урон в зависимости от попадания
        this.switchSprites('attack')
        this.isAttacking = true
        setTimeout(() => this.isAttacking = false, 350)
    }

    takeHit() {
        this.switchSprites('takeHit')
    }

    switchSprites(sprite) {
        if (this.image === this.sprites.death.image && this.currentFrame < this.sprites.death.maxFrames - 1){
            if (this.currentFrame === this.sprites.death.maxFrames - 2) this.isLive = false
            return
        }
        if (this.image === this.sprites.attack.image && this.currentFrame < this.sprites.attack.maxFrames - 1){
            return
        }
        if (this.image === this.sprites.takeHit.image && this.currentFrame < this.sprites.takeHit.maxFrames - 1){
            return
        }
        switch(sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.maxFrames = this.sprites.idle.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.maxFrames = this.sprites.run.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.maxFrames = this.sprites.jump.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.maxFrames = this.sprites.fall.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.maxFrames = this.sprites.attack.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.maxFrames = this.sprites.takeHit.maxFrames
                    this.currentFrame = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.maxFrames = this.sprites.death.maxFrames
                    this.currentFrame = 0
                }
                break
        }
    }

}

export { Sprite, Fighter }