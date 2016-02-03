workPhrases = {
	5: "The first step is to start",
	4: "Starting is the first step",
	3: "Nothing is imposible",
	2: "Don't let your dreams be dreams",
	1: "You are almost there",
	0: "You are the best!"
};

breakPhrases = {
	5: "Piece of cake, isn't it?",
	4: "Piece of cake, isn't it?",
	3: "Just breathe",
	2: "Lets get back on track",
	1: "You can do this!",
	0: "Are you ready?"
};

workGif = {
	5: "https://m.popkey.co/8bcfb9/EGJ0x.gif",
	4: "https://media.giphy.com/media/ACcXRXwUqJ6Ok/giphy.gif",
	3: "http://media2.onsugar.com/files/2013/12/23/642/n/1922729/8433595825f41c77_clam-series.gif.xxxlarge.gif",
	2: "https://45.media.tumblr.com/53a5c5102d7125817bbf578c620a0abd/tumblr_n070t4x59S1rfdoxno1_500.gif",
	1: "https://media.giphy.com/media/vuIVvW0NsWBzy/giphy.gif",
	0: "http://photos.orlandoweekly.com/wp-content/uploads/2014/01/1-Workout.gif"
}

breakGif = {
	5: "http://media.tumblr.com/tumblr_lzerkmTo421qmioz3.gif",
	4: "https://ak-hdl.buzzfed.com/static/enhanced/webdr01/2013/5/30/14/anigif_enhanced-buzz-2410-1369939749-19.gif",
	3: "http://31.media.tumblr.com/tumblr_m8x5tv8BkR1qcjieco1_500.gif",
	2: "http://38.media.tumblr.com/dfe06d90dac77b3350c283688d3757d5/tumblr_inline_nnedd4WeXy1qfineg_500.gif",
	1: "http://31.media.tumblr.com/4f2a6cdde93e0a059a5ddcb303071fe7/tumblr_n81ypmYvha1rvhqlvo1_500.gif",
	0: "http://media2.giphy.com/media/Eccdry010Mj1m/giphy.gif"
};

beepAudio = new Audio("http://www.soundjay.com/button/sounds/beep-08b.mp3");
applauseAudio = new Audio("http://www.soundjay.com/human/sounds/applause-8.mp3");



function beep () {
	if (diff<3){
		beepAudio.play();
	}	
}


function printTime () {	
		
	if (workRunning){
		counterRunning(workDuration);	
		beep();
		$("#tittle").text(workPhrases[Math.floor((diff/workDuration)*5)]).fadeIn(1000);	
		
		if (diff<1) {
			$("body").css("background-image","url(" + 
			breakGif[Math.floor(Math.random()*6)] +
			")");
			workRunning = false;
			breakRunning = true;
			counterStart();
			printTime();
		};		
	} else if (breakRunning) {
		counterRunning(breakDuration);
		beep();
		$("#tittle").text(breakPhrases[Math.floor((diff/breakDuration)*5)]);
		$("body").css("background-image","url(https://media.giphy.com/media/eYbS7lujv4Ig0/giphy.gif)");
		
		if (diff<1) {
			$("body").css("background-image","url(" + 
			workGif[Math.floor(Math.random()*6)] +
			")");
			workRunning = true;
			breakRunning = false;
			counterStart();
			sessions--;
			printTime();
			if (sessions<1) {
				applauseAudio.play();
				clearInterval(intervalId);
				$("#tittle").text("Great Job!");	
				$("#secondTittle").text("");	
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
				$("body").css("background-image","url(" + 
			workGif[Math.floor(Math.random()*6)] +
			")");			
				printTime();
				intervalId = setInterval(printTime,1000);	
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
			$("#tittle").text("Welcome to GIFodoro");
			$("body").css("background-image","url(https://www.athletenetwork.com/userfiles/images/brad%20pitt%20workout.gif)");
			$("#timeSet").toggle();
			$("#counterButtons").toggle();
			$("#secondTittle").toggle();	
			clearInterval(intervalId);
		}
	});


});
