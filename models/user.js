const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    accountType: {
        type: String,
        required: [true, 'An account type must be chosen'],
    },
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
        minlength: [2, 'Minimum password length is 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
        minlength: [2, 'Minimum password length is 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },

    courses: []
});

// fire a function after doc is saved to d

userSchema.post('save', function (doc, next) {
    console.log('New user was created & saved', doc);
    next();
});

// fire a fucntion befoer doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;