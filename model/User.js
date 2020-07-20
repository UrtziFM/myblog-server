const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.pre('save', async function (next) {

    try {
        if (this.id == undefined) {
            let biggerId = -1;
            const list = await User.find();
            for (let doc of list) {
                if (doc.id != undefined && biggerId < doc.id) {
                    biggerId = doc.id;
                }
            }
            this.id = ++biggerId;
        }

        if (this.password) this.password = await bcrypt.hash(this.password, 12);

        next();
    } catch (err) {
        console.log(err);
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
