const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// COMPLETED Create classes for player, bullet and obstacle

// COMPLETED Create function to detect collision between players and projectiles

// COMPLETED Create function to detect collision between players and obstacles

// COMPLETED Create function to detect collision between projectiles and obstacles

// COMPLETED Create function to detect collision between players and walls

// COMPLETED Create function to detect collision between projectiles and walls

// COMPLETED Careate event listeners for player1

// FIXME function wallCollision has to be rewritten (players position and offset need to be taken into account)
// ! Players movement event listeners
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    // Player 1 movement
    case "w":
      player1.keyUp.pressed = true;
      break;
    case "s":
      player1.keyDown.pressed = true;
      break;
    case "a":
      player1.keyLeft.pressed = true;
      break;
    case "d":
      player1.keyRight.pressed = true;
      break;
    case "t":
      player1.keyShoot.pressed = true;
      break;
    // Player 2 movement
    case "ArrowUp":
      player2.keyUp.pressed = true;
      break;
    case "ArrowDown":
      player2.keyDown.pressed = true;
      break;
    case "ArrowLeft":
      player2.keyLeft.pressed = true;
      break;
    case "ArrowRight":
      player2.keyRight.pressed = true;
      break;
    case "1":
      player2.keyShoot.pressed = true;
      break;
  }
});
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
    case "ArrowUp":
      player2.keyUp.pressed = false;
      break;
    case "ArrowDown":
      player2.keyDown.pressed = false;
      break;
    case "ArrowLeft":
      player2.keyLeft.pressed = false;
      break;
    case "ArrowRight":
      player2.keyRight.pressed = false;
      break;
    case "1":
      player2.keyShoot.pressed = false;
      break;
  }
});

// ! Player class
class Player {
  constructor({ position, width, height, area, color, speed, health, enemyHealth, keyUp, keyDown, keyLeft, keyRight, keyShoot, bullets, isCollision, playersCollision, imageSrc, sprites, targetWidth, targetHeight, scale, framesMax, offset }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.area = area;
    this.color = color;
    this.speed = speed;

    this.health = health;
    this.enemyHealth = enemyHealth;

    this.keyUp = keyUp;
    this.keyDown = keyDown;
    this.keyLeft = keyLeft;
    this.keyRight = keyRight;
    this.keyShoot = keyShoot;

    this.bullets = bullets;
    this.isCollision = isCollision;
    this.playersCollision = playersCollision;
    this.image = new Image();
    this.imageSrc = imageSrc;
    this.sprites = sprites;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.offset = offset;
  }
  draw() {
    this.image.src = this.imageSrc;
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax), 
      0, 
      this.image.width / this.framesMax, 
      this.image.height, 
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax)  * this.scale,
      this.image.height * this.scale
    )
  }

  animateframes() {
    this.framesElapsed++ 
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw()
    this.animateframes()
  }
  
  // COMPLETED function to move player in 4 directions
  // COMPLETED function movePlayer has to be turned on and off in animate funciton
  playerActions = (player) => {
    if (this.health <= 0) {
      player.imageSrc = player.sprites.dead.imageSrc;
      player.framesMax = player.sprites.dead.framesMax;
      return
    }
    player.imageSrc = player.sprites.idle.imageSrc;
    player.framesMax = player.sprites.idle.framesMax;
    
    if (this.keyUp.pressed) {
      this.position.y -= this.speed;
      player.imageSrc = player.sprites.run.imageSrc;
      player.framesMax = player.sprites.run.framesMax;
    }
    if (this.keyDown.pressed) {
      this.position.y += this.speed;
      player.imageSrc = player.sprites.run.imageSrc;
      player.framesMax = player.sprites.run.framesMax;
    }
    if (this.keyLeft.pressed) {
      this.position.x -= this.speed;
      player.imageSrc = player.sprites.run.imageSrc;
      player.framesMax = player.sprites.run.framesMax;
    }
    if (this.keyRight.pressed) {
      this.position.x += this.speed;
      player.imageSrc = player.sprites.run.imageSrc;
      player.framesMax = player.sprites.run.framesMax;
    }
    if (this.keyShoot.pressed && this.bullets.length < 1) {
      this.bullets.push(
        new Projectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
          },
          color: this.color,
          speed: 30,
          radius: 3,
        })
      );
    }
  };
  

  bulletCollision = (bullets) => {
    bullets.forEach((bullet) => {
      if (this.health <= 0) {
        this.color = "black";
        return;
      } else if (this.isCollision(bullet)) {
        this.health -= 10;
        console.log(this.health)
      }
    });
  }

  wallCollision = () => {
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x > width - this.width) {
      this.position.x = width - this.width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y > height - this.height) {
      this.position.y = height - this.height;
    }
  }
}

class Picture extends Player {
  constructor({ position, width, height, imageSrc, targetWidth, targetHeight }) {
    super({ position, width, height, imageSrc, targetWidth, targetHeight })
  }
  draw() {
    this.image;
    this.image.src = this.imageSrc;
    this.image.onload = () => {
      ctx.drawImage(this.image, this.position.x, this.position.y, width, height)
    }
  }
}
const background = new Picture({ 
  position: { x: 0, y: 0 },
  width: width,
  height: height,
  imageSrc: "./images/Grass_04-512x512.png",
})

// ! Projectile class
class Projectile extends Player {
  constructor({ position, width, height, color, speed, radius }) {
    super({ position, width, height, color, speed });
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// ! Obsacle class
class Obstacle extends Player {
  constructor({ position, width, height, imageSrc }) {
    super({ position, width, height, imageSrc });
  }

  drawObstacle() {
    this.image;
    this.image.src = this.imageSrc;
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}

const player1 = new Player({
  position: { x: 100, y: 500 },
  height: 50,
  width: 50,
  area: height * width,
  color: "yellow",
  imageSrc: "./images/R_witch_idle.png",
  scale: 3,
  framesMax: 6,
  offset: { x: 90, y: 40 },
  speed: 2,
  health: 100,
  keyUp: { pressed: false },
  keyDown: { pressed: false },
  keyLeft: { pressed: false },
  keyRight: { pressed: false },
  keyShoot: { pressed: false },
  bullets: [],
  isCollision: (bullet) => {
    return bullet.position.x < player1.position.x + player1.width &&
    bullet.position.y > player1.position.y &&
    bullet.position.y < player1.position.y + player1.height &&
    bullet.position.x > player1.position.x
  },  
  sprites: {
    idle: { 
      imageSrc: "./images/Yellow/Gunner_Yellow_Idle.png", 
      framesMax: 5,
    },
    run: { 
      imageSrc: "./images/Yellow/Gunner_Yellow_Run.png",
      framesMax: 6,
    },
    runOther: {
      imageSrc: "./images/Yellow/Gunner_Yellow_Run_Left.png",
      framesMax: 6,
    },
    dead: { 
      imageSrc: "./images/Yellow/Gunner_Yellow_Death.png",
      framesMax: 8,
    },
  },
});
const player2 = new Player({
  position: { x: 900, y: 500 },
  height: 50,
  width: 50,
  area: height * width,
  color: "red",
  imageSrc: "./images/Blue-witch-idle.png",
  scale: 3,
  framesMax: 6,
  offset: { x: 0, y: 40 },
  speed: 2,
  health: 100,
  keyUp: { pressed: false },
  keyDown: { pressed: false },
  keyLeft: { pressed: false },
  keyRight: { pressed: false },
  keyShoot: { pressed: false },
  bullets: [],
  isCollision: (bullet) => {
    return bullet.position.x > player2.position.x &&
    bullet.position.x < player2.position.x + player2.width &&
    bullet.position.y > player2.position.y &&
    bullet.position.y < player2.position.y + player2.height
  },
  sprites: {
    idle: { 
      imageSrc: "./images/Red/Gunner_Red_Idle.png", 
      framesMax: 5,
    },
    run: { 
      imageSrc: "./images/Red/Gunner_Red_Run.png",
      framesMax: 6,
    },
    runOther: { 
      imageSrc: "./images/Red/Gunner_Red_Run_Right.png",
      framesMax: 6,
    },
    dead: { 
      imageSrc: "./images/Red/Gunner_Red_Death.png",
      framesMax: 8,
    },
  },
});

// const obstacle1 = new Obstacle({
//   position: { x: 200, y: 100 },
//   height: 200,
//   width: 10,
//   imageSrc: "./images/Bricks_09-128x128.png",
// })  
// const obstacle2 = new Obstacle({
//   position: { x: 350, y: 300 },
//   height: 150,
//   width: 10,
//   imageSrc: "./images/Bricks_09-128x128.png",
// })
// const obstacle3 = new Obstacle({
//   position: { x: 300, y: 500 },
//   height: 10,
//   width: 100,
//   imageSrc: "./images/Bricks_10-128x128.png",
// })
// const obstacle4 = new Obstacle({
//   position: { x: 600, y: 150 },
//   height: 10,
//   width: 100,
//   imageSrc: "./images/Bricks_10-128x128.png",
// })
// const obstacle5 = new Obstacle({
//   position: { x: 600, y: 250 },
//   height: 150,
//   width: 10,
//   imageSrc: "./images/Bricks_09-128x128.png",
// })  
// const obstacle6 = new Obstacle({
//   position: { x: 800, y: 80 },
//   height: 150,
//   width: 10,
//   imageSrc: "./images/Bricks_09-128x128.png",
// })
// const obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6];

// ! Players collion with objects
// const playerObjectsCollision = (player) => {
//   obstacles.forEach((obstacle) => {
//     if (player.position.x + player.width === obstacle.position.x && 
//       player.position.y + player.height > obstacle.position.y && 
//       player.position.y < obstacle.position.y + obstacle.height) {
//       player.position.x -= 10;
//     }      
//     if (player.position.x === obstacle.position.x + obstacle.width  && 
//       player.position.y + player.height > obstacle.position.y && 
//       player.position.y < obstacle.position.y + obstacle.height){
//       player.position.x += 10;
//     }
//     if (player.position.x + player.width > obstacle.position.x &&
//       player.position.x < obstacle.position.x + obstacle.width &&
//       player.position.y + player.height === obstacle.position.y - 90) {
//       player.position.y -= 10;
//     }
//     if (player.position.x + player.width > obstacle.position.x &&
//       player.position.x < obstacle.position.x + obstacle.width &&
//       player.position.y === obstacle.position.y + obstacle.height) {
//       player.position.y += 10;
//     }
//   })
//   // const playerObjectsCollision = (player) => {
//   //   obstacles.forEach((obstacle) => {
//   //     if (player.position.x + player.width === obstacle.position.x && 
//   //       player.position.y + player.height > obstacle.position.y && 
//   //       player.position.y < obstacle.position.y + obstacle.height) {
//   //       player.position.x -= 10;
//   //     }      
//   //     if (player.position.x === obstacle.position.x + obstacle.width  && 
//   //       player.position.y + player.height > obstacle.position.y && 
//   //       player.position.y < obstacle.position.y + obstacle.height){
//   //       player.position.x += 10;
//   //     }
//   //     if (player.position.x + player.width > obstacle.position.x &&
//   //       player.position.x < obstacle.position.x + obstacle.width &&
//   //       player.position.y + player.height === obstacle.position.y - 90) {
//   //       player.position.y -= 10;
//   //     }
//   //     if (player.position.x + player.width > obstacle.position.x &&
//   //       player.position.x < obstacle.position.x + obstacle.width &&
//   //       player.position.y === obstacle.position.y + obstacle.height) {
//   //       player.position.y += 10;
//   //     }
//   //   })
// }
// const bulletObjectCollision = (player) => {
//   player.bullets.forEach((bullet) => {
//     obstacles.forEach((obstacle) => {
//       if (bullet.position.x > obstacle.position.x && 
//         bullet.position.y > obstacle.position.y &&
//         bullet.position.y < obstacle.position.y + obstacle.height && 
//         bullet.position.x < obstacle.position.x + obstacle.width) {
//         player.bullets.splice(player.bullets.indexOf(bullet), 1);
//       }
//     })
//   })
// }

const animate = () => {
  window.requestAnimationFrame(animate);
  background.draw()
  player1.update();
  player2.update();
  player1.playerActions(player1);
  player2.playerActions(player2);
  player1.wallCollision();
  player2.wallCollision();
  // obstacle1.drawObstacle();
  // obstacle2.drawObstacle();
  // obstacle3.drawObstacle();
  // obstacle4.drawObstacle();
  // obstacle5.drawObstacle();
  // obstacle6.drawObstacle();
  // playerObjectsCollision(player1, player2);
  // playerObjectsCollision(player2, player1); 
  // bulletObjectCollision(player1);
  // bulletObjectCollision(player2);
  
  player1.bullets.forEach((bullet) => {
    if (bullet.position.x - bullet.radius > canvas.width || player2.isCollision(bullet)) {
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
  })

}
animate();
