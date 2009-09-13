/* PNGFileMap:
   Map PNG files created with iWeb (as a design tool) to functional identifiers*/
function PNGFileMap() {
	this.resourceFolderPath = "Mastermind_files/";
	this.map = {
		greenPeg:		"shapeimage_1.png",
		redPeg:			"shapeimage_2.png", /* 83 */	
		yellowPeg:		"shapeimage_3.png", /* 82 */	
		bluePeg:		"shapeimage_4.png", /* 84 */	
		violetPeg:		"shapeimage_5.png", /* 85 */	
		cyanPeg:		"shapeimage_6.png", 	
		blackEmptyPegHole:		"shapeimage_7.png", /* 7 thru 27, 29 thru 39,164-167 */	
		pegRowHighlighted:		"shapeimage_28.png", /* 168 */	
		resultPegsDelimiter:	"shapeimage_40.png", /* plus 47,52,57,62,67,72,77,86,95-100 */	
		blackEmptyResultPegHole:"shapeimage_41.png", /* 41-44,48-51,53-56,58-61,63-66,68-71,73-76,78-81 */	
		whiteResultPeg:			"shapeimage_45.png",
		greyResultPeg:			"shapeimage_46.png",
		colorChooserArrowUp:	"shapeimage_87.png",
		colorChooserArrowDown:	"shapeimage_88.png",
		pegRow:			"shapeimage_89.png", /* 90-94, 173 */
		emptyPeg:		"shapeimage_101.png", /* 102-128 */
		emptyResultPeg: "shapeimage_129.png", /* 130-158 */
		//colorDelimiter: "shapeimage_159.png", /* 160-163 */
		colorDelimiter:	"shapeimageDelimiterOpaque.png",
		hiddenCodePeg: 	"shapeimage_169.png", /* 170-172 */
		pegChooserArrowLeft:	"shapeimage_174.png",
		pegChooserArrowRight:	"shapeimage_175.png",
		chosenPegDelimiter:	"shapeimage_176.png",
		//pegDelimiter:		"shapeimage_177.png",
		pegDelimiter: "shapeimageDelimiterOpaque.png",
		buttonImage:	"buttonImage.png",
		buttonOkIcon:	"buttonOkIcon.png"
	};
}

PNGFileMap.prototype.url = function(mapId) {
	return this.resourceFolderPath+this.map[mapId];
	
};

PNGFileMap.prototype.buttonImage = function () {
	return this.resourceFolderPath+this.map.buttonImage;
};

PNGFileMap.prototype.buttonOkIcon = function () {
	return this.resourceFolderPath+this.map.buttonOkIcon;
};

PNGFileMap.prototype.pegDelimiter = function () {
	return this.resourceFolderPath+this.map.pegDelimiter;
};

PNGFileMap.prototype.chosenPegDelimiter = function () {
	return this.resourceFolderPath+this.map.chosenPegDelimiter;
};

PNGFileMap.prototype.pegChooserArrowRight = function () {
	return this.resourceFolderPath+this.map.pegChooserArrowRight;
};

PNGFileMap.prototype.pegChooserArrowLeft = function () {
	return this.resourceFolderPath+this.map.pegChooserArrowLeft;
};

PNGFileMap.prototype.hiddenCodePeg = function () {
	return this.resourceFolderPath+this.map.hiddenCodePeg;
};

PNGFileMap.prototype.colorDelimiter = function () {
	return this.resourceFolderPath+this.map.colorDelimiter;
};

PNGFileMap.prototype.emptyResultPeg = function () {
	return this.resourceFolderPath+this.map.emptyResultPeg;
};

PNGFileMap.prototype.emptyPeg = function () {
	return this.resourceFolderPath+this.map.emptyPeg;
};

PNGFileMap.prototype.pegRow = function () {
	return this.resourceFolderPath+this.map.pegRow;
};

PNGFileMap.prototype.colorChooserArrowDown = function () {
	return this.resourceFolderPath+this.map.colorChooserArrowDown;
};

PNGFileMap.prototype.colorChooserArrowUp = function () {
	return this.resourceFolderPath+this.map.colorChooserArrowUp;
};

PNGFileMap.prototype.greyResultPeg = function () {
	return this.resourceFolderPath+this.map.greyResultPeg;
};

PNGFileMap.prototype.whiteResultPeg = function () {
	return this.resourceFolderPath+this.map.whiteResultPeg;
};

PNGFileMap.prototype.blackEmptyResultPegHole = function () {
	return this.resourceFolderPath+this.map.blackEmptyResultPegHole;
};

PNGFileMap.prototype.resultPegsDelimiter = function () {
	return this.resourceFolderPath+this.map.resultPegsDelimiter;
};

PNGFileMap.prototype.pegRowHighlighted = function () {
	return this.resourceFolderPath+this.map.pegRowHighlighted;
};

PNGFileMap.prototype.blackEmptyPegHole = function () {
	return this.resourceFolderPath+this.map.blackEmptyPegHole;
};


PNGFileMap.prototype.cyanPeg = function () {
	return this.resourceFolderPath+this.map.cyanPeg;
};


PNGFileMap.prototype.violetPeg = function () {
	return this.resourceFolderPath+this.map.violetPeg;
};


PNGFileMap.prototype.greenPeg = function () {
	return this.resourceFolderPath+this.map.greenPeg;
};


PNGFileMap.prototype.redPeg = function () {
	return this.resourceFolderPath+this.map.redPeg;
};


PNGFileMap.prototype.yellowPeg = function () {
	return this.resourceFolderPath+this.map.yellowPeg;
};


PNGFileMap.prototype.bluePeg = function () {
	return this.resourceFolderPath+this.map.bluePeg;
};



var pngFileMap = new PNGFileMap();



