const http = require('http');
const fs = require('fs/promises');

const host = 'localhost';
const port = 8800;

/**
 * @param {string} dbName 
 * @param {(json: string) => void} onFinish 
 */
function getJSON(dbName, onFinish) {
    fs.readFile(`${__dirname}/database/${dbName}.json`, 'utf8')
        .then(content => {
            onFinish({ 
                data: content,
                code: 200
            });
        })
        .catch(() => {
            onFinish({
                data: {
                    error: `Non-existing resource "${dbName}"! Check your request`,
                },
                code: 404,
            });
        });
} 

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    
    switch (req.url) {
        case '/authors':
            getJSON('authors', ({ data, code }) => {
                res.writeHead(code);
                res.end(JSON.stringify(data))
            });
            break;
        case '/books':
            getJSON('books', ({ data, code }) => {
                res.writeHead(code);
                res.end(JSON.stringify(data))
            });
            break;
        case '/boots':
            getJSON('boots', ({ data, code }) => {
                res.writeHead(code);
                res.end(JSON.stringify(data))
            });
            break;
        default: 
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Non-existing endpoint' }))
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
