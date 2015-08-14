var fs = require("fs"),
    express = require("express"),
    request = require("request"),
    queryString = require("querystring"),
    bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/send", function(req, res) {
    fs.readFile(__dirname + "/config.json", function(err, config) {
        if(err) return res.end("{}");
        config = JSON.parse(config.toString());

        var url = "https://api.clockworksms.com/http/send.aspx?" + queryString.stringify({
            key: config.key,
            to: req.body.recipient.toString(),
            content: req.body.content.toString()
        });

        console.log(url);

        request(url, function(err, r, body) {
            if(err) return res.end("{}");
            res.end(body);
        });
    });
});

var port = process.env.PORT || process.argv[3] || 8080,
    ip = process.env.IP || "0.0.0.0";

app.listen(port, ip);
console.log("Running on http://localhost:" + port);
