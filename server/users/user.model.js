const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	firstName: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	mobile: { type: Number, required: true, minlength: 10 },
	hash: { type: String, required: true },
	createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);