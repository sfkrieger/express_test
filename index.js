//looks in node module for package of express...
var express = require("express");
var http = require("http");

//creating a new instance of express framework
var app = new express();

var my_callback_function = function (client_req, our_res) {
    http.get("http://api.soundcloud.com/tracks.json?consumer_key=apigee&filter=all&order=created_at&p=Let it be", function (sc_res) {
        var str = "";

        sc_res.on('data', function (piece) {
            console.log("Got data: " + piece.toString() + "\n");
            str += piece;
        });

        sc_res.on('end', function () {
            console.log("before in finish\n");
            our_res.send(str);
            console.log("after in finish\n");

        });

    });
}

app.use('/', my_callback_function);
app.listen(8000);

