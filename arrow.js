class Arrow {
  constructor() {
    this.x = 0;
  }
  
  show(xSlide) {
    push();
    fill(0,0,0);
    // 560 should match intercept zBuffer
    translate(0, 50, 560);
    let n = 10;
    let y = 38;
    triangle(this.x-n, y+n, this.x, y, this.x + n, y + n);
    // translate(-4, 0, 0);
    // textFont(font);
    // text(xSlide, 0, y)
    pop()
  }
  
  move(newX){
    this.x = newX;
  }
  
  getX(){
    return this.x;
  }
}