const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// fillRect takes 4 atributes (x, y, width of the rectangle, heigth of the rectangle)
ctx.fillRect(0, 0, canvas.width, canvas.height);

// class Sprite will be used to create players.
class Sprite {
  constructor(position){
    this.position = position;
  }
  // * draw() function will 'draw' object on canvas based on Sprite class.
  // * The Sprite class is taking position values from 'new created player'
  // * Next the position is used in the draw() function to referance where the player will be positioned on the canvas
  
  // ! The fillStyle property is used to set the color of the player. It's using CSS styles passed as strings
  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.position.x, this.position.y, 50, 150)
  }
}

class Item {
  constructor(position) {
    this.position = position;
  }
  draw() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.position.x, this.position.y, 10, 10)
  }
}

// TODO positions x and y of the player and item are constant but it will be changed
// * const player1 is creating new player using Sprite class

const player1 = new Sprite({
  x: 10,
  y: 10,
})

player1.draw()
console.log(player1, typeof player1)

const gun = new Item({
  x: 600,
  y: 50,
})

gun.draw()
console.log(gun, typeof gun)