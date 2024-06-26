// P_2_3_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw tool. shows how to draw with dynamic elements.
 *
 * MOUSE
 * drag                : draw with text
 *
 * KEYS
 * del, backspace      : clear screen
 * arrow up            : angle distortion +
 * arrow down          : angle distortion -
 * s                   : save png
 */
'use strict';

var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Georgia';
var letters = 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';
var fontSizeMin = 3;
var angleDistortion = 0.0;

var counter = 0;

function setup() {
  // use full screen size
  let cvn=createCanvas(displayWidth, displayHeight);
  cvn.parent("canvas");//put the sketch in the div with the id "canvas", this is the div in the html file
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(0);
}

function draw() {
  //if (mouseIsPressed && mouseButton == LEFT) { //original 
  if (dist(mouseX, mouseY, pmouseX, pmouseY) > 10 && mouseX>10 && mouseY>10) {//changed Hanna Zuellig, 2024
    var d = dist(x, y, mouseX, mouseY);//get distance between current and last mouse position
    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter); //get width of the next letter

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);//calculate angle between current and last mouse position

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));//rotate the letter by the angle + a random value
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= letters.length) counter = 0;//reset counter if all letters are drawn

      x = x + cos(angle) * stepSize;//calculate new x and y position, this is the position where ther letter was drawn
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
