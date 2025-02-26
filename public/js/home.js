
//Get time and apply general term to it
function getTimeOfDay() {
    var now = new Date();
    var hour = now.getHours();
    var timeOfDay;

    if (hour < 12) {
        timeOfDay = "Morning";
    } else if (hour < 18) {
        timeOfDay = "Afternoon";
    } else {
        timeOfDay = "Evening";
    }

    return timeOfDay;
}

getTimeOfDay();

document.getElementById("greeting").innerText = "Good " + getTimeOfDay() + " , ";