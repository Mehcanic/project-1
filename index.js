const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// This will be topdown 2d two player game
// Player 1 will be on the left and player 2 will be on the right
// Player 1 will be controlled by the wsad keys and player 2 will be controlled by arrow keys
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, width, height);

class Sprite {
  constructor({ position, height, width, color, speed, health, radius }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
    this.health = health;
    this.radius = radius;
  }

  drawSquare() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width);
  }

  drawCircle() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  shoot() {
    if (this.health <= 0) {
      this.color = "black";
    } else if (
      this.position.x > this.position.x &&
      this.position.x < this.position.x + this.width &&
      this.position.y > this.position.y &&
      this.position.y < this.position.y + this.height
    ) {
      this.health -= 10;
      console.log(this.health);
    }
  }
}

// COMPLETE Refactor code to create class for projectiles.
// TODO Create projectiles in a way that you can shoot them in 0.5 sec intervals
// COMPLETE Create a way to detect collision between bullets and players
// TODO Create a way to detect collision between bullets and walls
// TODO Create a way to detect collision between players and walls
// TODO Create a way to detect collision between players and players

class Projectile extends Sprite {
  super({ position, height, width, color, speed, radius }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const player1 = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  height: 25,
  width: 25,
  color: "blue",
  speed: 1,
  health: 100,
});
const player2 = new Sprite({
  position: {
    x: 900,
    y: 100,
  },
  height: 25,
  width: 25,
  color: "red",
  speed: 1,
  health: 100,
});

const bulletsPlayer1 = [];
const bulletsPlayer2 = [];
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  t: { pressed: false },
  y: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  1: { pressed: false },
  2: { pressed: false },
};

// ! Players movement event listeners
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    // Player 1 movement
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "t":
      keys.t.pressed = true;
      break;

    // Player 2 movement
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    case "1":
      keys["1"].pressed = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    // Player 1 movement
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "t":
      keys.t.pressed = false;
      break;
    // Player 2 movement
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "1":
      keys["1"].pressed = false;
      break;
  }
});

// ! Players movement funciton
const player1Actions = () => {
  // Player 1 movement
  if (keys.w.pressed) {
    player1.position.y -= player1.speed;
  }
  if (keys.s.pressed) {
    player1.position.y += player1.speed;
  }
  if (keys.a.pressed) {
    player1.position.x -= player1.speed;
  }
  if (keys.d.pressed) {
    player1.position.x += player1.speed;
  }
  if (keys.t.pressed && bulletsPlayer1.length < 1) {
    bulletsPlayer1.push(
      new Projectile({
        position: {
          x: player1.position.x + player1.width / 2,
          y: player1.position.y + player1.width / 2,
        },
        height: 10,
        width: 10,
        color: "black",
        speed: 25,
        radius: 2.5,
      })
    );
  }
};
const player2Actions = () => {
  // Player 2 movement
  if (keys.ArrowUp.pressed) {
    player2.position.y -= player2.speed;
  }
  if (keys.ArrowDown.pressed) {
    player2.position.y += player2.speed;
  }
  if (keys.ArrowLeft.pressed) {
    player2.position.x -= player2.speed;
  }
  if (keys.ArrowRight.pressed) {
    player2.position.x += player2.speed;
  }
  if (keys["1"].pressed && bulletsPlayer2.length < 1) {
    bulletsPlayer2.push(
      new Projectile({
        position: {
          x: player2.position.x,
          y: player2.position.y + player2.width / 2,
        },
        height: 10,
        width: 10,
        color: "black",
        speed: 25,
        radius: 2.5,
      })
    );
  }
};

// COMPLETED: Make that only 1 bullets can be created at one time and then they will be deleted

// ! Bullet player collision
const bulletPlayer1Collision = () => {
  bulletsPlayer1.forEach((bullet) => {
    if (player2.health <= 0) {
      player2.color = "black";
    } else if (
      bullet.position.x > player2.position.x &&
      bullet.position.x < player2.position.x + player2.width &&
      bullet.position.y > player2.position.y &&
      bullet.position.y < player2.position.y + player2.height
    ) {
      player2.health -= 10;
      bulletsPlayer1.splice(bulletsPlayer1.indexOf(bullet), 1);
      console.log(player2.health);
    }
  });
};

const bulletPlayer2Collision = () => {
  bulletsPlayer2.forEach((bullet) => {
    if (player1.health <= 0) {
      player1.color = "black";
    } else if (
      bullet.position.x < player1.position.x + player1.width &&
      bullet.position.y > player1.position.y &&
      bullet.position.y < player1.position.y + player1.height
    ) {
      player1.health -= 10;
      bulletsPlayer2.splice(bulletsPlayer2.indexOf(bullet), 1);
      console.log(player1.health);
    }
  });
};

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player1.drawSquare();
  player2.drawSquare();
  player1Actions();
  player2Actions();

  bulletsPlayer1.forEach((bullet) => {
    if (bullet.position.x - bullet.radius > canvas.width) {
      bulletsPlayer1.splice(bulletsPlayer1.indexOf(bullet), 1);
    } else {
      bullet.draw();
      bullet.position.x += bullet.speed;
    }
    bulletPlayer1Collision();
  });

  bulletsPlayer2.forEach((bullet) => {
    if (bullet.position.x <= 0) {
      bulletsPlayer2.splice(bulletsPlayer2.indexOf(bullet), 1);
    } else {
      bullet.draw();
      bullet.position.x -= bullet.speed;
    }
    bulletPlayer2Collision();
  });
};
animate();
