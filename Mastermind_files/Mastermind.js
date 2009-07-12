var smallTransparentGif = "";
function fixupIEPNG(strImageID, transparentGif) 
{
    smallTransparentGif = transparentGif;
    if (windowsInternetExplorer && (browserVersion < 7))
    {
        var img = document.getElementById(strImageID);
        if (img)
        {
            var src = img.src;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
            img.src = transparentGif;
            img.attachEvent("onpropertychange", imgPropertyChanged);
        }
    }
}

var windowsInternetExplorer = false;
var browserVersion = 0;
function detectBrowser()
{
    windowsInternetExplorer = false;
    var appVersion = navigator.appVersion;
    if ((appVersion.indexOf("MSIE") != -1) &&
        (appVersion.indexOf("Macintosh") == -1))
    {
        var temp = appVersion.split("MSIE");
        browserVersion = parseFloat(temp[1]);
        windowsInternetExplorer = true;
    }
}

function fixupIEPNGBG(oBlock) 
{
    if (oBlock)
    {
        var currentBGImage = oBlock.currentStyle.backgroundImage;
        var currentBGRepeat = oBlock.currentStyle.backgroundRepeat;
        var urlStart = currentBGImage.indexOf('url(');
        var urlEnd = currentBGImage.indexOf(')', urlStart);
        var imageURL = currentBGImage.substring(urlStart + 4, urlEnd);

        if (imageURL.charAt(0) == '"')
        {
            imageURL = imageURL.substring(1);
        }
        
        if (imageURL.charAt(imageURL.length - 1) == '"')
        {
            imageURL = imageURL.substring(0, imageURL.length - 1);
        }

        var overrideRepeat = false;

        var filterStyle =
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
            imageURL +
            "', sizingMethod='crop');";

        if (RegExp("/C[0-9A-F]{8}.png$").exec(imageURL) != null)
        {
            filterStyle =
                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                imageURL +
                "', sizingMethod='scale');";

            overrideRepeat = true;
        }

        var backgroundImage = new Image();
        backgroundImage.src = imageURL;
        var tileWidth = backgroundImage.width;
        var tileHeight = backgroundImage.height; 
        
        var blockWidth = 0;
        var blockHeight = 0;
        if (oBlock.style.width)
        {
            blockWidth = parseInt(oBlock.style.width);
        }
        else
        {
            blockWidth = oBlock.offsetWidth;
        }
        if (oBlock.style.height)
        {
            blockHeight = parseInt(oBlock.style.height);
        }
        else
        {
            blockHeight = oBlock.offsetHeight;
        }

        if ((blockWidth == 0) || (blockHeight == 0))
        {
            return;
        }
        
        var wholeRows = 1;
        var wholeCols = 1;
        var extraHeight = 0;
        var extraWidth = 0;
        
        if ((currentBGRepeat.indexOf("no-repeat") != -1) ||
              ((tileWidth == 0) && (tileHeight == 0)) ||
              overrideRepeat)
        {
            tileWidth = blockWidth;
            tileHeight = blockHeight;

        }
        else if ((currentBGRepeat.indexOf("repeat-x") != -1) ||
              (tileHeight == 0))
        {
            wholeCols = Math.floor(blockWidth / tileWidth);
            extraWidth = blockWidth - (tileWidth * wholeCols);
            tileHeight = blockHeight;

        }
        else if (currentBGRepeat.indexOf("repeat-y") != -1)
        {
            wholeRows = Math.floor(blockHeight / tileHeight);
            extraHeight = blockHeight - (tileHeight * wholeRows);
            tileWidth = blockWidth;

        }
        else
        {
            wholeCols = Math.floor(blockWidth / tileWidth);
            wholeRows = Math.floor(blockHeight / tileHeight);
            extraWidth = blockWidth - (tileWidth * wholeCols);
            extraHeight = blockHeight - (tileHeight * wholeRows);
        }
        
        var wrappedContent = document.createElement("div");
        wrappedContent.style.position = "relative";
        wrappedContent.style.zIndex = "1";
        wrappedContent.style.left = "0px";
        wrappedContent.style.top = "0px";
        if (!isNaN(parseInt(oBlock.style.width)))
        {
            wrappedContent.style.width = "" + blockWidth + "px";
        }
        if (!isNaN(parseInt(oBlock.style.height)))
        {
            wrappedContent.style.height = "" + blockHeight + "px";
        }
        var pngBGFixIsWrappedContentEmpty = true;
        while (oBlock.hasChildNodes())
        {
            if (oBlock.firstChild.nodeType == 3)
            {
                if (RegExp("^ *$").exec(oBlock.firstChild.data) == null)
                {
                    pngBGFixIsWrappedContentEmpty = false;
                }
            }
            else
            {
                pngBGFixIsWrappedContentEmpty = false;
            }
            wrappedContent.appendChild(oBlock.firstChild);
        }
        if (pngBGFixIsWrappedContentEmpty)
        {
            wrappedContent.style.lineHeight = "0px";
        }
        
        var newMarkup = "";
        for (var currentRow = 0; 
             currentRow < wholeRows; 
             currentRow++)
        {
            for (currentCol = 0; 
                 currentCol < wholeCols; 
                 currentCol++)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + tileWidth + "px; " +
                        "height: " + tileHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
            
            if (extraWidth != 0)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + extraWidth + "px; " +
                        "height: " + tileHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
        }
        
        if (extraHeight != 0)
        {
            for (currentCol = 0; 
                 currentCol < wholeCols; 
                 currentCol++)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + tileWidth + "px; " +
                        "height: " + extraHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
            
            if (extraWidth != 0)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + extraWidth + "px; " +
                        "height: " + extraHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
        }
        oBlock.innerHTML = newMarkup;

        oBlock.appendChild(wrappedContent);
        oBlock.style.background= "";
    }
}

function fixupAllIEPNGBGs()
{
    if (windowsInternetExplorer && (browserVersion < 7))
    {
        try
        {
            var oDivNodes = document.getElementsByTagName('DIV');
            for (var iIndex=0; iIndex<oDivNodes.length; iIndex++)
            {
                var oNode = oDivNodes.item(iIndex);
                if (oNode.currentStyle &&
                    oNode.currentStyle.backgroundImage &&
                    (oNode.currentStyle.backgroundImage.indexOf('url(') != -1) &&
                    (oNode.currentStyle.backgroundImage.indexOf('.png")') != -1))
                {
                    fixupIEPNGBG(oNode);
                }
            }
        }
        catch (e)
        {
        }
    }
}

var inImgPropertyChanged = false;
function imgPropertyChanged()
{
    if ((window.event.propertyName == "src") && (! inImgPropertyChanged))
    {
        inImgPropertyChanged = true;
        var el = window.event.srcElement;
        if (el.src != smallTransparentGif)
        {
            el.filters.item(0).src = el.src;
            el.src = smallTransparentGif;
        }
        inImgPropertyChanged = false;
    }
}

function onPageLoad()
{
    detectBrowser();
    fixupAllIEPNGBGs();
    fixupIEPNG("id1", "Mastermind_files/transparent.gif");
    fixupIEPNG("id2", "Mastermind_files/transparent.gif");
    fixupIEPNG("id3", "Mastermind_files/transparent.gif");
    fixupIEPNG("id4", "Mastermind_files/transparent.gif");
    fixupIEPNG("id5", "Mastermind_files/transparent.gif");
    fixupIEPNG("id6", "Mastermind_files/transparent.gif");
    fixupIEPNG("id7", "Mastermind_files/transparent.gif");
    fixupIEPNG("id8", "Mastermind_files/transparent.gif");
    fixupIEPNG("id9", "Mastermind_files/transparent.gif");
    fixupIEPNG("id10", "Mastermind_files/transparent.gif");
    fixupIEPNG("id11", "Mastermind_files/transparent.gif");
    fixupIEPNG("id12", "Mastermind_files/transparent.gif");
    fixupIEPNG("id13", "Mastermind_files/transparent.gif");
    fixupIEPNG("id14", "Mastermind_files/transparent.gif");
    fixupIEPNG("id15", "Mastermind_files/transparent.gif");
    fixupIEPNG("id16", "Mastermind_files/transparent.gif");
    fixupIEPNG("id17", "Mastermind_files/transparent.gif");
    fixupIEPNG("id18", "Mastermind_files/transparent.gif");
    fixupIEPNG("id19", "Mastermind_files/transparent.gif");
    fixupIEPNG("id20", "Mastermind_files/transparent.gif");
    fixupIEPNG("id21", "Mastermind_files/transparent.gif");
    fixupIEPNG("id22", "Mastermind_files/transparent.gif");
    fixupIEPNG("id23", "Mastermind_files/transparent.gif");
    fixupIEPNG("id24", "Mastermind_files/transparent.gif");
    fixupIEPNG("id25", "Mastermind_files/transparent.gif");
    fixupIEPNG("id26", "Mastermind_files/transparent.gif");
    fixupIEPNG("id27", "Mastermind_files/transparent.gif");
    fixupIEPNG("id28", "Mastermind_files/transparent.gif");
    fixupIEPNG("id29", "Mastermind_files/transparent.gif");
    fixupIEPNG("id30", "Mastermind_files/transparent.gif");
    fixupIEPNG("id31", "Mastermind_files/transparent.gif");
    fixupIEPNG("id32", "Mastermind_files/transparent.gif");
    fixupIEPNG("id33", "Mastermind_files/transparent.gif");
    fixupIEPNG("id34", "Mastermind_files/transparent.gif");
    fixupIEPNG("id35", "Mastermind_files/transparent.gif");
    fixupIEPNG("id36", "Mastermind_files/transparent.gif");
    fixupIEPNG("id37", "Mastermind_files/transparent.gif");
    fixupIEPNG("id38", "Mastermind_files/transparent.gif");
    fixupIEPNG("id39", "Mastermind_files/transparent.gif");
    fixupIEPNG("id40", "Mastermind_files/transparent.gif");
    fixupIEPNG("id41", "Mastermind_files/transparent.gif");
    fixupIEPNG("id42", "Mastermind_files/transparent.gif");
    fixupIEPNG("id43", "Mastermind_files/transparent.gif");
    fixupIEPNG("id44", "Mastermind_files/transparent.gif");
    fixupIEPNG("id45", "Mastermind_files/transparent.gif");
    fixupIEPNG("id46", "Mastermind_files/transparent.gif");
    fixupIEPNG("id47", "Mastermind_files/transparent.gif");
    fixupIEPNG("id48", "Mastermind_files/transparent.gif");
    fixupIEPNG("id49", "Mastermind_files/transparent.gif");
    fixupIEPNG("id50", "Mastermind_files/transparent.gif");
    fixupIEPNG("id51", "Mastermind_files/transparent.gif");
    fixupIEPNG("id52", "Mastermind_files/transparent.gif");
    fixupIEPNG("id53", "Mastermind_files/transparent.gif");
    fixupIEPNG("id54", "Mastermind_files/transparent.gif");
    fixupIEPNG("id55", "Mastermind_files/transparent.gif");
    fixupIEPNG("id56", "Mastermind_files/transparent.gif");
    fixupIEPNG("id57", "Mastermind_files/transparent.gif");
    fixupIEPNG("id58", "Mastermind_files/transparent.gif");
    fixupIEPNG("id59", "Mastermind_files/transparent.gif");
    fixupIEPNG("id60", "Mastermind_files/transparent.gif");
    fixupIEPNG("id61", "Mastermind_files/transparent.gif");
    fixupIEPNG("id62", "Mastermind_files/transparent.gif");
    fixupIEPNG("id63", "Mastermind_files/transparent.gif");
    fixupIEPNG("id64", "Mastermind_files/transparent.gif");
    fixupIEPNG("id65", "Mastermind_files/transparent.gif");
    fixupIEPNG("id66", "Mastermind_files/transparent.gif");
    fixupIEPNG("id67", "Mastermind_files/transparent.gif");
    fixupIEPNG("id68", "Mastermind_files/transparent.gif");
    fixupIEPNG("id69", "Mastermind_files/transparent.gif");
    fixupIEPNG("id70", "Mastermind_files/transparent.gif");
    fixupIEPNG("id71", "Mastermind_files/transparent.gif");
    fixupIEPNG("id72", "Mastermind_files/transparent.gif");
    fixupIEPNG("id73", "Mastermind_files/transparent.gif");
    fixupIEPNG("id74", "Mastermind_files/transparent.gif");
    fixupIEPNG("id75", "Mastermind_files/transparent.gif");
    fixupIEPNG("id76", "Mastermind_files/transparent.gif");
    fixupIEPNG("id77", "Mastermind_files/transparent.gif");
    fixupIEPNG("id78", "Mastermind_files/transparent.gif");
    fixupIEPNG("id79", "Mastermind_files/transparent.gif");
    fixupIEPNG("id80", "Mastermind_files/transparent.gif");
    fixupIEPNG("id81", "Mastermind_files/transparent.gif");
    fixupIEPNG("id82", "Mastermind_files/transparent.gif");
    fixupIEPNG("id83", "Mastermind_files/transparent.gif");
    fixupIEPNG("id84", "Mastermind_files/transparent.gif");
    fixupIEPNG("id85", "Mastermind_files/transparent.gif");
    fixupIEPNG("id86", "Mastermind_files/transparent.gif");
    fixupIEPNG("id87", "Mastermind_files/transparent.gif");
    fixupIEPNG("id88", "Mastermind_files/transparent.gif");
    fixupIEPNG("id89", "Mastermind_files/transparent.gif");
    fixupIEPNG("id90", "Mastermind_files/transparent.gif");
    fixupIEPNG("id91", "Mastermind_files/transparent.gif");
    fixupIEPNG("id92", "Mastermind_files/transparent.gif");
    fixupIEPNG("id93", "Mastermind_files/transparent.gif");
    fixupIEPNG("id94", "Mastermind_files/transparent.gif");
    fixupIEPNG("id95", "Mastermind_files/transparent.gif");
    fixupIEPNG("id96", "Mastermind_files/transparent.gif");
    fixupIEPNG("id97", "Mastermind_files/transparent.gif");
    fixupIEPNG("id98", "Mastermind_files/transparent.gif");
    fixupIEPNG("id99", "Mastermind_files/transparent.gif");
    fixupIEPNG("id100", "Mastermind_files/transparent.gif");
    fixupIEPNG("id101", "Mastermind_files/transparent.gif");
    fixupIEPNG("id102", "Mastermind_files/transparent.gif");
    fixupIEPNG("id103", "Mastermind_files/transparent.gif");
    fixupIEPNG("id104", "Mastermind_files/transparent.gif");
    fixupIEPNG("id105", "Mastermind_files/transparent.gif");
    fixupIEPNG("id106", "Mastermind_files/transparent.gif");
    fixupIEPNG("id107", "Mastermind_files/transparent.gif");
    fixupIEPNG("id108", "Mastermind_files/transparent.gif");
    fixupIEPNG("id109", "Mastermind_files/transparent.gif");
    fixupIEPNG("id110", "Mastermind_files/transparent.gif");
    fixupIEPNG("id111", "Mastermind_files/transparent.gif");
    fixupIEPNG("id112", "Mastermind_files/transparent.gif");
    fixupIEPNG("id113", "Mastermind_files/transparent.gif");
    fixupIEPNG("id114", "Mastermind_files/transparent.gif");
    fixupIEPNG("id115", "Mastermind_files/transparent.gif");
    fixupIEPNG("id116", "Mastermind_files/transparent.gif");
    fixupIEPNG("id117", "Mastermind_files/transparent.gif");
    fixupIEPNG("id118", "Mastermind_files/transparent.gif");
    fixupIEPNG("id119", "Mastermind_files/transparent.gif");
    fixupIEPNG("id120", "Mastermind_files/transparent.gif");
    fixupIEPNG("id121", "Mastermind_files/transparent.gif");
    fixupIEPNG("id122", "Mastermind_files/transparent.gif");
    fixupIEPNG("id123", "Mastermind_files/transparent.gif");
    fixupIEPNG("id124", "Mastermind_files/transparent.gif");
    fixupIEPNG("id125", "Mastermind_files/transparent.gif");
    fixupIEPNG("id126", "Mastermind_files/transparent.gif");
    fixupIEPNG("id127", "Mastermind_files/transparent.gif");
    fixupIEPNG("id128", "Mastermind_files/transparent.gif");
    fixupIEPNG("id129", "Mastermind_files/transparent.gif");
    fixupIEPNG("id130", "Mastermind_files/transparent.gif");
    fixupIEPNG("id131", "Mastermind_files/transparent.gif");
    fixupIEPNG("id132", "Mastermind_files/transparent.gif");
    fixupIEPNG("id133", "Mastermind_files/transparent.gif");
    fixupIEPNG("id134", "Mastermind_files/transparent.gif");
    fixupIEPNG("id135", "Mastermind_files/transparent.gif");
    fixupIEPNG("id136", "Mastermind_files/transparent.gif");
    fixupIEPNG("id137", "Mastermind_files/transparent.gif");
    fixupIEPNG("id138", "Mastermind_files/transparent.gif");
    fixupIEPNG("id139", "Mastermind_files/transparent.gif");
    fixupIEPNG("id140", "Mastermind_files/transparent.gif");
    fixupIEPNG("id141", "Mastermind_files/transparent.gif");
    fixupIEPNG("id142", "Mastermind_files/transparent.gif");
    fixupIEPNG("id143", "Mastermind_files/transparent.gif");
    fixupIEPNG("id144", "Mastermind_files/transparent.gif");
    fixupIEPNG("id145", "Mastermind_files/transparent.gif");
    fixupIEPNG("id146", "Mastermind_files/transparent.gif");
    fixupIEPNG("id147", "Mastermind_files/transparent.gif");
    fixupIEPNG("id148", "Mastermind_files/transparent.gif");
    fixupIEPNG("id149", "Mastermind_files/transparent.gif");
    fixupIEPNG("id150", "Mastermind_files/transparent.gif");
    fixupIEPNG("id151", "Mastermind_files/transparent.gif");
    fixupIEPNG("id152", "Mastermind_files/transparent.gif");
    fixupIEPNG("id153", "Mastermind_files/transparent.gif");
    fixupIEPNG("id154", "Mastermind_files/transparent.gif");
    fixupIEPNG("id155", "Mastermind_files/transparent.gif");
    fixupIEPNG("id156", "Mastermind_files/transparent.gif");
    fixupIEPNG("id157", "Mastermind_files/transparent.gif");
    fixupIEPNG("id158", "Mastermind_files/transparent.gif");
    fixupIEPNG("id159", "Mastermind_files/transparent.gif");
    fixupIEPNG("id160", "Mastermind_files/transparent.gif");
    fixupIEPNG("id161", "Mastermind_files/transparent.gif");
    fixupIEPNG("id162", "Mastermind_files/transparent.gif");
    fixupIEPNG("id163", "Mastermind_files/transparent.gif");
    fixupIEPNG("id164", "Mastermind_files/transparent.gif");
    fixupIEPNG("id165", "Mastermind_files/transparent.gif");
    fixupIEPNG("id166", "Mastermind_files/transparent.gif");
    fixupIEPNG("id167", "Mastermind_files/transparent.gif");
    fixupIEPNG("id168", "Mastermind_files/transparent.gif");
    fixupIEPNG("id169", "Mastermind_files/transparent.gif");
    fixupIEPNG("id170", "Mastermind_files/transparent.gif");
    fixupIEPNG("id171", "Mastermind_files/transparent.gif");
    fixupIEPNG("id172", "Mastermind_files/transparent.gif");
    fixupIEPNG("id173", "Mastermind_files/transparent.gif");
    fixupIEPNG("id174", "Mastermind_files/transparent.gif");
    fixupIEPNG("id175", "Mastermind_files/transparent.gif");
    fixupIEPNG("id176", "Mastermind_files/transparent.gif");
    fixupIEPNG("id177", "Mastermind_files/transparent.gif");
    return true;
}

