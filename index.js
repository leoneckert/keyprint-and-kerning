var lastStrokeTime = null;
var lastStroke = null;
var threshold = 1000; //in milli seconds
var accuracy = 0;
var data = {
	"accuracy" : 0,
	"keystrokes": {}
}
var uploadedFile = false;
var text_in_the_box = "";
var first = true;
var keyprint_collection = true;


var handler = function (e) { 
	if (first){
		document.getElementById('textarea').value = "";
		first = false;
	}
	// print keydown event:
	// console.log(e);

	// print keyCode and key of key pressed:
	console.log("key pressed.")
	console.log("KeyCode: " + e.keyCode)
	console.log("Key: " + String.fromCharCode(e.keyCode));

	// check if it is the very first key pressed:
	if(lastStrokeTime == null){
		// if yes, that's our first "lastStroke"
		lastStrokeTime = performance.now();
		lastStroke = e.keyCode;

		console.log("--> not in array bc first letter pressed");
	}else if(uploadedFile == false){
		//if it is not the first key pressed,
		// we check wether the last key pressed before this one
		// was longer ago than our threshold (here still in miliseconds)
		// here the measurment is still milli seconds, defined outsie this function
		if(performance.now() -  lastStrokeTime <= threshold){
			// if there was not too much time between the two keystrokes
			// this means whatever time we measure is relevant for lastStroke
			// because that's where we "are coming from".
			// lets check if lastStroke is already in the array;
			console.log("--> in array");
			if(!data.keystrokes[lastStroke]){
				//if not, make, we make an entry:
				data.keystrokes[lastStroke] = {};
				
			}
			
			// next we check if the entry of lastStroke 
			// already has an entry for the current stroke. 
			if(!data.keystrokes[lastStroke][e.keyCode]){
				//if not, add one with an array the value:
				data.keystrokes[lastStroke][e.keyCode] = [];
			}
			//at this point the array to store the time difference between the two keystrokes into the array.
			//lets put the time in, making it nanoseconds
			data.keystrokes[lastStroke][e.keyCode].push(1000000 * (performance.now() -  lastStrokeTime));

			data.accuracy = data.accuracy + 1;
			// document.getElementById('acc').innerHTML = "accuracy: " + String(data.accuracy);
			//print the updated array:
			console.log(data);


		}else{
			// if the time between the two strokes was longer than the threshold defined,
			// we explain that on the console
			console.log("--> not in array bc last keystroke was more than" + threshold + " milli seconds ago.");

		}


	}
	// lastly after the whole operation, 
	// we update the values of lastStroke and lastStrokeTime:
	lastStrokeTime = performance.now();
	lastStroke = e.keyCode;
    
}

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    // alert_data(obj.name, obj.family);
    // data.keystrokes = {};
    data.keystrokes = obj.data;
    // document.getElementById('textarea').value = '';
    // document.getElementById('textarea').value = '\n\n\n\n\n\n                                    [+] you uploaded a keylogger file.\n                                    [>] typing into this box, will not affect your visual keyprint anymore.';
    // document.getElementById("textarea").disabled = true;
    uploadedFile = true;
    document.getElementById('uploaded_file_text').style.visibility = "visible";
    // document.getElementById('textarea').innerHTML = "[+] you uploaded a keylogger file.\n[>] typing into this box, will not affect your visual keyprint anymore. ";
    console.log(data);
    data.accuracy = obj.accuracy;
	document.getElementById('acc').innerHTML = "accuracy: " + String(data.accuracy);

}
    


function readTextArea(){
	if(first == false){
		text_in_the_box = document.getElementById('textarea').value;
		newKeyPress = true;
	}
	// console.log(document.getElementById('textarea').value);
}


// other key events: keydown, keypress
window.addEventListener("keydown", handler);
window.addEventListener("keyup", readTextArea);
document.getElementById('file').addEventListener('change', onChange);



