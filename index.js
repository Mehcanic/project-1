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
  constructor({ position, height, width, color, speed, health }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
    this.health = health;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width);
  }
}

class Projectile {
  constructor({ x, y, color, radius, bulletSpeed }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.bulletSpeed = bulletSpeed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.Pi * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
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
  x: 900,
  y: 0,
  height: 50,
  width: 100,
  color: "red",
  speed: 1,
  health: 100,
});

// const bullet2 = new Projectile({
//   position: {
//     x: player1.position.x,
//     y: player1.position.y,
//   },
//   color: "black",
//   radius: 5,
//   bulletSpeed: 1,
// });

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
    case "y":
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
    case "p":
      keys.p.pressed = true;
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
    // case "t":
    //   keys.t.pressed = false;
    //   break;
    // case "y":
    //   keys.t.pressed = false;
    //   break;

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
    // case "o":
    //   keys.o.pressed = false;
    //   break;
    // case "p":
    //   keys.p.pressed = false;
    //   break;
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
  if (keys.t.pressed) {
    fire();
    console.log("t");
  }
  if (keys.y.pressed) {
    punch();
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
  if (keys.o.pressed) {
    fire();
  }
  if (keys.p.pressed) {
    punch();
  }
};

const fire = () => {
  window.addEventListener("click", (event) => {
    const bullet1 = new Projectile({
      x: event.clientX,
      y: event.clientY,
      color: "black",
      radius: 5,
      bulletSpeed: 1,
    });

    bullet1.draw();
  });
};

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player1.draw();
  player2.draw();
  player1Actions();
  player2Actions();
};

animate();
