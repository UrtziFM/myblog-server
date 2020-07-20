const crudUsers = require('../config/user');

const findAllusers = async (req, res) => {
    try {
        const users = await crudUsers.findAllUsers();
        res.send(users);
    } catch (err) {
        console.log(err);
    }
}

const addUser = async (req, res) => {
    try {
        const user = await crudUsers.insertOneUser(req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await crudUsers.updateOneUser(req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await crudUsers.deleteOneUser(req.body.id);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    findAllusers,
    addUser,
    updateUser,
    deleteUser
};

