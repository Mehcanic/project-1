
# GA SEI PROJECT 1 - PUBG2d

 This project is a simple 2d game created using HTML, CSS and JavaScript. The main concept of it is a gunfight between two soldiers.

## Getting started and deployment

- The game has been deployed with the GitHub Pages and it's available [here](<https://mehcanic.github.io/project-1/>)
- There is no installation for this code. Just clone the repo and take a look.
- Player 1 moves with W, S, A, D keys and shoots With T key.
- Player 2 moves with arrow keys and shoots with Num 1 key.

## Goal and timeframe

The time frame for the project was 2 weeks. It was an independent project.

## Technologies used

- HTML and HTML Canvas
- CSS
- Javascript
- GitHub

## Brief

- Render a game in the browser
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself)principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

## Planning and Development procces

When I started to plan this project I didn't know what i wanted to build. At some point I decided to build animated 2d games as i was interested how HTML Canvas works.

- I've used Excalidraw for the planning and task management for this project.

![image](./planing.png)

- First stage was to setup HTML Canvas to see how it works. I started this by creating canvas tag in index.html.
- Than I added simple style to see what I'm working on.
- After that I created class for Player and Player 1 object to figure out how to move the character.
- To do it I created eventListeners for specific for each user keys on keyboard.

```JS
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    // Player 1 movement
    case "w":
      player1.keyUp.pressed = false;
      break;
    case "s":
      player1.keyDown.pressed = false;
      break;
    case "a":
      player1.keyLeft.pressed = false;
      break;
    case "d":
      player1.keyRight.pressed = false;
      break;
    case "t":
      player1.keyShoot.pressed = false;
      break;
    // Player 2 movement
    ...
  }
});
```

- By default these values were set to false. When user will press the key the value for keyUp (etc.) will change to true meaning that user pressed the button. This help with character movement that didn't want to stop.

```JS
  keyUp: { pressed: false },
  keyDown: { pressed: false },
  keyLeft: { pressed: false },
  keyRight: { pressed: false },
  keyShoot: { pressed: false },
```

- In Player class there is a method used to move the character

```JS
  if (this.keyUp.pressed) {
    this.position.y -= this.speed;
    player.imageSrc = player.sprites.run.imageSrc;
    player.framesMax = player.sprites.run.framesMax;
  }
```

- It is called playerActions and it's used to move the character. It's called in animate function.

```JS
  player1.playerActions(player1);
  player2.playerActions(player2);
```

- The animate function is called in the end of the code and it's used to draw everything on the canvas. In it there is code for drawing bullets and checking if they hit the player.

```JS
const animate = () => {
  ...
  player1.bullets.forEach((bullet) => {
    if (
      bullet.position.x - bullet.radius > canvas.width ||
      player2.isCollision(bullet)
    ) {
      player1.bullets.splice(player1.bullets.indexOf(bullet), 1);
    } else {
      bullet.draw();
      bullet.position.x += bullet.speed;
    }
    player2.bulletCollision(player1.bullets);
  });

  player2.bullets.forEach((bullet) => {
    if (bullet.position.x <= 0 || player1.isCollision(bullet)) {
      player2.bullets.splice(player2.bullets.indexOf(bullet), 1);
    } else {
      bullet.draw();
      bullet.position.x -= bullet.speed;
    }
    player1.bulletCollision(player2.bullets);
  });
};
animate();
```

## Challenges

This was my first project using JavaScript. There was many challanges along the way. One of the biggest was to understand how to use classes in OOP. Second biggest challange was to create animation for the collision between bullets, players and obstacles on the map. Especially the second one gave me the biggest headache. I had to at the end remove obstacles from the game as they were causing too many problems. Mainly the offset of the characters positions and bullets.

## Wins

The biggest win was when I got into problems with a bullets. Bullets when  drawn too many times were causing my browser to crash. I was able to recreate the whole project within 6-8 hours the day before the deadline. Being able to write and understand the whole project from the start and avoid making the same mistakes was a pretty good feeling.

## Future improvements

A few problems remaind in this project. Like the offset of the characters positions and bullets or collision with obstacles. I decided that I will recreate this project without HTML Canvas. I will use pure JavaScript and CSS to create the game.