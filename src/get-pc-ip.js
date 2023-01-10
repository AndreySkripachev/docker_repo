const os = require('os');

function getPcIp() {
    const iFaces = os.networkInterfaces();
    for (const iFName of Object.keys(iFaces)) {
        for (const iFace of iFaces[iFName]) {
            if ('IPv4' !== iFace.family || iFace.internal !== false) {
                continue;
            }

            return iFace.address;
        }
    }
}

module.exports.getPcIp = getPcIp;
