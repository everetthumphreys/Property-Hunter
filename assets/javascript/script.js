$(document).ready(function() {
	let templateScorePoints = 0;
	let checkListScorePoints = 0;

	//localStorage items
	// let localStoragePrefs = JSON.parse(localStorage.getItem("prefs")) || [];
	let localStoragePrefs = JSON.parse(localStorage.getItem("prefs")) || [];

	function renderTemplate() {
		let parameterInput = $("#parameter").val(); //this is the selected parameter
		let priorityInput = $('input[name="priority"]:checked').val(); //this is the selected priority
		let collectionItemTemplate = $("<p>")
			.attr("class", "collection-item" + " " + priorityInput)
			.text(parameterInput); //create a <p> with parameterInput
		let iconText = ""; //set iconText to an empty string
		let pointValue = 0; //set point value to 0
		if (priorityInput == "low") {
			iconText = "panorama_fish_eye"; //sets the icon to low
			pointValue = 1; //sets the point value to one
		} else if (priorityInput == "medium") {
			iconText = "favorite_border"; //sets the icon to medium
			pointValue = 2; //sets the points to 2
		} else if (priorityInput == "high") {
			iconText = "favorite"; //sets the icon to high
			pointValue = 3; //sets the points to three
		}
		let iconElement = $("<i>")
			.attr("class", "material-icons right")
			.text(iconText); //builds the priority icon
		let templateItemCancel = $("<i>")
			.attr("class", "material-icons left cancel")
			.text("cancel"); //builds the cancel icon
		collectionItemTemplate.append(templateItemCancel).append(iconElement); //appends the icon to collectionItemTemplate

		localStoragePrefs.push({
			text: parameterInput,
			value: pointValue
		}); //update the array in our js file that maps to local storage

		localStorage.setItem("prefs", JSON.stringify(localStoragePrefs)); //because we updated the array that maps to local storage, we need to go ahead and reset localStorage's "prefs" item too
		templateScorePoints += pointValue; //adds points to the templateScorePoints
		debugger;
		$(".collection-template").append(collectionItemTemplate); //appends the collectionItemTemplate to the page
		renderCheckList(parameterInput, iconText, pointValue); //passes parameterInput, iconText, pointValue to the renderChecklist function
	}

	function renderCheckList(parameterInput, iconText, pointValue) {
		let checkListParagraph = $("<p>").attr("class", "collection-item");
		let checkListLabel = $("<label>");
		let checkListInput = $("<input>")
			.attr("type", "checkbox")
			.attr("value", pointValue);
		let checklistSpan = $("<span>").text(parameterInput);
		let icon = $("<i>")
			.attr("class", "material-icons right")
			.text(iconText); //lines 30-34 are building the checklist
		checkListParagraph.append(
			checkListLabel
				.append(checkListInput)
				.append(checklistSpan)
				.append(icon)
		); //appends everything each other in the proper order
		$(".collection-checklist").append(checkListParagraph); //appends things to the page
	}

	$("#submit-template").on("click", function(event) {
		event.preventDefault();
		renderTemplate();
	});
	//.each class checkbox onclick grab the state (checked or unchecked) then add or subtract based on the state
	//in the same function then calculate the score.
});

//localstorage model for saved properties:
//each new Location:
// {
//     name: "Buckhead Lofts",
//     prefs: [{text: "close to work", value: 3}, {text: "dog park", value: 1}],
//     totalScore: 45
// }

//localStorage could always have the current "high score" which is all the current prefs scores added together
