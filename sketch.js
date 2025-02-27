let zSlide;
let boxes = [];
let x = 0;
let y = 0;

let xSlide = 0;
let rotateXVal = 0;
let gameOver = false;
let button;
let pauseSpawn = 0;

const xSlideAmount = 5;
const rotateXAmount = 0.009

let foundDeviceOrientation = false;

let font;

function preload() {
  font = loadFont('assets/LEMONMILK-Light.ttf');
}

function adjustXSlideWithTilt(event){
  // Get the gamma value, which is the tilt along the y-axis (left/right)
  let gamma = event.gamma;

  // Now you can use gamma to adjust xSlide and rotateXVal
  if (gamma < -10) { // Device is tilted left
    xSlide -= xSlideAmount;
    rotateXVal = clampToBoundary(rotateXVal - rotateXAmount);
  }

  if (gamma > 10) { // Device is tilted right
    xSlide += xSlideAmount;
    rotateXVal = clampToBoundary(rotateXVal + rotateXAmount);
  }
}


function setup() {
  createCanvas(800, 600, WEBGL);
  zSlide = 0;
  perspective(70);
  button = createButton('start over');
  button.hide()
  
  this.arrow = new Arrow();
  pauseSpawn = 1000;
  introBoxes();
 
  

  // const hammer = new Hammer(swipeArea);
  // hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

  // // Detect only left and right swipe gestures
  // hammer.on('swipeleft', function() {
  //   xSlide -= xSlideAmount;
  //   rotateXVal = clampToBoundary(rotateXVal - rotateXAmount)
  // });

  // hammer.on('swiperight', function() {
  //   xSlide += xSlideAmount;
  //   rotateXVal = clampToBoundary(rotateXVal + rotateXAmount)
  // });

  if (typeof window.DeviceOrientationEvent !== 'undefined' && window.DeviceOrientationEvent.requestPermission) {
    foundDeviceOrientation = true
    // iOS 13+ requires this to request permission
    window.DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', adjustXSlideWithTilt, true);
        }
      })
      .catch(err => {
        console.log("Permission denied:", err);
      });
} else {
  // For older iOS versions (pre iOS 13.3) or non-iOS devices
  window.addEventListener('deviceorientation', adjustXSlideWithTilt, true);
}
}

function drawNBoxes(numBoxes, xs, ys, zs){
  for(let i = 0; i < numBoxes; i++) {
    boxes.push(new Box(xs, ys, zs, font))
    xs += getRandomIntInclusive(200, 500);
  }
}

function cleanUpBoxes(curZ){
  const zBuffer = 700;
  let tempBoxes = boxes.filter(curBox => curBox.getZ() <= -curZ + zBuffer);
  boxes = [...tempBoxes];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderBoxes() {
  for(let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
}

function introBoxes() {
  drawIntroBoxes(xSlide, zSlide, drawNBoxes)
}

function midGameDiamondBoxes(){
  diamond = new Diamond(xSlide, zSlide, drawNBoxes)
  diamond.show();
}

function midGameSquiggleBoxes(){
  squiggle = new Squiggle(xSlide, zSlide, drawNBoxes)
  squiggle.show();
}

function spawnBoxes() {
  let density = 500
  let farthestLeftXStart = xSlide-1000;
  let farthestRightXStart = xSlide;
  let zIndexSpawn = 1500
  if (zSlide % density == 0) {
    let xStart = getRandomIntInclusive(
      farthestLeftXStart, farthestRightXStart)
    let numBoxes = getRandomIntInclusive(3,6)
    drawNBoxes(numBoxes, xStart, 0, -zSlide - zIndexSpawn)
  }
}


function checkIntercept(curZ) {
  const zBuffer = 560;
  const possibleBoxes = boxes.filter(curBox => curBox.getZ() >= -curZ + zBuffer);
  const interceptX = 25;
  let reverseXSlide = xSlide;
  
  for(let i = 0; i < possibleBoxes.length; i++){
    let curBoxX = possibleBoxes[i].getX();

    if((curBoxX >= reverseXSlide - interceptX) && (curBoxX <= reverseXSlide + interceptX)){
      print('INTERCEPT GAME OVER')
      print(possibleBoxes[i])
      print(curZ)
      print(curBoxX, reverseXSlide)
      gameOver = true;
    }
  }
}

function clampToBoundary(value) {
  let bound = 0.05
  return (value < -bound) ? -bound : (value > bound ? bound : value);
}

function adjustXSlide(){
  if(gameOver){
    return
  }
  if (keyIsDown(LEFT_ARROW) === true) {
    xSlide -= xSlideAmount;
    rotateXVal = clampToBoundary(rotateXVal - rotateXAmount)
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    xSlide += xSlideAmount;
    rotateXVal = clampToBoundary(rotateXVal + rotateXAmount)
  }
}


function resetGame(){
  zSlide = 0;
  boxes = [];
  x = -200;
  y = 0;
  xSlide = 0;
  rotateXVal = 0;
  gameOver = false;
  button.hide();
  introBoxes();
  pauseSpawn = 2000;
}



function drawGreyBackground(){
  fill(220,220,220)
  rect(-600, -600, 1200, 610);
}

function draw() {
  background(110);

  rotate(rotateXVal);

  drawGreyBackground();
  push();
  rotate(-rotateXVal);
  fill(0,0,0);
  textFont(font);
  text(zSlide + " " +foundDeviceOrientation, -300, -300);
  pop();

  arrow.show(xSlide)
 
  adjustXSlide()
  cleanUpBoxes(zSlide);

  translate(-xSlide, 50, zSlide);

  renderBoxes();
  if(zSlide != 0 && zSlide % 10000 == 0){
    pauseSpawn = 1500;
    if ((int(str(zSlide)[0]) % 2 == 0)){
      midGameSquiggleBoxes();
    } else {
      midGameDiamondBoxes();
    }
    
  }
  if (pauseSpawn < 0){
    spawnBoxes();
  } 
  
  if(gameOver){
    button.show()
    button.position(350, 350);
    button.mousePressed(resetGame);
  } else {
    checkIntercept(zSlide);
    zSlide += 10;
    pauseSpawn -= 5;
  }
}
