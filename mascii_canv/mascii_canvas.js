var cnv, capture, img, ascGrays, pDen = 1, stepSize = 5, diameter = 200;

////    alternateive ASCII gradients:    ////////
var ascNZ = "æ©%3?+:,. ", ascNZ2 = "@©%3?+:,. ",  ascClassic = "@%#*+=-:. ",  ascForeignCurrency = "%€£>+=-. ";
var ascCircles = "©ØOc°. ", ascForeignLang = "æØø×º¨ ", ascDiagonals = "%Xx/^` ";

function preload(){
  img = loadImage("img/monalisa2.jpg");
}

function getAscii( lum ){
  var idx = floor( map(lum, 0, 255, 0, ascGrays.split('').length-1));
  return String( ascGrays.split('')[idx] );
}

function getLuma(c){
  return constrain( (c.r * 0.299 + c.g * 0.587 + c.b * 0.114), 0, 255);
}

function setup() {
  cnv = createCanvas( windowWidth, windowHeight);
  pDens = pixelDensity();
  background(255);  noStroke();
  textFont("Courier");
  textAlign(CENTER);
  noTint();
  ascGrays = ascNZ;
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0);
  loadPixels();
  fill(255);
  ellipse(CENTER);
  ellipse(mouseX, mouseY - stepSize/2, diameter, diameter);
  var ascChar = "";
  stepSize = 5;
  textSize(stepSize * 1.4);

  for (var x = 0; x < width; x+= stepSize) {
    for (var y = 0; y < height; y+= stepSize ) {
     var imgRGBA = getPxlRGBA(x, y);
     var luma = getLuma( imgRGBA );
     var d =  dist(mouseX, mouseY, x, y);
     var maxDist = diameter/2;
     if (d <= maxDist) {
          fill(0);
          ascChar = getAscii( luma );   
          text( ascChar,x, y);  
       }
    }
  }
  if (mouseIsPressed) {
    stepSize = 7;
    textSize(stepSize * 1.4);
    fill(255);
    rect(0,0,width,height);
    for (var x = 0; x < width; x+= stepSize) {
      for (var y = 0; y < height; y+= stepSize ) {
      var imgRGBA = getPxlRGBA(x, y);
      var luma = getLuma(imgRGBA);
      fill(0);
      ascChar = getAscii( luma ); 
      text( ascChar,x, y);  
     }
    }
  }
}

function getPxlRGBA(x, y, src) {
  var w = ( src === undefined ) ? width : src.width;
  var pos = ( Math.floor(x) + Math.floor(y)* (w * pDens) ) * 4;
  var rgba = {};
  if (src === undefined){
    rgba = {
      r: pixels[pos + 0],
      g: pixels[pos + 1],
      b: pixels[pos + 2],
      a: pixels[pos + 3]
    }
  }else{
    rgba = {
      r: src.pixels[pos + 0],
      g: src.pixels[pos + 1],
      b: src.pixels[pos + 2],
      a: src.pixels[pos + 3]
    }
  }
  //    bit shift rgb hex:
  //        var rgbShiftHex =  (rgba.r << 16) + (rgba.g << 8) + rgba.b;
  return rgba;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
   if (key == '0'){
    ascGrays = ascNZ2;
    console.log("ascNZ2");
  }
  if (key == '1'){
    ascGrays = ascNZ;
      console.log("ascNZ");
  }
   if (key == '2'){
      ascGrays = ascForeignCurrency;
      console.log("ascForeignCurrency");
  }
    if (key == '3'){
      ascGrays = ascCircles;
      console.log("ascCircles");
  }
  if (key == '4'){
      ascGrays = ascForeignLang;
      console.log("ascForeignLang");
  }
   if (key == '5'){
    ascGrays = ascDiagonals;
    console.log("ascDiagonals");
  }
    if (key == '6'){
     ascGrays = ascClassic;
      console.log("ascClassic");
  } 
}