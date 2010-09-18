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
    // Use these to communicate from droppable to draggable - DROP event to STOP event:
    this.dragDestinationLeft = "0px";
    this.dragDestinationTop = "0px";
    this.canDrop = false;
    
    this.cloneCount = 0;
    this.pegZIndex = 2;
    this.clonedPegs = {};
    this.placedPegs = [];
    this.debug = false;
    	
};



MastermindUI.PEGROWCOUNT = 7; // 0-7
MastermindUI.PEGCOUNT = 3; // 0-3
MastermindUI.COLORCOUNT = 5; // 0-6


MastermindUI.prototype.printPlacedPegs = function () {
	debug.println("");
	for (var i = MastermindUI.PEGROWCOUNT; i>=0; i--) {
		for (var j = 0; j<=MastermindUI.PEGCOUNT; j++) {
			var shapeTxt;
			var shapeDesc = this.placedPegs[i][j].shape.match(
					new RegExp("shapeimage_101|shapeimage_169|shapeimage_2|shapeimage_3|shapeimage_4|shapeimage_5|shapeimage_6|shapeimage_1"));
			
			switch (shapeDesc[0]) {
			case "shapeimage_1": 
				shapeTxt = "green";
				break;
			case "shapeimage_2":
				shapeTxt = "red";
				break;
			case "shapeimage_3":
				shapeTxt = "yellow";
				break;
			case "shapeimage_4":
				shapeTxt = "blue";
				break;
			case "shapeimage_5":
				shapeTxt = "violet";
				break;
			case "shapeimage_6":
				shapeTxt = "cyan";
				break;
			case "shapeimage_101":
				shapeTxt = "emptyPeg";
				break;
			case null:
				shapeTxt = "null";
				break;
			
			}; 
			
			debug.printf("["+this.placedPegs[i][j].id+":"+shapeTxt+"]");
		};
		debug.println("");
	};
};
		

MastermindUI.prototype.checkForCodeAndRemove = function(arr, str) {
	for (var i=0; i<=arr.length;i++) {
		if (arr[i]==str) {
			arr[i] = "FOUND";
			return true;
		};
	 };
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
};



MastermindUI.prototype.getAttrFromEvent = function (event,attr) {
	 var id;
	 if (!event) event = window.event;
	 if (!event.target) { //IE
		 id = window.event.srcElement.getAttribute(attr);
	 }
	 else { // Mozilla
		 id = event.target.getAttribute(attr);
	 }
	 return id;
};



MastermindUI.prototype.getCoordinatesFromEvent = function (event) {
	 var coordinates; 
	 var id = this.getAttrFromEvent(event,"id");
	
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
  
  for (i in this.clonedPegs) {
	  this.clonedPegs[i].remove();
  };
  this.clonedPegs = {};
  

  for (i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
	  var a = [];
	   for (var j = 0; j <= MastermindUI.PEGCOUNT; j++) {
		   a[j] = {id:"empty", shape: pngFileMap.emptyPeg()};
	   };
	   this.placedPegs[i] = a;
  };	   

  this.cloneCount=0;
  this.pegZIndex = 2;
  this.canDrop=false;
 
};

// Debug helper
MastermindUI.prototype.getZIndex= function(ev) {

var style = this.getAttrFromEvent(ev,"style");
var z = style.match(new RegExp("z-index: [0-9]*;"));
var zz = z[0].match(new RegExp("[0-9]+"));

return zz[0];
};
		

MastermindUI.prototype.setUpDrag = function (mUI) {
	 var cloneBehaviour;
	  cloneBehaviour = function(ev) {	 
		  var id = mUI.getAttrFromEvent(ev,"id");
	      var divEl = $('#'+id).parent();
	      var element = $('#'+id).clone();
	      idString = id.toString() + mUI.cloneCount;
	      mUI.cloneCount++;
	      $(element).attr("id", idString);
	      divEl.append(element);
	      mUI.clonedPegs[idString] = element; // hash: cloneId->element
	      element.draggable({
	    	  start: function(ev,ui) {
	    			  var domId = mUI.getAttrFromEvent(ev,"id");
	    			  var style = mUI.getAttrFromEvent(ev,"style");
					  var left = style.match(new RegExp("left: [0-9]*px"));
				      var top = style.match(new RegExp("top: [0-9]*px"));		      
				      var pegChoice = domId.match(new RegExp("green|red|blue|yellow|violet|cyan"));
				      if (pegChoice == null)
				    	  throw "Invalid Event Id:"+domId;
				      if (mUI.debug) debug.println("START Event on "+domId);
				     
				      document.getElementById(domId).style.zIndex = mUI.pegZIndex++; //set zIndex to avoid greying errors 
				      mUI.colorChoice = pegChoice[0]+"Peg";				      
				      mUI.dragDestinationLeft = document.getElementById(pegChoice[0]+"ColorDraggable").style.left; 
					  mUI.dragDestinationTop = document.getElementById(pegChoice[0]+"ColorDraggable").style.top;
					  mUI.canDrop = false;
	      	  },
	    	  stop: function(ev,ui) {
	    	          var domId = mUI.getAttrFromEvent(ev,"id");
			          var style = mUI.getAttrFromEvent(ev,"style");
	    		      if (mUI.debug) debug.println("STOP Event on "+domId); 
	    		      style = style.replace(new RegExp("left: [0-9]*px"),mUI.dragDestinationLeft);
	    		      style = style.replace(new RegExp("top: [0-9]*px"), mUI.dragDestinationTop);
	    		 	  document.getElementById(domId).style.left = mUI.dragDestinationLeft;   
	      		 	  document.getElementById(domId).style.top = mUI.dragDestinationTop;
	      		 	  if (mUI.canDrop) {
	      		 		  mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].id=domId;
	      		 		  mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].shape=document.getElementById(domId).src;
	      		 		  if (mUI.debug) debug.println("CAN drop, SRC:"+document.getElementById(domId).src); 
	      		 	  };
	      	  }
	       });
	  };
	   $("#redColorDraggable").mouseover(cloneBehaviour);
	   $("#greenColorDraggable").mouseover(cloneBehaviour);
	   $("#yellowColorDraggable").mouseover(cloneBehaviour);
	   $("#blueColorDraggable").mouseover(cloneBehaviour);
	   $("#violetColorDraggable").mouseover(cloneBehaviour);
	   $("#cyanColorDraggable").mouseover(cloneBehaviour);
};


MastermindUI.prototype.setUpDrop = function (mUI) {
	  for (var i = 0; i <= MastermindUI.PEGROWCOUNT; i++) {
		  for (var j = 0; j <= MastermindUI.PEGCOUNT; j++) {
			  $(this.mkId("peg",i,j)).droppable({
				  over: function(ev,ui) { 
				    var domId = mUI.getAttrFromEvent(ev,"id");
				    var coordinates = mUI.getCoordinatesFromEvent(ev);
				     mUI.pegRowCursor = coordinates[0];
					 mUI.pegCursor = coordinates[1];
				  	 if (mUI.debug) debug.println("OVER Event on "+ domId);
				  	 if(mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].id != "empty") { 
				  		domId =  mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].id;
				  	 };
				  	 document.getElementById(domId).src = pngFileMap.hiddenCodePeg();
				  	 if (mUI.debug) debug.println("GREYED:"+ domId);
				  	 mUI.canDrop = true;
				  	 
			  	  },
			      out: function(ev,ui) {
			  		    var domId = mUI.getAttrFromEvent(ev,"id");
			  		    var coordinates = mUI.getCoordinatesFromEvent(ev);
					     mUI.pegRowCursor = coordinates[0];
						 mUI.pegCursor = coordinates[1];
					  	if (mUI.debug) debug.println("OUT Event on "+domId);
					  	if(mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].id != "empty") { 
					  		 // we retrieve the previously stored domId and color this back..
					  		domId =  mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].id;
					  		document.getElementById(domId).src = mUI.placedPegs[mUI.pegRowCursor][mUI.pegCursor].shape;  
					  		if (mUI.debug) debug.println("RECOLORED:"+ domId);
					  	 }
					  	else {
					  		document.getElementById(domId).src = pngFileMap.emptyPeg();
					  		if (mUI.debug) debug.println("EMPTIED:"+ domId);
					  	};
					  	mUI.canDrop = false;
				  },
				  drop: function(ev,ui) { 
	    	            var domId = mUI.getAttrFromEvent(ev,"id");
			            var style = mUI.getAttrFromEvent(ev,"style");
						var left = style.match(new RegExp("left: [0-9]*px"));
						var top = style.match(new RegExp("top: [0-9]*px"));
				        if (mUI.debug) debug.println("DROP Event on "+domId);
					 
						mUI.pegs[mUI.pegRowCursor][mUI.pegCursor] = mUI.colorChoice;  
						mUI.dragDestinationLeft = left[0].match(new RegExp("[0-9]*px")); 
						mUI.dragDestinationTop = top[0].match(new RegExp("[0-9]*px"));
						if (ui.draggable != null) {
							if (mUI.debug) debug.println("DISABLING DRAGGABLE via DROP on "+domId); 
		      		 	    ui.draggable.draggable("disable", 1);
		      		 	  };
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
  if (this.debug) 
	  this.debug = false;
  else
	  this.debug = true;
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
	 var id = this.getAttrFromEvent(event,"id");

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
