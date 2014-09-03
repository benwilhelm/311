$(document).ready(function(){
  $("#add_ticket").click(function(e){
    e.preventDefault();
    var $group = $('#ticket_groups .ticket-group').first().clone();
    $group.find("input, textarea").val("");
    $("#story_controls").before($group);
  });
});