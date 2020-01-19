$(document).ready(function () {

let templateScorePoints = 0;
let checkListScorePoints = 0;

function renderTemplate() {
    let parameterInput = $('#parameter').val(); //this is the selected parameter
    let priorityInput = $('input[name="priority"]:checked').val(); //this is the selected priority
    let collectionItemTemplate = $('<p>').attr('class', 'collection-item' + " " + priorityInput).text(parameterInput); //create a <p> with parameterInput
    $('.collection-template').append(collectionItemTemplate); //append it to the collectionTemplate
};

function renderCheckList() {
    let templateItems = $('.collection-template').contents('p');
    console.log(templateItems)
    //check each p.collection-item in the array for value and priority
    //construct an entry using this template:

    // <label>
    //     <input type="checkbox" />
    //         <span>Near Work</span>
    //         <i class="material-icons right">favorite</i>
    // </label>

    //Append the entry to .collection-checklist
    //Use each piority item to add points to checkListScorePoints
};

function renderPriorityIcon() {
    let iconLow = $('<i>').attr('class', 'material-icons right').text('panorama_fish_eye'); //set <i> for low
    let iconMedium = $('<i>').attr('class', 'material-icons right').text('favorite_border'); //set <i> for medium
    let iconHigh = $('<i>').attr('class', 'material-icons right').text('favorite'); //set <i> for high

    if ($('.low')) {
        $('.low').append(iconLow) //if .low exists append appropriate <i> to it
        templateScorePoints + 1;
    }
    if ($('.medium')) {
        $('.medium').append(iconMedium); //if .medium exists append appropriate <i> to it
        templateScorePoints + 2;
    }
    if ($('.high')) {
        $('.high').append(iconHigh); //if .high exists append appropriate <i> to it
        templateScorePoints + 3;
    }
}

$('.submit-template').on('click', function (event) {
    event.preventDefault();
    renderTemplate();
    renderPriorityIcon();
    renderCheckList();
})

//Bugs:
//Figure out how to prevent the script from repeatedly adding a priority icon on successive clicks
//Figure out how to nest the functions in order to produce a usable point value for templateScorePoints and checkListScorePoints
});