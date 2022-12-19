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
        .then(contents => {
            onFinish(contents)
        })
        .catch(() => {
            onFinish(JSON.stringify({
                error: `Non-existing resource "${dbName}"! Check your request`,
            }))
        });
} 

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    
    switch (req.url) {
        case '/authors':
            getJSON('authors', json => {
                res.writeHead(200);
                res.end(json);
            });
            break;
        case '/books':
            getJSON('books', json => {
                res.writeHead(200);
                res.end(json);
            });
            break;
        case '/boobs':
            getJSON('boobs', json => {
                res.writeHead(200);
                res.end(json)
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
