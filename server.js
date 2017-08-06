var express = require('express');
var app = express();
var fileService = require("./file-service")
var ipHelper = require("./ip-helper")

var filePath = process.env.MEDIA_PATH;

app.use(function (req, res, next) {
  console.log('Get request for ' + req.originalUrl + ' from ' + req.connection.remoteAddress);
  next()
})

app.use('/static', express.static(filePath))

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data: "Hello World" }));
})

app.get('/file_names', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var fileNames = fileService.getFileNames(filePath);
    res.send(JSON.stringify({data: fileNames}));
})

var server = app.listen(8080, function () {
    
    var host = "0.0.0.0"
    var port = server.address().port
    
    console.log("App listening at http://%s:%s", host, port)
    
    ipHelper.printMyIp();

})