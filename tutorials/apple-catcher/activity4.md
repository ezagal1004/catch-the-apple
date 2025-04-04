# Activity 4: Make It Challenging

## Introduction @showdialog

![Game screenshot](/static/skillmap/apple-catcher/challenge.png)

Let's make our game more challenging by increasing the difficulty as the player progresses!

## Step 1: Increase apple speed over time

Let's add code to make the apples fall faster as the game goes on.

```blocks
// Make the game progressively harder by increasing the apple speed
// and maximum number of apples
game.onUpdateInterval(10000, function () {
    if (gameStarted) {
        // Increase apple speed up to a maximum
        if (appleSpeed < 150) {
            appleSpeed += 10
        }
    }
})
```

## Step 2: Increase maximum apples

Now, let's also increase the maximum number of apples that can be on screen at once.

```blocks
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
```

## Step 3: Review the dropNewApple function

Let's make sure our apple dropping function works with the new difficulty system. This function creates apples with random speeds based on our difficulty level.

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
