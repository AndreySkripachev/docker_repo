const http = require('http');
const fs = require('fs');
const { getPcIp } = require('./get-pc-ip');

const host = getPcIp();
const port = 8800;

/**
 * @param {string} dbName 
 */
function getData(dbName) {
    try {
        const { data } = require(`./mock/${dbName}`);

        return {
            data,
            code: 200,
        }
    } catch(err) {
        return {
            data: {
                error: `Cannot find ${dbName} database`,
            },
            code: 404,
        };
    }
} 

/** @type {http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse>} */
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");

    const { code, data } = getData(req.url.replace('/', ''));
    res.writeHead(code);
    res.end(JSON.stringify(data));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
