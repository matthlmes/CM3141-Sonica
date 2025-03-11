src ="server.js"

number = number.src;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: number,
        right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
      }
    });
    calendar.render();
  });