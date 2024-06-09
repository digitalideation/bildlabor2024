//Demo to show how to use input from the microphone to change the copied part of an image
//User needs to click a button to activate the microphone!
//use old sound library -- see index.html

let mic;
let micactivated = false;
let btn;
let img;
let posX=0;

function preload() {
  img = loadImage('assets/Nemo.jpeg');
}

function setup() {
  createCanvas(img.width, img.height);
  mic = new p5.AudioIn();
 

  btn=createButton('activate mic');
  btn.mousePressed(function(){
    micactivated=true;
    mic.start();
   
  })

  image(img, 0, 0, width, height);
}

function draw() {
 

  if(micactivated){
    let vol = mic.getLevel(); //level is between 0 and 1
    // console.log(vol)
    //map vol to a size between 20 and height
    let h = map(vol, 0, 1, 10, height);
   
    //copy function parameters: source image, source x, source y, source width, source height, target x, target y, target width, target height
    copy(img, posX, 0, 2, h, posX+random(-5,5), 0, 2, h+random(-5,5));
   
    btn.hide();
    posX+=2;
    if(posX>width){
      posX=0;
    }
  }else{
    btn.position(10, 10);
  }
}


