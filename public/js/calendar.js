
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: "title",
        right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
      }
    });
    calendar.render();
  });