import { canvas, ctx, gravity, player1, player2, keys, health1, health2, timer, countTime } from "./components/variables.js"
import { attack, DecrementTime, gameOver } from "./components/functions.js"

function animate () {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    //player1 movement
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
        health2.style.width = `${player2.health--}%`
    }
    if (attack(player2, player1) && player2.isAttacking) {
        health1.style.width = `${player1.health--}%`
    }

    //end game on health
    if (player1.health <= 0 || player2.health <= 0) gameOver()
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

//timer
DecrementTime(countTime, timer)

