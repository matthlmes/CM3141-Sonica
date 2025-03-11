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

    /* document.getElementById("addEvent").addEventListener("click", function(){
      console.log("Button Clicked");
      calendar.addEvent({title: 'test event',
        start: new Date("2025-03-11" + 'T00:00:00'),
        allDay: true})  
  }) */
  });