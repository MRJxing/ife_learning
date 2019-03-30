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

function addClass(element, value) {
    if(!element.className){
        element.className = value
    }
    else {
        newClassName = value;
        newClassName += " ";
        element.className += newClassName;
    }
}

function  insertAfter(newElement, targetElement) {
    if(!targetElement.parentNode) return false;
    var parent = targetElement.parentNode;
    if(parent.lastChild === targetElement){
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
/*make the slide show move*/
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
    if(!document.getElementById("intro")) return false;

    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);


    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("id","preview");
    preview.setAttribute("alt","a glimpse of what awaits you");

    //添加到dom树
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);



    preview.style.top = "0px";
    preview.style.left = "0px";

    const links = document.getElementsByTagName("a");

    for(var i =0; i<links.length; i++){


        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html")!==-1){
                moveElement("preview",0,0,5)
            }
            if(destination.indexOf("about.html")!==-1){
                moveElement("preview",-150,0,5)
            }
            if(destination.indexOf("photos.html")!==-1){
                moveElement("preview",-300,0,5)
            }
            if(destination.indexOf("live.html")!==-1){
                moveElement("preview",-450,0,5)
            }
            if(destination.indexOf("contact.html")!==-1){
                moveElement("preview",-600,0,5)
            }
        };

    }
}
addLoadEvent(prepareSlideshow);

/*highlight an option in nav*/
function highlightPage() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByTagName("header")) return false;


    var headers = document.getElementsByTagName("header");

    if(headers.length<1) return false;
    var navs = headers[0].getElementsByTagName("nav");

    if (navs.length<1) return false;
    var links = navs[0].getElementsByTagName("a");

    var linkurl;
    for(let i =0; i<links.length; i++){
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl) !== -1){
            addClass(links[i], "here");
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);



function showSection(id) {
    // 根据指定id显示相应的section
    var sections = document.getElementsByTagName("section");
    for (var i=0; i<sections.length; i++ ) {
        if (sections[i].getAttribute("id") !== id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;

    var articles = document.getElementsByTagName("article");
    if(articles.length===0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length ===0) return false;
    var nav =navs[0];
    var links = nav.getElementsByTagName("a");

    for(var i =0; i<links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];

        if(!document.getElementById(sectionId)) continue;

        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function ()  {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);



function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType === 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for ( var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
    }
}



/*photos.html*/


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);




/*contact.html*/
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0; i<labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function() {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);



function resetFields(whichform) {
    //TODO  检查是否支持placeholder

    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder");
        if (!check) continue;

        element.onfocus = function() {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
                this.value = "";
                this.className = "";
            }
        };
        element.onblur = function() {
            if (this.value == "") {
                this.value = this.placeholder || this.getAttribute("placeholder");
                this.className = "placeholder";
            }
        };

        element.onblur();
    }
}

function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if(!validateForm(this)) return false;
            var article = document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this, article )) return false;
            return true;
        };
    }
}


/*验证表单*/
function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required == "required") {
            if (!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.type=="email") {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    if (field.value.length < 1 || field.value == field.placeholder) {
        return false;
    } else {
        return true;
    }
}

function isEmail(field) {
    if (field.value.indexOf("@") == -1 || field.value.indexOf(".") == -1) {
        return false;
    } else {
        return true;
    }
}
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);



/*ajax*/
function  getHTTPObject() {
    if(typeof XMLHttpRequest == "undefined"){
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP");}
            catch (e) {}
        }
    }
    return new  XMLHttpRequest();
}

/*删除所有子元素并返回图像*/
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src","images/logo.gif");
    content.setAttribute("alt","Loading...");
    element.appendChild(content);
}


function submitFormWithAjax(whichform,thetarget) {
    // 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像
    // 把表单的值组织成URL编码的字符串，以便通过Ajax请求发送
    // 创建方法为POST的Ajax请求，把表单的值发送给submit.html
    // 如果请求成功，解析响应并在目标元素中显示结果
    // 如果请求失败，显示错误消息
    var request = getHTTPObject();
    if (!request) { return false; }
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i=0; i<whichform.elements.length; i++) {
        element = whichform.elements[i];
        // 将表单元素拼成URL中传递的信息，同时对表单元素的值进行了适用于URL的转码
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    // 将数组内容拼接起来
    var data = dataParts.join('&');


    // 发起异步POST方式的访问
    request.open('POST', whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function() {
        // 当访问请求处理完成，接收响应也完成后
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                // 注意下面正则中使用了捕获组的定义
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 0) {
                    // 匹配结果是一个数组，第一个数组元素是与整个模式完整匹配的部分
                    // 匹配结果数组的第二个元素（索引为1），是responseText中与捕获组中的模式匹配的部分。
                    // 因为本例中只定义了一个捕获组，所以matches也只包含两个元素。
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };
    request.send(data);
    return true;
}
