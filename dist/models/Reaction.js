"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = void 0;
const mongoose_1 = require("mongoose");
// Define the Reaction schema
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toLocaleString()
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
exports.reactionSchema = reactionSchema;
