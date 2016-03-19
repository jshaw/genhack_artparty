var currentShape;
var tileCountX = 10;
var tileCountY = 10;

var tileWidth
var tileHeight;
var shapeSize = 50;
var shapeAngle = 0;
var maxDist;

var ranX = [10, 200, 2, 20];
var ranY = [20, 200, 12, 20, 2];

var t = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  smooth();

  tileWidth = width / ceil(tileCountX);
  tileHeight = height / ceil(tileCountY);
  maxDist = sqrt(sq(width) + sq(height));
  
  currentShape = loadImage("module_1.png");
  
  windowResized();
}

function draw() {
  
  // Clears the previous frame
  background(255);
  smooth();
  
  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
  
      // Tile width * what position you are at + 1/2 of the image to center the image
      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual position of the shape
      // var angle = atan2(mouseY - posY, mouseX - posX) + radians(shapeAngle);
      var angle = atan2(y(t) - posY, x(t) - posX) + radians(shapeAngle);

      push();
      translate(posX, posY);
      rotate(angle);
      image(currentShape, 0, 0, shapeSize, shapeSize);
      pop();
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
    console.log(ceil(ranX[i]));
  }
  
  for (var j = 0; j < ranY.length; j++){
    ranY[j] = ceil(random(20));
    console.log(ceil(ranY[j]));
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
  maxDist = sqrt(sq(width) + sq(height));
}

function keyReleased() {
  console.log(keyCode);
  if (keyCode === 70) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}