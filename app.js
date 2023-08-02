const http = require('http');

const {getUsers, getUser, createUser, updateUser, deleteUser} = require('./controllers/users');

const Port = process.env.PORT || 3000;

const server = http.createServer(async(req, res) => {
    if (req.url == '/api/user' && req.method == 'GET') {
        getUsers(req, res);

    } else if(req.url.match(/\/api\/user\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getUser(req, res, id);
    } else if (req.url === '/api/user' && req.method === 'POST') {
        createUser(req, res);
      } else if (req.url.match(/\/api\/user\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateUser(req, res, id);
      } else if (req.url.match(/\/api\/user\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteUser(req, res, id);
      }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'}) 
        res.end(JSON.stringify({message: 'Route is not found'}));
    }
})

server.listen(Port, () => {
    console.log(`Server is listen ${Port}`);
})


