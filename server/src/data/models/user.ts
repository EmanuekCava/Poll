import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    nick: string;
    email: string;
    password: string;
    hidePassword(password: string): Promise<string>
}

const userSchema = new Schema({
    nick: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.methods.hidePassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)
}

export default model<IUser>('User', userSchema)