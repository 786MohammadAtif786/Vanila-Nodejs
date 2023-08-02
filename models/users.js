let users = require('../data/users');

const {writeDataToFile} = require('../utils');
const {uuidv4} = require('./uuid');


function findAll() {
    return new Promise((reslove, reject) => {
        reslove(users);
    })
}

function findById(id) {
    return new Promise((reslove, reject) => {
        const user = users.find((u) => u.id == id);

        reslove(user);
    })
}

function create(user) {
    return new Promise((reslove, reject) => {
        const newUser = {id: uuidv4() ,...user};
        users.push(newUser)
        writeDataToFile('./data/users.json', users);
        reslove(newUser);
    })
}

function update(id, user) {
    return new Promise((reslove, reject) => {
        const index = users.findIndex((p) => p.id == id);
        users[index] = {id, ...user};
        writeDataToFile('./data/users.json', users);
        reslove(users[index]);
    })
}

function remove(id) {
    return new Promise((reslove, reject) => {
        users = users.filter((p) => p.id !== id);
        writeDataToFile('./data/users.json', users);
        reslove();
    })
}

module.exports = { findAll, findById, create, update , remove}