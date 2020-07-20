const User = require('../model/User');

const findOneUserByEmail = ((email)=> {
    const user = User.findOne({"email": email}, (err, doc) => {
        console.log(!err ? doc : err);
    });
    return user;
});

const findOneUserById = ((id) => {
    const user = User.findOne({"id": id}, (err, doc) => {
        console.log(!err ? doc : err);
    });
    return user;
});

const findOneUserByObjectId = (id => {
    const user = User.findOne({"_id": id}, (err, doc) => {
        console.log(!err ? doc : err);
    });
    return user;
})

const findAllUsers = (() => {
    const users = User.find({}, (err, doc) => {
        console.log(!err ? doc : err);
    });
    return users;
})

const insertOneUser = (data)=> {
    const newUser = new User({
        email: data.email,
        password: data.password
    });
    newUser.save((err)=> {
        console.log(!err ?  "Successfuly added a new user!!" : err);
    });
}

const updateOneUser = async (data) => {

    try {
    const user = await findOneUserById(data.id);

        for( let prop in data) {
            data[prop] != undefined ? user[prop] = data[prop] : null;
        }
        user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteOneUser = async (id) => {

    try {
        const result = await User.remove({"id": id});
        console.log(result);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    findOneUserByEmail,
    findOneUserById,
    findOneUserByObjectId,
    findAllUsers,
    insertOneUser,
    updateOneUser,
    deleteOneUser
};
