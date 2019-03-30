//添加onload函数；
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}


function showPic(whichPic){

    /*添加检查条件*/
    if(!document.getElementById("placeholder")) return false;
    var source = whichPic.getAttribute("href");
    var element = document.getElementById("placeholder");
    element.setAttribute("src", source);

    var description = document.getElementById("imgDescription");
    if(description.firstChild.nodeType === 3){
        //get text
        var text = whichPic.getAttribute("title");
        description.firstChild.nodeValue = text;
    }

    return true;
}





function popUp(winURL) {
    window.open(winURL, "popup","width = 320, height = 480");

}



function  prepareLinks() {
    /*检查支持性*/
    if(!document.getElementsByClassName("popup")) return false;
    if(!document.getElementsByTagName("a")) return false;

    //var links = document.getElementsByClassName("popup");
    var links = document.getElementsByTagName("a");
    for(var i = 0; i<links.length; i++){
        links[i].onclick=function () {
            return !showPic(this);
        };
    }
}



function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;

    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "./images/person_1.jpeg");
    placeholder.setAttribute("alt", "this is an img");

    var description = document.createElement("p");
    description.setAttribute("id","imgDescription");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);


    document.body.appendChild(placeholder);
    document.body.appendChild(description);

}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareLinks);
