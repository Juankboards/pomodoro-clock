function printTime () {	
	
	if (workRunning){
		counterRunning(workDuration);
		$("body").css("background-image","url(https://s1.yimg.com/bt/api/res/1.2/eleQVdMo5McWXj8YR5IJUg--/YXBwaWQ9eW5ld3M7cT04NTt3PTYzMA--/http://l.yimg.com/os/publish-images/omg/2015-05-26/b2a0df80-03cb-11e5-a8a1-6dc8d3245017_shia-labeouf-do-it.gif)");
		if (diff<=0) {
			workRunning = false;
			breakRunning = true;
			counterStart();
		};		
	} else if (breakRunning) {
		counterRunning(breakDuration);
		$("body").css("background-image","url(https://media.giphy.com/media/eYbS7lujv4Ig0/giphy.gif)");
		if (diff<=0) {
			workRunning = true;
			breakRunning = false;
			counterStart();
			sessions--;
			if (sessions<1) {
				clearInterval(intervalId);
				$("#tittle").text("Great Job!");	
				$("body").css("background-image","url(http://i.imgur.com/NY5OPT1.gif?noredirect)");							
			}
		};	
	} else {
		$("#tittle").text("Take your time and start when you feel good");	
	}

}

function counterStart (){		
	start = Date.now();
	diff = 0;
	seconds = 0;
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
		$("#secondTittle").text(time);
	}
}

function startPause (){		
	workRunning = false;
	breakRunning = false;
	$("#pause").text("Start timer");
}

$(document).ready(function(){	
	$("#start").on({
		'click': function (){
			workRunning = true;
			breakRunning = false;
			sessions = parseInt($("#sessions").val());
			breakDuration = 60 * parseInt($("#break").val());
			workDuration = 60 * parseInt($("#work").val());
			
			
			if (sessions>0 && workDuration >0 && breakDuration>0){
				$("#secondTittle").toggle();
				$("#timeSet").toggle();		
				$("#counterButtons").toggle();

				counterStart();			
				printTime();
				intervalId = setInterval(printTime,200);	
			}				
		}
	});	

	$("#pause").on({				
		'click': function(){
			lastWork = workRunning;
			lastBreak = breakRunning;
			$("#pause").toggle();
			$("#startAgain").toggle();
			if (workRunning){
				workDuration = diff;
				workRunning = false;
			} else {
				breakDuration = diff;
				breakRunning = false;
			}						
		}
	});

	$("#startAgain").on({		
		'click': function(){
			$("#pause").toggle();
			$("#startAgain").toggle();
			workRunning = lastWork;
			breakRunning = lastBreak;
			counterStart();
		}
	});

	$("#setTime").on({		
		'click': function(){
			$("body").css("background-image","url(https://media.giphy.com/media/wErJXg1tIgHXG/giphy.gif)");
			$("#timeSet").toggle();
			$("#counterButtons").toggle();
			$("#secondTittle").text("You can do it!");	
			clearInterval(intervalId);
		}
	});


});
