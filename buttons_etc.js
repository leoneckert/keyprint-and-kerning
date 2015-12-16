var saveImg;

function saveVisualButton(){
	saveImg = createButton("save");
	saveImg.mousePressed(saveTheImg);
	saveImg.style("display","block");
	saveImg.style("margin-top","10px");
	saveImg.parent("save_button");
}



var img;
var b = false;
var url;
// this function, and the change i made in the library will need to be changed for the show!
function saveTheImg(){
  //for the follwoing i changed some lines in the p5.js library to get access to the images url. 
  saveCanvas('myKeyprint','jpg');
  url = createP(leonleon);
  // url.style("color: #FFFFFF")
  // img = createImage(100,100);
  // img.loadPixels();
  // for (i = 0; i < img.width; i++) {
  //   for (j = 0; j < img.height; j++) {
  //     img.set(i, j, color(0, 90, 102));
  //   }
  // } 
  // img.updatePixels();
  // b = true;


  // img = createImg('http://p5js.org/img/asterisk-01.png');
  
}

var blackOnWhite = false;
var blackOnWhiteCheck;

function printToggleBox(){
	var label =  createP("print: ");
	label.style("color","#FFFFFF");
	label.style("display","inline");
	label.parent("print_here");

	blackOnWhiteCheck = createCheckbox(false);
	blackOnWhiteCheck.style("display","inline");
	blackOnWhiteCheck.changed(blackOnWhiteCheckEvent);
	blackOnWhiteCheck.parent("print_here");
}


function blackOnWhiteCheckEvent() {
  if (this.checked()) {
    blackOnWhite = true;
  } else {
    blackOnWhite = false;
  }
}



var cnv;
var w;
var h;
function createTheCanvas(w_, h_){
	w = w_;
	h = h_;
	cellWidth = (w/2)/keyRange;

	cellHeight = h/keyRange;
	cnv = createCanvas( w ,h);

	cnv.background(0);
	cnv.parent("canvas_here");
}


// here the order in which the keys lie on the (insible) table x and y axis, 
// this is roughly in order of their physical position
var keyorder = [
    
    "[esc]",
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",

    "[tab]",
    "q",
    "w",
    "e",
    "r",
    "t",

    "[caps]",
    "a",
    "s",
    "d",
    "f",
    "g",

    "[shift]",
    "z",
    "x",
    "c",
    "v",
    "b",

    "[ctrl]",
    "[alt]",
    "[cmd]",
    "[space]",



    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "[backspace]",

    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "[enter]",

    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "\\",

    "n",
    "m",
    ",",
    ".",
    "/",
    "[left]",
    "[up]",
    "[down]",
    "[right]"
]