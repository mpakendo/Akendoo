// MastermindUI: actions for the UI defined in Mastermind.html

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

MastermindUI.prototype.initialize =function () {
 var colors = ["redPeg", "greenPeg", "bluePeg","yellowPeg","cyanPeg", "violetPeg"];
 var selectedColors = {redPeg:false,greenPeg:false,bluePeg:false,yellowPeg:false,cyanPeg:false,violetPeg:false};
 
 //debug.printf("Secret code: ");
 for (var i = 0; i<= MastermindUI.PEGCOUNT; i++) {
	 var rnd = Math.floor(Math.random()*(MastermindUI.COLORCOUNT+1));
	 var randomChoice = colors[rnd];	 
	 while (selectedColors[randomChoice]) {
		 rnd = Math.floor(Math.random()*(MastermindUI.COLORCOUNT+1));
		 randomChoice = colors[rnd];
	 };	 
	 this.colorCode[i] = randomChoice;
	 selectedColors[randomChoice]=true;
	 
	 //debug.printf(randomChoice+":"+rnd+" ");
  };
  //debug.println("");

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
	//var str1 = "Chosen colors: ";
	//var str2 = "Result code: ";
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
//		str1 += color;
//		str1 += " ";
		if (this.checkForCodeAndRemove(codeClone,color)) { 
			//debug.println("code contains "+color +"::"+ codeClone.toString());
			this.resultPegs[i] = "whiteResultPeg";
			locations = this.codeIndexOf(color);
			for (var k = 0; k<=locations.length;k++) {
				if (i==locations[k]) {
					this.resultPegs[i] = "greyResultPeg";
					totalsCorrect++;
					break;
				}
			}
//		str2 += this.resultPegs[i];	
//		str2 += " ";
		}
	}
	for (i = 0; i <= MastermindUI.PEGCOUNT; i++) {
	  $(this.mkId("resultPeg",this.pegRowCursor,i)).attr("src", pngFileMap.url(this.resultPegs[i]));
	}
	if ((totalsCorrect == MastermindUI.PEGCOUNT+1) || this.pegRowCursor == MastermindUI.PEGROWCOUNT) {
		this.revealCode();
	}
//	debug.println(str1);
//	debug.println(str2);	
};

MastermindUI.prototype.choosePegHandler = function (event) {
	 var previousPegRowCursor = this.pegRowCursor;
	 var previousPegCursor = this.pegCursor;
	 var id; 
	 var coordinates; 
	 if (!event) event = window.event;
	 if (!event.target) { //IE
		 id = event.srcElement.getAttribute("id");
	 }
	 else { // Mozilla
		 id = event.target.getAttribute("id");
	 }
	 coordinates = id.match(new RegExp("([0-9])","g"));
	 
	 if (coordinates == null || id.match(new RegExp("peg[0-9].[0-9]") == null)) {
		 //debug.printf("Event id mismatch. Expected pegX.Y - got:"+id);
		 throw "Event id mismatch"+id;
	 }	 
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



