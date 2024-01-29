const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // Define fields as per requirement
});

module.exports = mongoose.model('Payment', paymentSchema);
