const http = require('http');
// const fs = require('fs/promises');

const host = 'localhost';
const port = 8080;

/**
 * @param {string} dbName 
 * @param {(json: object) => void} onFinish 
 */
function getJSON(dbName, onFinish) {
    // fs.readFile(`${__dirname}/database/${dbName}.json`, 'utf8')
    //     .then(content => {
    //         onFinish({ 
    //             data: content,
    //             code: 200
    //         });
    //     })
    //     .catch(() => {
    //         onFinish({
    //             data: {
    //                 error: `Non-existing resource "${dbName}"! Check your request`,
    //             },
    //             code: 404,
    //         });
    //     });
    onFinish({
        data: {
            test: [1, 2, 3, 5],
        },
        code: 200,
    });
} 

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    
    switch (req.url) {
        case '/authors':
            getJSON('authors', ({ data, code }) => {
                res.writeHead(code);
                res.end(data)
            });
            break;
        case '/books':
            getJSON('books', ({ data, code }) => {
                res.writeHead(code);
                res.end(data)
            });
            break;
        case '/boots':
            getJSON('boots', ({ data, code }) => {
                res.writeHead(code);
                res.end(data)
            });
            break;
        default: 
            res.writeHead(404);
            res.end({ error: 'Non-existing endpoint' })
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
