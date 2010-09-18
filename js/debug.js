
function Debug() {
	this.displayingDebugInfo = false;
	this.debugInfo = "DEBUG DATA:";
	this.debugElementId = "Mastermind.html:displayDebugInfo";
	this.UI = null; // HACK.
}

Debug.prototype.displayDebugInfo = function () {
   
	if (!this.displayingDebugInfo) {
    	this.displayingDebugInfo = true;
    	document.getElementById(this.debugElementId).innerHTML = this.debugInfo + "<br>";
    }
    else {
    	this.displayingDebugInfo = false;
    	document.getElementById(this.debugElementId).innerHTML = "";
    }
    return false;
};

Debug.prototype.printf = function (str) {
  this.debugInfo += str;
};  

Debug.prototype.println = function(str) {
 this.debugInfo += str;	
 this.debugInfo += "<BR>";
}

Debug.prototype.clearDebugInfo = function () {
	this.debugInfo = "DEBUG DATA:";
	if (this.displayingDebugInfo) {
    	this.displayingDebugInfo = false;
    	document.getElementById(this.debugElementId).innerHTML = "";
	}
	return false;
};



function displayIdOnMouseOver(evt) {
	var id = evt.target.getAttribute("id");
	var style = evt.target.getAttribute("style");
	var left = style.match(new RegExp("left: [0-9]*px"));
	var top = style.match(new RegExp("top: [0-9]*px"));
	
    if (left == null || top == null) 
	   document.getElementById("Mastermind.html:displayDebugInfo").innerHTML = id + "::"+ style + "<br>";
    else
 	   document.getElementById("Mastermind.html:displayDebugInfo").innerHTML = id + "::"+ left[0] + " " + top[0] + "<br>";
    	
	
}


function wireMouseOver() {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i<images.length; i++) {
	  images[i].onclick =displayIdOnMouseOver;
  }
}


var debug = new Debug();
