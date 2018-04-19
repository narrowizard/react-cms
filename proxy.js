var http = require("http");
var proxy = require('express-http-proxy');
var authProxyConfig = require("./config").authProxyConfig;
var proxyTable = require("./config").proxyTable;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.proxyReq = function (req, res, next) {
    var options = {
        path: "/user/authorize?request=" + req.baseUrl + req.path,
        headers: req.headers
    }
    var config = Object.assign(options, authProxyConfig)

    http.get(config, (data) => {
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