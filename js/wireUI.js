
function wireUI() {
  debug.printf("wiring UI"); debug.println();	
  debug.printf("mmUI"+mastermindUI); debug.println();
  var id = function(str, i, j) {
	  return "#"+str+i+"\\."+j;
  }
  
/*  
  document.getElementById("redColor").src = pngFileMap.redPeg();
  document.getElementById("greenColor").src = pngFileMap.greenPeg();
  document.getElementById("yellowColor").src = pngFileMap.yellowPeg();
  document.getElementById("blueColor").src = pngFileMap.bluePeg();
  document.getElementById("violetColor").src = pngFileMap.violetPeg();
  document.getElementById("cyanColor").src = pngFileMap.cyanPeg();
 */
  $("#redColor").attr("src", pngFileMap.redPeg());
  $("#greenColor").attr("src",pngFileMap.greenPeg());
  $("#yellowColor").attr("src", pngFileMap.yellowPeg());
  $("#blueColor").attr("src", pngFileMap.bluePeg());
  $("#violetColor").attr("src", pngFileMap.violetPeg());
  $("#cyanColor").attr("src", pngFileMap.cyanPeg());
  
  //console.log($("img[@id^=pegRow]"));
  
  $("img[id*='pegHole']").each(function(i) {
	  this.src= pngFileMap.blackEmptyPegHole();	  
  });
 
 /* 
  for (var i = 0; i <= PEGROWCOUNT; i++) {
	  for (var j = 0; j <= PEGCOUNT; j++) {
		  // document.getElementById("pegHole"+i+"."+j).src = pngFileMap.blackEmptyPegHole();
		  //console.log("#pegHole"+i+"."+j);
		  $(id("pegHole",i,j)).attr("src", pngFileMap.blackEmptyPegHole());
	  }
  }
*/  
   
  $("img[id*='resultPegs']").each(function(i) {
	  this.src= pngFileMap.resultPegsDelimiter();	  
  });
  
/*  
  for (i = 0; i <= PEGROWCOUNT; i++) {
	 // document.getElementById("resultPegs"+i).src = pngFileMap.resultPegsDelimiter();  
	  $("#resultPegs"+i).attr("src", pngFileMap.resultPegsDelimiter());
  }
*/

  $("img[id*='resultPegHole']").each(function(i) {
	  this.src= pngFileMap.blackEmptyResultPegHole();
  });
  
/*  
  for (i = 0; i <= PEGROWCOUNT; i++) {
	  for (j = 0; j <= PEGCOUNT; j++) {
		//  document.getElementById("resultPegHole"+i+"."+j).src = pngFileMap.blackEmptyResultPegHole();
		  $(id("resultPegHole",i,j)).attr("src", pngFileMap.blackEmptyResultPegHole());
	  }
  }  
*/

  
  
  for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
	  for (j = 0; j <= MastermindUI.PEGCOUNT; j++) {
		  //document.getElementById("peg"+i+"."+j).src = pngFileMap.emptyPeg();
		  //document.getElementById("peg"+i+"."+j).onclick = function (event) {mmUI.choosePegHandler(event);};
		  $(id("peg",i,j)).attr("src", pngFileMap.emptyPeg());
		  $(id("peg",i,j)).click(function(event) {
		  	mastermindUI.choosePegHandler(event);
		  });
	  }
  }  
 
  $("img[id*='colorDelimiter']").each(function(i) {
	  this.src= pngFileMap.colorDelimiter();
	  this.onclick = function(event) {
		  mastermindUI.chooseColorHandler(event);
	  };
  });  

/*  
  for (i = 0; i <= COLORCOUNT; i++) {
	  //document.getElementById("colorDelimiter"+i).src = pngFileMap.colorDelimiter();  
	  //document.getElementById("colorDelimiter"+i).onclick = function(event) {mmUI.chooseColorHandler(event);};
	  $("#colorDelimiter"+i).attr("src", pngFileMap.colorDelimiter());
	  $("#colorDelimiter"+i).click(function(event) {
	  	mmUI.chooseColorHandler(event);
	  });
  }  
*/
/*
  $("img[id*='resultPeg']").each(function(i) {
	  this.src= pngFileMap.emptyResultPeg();	  
  });  
*/
  
  for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
	  for (j = 0; j <= MastermindUI.PEGCOUNT; j++) {
		  //document.getElementById("resultPeg"+i+"."+j).src = pngFileMap.emptyResultPeg();
		  $(id("resultPeg",i,j)).attr("src", pngFileMap.emptyResultPeg());
	  }
  }  


  $("img[id*='pegRow']").each(function(i) {
	  this.src= pngFileMap.pegRow();	  
  });
  
 /* 
  for (i = 0; i <= PEGROWCOUNT; i++) {
	  //document.getElementById("pegRow"+i).src = pngFileMap.pegRow();  
	  $("#pegRow"+i).attr("src", pngFileMap.pegRow());
 }  
 */
  $("img[id*='pegDelimiter']").each(function(i) {
	  this.src= pngFileMap.pegDelimiter();	  
  });
 
  /*
  for (i = 0; i <= PEGROWCOUNT; i++) {
	  for (j = 0; j <= PEGCOUNT; j++) {
		  //document.getElementById("pegDelimiter"+i+"."+j).src = pngFileMap.pegDelimiter();
		  $(id("pegDelimiter",i,j)).attr("src", pngFileMap.pegDelimiter());
	  }
  }
  */
  
  $("img[id*='codePegHole']").each(function(i) {
	  this.src= pngFileMap.blackEmptyPegHole();	  
  });
  
  /*
  for (i = 0; i <= PEGCOUNT; i++) {
	  //document.getElementById("codePegHole"+i).src = pngFileMap.blackEmptyPegHole();  
	  $("#codePegHole"+i).attr("src", pngFileMap.blackEmptyPegHole());
  }
*/

  $("img[id*='hiddenCodePeg']").each(function(i) {
	  this.src= pngFileMap.hiddenCodePeg();	  
  });  
  
/*  
  for (i = 0; i <= PEGCOUNT; i++) {
	  //document.getElementById("hiddenCodePeg"+i).src = pngFileMap.hiddenCodePeg();  
	  $("#hiddenCodePeg"+i).attr("src", pngFileMap.hiddenCodePeg());
 }
*/ 
  
  $("#hiddenCodePegRow").attr("src", pngFileMap.pegRowHighlighted());
  $("#pegChooserArrowLeft").attr("src", pngFileMap.pegChooserArrowLeft());
  $("#pegChooserArrowLeft").click(function(event){
	  mastermindUI.setColorHandler(event);
  });
  
  $("#buttonOk").attr("src",pngFileMap.buttonImage());
  $("#buttonOk").click(function(event){
	  mastermindUI.buttonOKHandler(event);
  });
  $("#buttonOkIcon").attr("src",pngFileMap.buttonOkIcon());
  $("#buttonOkIcon").click(function(event){
	  mastermindUI.buttonOKHandler(event);
  });
 

/*
  document.getElementById("hiddenCodePegRow").src = pngFileMap.pegRowHighlighted();  
  document.getElementById("pegChooserArrowLeft").src = pngFileMap.pegChooserArrowLeft(); 
  document.getElementById("pegChooserArrowLeft").onclick = function(event){mmUI.setColorHandler(event);}; 

  document.getElementById("pegChooserArrowRight").src = pngFileMap.pegChooserArrowRight();  
  document.getElementById("colorChooserArrowUp").src = pngFileMap.colorChooserArrowUp();  
  document.getElementById("colorChooserArrowDown").src = pngFileMap.colorChooserArrowDown();  
  */
     
}
