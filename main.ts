sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    currentApples += -1
})
// This function creates and drops a new apple
function dropNewApple () {
    // Only create a new apple if we haven't reached the max
    if (currentApples < maxApples) {
        // Create a new apple
        apple = sprites.create(img`
            . . . . . . . e c 7 . . . . . . 
            . . . . e e e c 7 7 e e . . . . 
            . . c e e e e c 7 e 2 2 e e . . 
            . c e e e e e c 6 e e 2 2 2 e . 
            . c e e e 2 e c c 2 4 5 4 2 e . 
            c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
            c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
            c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
            . e e e 2 2 2 2 2 2 2 2 2 4 e . 
            . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
            . . 2 e e 2 2 2 2 2 4 4 2 e . . 
            . . . 2 2 e e 4 4 4 2 e e . . . 
            . . . . . 2 2 e e e e . . . . . 
            `, SpriteKind.Food)
        // Position and set velocity based on current difficulty
        apple.setPosition(randint(10, 150), 0)
        // Random speed variation
        apple.setVelocity(0, randint(appleSpeed - 20, appleSpeed + 20))
        // Increase apple counter
        currentApples += 1
        // Set up tracking for this specific apple
        apple.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
// Check if the apple is caught by the plate
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    // Apple is caught!
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    // Play catch sound
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
let apple: Sprite = null
let maxApples = 0
let appleSpeed = 0
let currentApples = 0
// Starting speed
currentApples = 0
// Starting speed
appleSpeed = 70
// Maximum number of apples that can be on screen at once
maxApples = 3
// Create the player's plate
let plate = sprites.create(img`
    ...............bbbbbbbbbbbbbbbbbbb...............
    ...........bbbbdd111111111111111ddbbbb...........
    ........bbbd1111111111111111111111111dbbb........
    ......bbd11111111dddddddddddddd111111111dbb......
    ....bbd1111111ddd11111111111111dddd1111111dbb....
    ...bd111111ddd111111111111111111111ddd111111db...
    ..bd11111ddd111ddddddddddddddddddd111ddd11111db..
    .bd11111dd111dddd111111111111111dddd111dd11111db.
    .b11111d111ddd111111111111111111111ddd111d11111b.
    bd11111d1ddd1111111111111111111111111ddd1111111db
    b11111d1ddd111111111111111111111111111ddd1d11111b
    b11111ddddd111111111111111111111111111ddddd11111b
    b11111ddddd111111111111111111111111111dddbd11111b
    b111111dddd111111111111111111111111111dddb111111b
    bd111111dddd1111111111111111111111111dddbd11111db
    .b1111111dddd11111111111111111111111dddbd111111b.
    .bd1111111dbbdd1111111111111111111dddbbd111111db.
    ..bd11111111dbbdd111111111111111dddbbd1111111db..
    ...bd111111111dbbbbbbdddddddddddddd111111111db...
    ....bbd11111111111dbbbbbbbbbddd11111111111dbb....
    ......bbdd11111111111111111111111111111ddbb......
    ........bbbdd11111111111111111111111ddbbb........
    ...........bbbbbddd11111111111dddbbbbb...........
    ................bbbbbbbbbbbbbbbbb................
    `, SpriteKind.Player)
plate.setPosition(80, 110)
controller.moveSprite(plate, 100, 0)
plate.setStayInScreen(true)
// Set up game info
info.setScore(0)
info.setLife(3)
// Show start message
game.splash("Apple Catcher", "Press A to start")
let gameStarted = true
// Main game update loop to check for missed apples
game.onUpdate(function () {
    // Find all apples that have gone off the bottom of the screen
    for (let apple2 of sprites.allOfKind(SpriteKind.Food)) {
        if (apple2.y >= 120) {
            // Apple missed - decrease life
            info.changeLifeBy(-1)
            // Destroy the apple
            sprites.destroy(apple2)
            // Play miss sound
            music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        }
    }
    // Game over check
    if (info.life() <= 0) {
        game.over(false)
    }
})
// Create new apples randomly
game.onUpdateInterval(800, function () {
    if (gameStarted && Math.percentChance(30)) {
        dropNewApple()
    }
})
// Make the game progressively harder by increasing the apple speed
// and maximum number of apples
game.onUpdateInterval(10000, function () {
    if (gameStarted) {
        // Increase apple speed up to a maximum
        if (appleSpeed < 150) {
            appleSpeed += 10
        }
        // Increase maximum apples up to 5
        if (maxApples < 5 && info.score() > 10) {
            maxApples += 1
        }
    }
})
