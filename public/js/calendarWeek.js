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
    calendar.addEvent([ eventArray[0].back ] )
    calendar.render();

    /* document.getElementById("addEvent").addEventListener("click", function(){
      console.log("Button Clicked");
       
  }) */
  });