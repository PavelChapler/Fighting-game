import { canvas, ctx, gravity, player1, player2, keys, health1, health2, timer, countTime, background, shop } from "./components/variables.js"
import { attack, DecrementTime, gameOver, changePosition, movement } from "./components/functions.js"


function animate () {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player1.update()
    player2.update()

    movement(player1, keys.d.pressed, keys.a.pressed, 'd', 'a')
    movement(player2, keys.ArrowRight.pressed, keys.ArrowLeft.pressed, 'ArrowRight', 'ArrowLeft')

    //change of positions at the collision and going beyond borders
    changePosition(player1, player2)
    changePosition(player2, player1)

    //players attatck
    attack(player1, player2, health2, 4, 10, player2)
    attack(player2, player1, health1, 2, 7, player1)

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
            if (player1.countJump > 0) {
                player1.speed.y = -10
                player1.countJump--
            }
            break
        case ' ':
            e.preventDefault()
            if (player1.isLive) player1.attackOn()
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
            if (player2.countJump > 0) {
                player2.speed.y = -10
                player2.countJump--
            }
            break
        case 'Enter':
            if (player2.isLive) player2.attackOn()
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

