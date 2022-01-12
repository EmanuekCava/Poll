"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const pollSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 120
    },
    options: [],
    nickId: ObjectId
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Poll', pollSchema);
