let video;

let x = 0;

let loaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createVideo(
    'assets/tarkowski.mov', loaded = true
  );
  video.size(480, 270);
  video.hide();
  video.loop();
  
}

function draw() {

  // image(video, 0, 0);
  if (loaded) {
    let w = video.width;
    let h = video.height;

    copy(video, w / 2, 0, 1, h, x, 0, 1, h);
    

    x = x + 1;

    if (x > width) {
      x = 0;
    }

  }


}

