# Activity 3: Add Scoring

## Introduction @showdialog

![Game screenshot](/static/skillmap/apple-catcher/scoring.png)

Now let's add scoring and lives to our game. Players will earn points for catching apples and lose lives when they miss them!

## Step 1: Set up game info

First, let's set up the score and life counters.

```blocks
// Set up game info
info.setScore(0)
info.setLife(3)
```

## Step 2: Add catching logic

Now, let's add code to detect when the player catches an apple with their plate.

```blocks
// Check if the apple is caught by the plate
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    // Apple is caught!
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    // Play catch sound
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
```

## Step 3: Add missing apple logic

Let's add code to detect when an apple falls off the bottom of the screen without being caught.

```blocks
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
})
```

## Step 4: Add game over check

Let's check if the player has run out of lives, and end the game if they have.

```blocks
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
```

## Step 5: Put it all together

Let's make sure we have all the code from previous activities too.

```blocks
let apple: Sprite = null
let maxApples = 0
let appleSpeed = 0
let currentApples = 0
// Starting amount of apples
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
```

## Complete

🎮 Excellent! Now your game keeps score and has a lives system. 🎮

In the next activity, we'll make the game more challenging by increasing the difficulty over time!
