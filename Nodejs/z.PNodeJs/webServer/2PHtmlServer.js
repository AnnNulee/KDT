const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./index.html')
        res.writeHead(200, {'Content-Type' : 'text/html; charset = utf8' });
        res.end(data);
    }catch(err) {
        console.err(err);
        res.writeHead(200, {'Content-Type' : 'text/html; charset = utf8' });
        res.end();
    }
}).listen(8081, () => {
    console.log('htmlServer 가동중')
})

