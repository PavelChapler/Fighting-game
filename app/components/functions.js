import {player1, player2} from "./variables.js";

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

export { attack, DecrementTime, gameOver }