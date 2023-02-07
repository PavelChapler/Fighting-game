import { canvas, health1, health2, keys, player1, player2, shop } from "./variables.js";

function movement (hero, keyPressedRight, keyPressedLeft, keyRightString, keyLeftString) {
    //right / left
    if (keyPressedRight && hero.lastkey === keyRightString) {
        hero.speed.x = 5
        hero.switchSprites('run')
    } else if (keyPressedLeft && hero.lastkey === keyLeftString) {
        hero.speed.x = -5
        hero.switchSprites('run')
    } else {
        hero.speed.x = 0
        hero.switchSprites('idle')
    }
    //jump
    if (hero.speed.y < 0) {
        hero.switchSprites('jump')
    } else if (hero.countJump < 2) {
        hero.switchSprites('fall')
    }
}

function attack (hero, enemy, health, currentFrame, damage, takeHitPlayer) {
    if (isAttacking(hero, enemy) && hero.currentFrame === currentFrame) {
        hero.isAttacking = false
        enemy.health -= damage
        if(enemy.health === 2) enemy.health = 0

        gsap.to(health, {
            width: `${enemy.health}%`
        })

        takeHitPlayer.takeHit()
    }
    if (isAttacking(hero, enemy) && hero.currentFrame === currentFrame) {
        hero.isAttacking = false
    }
}

function isAttacking (hero, enemy) {
    return (hero.attackBox.position.x + hero.attackBox.width >= enemy.position.x &&
        hero.attackBox.position.x <= enemy.position.x + enemy.width &&
        hero.attackBox.position.y + hero.attackBox.height >= enemy.position.y &&
        hero.attackBox.position.y <= enemy.position.y + enemy.height &&
        hero.isAttacking)
}

function DecrementTime (time, timer) {
    let timerId = setInterval(() => {
        if (time <= 0 || player1.health <= 0 || player2.health <= 0) {
            clearInterval(timerId)

            gameOver(player1.health, player2.health)
        }
        timer.textContent = time
        time--
    }, 1000)
}

let wonOnce = false
function gameOver () {
    document.getElementById('gameOver').style.visibility = 'visible'
    if (player1.health > player2.health) {
        document.getElementById('gameOver').textContent = 'Samurai Mack Wins!'

        player2.switchSprites('death')

        if (wonOnce) return

        defineScore(player1, 1)
    }
    if (player1.health < player2.health) {
        document.getElementById('gameOver').textContent = 'Kenji Wins!'

        player1.switchSprites('death')

        if (wonOnce) return

        defineScore(player2, 2)
    }
}

function defineScore (hero, numPlayer) {
    ++hero.score
    document.querySelector(`.score_player${numPlayer}`).innerHTML = String(hero.score)
    wonOnce = true
}

function changePosition (hero, enemy) {
    // if (player1.attackBox.position.x >= player2.position.x + player2.width) {
    //     player1.attackBox.position.x = player1.position.x -50
    //     player2.attackBox.position.x = player2.position.x
    // }
    //for player1
    if (hero.position.x < -hero.width - 40) {
        hero.position.x = canvas.width
    } else if (hero.position.x > canvas.width) {
        hero.position.x = -hero.width
    }
    //for player2
    if (enemy.position.x < -enemy.width - 40) {
        enemy.position.x = canvas.width
    } else if (enemy.position.x > canvas.width) {
        enemy.position.x = -enemy.width
    }
}


export { attack, DecrementTime, gameOver, changePosition, movement }