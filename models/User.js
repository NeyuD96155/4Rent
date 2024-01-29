const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Role: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
