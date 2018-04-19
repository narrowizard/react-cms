var http = require("http");
var proxy = require('express-http-proxy');

var proxyTable = {
    "/user": '10.0.0.236:8080'
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.proxyReq = function (req, res, next) {
    var options = {
        protocol: "http:",
        hostname: "127.0.0.1",
        port: "8081",
        path: "/user/authorize?request=" + req.baseUrl + req.path,
        headers: req.headers
    }
    http.get(options, (data) => {
        var resData = "";
        data.on("data", (chunk) => {
            resData += chunk;
        });
        data.on("end", () => {
            if (data.statusCode === 200) {
                proxy(proxyTable[req.baseUrl], {
                    proxyReqPathResolver: function (req) {
                        var urlObject = require('url').parse(req.url, true);
                        urlObject.query["userid"] = +resData.trim();
                        return urlObject.pathname + "?" + require("querystring").stringify(urlObject.query);
                    }
                })(req, res, next)
            } else {
                res.writeHead(data.statusCode, data.headers);
                res.write(resData);
            }
        })
    });
}