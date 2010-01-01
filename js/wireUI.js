// wireUI: connect the UI in Mastermind.html to the actions in MastermindUI.js

function WireUI() {
	this.firstRun = true; //to avoid reconnecting event handlers

}

WireUI.dragDestinationLeft = "0px";
WireUI.dragDestinationTop = "0px";

WireUI.prototype.connectHTML = function (mastermindUI) {  
  var id = function(str, i, j) {
	  return "#"+str+i+"\\."+j;
  };

  $("#redColor").attr("src", pngFileMap.redPeg());
  $("#greenColor").attr("src",pngFileMap.greenPeg());
  $("#yellowColor").attr("src", pngFileMap.yellowPeg());
  $("#blueColor").attr("src", pngFileMap.bluePeg());
  $("#violetColor").attr("src", pngFileMap.violetPeg());
  $("#cyanColor").attr("src", pngFileMap.cyanPeg());
  
  $("#cyanColorDraggable").attr("src", pngFileMap.cyanPeg());
  WireUI.dragDestinationLeft = $("#cyanColorDraggable").css("left");
  WireUI.dragDestinationTop = $("#cyanColorDraggable").css("top");;

  
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
		  if (this.firstRun) {
		    $(id("peg",i,j)).click(function(event) {
		  	  mastermindUI.choosePegHandler(event);
		    });
		  }  
	  }
  }  
  
  $("img[id*='colorDelimiter']").each(function(i) {
	    this.src= pngFileMap.colorDelimiter();
  });
  
  if (this.firstRun) {
    $("img[id*='colorDelimiter']").each(function(i) {
	    this.onclick = function(event) {
		   mastermindUI.chooseColorHandler(event);
	    };
    });  
  }

  for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
	  for (j = 0; j <= MastermindUI.PEGCOUNT; j++) {
		  $(id("resultPeg",i,j)).attr("src", pngFileMap.emptyResultPeg());
	  }
  }  

/*  
  $("img[id*='pegRow']").each(function(i) {
	  this.src= pngFileMap.pegRow();	  
  });
*/  
   
  $("img[id*='pegDelimiter']").each(function(i) {
	  this.src= pngFileMap.pegDelimiter();	  
  });
  
  $("img[id*='codePegHole']").each(function(i) {
	  this.src= pngFileMap.blackEmptyPegHole();	  
  });
  
  $("img[id*='hiddenCodePeg']").each(function(i) {
	  this.src= pngFileMap.hiddenCodePeg();	  
  });    
  
  $("#hiddenCodeRow").attr("src", pngFileMap.pegRowHighlighted());
  $("#pegChooserArrowLeft").attr("src", pngFileMap.pegChooserArrowLeft());
  $("#buttonOk").attr("src",pngFileMap.buttonImage());
  $("#buttonOkIcon").attr("src",pngFileMap.buttonOkIcon());
  $("#buttonPlayAgain").attr("src",pngFileMap.buttonImage());  

  if (this.firstRun) {
	    $("#pegChooserArrowLeft").click(function(event){
		    mastermindUI.setColorHandler(event);
	    });
	    $("#buttonPlayAgain").click(function(event){
	  	  mastermindUI.playAgainHandler(event);
	    });  

	    $("#buttonPlayAgainIcon").click(function(event){
	  	  mastermindUI.playAgainHandler(event);
	    });  
	    
	    $("#buttonOkIcon").click(function(event){
	  	  mastermindUI.buttonOKHandler(event);
	    });
	    
	    $("#buttonOk").click(function(event){
		    mastermindUI.buttonOKHandler(event);
	    });
	   
  }
  
  // Not sure which DOM access and setter is better. Old school vs. Jquery:
  $(mastermindUI.mkId("pegDelimiter",mastermindUI.pegRowCursor,mastermindUI.pegCursor)).attr("src",pngFileMap.chosenPegDelimiter());
  document.getElementById("colorDelimiter"+mastermindUI.colorCursor).src = pngFileMap.chosenPegDelimiter();   

 

  this.firstRun = false;
}
