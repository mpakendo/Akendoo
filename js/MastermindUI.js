// MastermindUI: actions for the UI defined in Mastermind.html

var pngFileMap = new PNGFileMap();

function MastermindUI() {
	this.UI = null;
    this.pegs = [];
    this.resultPegs = [];
    this.colorCode = [];
    this.colorCursor = 0;
    this.pegRowCursor = 0;
    this.pegCursor = 0;
    this.colorChoice ="noPeg";
    this.mkId = function(str, i, j) {return "#"+str+i+"\\."+j;}; 
    this.dragDestinationLeft = "0px";
    this.dragDestinationTop = "0px";
    this.clonedColorPegs = {};
    	
}



	
MastermindUI.PEGROWCOUNT = 7; // 0-7
MastermindUI.PEGCOUNT = 3; // 0-3
MastermindUI.COLORCOUNT = 5; // 0-6


MastermindUI.prototype.checkForCodeAndRemove = function(arr, str) {
	for (var i=0; i<=arr.length;i++) {
		if (arr[i]==str) {
			arr[i] = "FOUND";
			return true;
		}
	 }
	return false;
};

MastermindUI.prototype.codeIndexOf = function(str) {
	var locations = [];
	var k  = 0;
	for (var i=0; i<=MastermindUI.PEGCOUNT;i++) {
		if (this.colorCode[i]==str) {
			locations[k]=i;
			k = k + 1;
		}
	 }
	return locations;
};

MastermindUI.prototype.revealCode = function() {
      var mmUI = this;
      var k= 0;
	  $("img[id*='hiddenCodePeg']").each(function(i) {
		  this.src= pngFileMap.url(mmUI.colorCode[k]);	
		  k++;
	  });
}

MastermindUI.prototype.getCoordinatesFromEvent = function (event) {
	 var coordinates; 
	 var id;
	 if (!event) event = window.event;
	 if (!event.target) { //IE
		 id = event.srcElement.getAttribute("id");
	 }
	 else { // Mozilla
		 id = event.target.getAttribute("id");
	 }
	 coordinates = id.match(new RegExp("([0-9])","g"));
	 
	 if (coordinates == null || id.match(new RegExp("peg[0-9].[0-9]") == null)) {
		 throw "Event id mismatch"+id;
	 }	 
	 return coordinates;
};

MastermindUI.prototype.initialize =function () {
 var colors = ["redPeg", "greenPeg", "bluePeg","yellowPeg","cyanPeg", "violetPeg"];
 var selectedColors = {redPeg:false,greenPeg:false,bluePeg:false,yellowPeg:false,cyanPeg:false,violetPeg:false};
 
 for (var i = 0; i<= MastermindUI.PEGCOUNT; i++) {
	 var rnd = Math.floor(Math.random()*(MastermindUI.COLORCOUNT+1));
	 var randomChoice = colors[rnd];	 
	 while (selectedColors[randomChoice]) {
		 rnd = Math.floor(Math.random()*(MastermindUI.COLORCOUNT+1));
		 randomChoice = colors[rnd];
	 };	 
	 this.colorCode[i] = randomChoice;
	 selectedColors[randomChoice]=true;
	 
  };

  this.pegs = [
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"], 
              ["empty","empty","empty","empty"]
              ];
  this.resultPegs = ["emptyResultPeg","emptyResultPeg","emptyResultPeg","emptyResultPeg"];
  this.colorCursor = 0;
  this.pegRowCursor = 0;
  this.pegCursor = 0;
  this.colorChoice ="cyanPeg";
  
  for (i in this.clonedColorPegs) {
	  this.clonedColorPegs[i].remove();
  };
  this.clonedColorPegs = {};
  
};


MastermindUI.prototype.setUpDragNDrop = function (mastermindUI) {
	 var cloneBehaviour;
	  cloneBehaviour = function(ev) {	 
		  var id = ev.target.getAttribute("id"); // ToDo: make this work for mozilla and IE
	      var divEl = $('#'+id).parent();
	      var element = $('#'+id).clone();
	      var dateString = new Date();
	      idString = id.toString() + dateString.toUTCString();
	      $(element).attr("id", idString);
	      debug.println("Event on "+ev.target.getAttribute("id") + " type " + ev.type);
	      divEl.append(element);
	      mastermindUI.clonedColorPegs[idString] = element; // hash: cloneId->element
	      element.draggable({
	    	  start: function(ev,ui) {
	    	         
	    			  var domId = ev.target.getAttribute("id"); // ToDo: make this work for mozilla and IE
	    			  var style = ev.target.getAttribute("style");
					  var left = style.match(new RegExp("left: [0-9]*px"));
				      var top = style.match(new RegExp("top: [0-9]*px"));
						 
				      var pegChoice = domId.match(new RegExp("green|red|blue|yellow|violet|cyan"));
				      if (pegChoice == null)
				    	  throw "Invalid Event Id:"+domId;
				      mastermindUI.colorChoice = pegChoice[0]+"Peg";
						   
					  mastermindUI.dragDestinationLeft = left[0].match(new RegExp("[0-9]*px")); 
					  mastermindUI.dragDestinationTop = top[0].match(new RegExp("[0-9]*px"));;
	    		      
	    		      debug.println("Drag Start Event on "+domId + " type " + ev.type +
	    		    		  " left:"+mastermindUI.dragDestinationLeft +" top:"+mastermindUI.dragDestinationTop ); 

	      },
	    	  stop: function(ev,ui) {
	    		      debug.println("Drag Stop Event on "+ev.target.getAttribute("id") + " type " + ev.type +
	    		    		  " left:"+mastermindUI.dragDestinationLeft +" top:"+mastermindUI.dragDestinationTop ); 
	    		      var style = ev.target.getAttribute("style"); //ToDo: IE
	    		      style = style.replace(new RegExp("left: [0-9]*px"),mastermindUI.dragDestinationLeft);
	    		      style = style.replace(new RegExp("top: [0-9]*px"), mastermindUI.dragDestinationTop);
	    		 	 document.getElementById(ev.target.getAttribute("id")).style.left = mastermindUI.dragDestinationLeft;   
	      		 	 document.getElementById(ev.target.getAttribute("id")).style.top = mastermindUI.dragDestinationTop;     		   
	    		      }
	       });
	  };

	   $("#redColorDraggable").mouseover(cloneBehaviour);
	   $("#greenColorDraggable").mouseover(cloneBehaviour);
	   $("#yellowColorDraggable").mouseover(cloneBehaviour);
	   $("#blueColorDraggable").mouseover(cloneBehaviour);
	   $("#violetColorDraggable").mouseover(cloneBehaviour);
	   $("#cyanColorDraggable").mouseover(cloneBehaviour);
  
	  
	  
	  for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
		  for (j = 0; j <= MastermindUI.PEGCOUNT; j++) {
			  $(this.mkId("peg",i,j)).droppable({
				  over: function(ev,ui) { //ToDo. Still need cross browser event extraction
				    var coordinates = mastermindUI.getCoordinatesFromEvent(ev);
				     mastermindUI.pegRowCursor = coordinates[0];
					 mastermindUI.pegCursor = coordinates[1];
				    debug.println("Over Event on "+ev.target.getAttribute("id") + " type " + ev.type);
				    
				  	 //$("#"+ ev.target.getAttribute("id")).attr("src",pngFileMap.hiddenCodePeg());  does not work
				     // due to necessity to escape . in "peg1.0"
				  	 document.getElementById(ev.target.getAttribute("id")).src = pngFileMap.hiddenCodePeg();   

			  	  },
			      out: function(ev,ui) {
					  	debug.println("Over Event on "+ev.target.getAttribute("id") + " type " + ev.type);
					  	 document.getElementById(ev.target.getAttribute("id")).src = pngFileMap.emptyPeg();   
				  },
				  drop: function(ev,ui) { //HACK.
						var style = ev.target.getAttribute("style");
						var left = style.match(new RegExp("left: [0-9]*px"));
						var top = style.match(new RegExp("top: [0-9]*px"));
						 
						mastermindUI.pegs[mastermindUI.pegRowCursor][mastermindUI.pegCursor] = mastermindUI.colorChoice;   
						mastermindUI.dragDestinationLeft = left[0].match(new RegExp("[0-9]*px")); 
						mastermindUI.dragDestinationTop = top[0].match(new RegExp("[0-9]*px"));
				      debug.println("Drop Event on "+ev.target.getAttribute("id") + " type " + ev.type + " left "+ mastermindUI.dragDestinationLeft + " top "+ mastermindUI.dragDestinationTop);
			      }
			  });
		  }
	  } 
};

MastermindUI.prototype.playAgainHandler = function (event) {
	  alert("Play again!");
	  this.initialize();
	  this.UI.connectHTML(this);
};
	 
MastermindUI.prototype.setColorHandler = function (event) {
  $(this.mkId("peg",this.pegRowCursor,this.pegCursor)).attr("src",pngFileMap.url(this.colorChoice));
  this.pegs[this.pegRowCursor][this.pegCursor] = this.colorChoice;
 };

MastermindUI.prototype.buttonOKHandler = function(event) {
	var color;
	var locations;
	var totalsCorrect = 0;
	var codeClone = new Array(); // need clone to be able to mark found elements
	
	for (var i=0; i<=MastermindUI.PEGCOUNT;i++) {
		codeClone[i] = this.colorCode[i];
	 }
	
	this.resultPegs = ["emptyResultPeg","emptyResultPeg","emptyResultPeg","emptyResultPeg"];
	for (i = 0; i <= MastermindUI.PEGCOUNT; i++) {
		  $(this.mkId("resultPeg",this.pegRowCursor,i)).attr("src", pngFileMap.url("emptyResultPeg"));
	}
	for (i = 0; i <= MastermindUI.PEGCOUNT; i++) {
		color = this.pegs[this.pegRowCursor][i];
		if (this.checkForCodeAndRemove(codeClone,color)) { 
			this.resultPegs[i] = "whiteResultPeg";
			locations = this.codeIndexOf(color);
			for (var k = 0; k<=locations.length;k++) {
				if (i==locations[k]) {
					this.resultPegs[i] = "greyResultPeg";
					totalsCorrect++;
					break;
				}
			}
		}
	}
	for (i = 0; i <= MastermindUI.PEGCOUNT; i++) {
	  $(this.mkId("resultPeg",this.pegRowCursor,i)).attr("src", pngFileMap.url(this.resultPegs[i]));
	}
	if ((totalsCorrect == MastermindUI.PEGCOUNT+1) || this.pegRowCursor == MastermindUI.PEGROWCOUNT) {
		this.revealCode();
	}
};

MastermindUI.prototype.choosePegHandler = function (event) {
	 var previousPegRowCursor = this.pegRowCursor;
	 var previousPegCursor = this.pegCursor;
	 var id; 
	 var coordinates = this.getCoordinatesFromEvent(event); 
	 this.pegRowCursor = coordinates[0];
	 this.pegCursor = coordinates[1];

     $(this.mkId("pegDelimiter",previousPegRowCursor,previousPegCursor)).attr("src",pngFileMap.pegDelimiter());
     $(this.mkId("pegDelimiter",this.pegRowCursor,this.pegCursor)).attr("src",pngFileMap.chosenPegDelimiter());

};


MastermindUI.prototype.chooseColorHandler = function (event) {
	 var previousColorCursor = this.colorCursor;
	 var id;
	 if (!event) event = window.event;
	 if (!event.target) { //IE
		 id = window.event.srcElement.getAttribute("id");
	 }
	 else { // Mozilla
		 id = event.target.getAttribute("id");
	 }
	 switch (id) {
	 case "colorDelimiter0":
		 this.colorChoice = "cyanPeg";
		 this.colorCursor = 0;
		 break;
	 case "colorDelimiter1":
		 this.colorChoice = "violetPeg";
		 this.colorCursor = 1;
		 break;
	 case "colorDelimiter2":
		 this.colorChoice = "bluePeg";
		 this.colorCursor = 2;
		 break;		 
	 case "colorDelimiter3":
		 this.colorChoice = "yellowPeg";	 
		 this.colorCursor = 3;
		 break;		 
	 case "colorDelimiter4":
		 this.colorChoice = "redPeg";
		 this.colorCursor = 4;
		 break;
	 case "colorDelimiter5":
		 this.colorChoice = "greenPeg";
		 this.colorCursor = 5;
		 break;
	default: throw "Event id mismatch: "+id;			 
	 }
	 document.getElementById("colorDelimiter"+previousColorCursor).src = pngFileMap.pegDelimiter();  
	 document.getElementById("colorDelimiter"+this.colorCursor).src = pngFileMap.chosenPegDelimiter();   
	};
