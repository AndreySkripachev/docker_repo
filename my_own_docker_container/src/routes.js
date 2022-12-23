const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8080;

/**
 * @param {string} dbName 
 * @param {(json: object) => void} onFinish 
 */
function getJSON(dbName, onFinish) {
    fs.readFile(`${__dirname}/database/${dbName}.json`, 'utf8', (err, data) => {
        if (err) {
            onFinish({
                data: {
                    error: `Cannot find ${dbName} database`,
                },
                code: 404,
            });
        }

        onFinish({
            data: data,
            code: 200,
        });
    });
} 

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url.slice(1);

    getJSON(url, ({ data, code }) => {
        res.writeHead(code);
        res.end(data);
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
