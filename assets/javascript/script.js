var apartmentInput = $("apartmentInput").val();
var priorityInput = $("input[name=priority]:checked");

//check radio buttons
if ($("input[name=priority]:checked").length > 0) {
    console.log(priorityInput.value)
}