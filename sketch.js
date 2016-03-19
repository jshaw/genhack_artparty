var currentShape;
// var tileCountX = 10;
// var tileCountY = 10;

var tileCountX = 5;
var tileCountY = 5;

var tileWidth
var tileHeight;
var shapeSizeWidth = 20;
var shapeSizeHeight = 50;
var shapeAngle = 0;

var ranX = [10, 200, 2, 20];
var ranY = [20, 200, 12, 20, 2];

var t = 0;
var h = 0;
var angle = 0;

var useMouse = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('rgb(255)');
  smooth();
  
  colorMode(HSB, height, height, height);
  
  rectMode(CENTER);
  
  dim = width/2;

  tileWidth = width / ceil(tileCountX);
  tileHeight = height / ceil(tileCountY);
  
  // currentShape = loadImage("module_1.png");
  
  windowResized();
}

function draw() {
  
  // Clears the previous frame
  background('rgb(255)');
  smooth();
  
  for (var gridY = 0; gridY < tileCountY; gridY++) {
    
    if (h >= height){
      h = 0;
    } else {
      h += 0.1;  
    }
    
    var c = h;
    
    for (var gridX = 0; gridX < tileCountX; gridX++) {
  
      // Tile width * what position you are at + 1/2 of the image to center the image
      // var posX = tileWidth * gridX + tileWidth / 2;
      // var posY = tileHeight * gridY + tileWidth / 2;
      
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // calculate angle between mouse position and actual position of the shape
      if(useMouse){
        angle = atan2(mouseY - posY, mouseX - posX) + radians(shapeAngle);
      } else {
        angle = atan2(y(t) - posY, x(t) - posX) + radians(shapeAngle);
      }

      push();
      translate(posX, posY);
      rotate(angle + 45);
      // image(currentShape, 0, 0, shapeSize, shapeSize);
      // stroke(posY, height, height);
      noStroke();
      // fill(posY, height, height);
      fill(c, height, height);
      
      rect(0, 0, shapeSizeWidth, shapeSizeHeight, 5);
      // console.log("posX: " + posX);
      // console.log("posY: " + posY);
      // rect(posX, posY, 10, 50, 5);
      pop();
      // c = (c + 1) % 360;
    }
  }

  if (frameCount % 500 === 0){
    randomizePositions();
  }
  
  t++;
}

function x (t){
  // return width / 2 + ((sin(t / 10) * 100 + sin(t / 5) * 20));
  // return width / 2 + ((sin(t / 10) * 200 + sin(t) * 2));
  
  return width / 2 + ((sin(t / ranX[0]) * 200 + sin(t) * ranX[2]  + sin(t / ranX[3])));
}

function y (t){
  // return height / 2 + (cos(-t / 10) * 100 + sin(t/5) * 20);
  // return width / 2 + (cos(t / 10) * 100);
  // return width / 2 + (cos(t / 20) * 200 + cos(t / 12) * 20);
  
  return height / 2 + (cos(t / ranY[0]) * 200 + cos(t / ranY[2]) * ranY[3] + cos(t / ranY[4]));
}

// Get random values for x and y calculations
function randomizePositions() {
  
  for (var i = 0; i < ranX.length; i++){
    ranX[i] = ceil(random(20));
  }
  
  for (var j = 0; j < ranY.length; j++){
    ranY[j] = ceil(random(20));
  }

}

// Resize the canvas on resize.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  randomizePositions();
  
  tileCountX = windowWidth / 60;
  tileCountY = windowHeight / 60;
  
  tileWidth = width / ceil(tileCountX);
  tileHeight = height / ceil(tileCountY);
}

function keyReleased() {
  console.log(keyCode);
  if (keyCode === 70) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
  
  if (keyCode === 77) {
    useMouse = !useMouse;
  }
  
  if (keyCode === 76) {
    console.log("use mouse: " +  useMouse);
  }
  
  
}