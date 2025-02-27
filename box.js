let rd = [242, 44, 44];
let og = [242, 117, 44];
let yl = [255, 204, 0]

class Box {
  constructor(x, y, z, font) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.font = font;
    this.angle = 0;
    this.size = 50; 
    this.fade = 0
    this.color = this.getRandomColor()
  }
  
  getRandomColor(){
    let colors = {1: rd, 2: og, 3: yl};
    let index = getRandomIntInclusive(1,3)
    let c = colors[index]
    return c
  }
  
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  show() {
   
    push();
    fill(this.color[0], this.color[1], this.color[2], this.fade)
    translate(this.x, this.y, this.z);
    box(this.size);
    // fill(0,0,0);
    // translate(0,0, 25);
    // textFont(font);
    // textSize(14);
    // text(this.x, -20, 0);
    pop();


    this.fade += 1
  }
  
  getX(){
    return this.x;
  }
  
  getZ() {
    return this.z;
  }
   
}