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

    document.getElementById("addEvent").addEventListener("click", function(){
      console.log("Button Clicked");
      db.collection('events').find({"login.email":email}, function(err, result){
        calendar.addEvent({result});
      }) 
  })
  });