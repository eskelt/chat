
var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

server.listen(8000);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function (req,res){

        res.sendFile(__dirname + '/index.html');       
        app.use("/public", express.static(__dirname + "/public"));
        

});

//Para incluir css y js


io.sockets.on('connection', function(socket){
        socket.on('sendMessage', function(data){
                io.sockets.emit('newMessage', {msg: data});
        });
});

// server listens in on port

app.listen(server_port, server_ip_address, function(){

        console.log("Listening on " + server_ip_address + ", server_port " + server_port);

})
