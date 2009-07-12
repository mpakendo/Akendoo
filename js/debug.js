
function Debug() {
	this.displayingDebugInfo = false;
	this.debugInfo = "DEBUG DATA:";
	this.debugElementId = "Mastermind.html:displayDebugInfo";
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

Debug.prototype.println = function() {
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
	document.getElementById("Mastermind.html:displayDebugInfo").innerHTML = id + "<br>";
	
}


function wireMouseOver() {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i<images.length; i++) {
	  images[i].onclick =displayIdOnMouseOver;
  }
}


var debug = new Debug();
