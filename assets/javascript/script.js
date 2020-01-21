$(document).ready(function () {

    let templateScorePoints = 0;
    let checkListScorePoints = 0;

    function renderTemplate() {
        let parameterInput = $('#parameter').val(); //this is the selected parameter
        let priorityInput = $('input[name="priority"]:checked').val(); //this is the selected priority
        let collectionItemTemplate = $('<p>').attr('class', 'collection-item' + ' ' + priorityInput).text(parameterInput); //create a <p> with parameterInput
        let iconText = '';
        let pointValue = 0;
        if (priorityInput == 'low') {
            iconText = 'panorama_fish_eye';
            pointValue = 1;
        } else if (priorityInput == 'medium') {
            iconText = 'favorite_border';
            pointValue = 2;
        } else if (priorityInput == 'high') {
            iconText = 'favorite';
            pointValue = 3;
        }
        let iconElement = $('<i>').attr('class', 'material-icons right').text(iconText);
        collectionItemTemplate.append(iconElement);
        templateScorePoints += pointValue;
        $('.collection-template').append(collectionItemTemplate);
        renderCheckList(parameterInput, iconText, pointValue);
    };

    function renderCheckList(parameterInput, iconText, pointValue) {
        let checkListParagraph = $('<p>').attr('class', 'collection-item');
        let checkListLabel = $('<label>');
        let checkListInput = $('<input>').attr('type', 'checkbox').attr('value', pointValue);
        let checklistSpan = $('<span>').text(parameterInput);
        let icon = $('<i>').attr('class', 'material-icons right').text(iconText);
        checkListParagraph.append(checkListLabel.append(checkListInput).append(checklistSpan).append(icon));
        $('.collection-checklist').append(checkListParagraph);
    };

    $('.submit-template').on('click', function (event) {
        event.preventDefault();
        renderTemplate();
    })
    //.each class checkbox onclick grab the state (checked or unchecked) then add or subtract based on the state
    //in the same function 
});