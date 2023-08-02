const fs = require('fs');

function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
       if (err) {
        console.log(err);
       } 
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            });
        } catch (err) {
            console.log(err);
        }
    })
}


module.exports = {
    writeDataToFile, 
    getPostData
}