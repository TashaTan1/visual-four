/***************************************************************************************
*    Title: a hidden path we trace
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/poOwEdz
*
***************************************************************************************/

//just some code slapped together over saturday morning coffee for the birb's nest sparkles challenge #WCChallenge
//press a key to reveal the path
let four;
let stream = []; //array of dreams
let t; //a sprinkle of time
let n = 4000; //number of beings
let r1, g1, b1; //what our cones may see.
let path = false; //hidden
let timer = 5;
let button;

function preload() {
  // LOAD SOUND
  four = loadSound("FOUR.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight); //a pillow for the mind
  for (let i = 0; i < n; i++) {
    stream.push(new dreams()); //where dreams are born
  }
  r1 = random(180, 255); //reds
  g1 = random(180, 255); //greens
  b1 = random(180, 255); //blues
  noStroke();
  four.play();
  four.loop();
}
function draw() {
  background(r1 / 10, g1 / 10, b1 / 10, 50); //but darker is the room
  translate(width / 2, height / 2); //center our origin
  t = frameCount / 10000; //fractions of moments
  for (let i = 0; i < n; i++) {
    stream[i].display(); //thoughts looped in loops
  }
  if (path) {
    test(); //a hidden curve in which dreams follow
  }
  if (frameCount % 60 == 0 && timer > 0) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
  }
  //  console.log(timer);
  if (timer == 0) {
    button = createButton("Carry on Listening");
    button.position(200, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://editor.p5js.org/natashatan/sketches/Xt8qYFt1a";
    });
    button = createButton("Let's Breath");
    button.position(425, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://editor.p5js.org/natashatan/sketches/gxSMDJpDT";
    });
  }
}

function sparkle(a, b) {
  //ya basic sparkle
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
  //an object to behold
  constructor() {
    this.offset = random(10, 10.5); //a smidge offtrack
    this.a = random(0.1, random(1, 10)); //abcd...shapes of sparkles from ellipses ...
    this.b = random(0.1, random(1, 10));
    this.c = random(0.1, random(1, 10));
    this.d = random(0.1, random(1, 10));
    this.type = floor(random(0, 7.999)); //a deceiving number
    this.s = random(0, width); //something to stir with
  }
  display() {
    let p = 100 * sin(t * 2000 + this.a); //there and not there - a blink
    fill(r1, g1, b1, p);
    push();

    if (this.type == 0) {
      this.t = width * sin(t / 100 + this.s); //a step forward - or back
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); //where we are
      sparkle(this.a, this.b); //exist
      push(); //every push needs an equal and opposite pop
      rotate(PI / 8);
      sparkle(this.c, this.d);
      pop();
    } else if (this.type == 1) {
      this.t = width * sin(t / 100 + this.s); //a step forward - or back
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); //where we are
      sparkle(this.a, this.b); //exist
    } else if (this.type == 2) {
      this.t = width * sin(t / 100 + (this.s * this.a) / 100); //a step forward - or back
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); //where we are
      fill(r1, g1, b1, 2 * cos(this.t / this.offset));
      ellipse(0, 0, this.s, this.s); //exist
    } else if (this.type >= 3) {
      this.t = width * sin(t / 100 + this.s); //a step forward - or back
      let x = this.offset * this.t * sin(this.t) * cos(this.t / 4);
      let y = this.offset * this.t * cos(this.t) * sin(this.t / 4);
      translate(x, y); //where we are
      sparkle(this.a, this.b); //exist
      push();
      rotate(PI / 12);
      sparkle(this.c, this.d); //exist
      rotate(PI / 6);
      sparkle(this.c, this.d); //exist
      pop();
    }

    pop();
  }
}

//the curve in which dreams follow
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

//I often play with curves prior to coding - here is that playground: https://www.desmos.com/calculator/uwtvritmhy

function mousePressed() {
  //awake then sleep
  stream = [];
  t = 0;
  setup();
  draw();
}

function keyPressed() {
  path = !path;
}
