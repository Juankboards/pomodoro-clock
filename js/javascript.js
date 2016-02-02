function printTime () {	
	
	if (workRunning){
		counterRunning(workDuration);
		if (diff<=0) {
			workRunning = false;
			breakRunning = true;
			counterStart();
		};		
	} else {
		counterRunning(breakDuration);
		if (diff<=0) {
			workRunning = true;
			breakRunning = false;
			counterStart();
			sessions--;
			if (sessions<1) {
				clearInterval(intervalId);
				$("#tittle").text("Great Job!");
				$("#counterButtons").css("display","block");
				return;
			}
		};			
	
	

	} 
}

function counterStart (){	
	start = Date.now(),
	diff = 0;
	seconds = 0
	minutes = 0;	
	time = "";
}

function counterRunning (duration) {	
	diff = duration - (Date.now() - start)/1000;

	minutes=Math.floor((diff/60));
	seconds=Math.floor((diff%60));

	minutes = (minutes < 10)? "0"+minutes : minutes;
	seconds = (seconds < 10)? "0"+seconds : seconds;

	time = minutes + ":" + seconds;

	if (diff>=0){
		$("#tittle").text(time);
	}
}

$(document).ready(function(){	
	$("#start").on({
		'click': function (){
			workRunning = true,
			breakRunning = false
			sessions = parseInt($("#sessions").val());
			breakDuration = 60 * parseInt($("#break").val());
			workDuration = 60 * parseInt($("#work").val());
			
			
			if (sessions>0 && workDuration>0 && breakDuration>0){
				$(".timeSet").css("display","none");
				counterStart();			
				printTime();
				intervalId = setInterval(printTime,1000);	
			}
				
		}
	})	
	
});
