const http = require('http');

const host = 'localhost';
const port = 3000;

const DatabaseData = {
    authors: [
        {
            "name": "Pablo",
            "country": "Spain",
            "birth": 1999
        },
        {
            "name": "Ubuntu",
            "country": "Russia",
            "birth": 2021
        },
    ],
    books: [
        { 
            "title": "The Alchemist", 
            "author": "Paulo Coelho", 
            "year": 1988 
        },
        { 
            "title": "The Prophet", 
            "author": "Kahlil Gibran", 
            "year": 1923
        }
    ]
}

/**
 * @param {string} dbName 
 */
function getJSON(dbName) {
    if (dbName in DatabaseData) {
        return {
            data: DatabaseData[dbName],
            code: 200,
        };
    }

    return {
        data: {
            error: `Cannot find ${dbName} database`,
        },
        code: 404,
    };
} 

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");

    const { code, data } = getJSON(req.url.replace('/', ''));

    res.writeHead(code);
    res.end(JSON.stringify(data));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
