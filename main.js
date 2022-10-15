const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;


ctx.fillStyle = "gray";
ctx.fillRect(0, 0, width, height);

// COMPLETED Create classes for player, bullet and obstacle

// COMPLETED Create function to detect collision between players and projectiles

// TODO Create function to detect collision between players and obstacles

// TODO Create function to detect collision between projectiles and obstacles

// TODO Create function to detect collision between projectiles and projectiles

// TODO Create function to detect collision between players and players

// TODO Create function to detect collision between players and walls

// COMPLETED Create function to detect collision between projectiles and walls

// ! Player class
class Player {
  constructor({ position, width, height, area, color, speed, health, enemyHealth, keyUp, keyDown, keyLeft, keyRight, keyShoot, bullets, isCollision, playersCollision }) {
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
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  // COMPLETED function to move player in 4 directions
  // COMPLETED function movePlayer has to be turned on and off in animate funciton
  playerActions = () => {
    if (this.health <= 0) {
      return
    }
    if (this.keyUp.pressed) {
      this.position.y -= this.speed;
    }
    if (this.keyDown.pressed) {
      this.position.y += this.speed;
    }
    if (this.keyLeft.pressed) {
      this.position.x -= this.speed;
    }
    if (this.keyRight.pressed) {
      this.position.x += this.speed;
    }
    if (this.keyShoot.pressed && this.bullets.length < 1) {
      this.bullets.push(
        new Projectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
          },
          color: this.color,
          speed: 10,
          radius: 2.5,
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

const player1 = new Player({
  position: { x: 200, y: 200 },
  height: 50,
  width: 50,
  area: height * width,
  color: "green",
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
});

const player2 = new Player({
  position: { x: 400, y: 200 },
  height: 50,
  width: 50,
  area: height * width,
  color: "blue",
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
});

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
  constructor({ position, width, height, color, x, y }) {
    super({ position, width, height, color, x, y });
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// COMPLETED Create event listeners for player1
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

// const playersCollision = (playerLeft, playerRight) => {
//   if (playerLeft.position.x + playerLeft.width === playerRight.position.x && 
//     playerLeft.position.y + playerLeft.height === playerRight.position.y + playerRight.height) {
//     playerLeft.position.x -= 15;
//     playerRight.position.x += 15;
//   }
// }

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, width, height);
  player1.draw();
  player2.draw();
  player1.playerActions();
  player2.playerActions();
  player1.wallCollision();
  player2.wallCollision();
  // playersCollision(player1, player2)
  
  player1.bullets.forEach((bullet) => {
    if (bullet.position.x - bullet.radius > canvas.width || player2.isCollision(bullet)) {
      player1.bullets.splice(player1.bullets.indexOf(bullet), 1);
    } else {
      bullet.draw();
      bullet.position.x += bullet.speed;
    }
  });
  player2.bulletCollision(player1.bullets);

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