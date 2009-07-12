

function MastermindUI() {
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
    this.resultPegs = [
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"], 
                       ["empty","empty","empty","empty"]
                       ];
    this.colorCode = ["hidden","hidden","hidden","hidden"];
    this.colorCursor = 0;
    this.pegRowCursor = 0;
    this.pegCursor = 0;
    this.colorChoice ="emptyFileName";
    this.mkId = function(str, i, j) {return "#"+str+i+"\\."+j;};
}

MastermindUI.PEGROWCOUNT = 7; // 0-7
MastermindUI.PEGCOUNT = 3; // 0-3
MastermindUI.COLORCOUNT = 5; // 0-6


MastermindUI.prototype.setColorHandler = function (event) {
  $(this.mkId("peg",this.pegRowCursor,this.pegCursor)).attr("src",this.colorChoice);
	// document.getElementById("peg"+this.pegRowCursor+"."+this.pegCursor).src = this.colorChoice;  	   
  this.pegs[this.pegRowCursor][this.pegCursor] = this.colorChoice;
 };

MastermindUI.prototype.buttonOKHandler = function(event) {
	var str = "Chosen colors:";
	for (var i = 0; i <= MastermindUI.PEGCOUNT; i++) {
		str += this.pegs[this.pegRowCursor][i];
	}
	alert(str);
};

MastermindUI.prototype.choosePegHandler = function (event) {
	 var previousPegRowCursor = this.pegRowCursor;
	 var previousPegCursor = this.pegCursor;
	 var id = event.target.getAttribute("id");
	 var coordinates = id.match(new RegExp("([0-9])","g"));
	 
	 if (coordinates == null || id.match(new RegExp("peg[0-9].[0-9]") == null)) {
		 debug.printf("Event id mismatch. Expected pegX.Y - got:"+id);
		 throw "Event id mismatch"+id;
	 }	 
	 this.pegRowCursor = coordinates[0];
	 this.pegCursor = coordinates[1];

	 document.getElementById("pegDelimiter"+previousPegRowCursor+"."+previousPegCursor).src = pngFileMap.pegDelimiter();  
	 document.getElementById("pegDelimiter"+this.pegRowCursor+"."+this.pegCursor).src = pngFileMap.chosenPegDelimiter();   
	};


MastermindUI.prototype.chooseColorHandler = function (event) {
	 var previousColorCursor = this.colorCursor;
	 var id = event.target.getAttribute("id");
	 switch (id) {
	 case "colorDelimiter0":
		 this.colorChoice = pngFileMap.cyanPeg();
		 this.colorCursor = 0;
		 break;
	 case "colorDelimiter1":
		 this.colorChoice = pngFileMap.violetPeg();
		 this.colorCursor = 1;
		 break;
	 case "colorDelimiter2":
		 this.colorChoice = pngFileMap.bluePeg();
		 this.colorCursor = 2;
		 break;		 
	 case "colorDelimiter3":
		 this.colorChoice = pngFileMap.yellowPeg();
		 this.colorCursor = 3;
		 break;		 
	 case "colorDelimiter4":
		 this.colorChoice = pngFileMap.redPeg();
		 this.colorCursor = 4;
		 break;
	 case "colorDelimiter5":
		 this.colorChoice = pngFileMap.greenPeg();
		 this.colorCursor = 5;
		 break;
	default: throw "Event id mismatch: "+id;			 
	 }
	 document.getElementById("colorDelimiter"+previousColorCursor).src = pngFileMap.pegDelimiter();  
	 document.getElementById("colorDelimiter"+this.colorCursor).src = pngFileMap.chosenPegDelimiter();   
	};


var mastermindUI = new MastermindUI();
