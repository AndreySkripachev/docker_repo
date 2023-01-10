const http = require('http');
var os = require('os');
var ifaces = os.networkInterfaces();
let ipList = [];

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    ipList.push(iface.address);
  });
});

const host = 'localhost';
const port = 8800;

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
server.listen(port, ipList[0], () => {
    console.log(`Server is running on http://${host}:${port}`);
});
