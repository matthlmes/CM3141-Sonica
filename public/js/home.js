
document.addEventListener('DOMContentLoaded', function() {      //Added to ensure script runs after DOM is fully loaded, so getTimeOfDay doesn't return null
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

    document.getElementById("greeting").innerText = "Good " + getTimeOfDay() + ", ";
});