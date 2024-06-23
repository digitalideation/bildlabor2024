//Code adapted from https://editor.p5js.org/BarneyCodes/sketches/syVZZiBHk
let img;
let stamp;
let topLayer;

function preload() {
  img = loadImage("assets/plakatwand.jpg");
  stamp = loadImage("assets/brush6.png");
}

function setup() {
  //stamp.filter(BLUR, 10);//add additional filter to the stamp

  createCanvas(windowWidth, windowHeight);
  topLayer = createGraphics(width, height);
  
  topLayer.background(255);
  /*topLayer.textSize(50);
  topLayer.textAlign(CENTER);
  topLayer.text("SCRATCH ME", width/2, height/2);*/
    
  topLayer.imageMode(CENTER);
  topLayer.strokeWeight(40);
  topLayer.blendMode(REMOVE);  
}

function draw() {
  image(img, 0, 0, width, height);
  
  if(mouseIsPressed) {
   topLayer.image(stamp, mouseX, mouseY, stamp.width * 2, stamp.height*2);
  }
  
  image(topLayer, 0, 0);
}