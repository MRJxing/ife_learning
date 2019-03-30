function getNewContent() {
    var request = getHTTPObject();
    if (request) {
        request.open("GET", "example.txt", true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {//传输完成
                alert("Response Received");
                var para = document.createElement("p");
                var text = document.createTextNode(request.responseText);
                para.appendChild(text);
                document.getElementById("new").appendChild(para);
            }
        };
        request.send(null);
    } else {
        alert("you dont support XMLHTTPRequest");

    }
    alert("DONE");
}
addLoadEvent(getNewContent);