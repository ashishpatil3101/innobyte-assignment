import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid');
            }
        },
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    userName:{
        type: String,
        trim: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 14);
        this.password = hashedPassword;
    }
    next();
})

const User = await mongoose.model('User', userSchema);

export default User;