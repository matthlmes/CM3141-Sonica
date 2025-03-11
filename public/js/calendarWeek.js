var eventArray = require('../../server')

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
    console.log(eventArray);
    calendar.addEvent( [eventArray[0]] );

    /* document.getElementById("addEvent").addEventListener("click", function(){
      console.log("Button Clicked");
       
  }) */
  });