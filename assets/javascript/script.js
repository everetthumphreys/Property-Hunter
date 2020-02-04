$(document).ready(function() {
    $(".collection-checklist").empty(); // clear default checklist
    apartmentList(); //Load appartment list
    theTemplate(); //load parameter and checklist

    //Add property button clicked
    $("#submit-template").on("click", function(event) {
        event.preventDefault();

        //check if parameter is not empty
        if ($("#preference").val() !== "") {
            newRenderTmp();
        }
    });

    //Add property button clicked
    $("#save-apartment").on("click", function(event) { 
        event.preventDefault();

        if ($("#checkList").val() !== "") {
            data = {
                property: $("#checkList").val(),
                note: $("#notes").val(),
                address: $("#address-input").val(),
                transit: $('input[name="transit"]:checked').val(),
                preferences: buildCheckedPreferences()
            };
            var prop = localStorage.getItem("properties");
            if (prop) {
                var another = [];
                another = JSON.parse(prop);
                data.id = another.length + 1;
                another.push(data);
                localStorage.setItem("properties", JSON.stringify(another));
                apartmentList();
            } else {
                var another = [];
                data.id = 1;
                another.push(data);
                localStorage.setItem("properties", JSON.stringify(another));
                apartmentList();
            }
        }
    });
});

let templateScorePoints = 0;
let checkListScorePoints = 0;

//Build the preference
function newRenderTmp() {
    var data = {
        param: $("#preference").val(),
        priority: $('input[name="priority"]:checked').val()
    };
    var prior = setPriorityIcon(data.priority);
    var p = localStorage.getItem("preferences");
    var result = p ? JSON.parse(p) : [];
    var newData = {
        text: data.param,
        value: prior.pointValue
    };
    newData.id = result.length + 1;
    result.push(newData);
    localStorage.setItem("preferences", JSON.stringify(result));
    $(".collection-checklist").empty();
    theTemplate();
    //add up the points in the stored objects
}

// This module renders the parameter template
function theTemplate() {
    templateScorePoints = 0;
    var data = JSON.parse(localStorage.getItem("preferences"));
    $(".collection-template").empty();
    if (data) {
        for (const iterator of data) {
            let collectionItemTemplate = $("<p>")
                .attr("class", "collection-item" + " " + iterator.value)
                .text(iterator.text);
            let iconElement = $("<i>")
                .attr("class", "material-icons right")
                .text(buildIconSet(iterator.value)); //builds the priority icon
            let templateItemCancel = $("<i>")
                .attr("onclick", "remove(" + iterator.id + ")")
                .attr("class", "material-icons left cancel")
                .text("cancel"); //builds the cancel icon
            collectionItemTemplate.append(templateItemCancel).append(iconElement); //appends the icon to collectionItemTemplate
            templateScorePoints += iterator.value; //adds points to the templateScorePoints
            $(".collection-template").append(collectionItemTemplate); //appends the collectionItemTemplate to the pag
            renderCheckList(iterator.text, iterator.value, iterator.value);
            console.log(templateScorePoints)
        }
    }
}
// This module will check for icon type
function setPriorityIcon(req) {
    var res = {};
    switch (req) {
        case "low":
            res.iconText = "panorama_fish_eye";
            res.pointValue = 1;
            break;

        case "medium":
            res.iconText = "favorite_border";
            res.pointValue = 2;
            break;

        case "high":
            res.iconText = "favorite";
            res.pointValue = 3;
            break;

        default:
            res.error = "true";
            break;
    }
    return res;
}

//Build the Icon set
function buildIconSet(val) {
    var res = "";
    switch (val) {
        case 1:
            res = "panorama_fish_eye";
            break;

        case 2:
            res = "favorite_border";
            break;

        case 3:
            res = "favorite";
            break;

        default:
            res = "error";
            break;
    }
    return res;
}

// This will populate the property checklist
function renderCheckList(parameterInput, iconText, pointValue) {
    let checkListParagraph = $("<p>").attr("class", "collection-item");
    let checkListLabel = $("<label>");
    let checkListInput = $("<input>")
        .attr("type", "checkbox")
        .attr("name", "my-check")
        .attr("value", pointValue);
    let checklistSpan = $("<span>").text(parameterInput);
    let icon = $("<i>")
        .attr("data-id", pointValue)
        .attr("class", "material-icons right")
        .text(buildIconSet(iconText)); //lines 30-34 are building the checklist
    checkListParagraph.append(
        checkListLabel
        .append(checkListInput)
        .append(checklistSpan)
        .append(icon)
    ); //appends everything each other in the proper order
    $(".collection-checklist").append(checkListParagraph); //appends things to the page
}

// This will calculate and display the score.


// This module will help build all preference checkboxes and add the checklist score
function buildCheckedPreferences() {
    var res = [];
    let checkValue = 0;
    $("input:checkbox[name=my-check]:checked").each(function() {
        res.push($(this).val());
        $.each(res, function() {
            if (this == 1) {
                checkValue += 1;
            } else if (this == 2) {
                checkValue += 2;
            } else if (this == 3) {
                checkValue += 3;
            }
        });
        //we need to use the checked values to determine the score of the checked items.
    });
    checkListScorePoints += checkValue;
    return res;
}

//This calculates the actual score of the apartment
function writeScore() {
    var scoreInProgress = checkListScorePoints/templateScorePoints * 100;
    score = Math.floor(scoreInProgress);
    $(".score-calculated").text(score + "%");
}

//Click listener for checkboxes
$('input[name="my-check"]').on("click", function(event) {
    event.preventDefault();
    writeScore();
    }
);

// This module will generate the apartment list
function apartmentList() {
    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            alert("Checkbox is checked.");
        }
        else if($(this).prop("checked") == false){
            alert("Checkbox is unchecked.");
        }
    });      
}


//Remove the deleted preference
function remove(id) {
    var data = JSON.parse(localStorage.getItem("preferences"));
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data.splice(i, 1);
            localStorage.setItem("preferences", JSON.stringify(data));
            $(".collection-checklist").empty();
            theTemplate();

        }
    }
}