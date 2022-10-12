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
    this.radius = radius
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
    // console.log('i')
  }
}

const player1 = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  height: 50,
  width: 100,
  color: "blue",
  speed: 1,
  health: 100,
});
const player2 = new Sprite({
  position: {
    x: 900,
    y: 100,
  },
  height: 50,
  width: 100,
  color: "red",
  speed: 1,
  health: 100,
});
// const bullet1 = new Sprite({
//   position: {
//     x: player1.position.x + player1.width,
//     y: player1.position.y + player1.width,
//   },
//   height: 10,
//   width: 10,
//   color: 'black',
//   speed: 0.1,
//   radius: 10,
// })

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
  o: { pressed: false },
  p: { pressed: false },
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
    case "o":
      keys.o.pressed = true;
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
    case "o":
      keys.o.pressed = false;
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
};

// TODO: Make that only 5 bullets can be created at one time and then they will be deleted

const firePlayer1 = () => {
  window.addEventListener("keydown", (e) => {
    if (keys.t.pressed) {
      bulletsPlayer1.push(
        new Sprite({
          position: {
            x: player1.position.x + player1.width / 2,
            y: player1.position.y + player1.width / 2,
          },
          height: 10,
          width: 10,
          color: "black",
          speed: 10,
          radius: 10,
        })
      )
    }
  })
  bulletsPlayer1.forEach((bullet) => {
    bullet.drawCircle();
    bullet.position.x += bullet.speed;
    console.log(bulletsPlayer1)
  })
}
const firePlayer2 = () => {
  window.addEventListener("keydown", (e) => {
    if (keys.o.pressed) {
      bulletsPlayer2.push(
        new Sprite({
          position: {
            x: player2.position.x,
            y: player2.position.y + player2.width / 2,
          },
          height: 10,
          width: 10,
          color: "black",
          speed: 10,
          radius: 10,
        })
      )
    }
  })
  bulletsPlayer2.forEach((bullet) => {
    bullet.drawCircle();
    bullet.position.x -= bullet.speed;
  })
}

const animateShoot = () => {
  requestAnimationFrame(animateShoot);

  firePlayer1();
  firePlayer2();
}
const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player1.drawSquare();
  player2.drawSquare();
  player1Actions();
  player2Actions();
};
animate();
animateShoot();