const mongoosedoc = require('mongoose');
const Schemadoc = mongoosedoc.Schema;

const schemadoc = new Schemadoc({
	firstName: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	mobile: { type: Number, required: true, minlength: 10 },
	hash: { type: String, required: true },
	createdDate: { type: Date, default: Date.now }
});

schemadoc.set('toJSON', { virtuals: true });

module.exports = mongoosedoc.model('Doctor', schemadoc);