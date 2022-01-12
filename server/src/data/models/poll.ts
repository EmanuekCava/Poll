import { Schema, model, Document, Types } from "mongoose";

const { ObjectId } = Types;

export interface IPoll extends Document {
    question: string;
    optionOne: {
        option: string;
        votes: any[];
    };
    optionTwo: object;
}

const pollSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 120
    },
    optionOne: {
        option: String,
        votes: [{
            type: ObjectId, ref: 'User'
        }]
    },
    optionTwo: {
        option: String,
        votes: [{
            type: ObjectId, ref: 'User'
        }]
    },
    nickId: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IPoll>('Poll', pollSchema)