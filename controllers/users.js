const Users = require('../models/users.js');

const {getPostData} = require('../utils.js');

async function getUsers(req, res) {
    try {
        const users = await Users.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch(err) {
        console.log(err);
    }
}

async function getUser(req, res, id) {
    try {
        const user = await Users.findById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'User is not found'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify(user))
        }
    } catch (err) {
        console.log(err);
    }
}

// async function createProduct(req, res) {
//     try {
        
//         let body = '';
//         req.on('data', (chunk) => {
//             body += chunk.toString()
//         })
//         req.on('end', () => {
//             const newUser =  Users.create(user);
//             res.writeHead(201, {'Content-Type': 'application/json'})
//             return res.end(JSON.stringify(newUser));
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }


async function createUser(req, res) {
    try {
        const body = await getPostData(req)

        const { name, address, salary } = JSON.parse(body)

        const user = {
            name,
            address,
            salary
        }

        const newUser = await Users.create(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))  

    } catch (error) {
        console.log(error)
    }
}


async function updateUser(req, res, id) {
    try {
     
        const user = await Users.findById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'User is not found'}));
        } else {
            const body = await getPostData(req)

            const { name, address, salary } = JSON.parse(body)
    
            const userData = {
                name: name || user.name,
                address: address || user.address,
                salary: salary || user.salary
            }
    
            const updUser = await Users.update(id, userData)
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updUser))  
        }

    } catch (error) {
        console.log(error)
    }
}


async function deleteUser(req, res, id) {
    try {
        const user = await Users.findById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: 'User is not found'}));
        } else {
            await Users.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'}) 
            res.end(JSON.stringify({message: `User ${id} removed`}));
        }
    } catch (err) {
        console.log(err);
    }
}



module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };