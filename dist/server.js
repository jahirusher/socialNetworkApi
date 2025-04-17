"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const thoughtsRoutes_1 = __importDefault(require("./routes/thoughtsRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/thoughts', thoughtsRoutes_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect('mongodb://localhost/social-network')
    .then(() => {
    console.log('✅ Connected to MongoDB');
})
    .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
});
// Start the server
app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
});
