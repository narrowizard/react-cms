/**
 * nirvana-cms-auth project host.
 */
exports.authProxyConfig = {
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "8081",
}

/**
 * setting proxy table
 * tips: /auth router segement is kept to cms usage. 
 */
exports.proxyTable = {
    "/user": '10.0.0.236:8080'
}