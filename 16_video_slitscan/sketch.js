//Inspiriert vom Tutorial von Daniel Shiffman
//https://timrodenbroeker.de/shiffman-copy/

let video;
let pos = 0;
let loaded = false;
let h = 3;
let history = new Array();
let historyIndex = 0;
let offset = 0;

function setup() {
  createCanvas(480, 270);
  pixelDensity(1);
  video = createVideo(
    'assets/tarkowski.mov',  loaded = true
  );

  video.size(480, 270);
  video.hide();
  video.loop();
  // Show the default video controls.
  //video.showControls();
  background(255);
  noStroke();

  for (let n = 0; n < height / h; n++) {
    history[n] = createImage(width, height);
  }

  frameRate(30);
}

function draw() {
  slitTimeline();
}

function slitTimeline() {
  if (video.loadedmetadata && loaded) {
    history[historyIndex].copy(
      video,
      0,
      0,
      video.width,
      video.height,
      0,
      0,
      video.width,
      video.height
    );
    historyIndex = (historyIndex + 1) % history.length;
  }

  for (let n = 0; n < history.length; n++) {
    let y = n * h;
    let currentIndex = (n + offset) % history.length;
    copy(history[currentIndex], 0, y, width, h, 0, y, width, h);
  }
  offset++;
}
