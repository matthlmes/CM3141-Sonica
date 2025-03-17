
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
   
    fetch('/isAdmin')
    .then(response => response.json())
            .then(data => {
                console.log(response)
                if (response == true){
                    console.log("Admin logged in.");
                }
                
                else{
                    console.log("Not admin.");
                    document.getElementById('addEvent').style.display = none;
                }
            });

    
});

//Display Next Shift
document.addEventListener('DOMContentLoaded', function() {
    // Fetch events array from the server and append the first event to innerHTML
    fetch('/getEvents')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            // Sort the events by start date
            data.sort((a, b) => new Date(a.start) - new Date(b.start));

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



//Displays event form info on Add Event button click
document.addEventListener('DOMContentLoaded', function() {
    const addEventButton = document.getElementById('addEvent');
    const eventForm = document.getElementById('eventForm');

    addEventButton.addEventListener('click', function() {
        if (eventForm.style.maxHeight) {
            eventForm.style.maxHeight = null;
            eventForm.style.visibility = 'hidden';
        } else {
            eventForm.style.maxHeight = eventForm.scrollHeight + 'px';
            eventForm.style.visibility = 'visible';
        }
    });
});

