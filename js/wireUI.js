// wireUI: connect the UI in Mastermind.html to the actions in MastermindUI.js

function WireUI() {
	this.firstRun = true; //to avoid reconnecting event handlers
	this.isTouchDevice = false;

};

WireUI.prototype.connectHTML = (function() { // function called immediately purely to create a lexical block for "pngFileMap"
	var pngFileMap = new PNGFileMap();
    var connectHTMLFunction = function (mastermindUI) {  
       var id = function(str, i, j) {
    	   return "#"+str+i+"\\."+j;
       };
       
       var checkForTouchDevice = function () {
    	   var agent=navigator.userAgent.toLowerCase();
    	   return ((agent.indexOf('iphone')!=-1) || (agent.indexOf('ipod')!=-1) || (agent.indexOf('ipad')!=-1));
       };
       
       this.isTouchDevice = checkForTouchDevice();
       
	   $("#redColorDraggable").attr("src", pngFileMap.redPeg());
	   $("#greenColorDraggable").attr("src",pngFileMap.greenPeg());
	   $("#yellowColorDraggable").attr("src", pngFileMap.yellowPeg());
	   $("#blueColorDraggable").attr("src", pngFileMap.bluePeg());
	   $("#violetColorDraggable").attr("src", pngFileMap.violetPeg());
	   $("#cyanColorDraggable").attr("src", pngFileMap.cyanPeg());
	   
	   //console.log($("img[@id^=pegRow]"));

	   $("img[id*='pegHole']").each(function(i) {
		   this.src= pngFileMap.blackEmptyPegHole();	  
	   });

	   $("img[id*='resultPegs']").each(function(i) {
		   this.src= pngFileMap.resultPegsDelimiter();	  
	   });

	   $("img[id*='resultPegHole']").each(function(i) {
		   this.src= pngFileMap.blackEmptyResultPegHole();
	   });

	   for (var i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
		   for (var j = 0; j <= MastermindUI.PEGCOUNT; j++) {
			   $(id("peg",i,j)).attr("src", pngFileMap.emptyPeg());
			   if (this.firstRun && this.isTouchDevice) {
				   $(id("peg",i,j)).click(function(event) {
					   mastermindUI.choosePegHandler(event);
				   });
			   };  
		   };
	   };  

	   $("img[id*='colorDelimiter']").each(function(i) {
		   this.src= pngFileMap.colorDelimiter();
	   });
	   
	   for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
		   for (j = 0; j <= MastermindUI.PEGCOUNT; j++) {
			   $(id("resultPeg",i,j)).attr("src", pngFileMap.emptyResultPeg());
		   };
	   };  
 
	   $("img[id*='pegDelimiter']").each(function(i) {
		   this.src= pngFileMap.pegDelimiter();	  
	   });

	   $("img[id*='codePegHole']").each(function(i) {
		   this.src= pngFileMap.blackEmptyPegHole();	  
	   });

	   $("img[id*='hiddenCodePeg']").each(function(i) {
		   this.src= pngFileMap.hiddenCodePeg();	  
	   });    


	   if (this.firstRun) {
		   $("#hiddenCodeRow").attr("src", pngFileMap.pegRowHighlighted());
		   $("#buttonOk").attr("src",pngFileMap.buttonImage());
		   $("#buttonOkIcon").attr("src",pngFileMap.buttonOkIcon());
		   $("#buttonPlayAgain").attr("src",pngFileMap.buttonImage());  
		    		    
		   $("#buttonPlayAgain").click(function(event){mastermindUI.playAgainHandler(event);});     
		   $("#buttonPlayAgainIcon").click(function(event){mastermindUI.playAgainHandler(event);});  
		   $("#buttonOkIcon").click(function(event){mastermindUI.buttonOKHandler(event);});
		   $("#buttonOk").click(function(event){mastermindUI.buttonOKHandler(event);});
		   
		   if (this.isTouchDevice) { 
			   $("#pegChooserArrowLeft").attr("src", pngFileMap.pegChooserArrowLeft());
			   $("#pegChooserArrowLeft").click(function(event){
				   mastermindUI.setColorHandler(event);
			   });
			   $("#buttonPlayAgain").css({left:"600px"});
			   $("#buttonPlayAgainIcon").css({left:"608px"});
			   $("#buttonOkIcon").css({left:"528px"});
			   $("#buttonOk").css({left:"510px"});
			   $("#socialMediaLinks").css({left: "605px", top: "460px"}); // to be continued
			   $("img[id$='ColorDraggable']").each(function(i) {
				   this.onclick = function(event) {
					   mastermindUI.chooseColorHandler(event);
				   };
			   });
		   } 
		   else {
			   $("#pegChooserArrowLeft").remove();
		   };	 
	       pngFileMap.cacheImages(); 
	   };
	   
	   if (this.isTouchDevice) { // needs to run for every new UI wiring to reset cursors
		   // Not sure which DOM access and setter is better. Old school vs. Jquery:
		   $(mastermindUI.mkId("pegDelimiter",mastermindUI.pegRowCursor,mastermindUI.pegCursor)).attr("src",pngFileMap.chosenPegDelimiter());
		   document.getElementById("colorDelimiter"+mastermindUI.colorCursor).src = pngFileMap.chosenPegDelimiter();   
	   };
	   
	   this.firstRun = false;
	   if (!this.isTouchDevice) {
		  mastermindUI.setUpDrag(mastermindUI); // need the parameter due to 'this' rebinding in setUpDrag
		  mastermindUI.setUpDrop(mastermindUI);
	   };
    };
    
    return connectHTMLFunction;

})();
