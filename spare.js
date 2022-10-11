// class Player {
//   constructor({ position, keyUp, keyDown, keyLeft, keyRight, attack, punch, speed }) {
//     this.position = position,
//     this.keyUp = keyUp,
//     this.keyDown = keyDown,
//     this.keyLeft = keyLeft,
//     this.keyRight = keyRight,
//     this.attack = attack,
//     this.punch = punch,
//     this.speed = speed
//   }

//   // * draw() function will 'draw' object on canvas based on Sprite class.
//   // * The Sprite class is taking position values from 'new created player'
//   // * Next the position is used in the draw() function to referance where the player will be positioned on the canvas
  
//   // ! The fillStyle property is used to set the color of the player. It's using CSS styles passed as strings
//   draw() {
//     ctx.fillStyle = 'blue'; // this is style-color of the players
//     ctx.fillRect(this.position.x, this.position.y, 50, 150)
//   }
// }

// const leftControls = {
//   w: {
//     pressed: false,
//   },

//   s: {
//     pressed: false,
//   },

//   a: {
//     pressed: false,
//   },

//   d: {
//     pressed: false,
//   },

//   t: {
//     pressed: false,
//   },

//   y: {
//     pressed: false,
//   },
// }

// const rightControls = {
//   ArrowUp: {
//     pressed: false,
//   },

//   ArrouDown: {
//     pressed: false,
//   },

//   ArrouLeft: {
//     pressed: false,
//   },

//   ArrouRight: {
//     pressed: false,
//   },

//   1: {
//     pressed: false,
//   },

//   2: {
//     pressed: false,
//   },
// }
