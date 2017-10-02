clock();


function clock(){
	$(function($) {
	  setInterval(function() {
	    var date = new Date(),
	        time = date.toLocaleTimeString();
	    $(".clock").html(time);
	  }, 1000);
	});
}