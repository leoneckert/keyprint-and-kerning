var theText = ""

function getText(){
	theText = text_in_the_box;
	print("[+] got the text, its' " + theText);
	processTheText(theText);

}


function prepareTextForKeyCode(txt_){
	var temp_txt = txt_;
	var txtKeyCode = []

	var t_count = 0;
	for (var i = 0; i < temp_txt.length; i++) {
	
	  if (temp_txt[i] == " ") {
	    txtKeyCode[t_count] = "[space]";
	  } else if (temp_txt[i] == "\n") {
	    txtKeyCode[t_count] = "[enter]";
	  } else {
	    txtKeyCode[t_count] = temp_txt[i].toLowerCase();
	  }
	t_count++;
	}
	return txtKeyCode;
}

function prepareTextForPrint(txt_){
	var temp_txt = txt_;
	var textPrint = []

	var t_count = 0;
	for (var i = 0; i < temp_txt.length; i++) {
	
	  if (temp_txt[i] == " ") {
	    textPrint[t_count] = " ";
	  } else if (temp_txt[i] == "	") {
	    textPrint[t_count] = " ";
	  } else if (temp_txt[i] == "\n") {
	    textPrint[t_count] = "<br>";
	  } else {
	    textPrint[t_count] = temp_txt[i];
	  }
	t_count++;
	}
	return textPrint;
}

var textForKeyCode = [];
var textForKeyPrint = [];
function processTheText(txt_){
	//reset both:
	textForKeyCode = [];
	textForKeyPrint = [];
	print("[+] processing text now.")
	
	textForKeyCode = prepareTextForKeyCode(txt_);
	print("[+] textForKeyCode is " + textForKeyCode);
	print("<< length is " + textForKeyCode.length)
	
	textForKeyPrint = prepareTextForPrint(txt_);
	print("[+] textForKeyPrint is " + textForKeyPrint);
	print("<< length is " + textForKeyPrint.length)

	loadJSON("allKeysLogged.json", gotKeyCodes);
}


var keyCodeArray = [];
function gotKeyCodes(kCdata) {
  keyCodeArray = [];
  // print(kCdata);
  
  for (var i = 0; i < textForKeyCode.length; i++) {
    // print(data[txt_for_times[i]]);
    keyCodeArray[i] = kCdata[textForKeyCode[i]];
  }
  print("[+] convertd textForKeyCode to KeyCodes: " + keyCodeArray);
  print("<< length is " + keyCodeArray.length)
  // print("[+] converted letters to keycode");
  // print(keyCodeArray);
  // print(str(keyCodeArray.length) + " keycodes");
  // print("---");

  // loadJSON(keyprint, gotKeyprint);
  createTimesArray();

}


var times = [];
function createTimesArray(){
	times = []
	// print(data.keystrokes);
	keyprint_data = data.keystrokes;
	print("[+] got the keyprint profile: ");
	print(keyprint_data);
  	print("<< retrieving times now")

	var t_count = 0;
	for (var i = 0; i < keyCodeArray.length - 1; i++) {
		if (keyprint_data[str(keyCodeArray[i])]) {
		  if(keyprint_data[str(keyCodeArray[i])][str(keyCodeArray[i + 1])]) {

		  	// if there is an entry in the entry, then we need the average value of the time values 
	        var average = 0;
	        var sum = 0;
	        // for that we go through all vallues and add them up:
	        for(var k = 0; k < keyprint_data[str(keyCodeArray[i])][str(keyCodeArray[i + 1])].length; k++){
	          sum = sum + keyprint_data[str(keyCodeArray[i])][str(keyCodeArray[i + 1])][k];
	        }
	        // and then divide them through the arrays length:
	        average = sum / keyprint_data[str(keyCodeArray[i])][str(keyCodeArray[i + 1])].length;


		    // print("yes");
		    times[t_count] = round(average);
		    t_count++;
		    // print(keyprint_data[str(keyCodeArray[i])][str(keyCodeArray[i + 1])])
		  }else {
		    // print(keyCodeArray[i]);
		    // print(keyCodeArray[i + 1]);
		    times[t_count] = 0;
		    t_count++;
		  } 
		}else {
		    // print(keyCodeArray[i]);
		    // print(keyCodeArray[i + 1]);
		    times[t_count] = 0;
		    t_count++;
		}
	}
	print("[+] Times stored in array: " + times);
	print("length is " + times.length);

	print_final_text();
}

var distortian_factor = 100;
function print_final_text(){
	var enter_time_for_line_break = 0;
	var next_red = false;
	for(var i = 0; i < textForKeyPrint.length; i ++){
		var p = createP(textForKeyPrint[i]);
		p.parent("kerning_here");
		p.style("display", "inline");
		var c = map(times[i], 0, 1000000000, -6, distortian_factor);
	    // if there is no data, we leave the distance at default
	    if(times[i] == 0){
	      c = 0;
	    }
	    p.style("margin-right", c + "px");

	    if(next_red){
	      p.style("text-decoration", "underline");
	      next_red = false;
	    }

	    if (enter_time_for_line_break != 0) {
	      var d = map(enter_time_for_line_break, 0, 1000000000, -6, distortian_factor);
	      // if there is no data, we leave the distance at default
	      if(enter_time_for_line_break == 0){
	        d = 0;
	      }
	      // d *= d;
	      p.style("margin-left", d + "px");
	      enter_time_for_line_break = 0;
	    }

	    if(times[i] == 0){
	      next_red = true;
	    }
    
	    if (textForKeyPrint[i] == "<br>") {
	      enter_time_for_line_break = times[i];
	    }


	}



}



function renderKernedText(){
		
  	// get the text
	getText();

	// prepare array with text to turn into keycode

	// also prepare array with text for final print

	// create array with Keycodes

	// get the clients keyprint data

	// convert the keycode to times, based on the keyprint data

	//prit final text with margins based on times array}}

}