function  moveElement(elementID, final_x, final_y, interval) {
    if(!(document.getElementById||document.getElementById(elementID))) return false;

    var elem = document.getElementById(elementID);
    if(elem.movement) {
        clearTimeout(elem.movement);
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if(xpos === final_x && ypos === final_y){
        return true;//函数出口
    }
    if( xpos < final_x){
        dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    else {
        dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if(ypos < final_y) {
        dist = Math.ceil((final_y - ypos)/10);
        ypos = dist + ypos;
    }
    else {
        dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top  = ypos + "px";
    var repeat = "moveElement('"+elementID+"', "+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat, interval);



}

// 添加鼠标悬停响应函数
function  prepareSlideshow() {
    if(!(document.getElementById || document.getElementsByTagName)) return false;


    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    var preview = document.createElement("img");
    preview.setAttribute("src","images/400-100.gif");
    preview.setAttribute("id","preview");
    preview.setAttribute("alt","building blocks of web design");

    //添加到dom树
    slideshow.appendChild(preview);
    document.getElementsByTagName("body")[0].appendChild(slideshow);

    preview.style.top = "0px";
    preview.style.left = "0px";

    var list = document.getElementById("linklist");
    var links = list.getElementsByTagName("a");

    links[0].onmouseover = function () {
        moveElement("preview", -100,0 ,10);
    };
    links[1].onmouseover = function () {
        moveElement("preview", -200,0 ,10);
    };
    links[2].onmouseover = function () {
        moveElement("preview", -300,0 ,10);
    };
}
addLoadEvent(prepareSlideshow);