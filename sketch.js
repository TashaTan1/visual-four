/***************************************************************************************
*    Title: a hidden path we trace
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/poOwEdz
*
***************************************************************************************/

//variables
let four;
let stream = []; 
let t; 
let n = 4000; 
let r1, g1, b1; 
let path = false; 
let timer = 5;
let button;

function preload() {
  // LOAD SOUND
  four = loadSound("FOUR.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  for (let i = 0; i < n; i++) {
    stream.push(new dreams()); 
  }
  r1 = random(180, 255); 
  g1 = random(180, 255); 
  b1 = random(180, 255);
  noStroke();
  four.play();
  four.loop();
}
function draw() {
  background(r1 / 10, g1 / 10, b1 / 10, 50); 
  translate(width / 2, height / 2); 
  t = frameCount / 10000;
  for (let i = 0; i < n; i++) {
    stream[i].display(); 
  }
  if (path) {
    test(); 
  }
  //timer
  if (frameCount % 60 == 0 && timer > 0) {
  
    timer--;
  }
  //  console.log(timer);
  if (timer == 0) {
    button = createButton("Carry on Listening");
    button.position(200, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/visual-four/";
    });
    button = createButton("Let's Breath");
    button.position(425, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/let-s-breath/";
    });
  }
}

function sparkle(a, b) {
 //animation for visual
  beginShape();
  for (let i = 0; i <= PI / 2; i += 0.1) {
    x = a * cos(i) - a;
    y = b * sin(i) - b;
    vertex(x, y);
  }
  for (let i = (3 * PI) / 2; i <= 2 * PI; i += 0.1) {
    x = a * cos(i) - a;
    y = b * sin(i) + b;
    vertex(x, y);
  }
  for (let i = PI; i <= (3 * PI) / 2; i += 0.1) {
    x = a * cos(i) + a;
    y = b * sin(i) + b;
    vertex(x, y);
  }
  for (let i = PI / 2; i <= PI; i += 0.1) {
    x = a * cos(i) + a;
    y = b * sin(i) - b;
    vertex(x, y);
  }
  endShape();
}

class dreams {
 
  constructor() {
    this.offset = random(10, 10.5); 
    this.a = random(0.1, random(1, 10)); 
    this.b = random(0.1, random(1, 10));
    this.c = random(0.1, random(1, 10));
    this.d = random(0.1, random(1, 10));
    this.type = floor(random(0, 7.999)); 
    this.s = random(0, width);
  }
  display() {
    let p = 100 * sin(t * 2000 + this.a);
    fill(r1, g1, b1, p);
    push();

    if (this.type == 0) {
      this.t = width * sin(t / 100 + this.s); 
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); 
      sparkle(this.a, this.b); 
      push(); 
      rotate(PI / 8);
      sparkle(this.c, this.d);
      pop();
    } else if (this.type == 1) {
      this.t = width * sin(t / 100 + this.s);
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); 
      sparkle(this.a, this.b); 
    } else if (this.type == 2) {
      this.t = width * sin(t / 100 + (this.s * this.a) / 100);
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); 
      fill(r1, g1, b1, 2 * cos(this.t / this.offset));
      ellipse(0, 0, this.s, this.s); 
    } else if (this.type >= 3) {
      this.t = width * sin(t / 100 + this.s); 
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y);
      sparkle(this.a, this.b); 
      push();
      rotate(PI / 12);
      sparkle(this.c, this.d); 
      rotate(PI / 6);
      sparkle(this.c, this.d);
      pop();
    }

    pop();
  }
}


function test() {
  noFill();
  stroke(r1, g1, b1, 10);
  strokeWeight(0.5);
  angleMode();
  beginShape();
  for (let i = 0; i < 200; i += 0.1) {
    let x = 10.1 * i * sin(i) * cos(i / 4);
    let y = 10.1 * i * cos(i) * sin(i / 4);
    vertex(x, y);
  }
  endShape();
  noStroke();
}



function mousePressed() {
 
  stream = [];
  t = 0;
  setup();
  draw();
}

function keyPressed() {
  path = !path;
}
