
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

            const eventDisplay = document.getElementById('shiftDetails');

            // Format start and end date
            const startDate = new Date(firstEvent.start);
            const endDate = new Date(firstEvent.end);

            const formattedStartDate = startDate.toLocaleDateString();
            const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedEndTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            eventDisplay.innerHTML = `
                <p>${formattedStartDate} ${formattedStartTime} - ${formattedEndTime}</p>
                <p>${firstEvent.title}</p>
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