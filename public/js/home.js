
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

    document.getElementById("greeting").innerHTML = "Good " + getTimeOfDay() + ", ";


});

//Display Next Shift
document.addEventListener('DOMContentLoaded', function() {
    // Fetch events array from the server and append the first event to innerHTML
    fetch('/getEvents')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const firstEvent = data[0];

            const eventDisplayEl = document.getElementById('shiftDetails');
            eventDisplayEl.innerHTML = `
                <p>${firstEvent.title}</p>
                <p>${firstEvent.start}</p>
                <p>${firstEvent.end}</p>
                <p>${firstEvent.extendedProps.location}</p>
                <p>${firstEvent.extendedProps.building}</p>
            `;

        }
    })
    .catch(error => console.error('Error fetching events:', error));
});

/* window.onload = function(){
    document.getElementById("eventForm").addEventListener("click", startEvent)
      function startEvent() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      };
} */