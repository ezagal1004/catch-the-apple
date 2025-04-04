# Activity 2: Create Falling Apples

## Introduction @showdialog

![Game screenshot](/static/skillmap/apple-catcher/apples.png)

Now that we have our player's plate, let's create apples that will fall from the top of the screen!

## Step 1: Create variables

First, let's create the variables we'll need to manage our apples.

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
```

## Step 2: Create the dropNewApple function

Now, let's create a function that will make a new apple appear and fall from the top of the screen.

```blocks
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
```

## Step 3: Create apples periodically

Let's make apples appear randomly over time.

```blocks
// Create new apples randomly
game.onUpdateInterval(800, function () {
    if (gameStarted) {
        if (Math.percentChance(30)) {
            dropNewApple()
        }
    }
})
```

## Step 4: Track destroyed apples

We need to keep track of how many apples are on screen by decreasing our counter when apples are destroyed.

```blocks
sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    currentApples += -1
})
```

## Step 5: Create the player code

Make sure we have our player code from the previous activity.

```blocks
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

// Show start message
game.splash("Apple Catcher", "Press A to start")
let gameStarted = true
```

## Complete

🎮 Amazing work! Now you have apples falling from the sky. 🎮

In the next activity, we'll add scoring so you can track how many apples you've caught!
