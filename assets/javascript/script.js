let $submitTemplate = $('.submit-template');
let templateScorePoints = 0;
let apartmentScorePoints = 0;

$submitTemplate.on('click', function(event) {
    event.preventDefault();
    let priorityInput = $('input[name="priority"]:checked').val();
    console.log(priorityInput);
})



