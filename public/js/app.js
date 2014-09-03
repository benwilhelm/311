$(document).ready(function(){
  $("#add_ticket").click(function(e){
    e.preventDefault();
    var $group = $('#ticket_groups .ticket-group').first().clone();
    $group.find("input, textarea").val("");
    
    var idx = $("#ticket_groups .ticket-group").length;
    $group.find("input, textarea").each(function(i, o){
      var oldName = $(o).attr('name');
      console.log(oldName);
      var newName = oldName.replace(/\[\d+\]/, '[' + idx +']');
      console.log(newName);
      $(o).attr('name', newName);
    });
    
    $("#story_controls").before($group);
  });
});