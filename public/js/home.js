
document.getElementById("greeting").innerHTML = "Good " + getTimeOfDay() + " , ";

//Get time and apply general term to it
function getTimeOfDay() {
    var date = new Date();
    var hour = date.getHours();
    var timeOfDay;

    console.log(date);
    console.log(hour);

    if (hour < 12) {
        timeOfDay = "Morning";
    } else if (hour < 18) {
        timeOfDay = "Afternoon";
    } else {
        timeOfDay = "Evening";
    }

    console.log(timeOfDay);

    return timeOfDay;
}
