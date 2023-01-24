function attack (hero, enemy) {
    return (hero.attackBox.position.x + hero.attackBox.width >= enemy.position.x &&
        hero.attackBox.position.x <= enemy.position.x + enemy.width &&
        hero.attackBox.position.y + hero.attackBox.height >= enemy.position.y &&
        hero.attackBox.position.y <= enemy.position.y + enemy.height &&
        hero.isAttacking)
}

export default attack