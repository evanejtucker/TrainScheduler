$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqLS-CjAIw-FseBsYhQEXHqy1MM82ex8o",
    authDomain: "train-scheduler-17ca1.firebaseapp.com",
    databaseURL: "https://train-scheduler-17ca1.firebaseio.com",
    projectId: "train-scheduler-17ca1",
    storageBucket: "",
    messagingSenderId: "62863187996"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// Global Variables
// -------------------------------------------------------------------------------------------------



// Functions
// -------------------------------------------------------------------------------------------------

var addTrain = function(event) {
	// keeps the page from reloading on the button click
	event.preventDefault();

	// captures user input form data 
	var train = $("#trainName").val().trim();
	var line = $("#line").val().trim();
	var destination = $("#destination").val().trim();
	var first = $("#firstTrain").val().trim();
	var frequency = $("#frequency").val().trim();

	// push new train info to database
	database.ref().push({
		train: train,
		line: line,
		destination: destination,
		first: first,
		frequency: frequency
    });

	// clears form after data is pushed
	$("#trainName").val("");
	$("#line").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");

}


// Main Processes
// -------------------------------------------------------------------------------------------------


database.ref().on("child_added", function(snapshot){

		// moment.js calculations
		var a = snapshot.val();

		var firstTime = moment(a.first, "HH:mm").subtract(10, "years").format("x");

		if (firstTime >= 0) {
			firstTrain = firstTime * -1; 
		}else {
			firstTrain = firstTime;
		}

		var minsDifferent = moment().diff(moment.unix(firstTrain), "minutes");
		var minsAway = minsDifferent % a.frequency;
		var nextArrival = moment().add(minsAway, "m").format("HH:mm");

	// adds table elements, and populates them with correct data from firebase
	var newTableRow = $("<tr>");

	var newTrain = $("<td>");
	newTrain.html(snapshot.val().train);
	newTableRow.append(newTrain);

	var newLine = $("<td>");
	newLine.html(snapshot.val().line);
	newTableRow.append(newLine);

	var newDestination = $("<td>");
	newDestination.html(snapshot.val().destination);
	newTableRow.append(newDestination);

	var newFrequency = $("<td>");
	newFrequency.html(snapshot.val().frequency);
	newTableRow.append(newFrequency);

	var newNextArrival = $("<td>");
	newNextArrival.html(nextArrival);
	newTableRow.append(newNextArrival);

	var newMinutesAway = $("<td>");
	newMinutesAway.html(minsAway);
	newTableRow.append(newMinutesAway);

	$("#trainTable").append(newTableRow);

}, function(error) {
	console.log("Errors Handled: " + error.code);
});

// adds new train data to firebase, and table on submit button click
$("#submitButton").on("click", addTrain);


});