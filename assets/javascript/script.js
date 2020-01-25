$(document).ready(function() {
    $(".collection-checklist").empty(); // clear default checklist
    apartmentList(); //Load appartment list
    theTemplate(); //load parameter and checklist

    //Add property button clicked
    $("#submit-template").on("click", function(event) {
        event.preventDefault();

        //check if parameter is not empty
        if ($("#parameter").val() !== "") {
            newRenderTmp();
        }
    });

    //Add property button clicked
    $("#p-button").on("click", function(event) {
        event.preventDefault();

        if ($("#checkList").val() !== "") {
            data = {
                property: $("#checkList").val(),
                note: $("#notes").val(),
                address: $("#address-input").val(),
                trasit: $('input[name="transit"]:checked').val(),
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

//BUild up the paramater
function newRenderTmp() {
    var result = [];
    var data = {
        param: $("#parameter").val(),
        priority: $('input[name="priority"]:checked').val()
    };
    var prior = setPriorityIcon(data.priority);
    var p = localStorage.getItem("parameters");
    if (p) {
        result = JSON.parse(p);
        var newData = {
            text: data.param,
            value: prior.pointValue
        };
        newData.id = result.length + 1;
        result.push(newData);
        localStorage.setItem("parameters", JSON.stringify(result));
        $(".collection-checklist").empty();
        theTemplate();
    } else {
        var newData = {
            text: data.param,
            value: prior.pointValue
        };
        newData.id = 1;
        result.push(newData);
        localStorage.setItem("parameters", JSON.stringify(result));
        $(".collection-checklist").empty();
        theTemplate();
    }
}

// THis module renders the parameter template
function theTemplate() {
    var data = JSON.parse(localStorage.getItem("parameters"));
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
                .attr("onclick", "reove(" + iterator.id + ")")
                .attr("class", "material-icons left cancel")
                .text("cancel"); //builds the cancel icon
            collectionItemTemplate.append(templateItemCancel).append(iconElement); //appends the icon to collectionItemTemplate
            templateScorePoints += iterator.value; //adds points to the templateScorePoints
            $(".collection-template").append(collectionItemTemplate); //appends the collectionItemTemplate to the pag
            renderCheckList(iterator.text, iterator.value, iterator.value);
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

// This module will help build all preference checkboxe
function buildCheckedPreferences() {
    var res = [];
    $("input:checkbox[name=my-check]:checked").each(function() {
        res.push($(this).val());
    });
    console.log(res);
    return res;
}

// This module will generate the apartment list
function apartmentList() {
    var prop = JSON.parse(localStorage.getItem("properties"));
    $("#apart").empty();
    if (prop) {
        for (const iterator of prop) {
            let apartment = $("<a>")
                .attr("href", "#!")
                .attr("class", "collection-item")
                .text(iterator.property);
            $("#apart").append(apartment);
        }
    }
}

//Remove the deleted parameter
function reove(id) {
    var data = JSON.parse(localStorage.getItem("parameters"));
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data.splice(i, 1);
            localStorage.setItem("parameters", JSON.stringify(data));
            $(".collection-checklist").empty();
            theTemplate();

        }
    }
}
