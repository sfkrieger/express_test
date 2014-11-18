//looks in node module for package of express...
var express = require("express");
var http = require("http");

//creating a new instance of express framework
var app = new express();

var req_ob = {
    hostname: "http://api.soundcloud.com",
    port: 80,
    path: '/tracks.json?consumer_key=apigee&filter=all&order=created_at&p=Let it be',
    method: 'GET'
};
//var sd_callback_resp = function(response){
//    console.log(response);
//    response.send(response);
//}
var my_callback_function = function (request, response) {
//    console.log(request);
//    console.log(response);
    http.request("http://api.soundcloud.com/tracks.json?consumer_key=apigee&filter=all&order=created_at&p=Let it be", function (res) {
//       console.log(res);
    var str = "";

        res.on('data', function (piece) {
//            response.write(piece);
            console.log("Got data: " + piece.toString() + "\n");
            str += piece;
        });

//        setTimeout(function(){
//            response.end();
//        }, 4000);

        res.on('end', function () {
            console.log("before in finish\n");
            response.end();
            response.send(str);
            console.log("after in finish\n");

        });

    });
//    response.send("I'm here");
}

var new_callback_function = function (request, response) {
    http.request(req_ob, function (res) {
        res.on('data', function (piece) {
            response.write(piece);

        });

        res.on('finish', function () {
            console.log("before in finish\n");
            response.end();
            console.log("after in finish\n");

        });
    })
}

//app.use('/', my_callback_function);

app.use('/', function (request, response)
{
    http.get()
})

app.listen(8000);
