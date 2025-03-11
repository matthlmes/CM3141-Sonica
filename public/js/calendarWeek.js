document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridWeek',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridWeek,dayGridDay' // user can switch between the two
      }
    });
    calendar.render();


    //fetches events array from server and appends to calendar
    fetch('/getEvents')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                calendar.addEvent(event);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
  });