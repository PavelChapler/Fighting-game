import {canvas, player1, player2, shop} from "./variables.js";

function attack (hero, enemy) {
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

function gameOver () {
    document.getElementById('gameOver').style.visibility = 'visible'
    if (player1.health > player2.health) {
        document.getElementById('gameOver').textContent = 'player 1 Wins!'
    }
    if (player1.health < player2.health) {
        document.getElementById('gameOver').textContent = 'player 2 Wins!'
    }
}

function changePosition (hero, enemy) {
    if (player1.attackBox.position.x >= player2.position.x + player2.width) {
        player1.attackBox.position.x = player1.position.x -50
        player2.attackBox.position.x = player2.position.x
    }
    //for player1
    if (hero.position.x < -hero.width) {
        hero.position.x = canvas.width
    } else if (hero.position.x > canvas.width) {
        hero.position.x = -hero.width
    }
    //for player2
    if (enemy.position.x < -enemy.width) {
        enemy.position.x = canvas.width
    } else if (enemy.position.x > canvas.width) {
        enemy.position.x = -enemy.width
    }
}


export { attack, DecrementTime, gameOver, changePosition }