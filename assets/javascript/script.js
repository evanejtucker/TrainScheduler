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

	$("#trainName").val("");
	$("#line").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");

}


// Main Processes
// -------------------------------------------------------------------------------------------------


database.ref().on("child_added", function(snapshot){

	var newRow = $("<div>");
	newRow.addClass("row");
		var addTrain = $("<div col-md-4>");
		var addLine = $("<div col-md-1>");
		var addDestination = $("<div col-md-2>");
		var addFrequency = $("<div col-md-1>");
		var nextArrival = $("<div col-md-2>");
		var minutesAway = $("<div col-md-2>");

	newRow.append(addTrain);
	addTrain.html(snapshot.val().train);
	
	
	newRow.append(addLine);
	addLine.html(snapshot.val().line);
	
	
	// addDestination.html(snapshot.val().destination);
	// newRow.append(addDestination);

	// addFrequency.html(snapshot.val().frequency);
	// newRow.append(addFrequency);

	// nextArrival.html(snapshot.val().arrival);
	// newRow.append(nextArrival);

	// minitesAway.html(snapshot.val().ETA);
	// newRow.append(minutesAway);

	$("#currentTrains").append(newRow);
	$("#currentTrains").append("<hr>");

}, function(error) {
	console.log("Errors Handled: " + error.code);
});

$("#submitButton").on("click", addTrain);


});