let zSlide;
let boxes = [];
let x = 0;
let y = 0;

let xSlide = 0;
let rotateXVal = 0;
let gameOver = false;
let button;
let pauseSpawn = 0;

let font;

function preload() {
  font = loadFont('/LEMONMILK-Light.ttf');
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
  // drawNBoxes(3, -200, 0, -200);
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
  // let startX = -1020
  // for(let i = 0; i < 15; i++){
  //   drawNBoxes(1, startX, 0, -zSlide - 1500)
  //   startX += 60
  // }


  // startX = 100
  // for(let i = 0; i < 20; i++){
  //   drawNBoxes(1, startX, 0, -zSlide - 1500)
  //   startX += 60
  // }

  // startZ = 1500
  // for(let i = 0; i < 20; i++){
  //   drawNBoxes(1, -120, 0, -zSlide - startZ)
  //   startZ += 60
  // }

  // startZ = 1500
  // for(let i = 0; i < 20; i++){
  //   drawNBoxes(1, 100, 0, -zSlide - startZ)
  //   startZ += 60
  // }
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
  xSlideAmount = 5;
  rotateXAmount = 0.009
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
  text(zSlide, -300, -300);
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
