// this array will be holdding all the keyCodes in the order specified by me:
var allKeys_keys = [];


var keyRange;
var newKeyPress = false;

function setup() {
  // uncomment to represent the keystrokes in order of physical location on the keyboard
  keyRange = 0;
  // the keyorder array is in the buttons etc. file, and specifies in which order we want to plot 
  // the keys on the tables x and y axis
  for (var i = 0; i < keyorder.length; i++){
    allKeys_keys[i] = allKeys[keyorder[i]];
    keyRange++;
  }

  // //specifiy size of canvas, first w, then h
  createTheCanvas(850,250);

  saveVisualButton();
  printToggleBox();
  
}


function draw() {
  //color background
  background(0);
  if(blackOnWhite) background(255);

  //horizontal stroke color (default is black) and weight
  stroke(255,50);
  if(blackOnWhite) stroke(0,50);
  strokeWeight(0.5);
  //draw strokes for every key we plot
  for (var i = 0; i < allKeys_keys.length; i++) {
      line(0, i * cellHeight + cellHeight/2, w, i * cellHeight + cellHeight/2);
  }

  // !! // --> MAIN LOOP \\ !! \\
  //goes through the ordered keyCodes and checks if there
  //is an entry for them in the clients data structure
  for (var i = 0; i < allKeys_keys.length; i++) {
    if (data.keystrokes[allKeys_keys[i]]) {

      //this option is to stack them up, to also see overall if one key in partiular has a wait after it:
      var addUpWidth = 0;


      // if there is an entry, it again goes through the oredered array of keyCodes 
      // and checks if in the entry is an antry for them
      for (var j = 0; j < allKeys_keys.length; j++) {
        if (data.keystrokes[allKeys_keys[i]][allKeys_keys[j]]) {
          
          // if there is an entry in the entry, then we need the average value of the time values 
          var average = 0;
          var sum = 0;
          // for that we go through all vallues and add them up:
          for(var k = 0; k < data.keystrokes[allKeys_keys[i]][allKeys_keys[j]].length; k++){
            sum = sum + data.keystrokes[allKeys_keys[i]][allKeys_keys[j]][k];
          }
          // and then divide them through the arrays length:
          average = sum / data.keystrokes[allKeys_keys[i]][allKeys_keys[j]].length;


          // !! // Here we define the coloring of the bars \\ !! \\

          //thresholds for color changes:
          //      0//////// 1000000000/10 //////// 2*(1000000000/10) //////// //////// //////// 1000000000/2 //////// //////// //////// //////// //////// 1000000000
          var th3 = 8 * (1000000000/10);
          var th2 = 2 * (1000000000/10);

          var redTone = 0;
          var greenTone = 0;
          var blueTone = 0;
          var opacity = 255;

          // and how the color should behave in the given thresholds
          if (average >= th3){
            //blue:
            var redTone = map(average, th3,1000000000, 255, 0);
            var greenTone = map(average, th3,1000000000, 255, 0);
            var blueTone = 255;

          }else if (average >= th2){
            //white:
            var redTone = 255;
            var greenTone = 255;
            var blueTone = 255;
            var opacity = map(average, th2,th3, 100, 255);

          }else if (average >= 0){
            //red:
            var redTone = 255;
            var greenTone = map(average, th2 / 3,th2, 0, 255);
            var blueTone = map(average, th2 / 3,th2, 0, 255);
            var opacity = map(average, th2 - 10000,th2, 255, 100);

          }

                  
          noStroke();
          // the following two rectangles are for the case that
          // rectangles are not fullly opaque (specified in color section), so 
          // we draw a black (or white depending on print mode) rectangle below
          fill(0);
          if(blackOnWhite) fill(255);
          rect(w/2 + j * cellWidth, i * cellHeight, map(average, 0, 1000000000, 0, cellWidth), cellHeight); 
          rect(addUpWidth, i * cellHeight, map(average, 0, 1000000000, 0, cellWidth), cellHeight);

          //now the realy rectangles, we assign the color defined above:
          fill(redTone, greenTone, blueTone,opacity);
          // or make them all black if print mode
          if(blackOnWhite) fill(0);

          // now drwa one in the right half of the visual on the correct i and j relative position;
          rect(w/2 + j * cellWidth, i * cellHeight, map(average, 0, 1000000000, 0, cellWidth), cellHeight); 
          // and another one in the satcked up left half on an x position that depends on the recatngels drawn before
          rect(addUpWidth, i * cellHeight, map(average, 0, 1000000000, 0, cellWidth), cellHeight);
          //this is to add up the widths of the rectangles in one row to position the
          //the rectangle for the left side.
          addUpWidth = addUpWidth + map(average, 0, 1000000000, 0, cellWidth); 
          
        }
      }
    }
  } 
  //before we render the text in the kerning box, we emoty it. 
  
  if(newKeyPress){
    document.getElementById('kerning_here').innerHTML = " ";
    renderKernedText();
    newKeyPress = false;
  } 
}
















