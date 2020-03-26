const configdoc = require('config.json');
const jwtdoc = require('jsonwebtoken');
const bcryptdoc = require('bcryptjs');
const dbs = require('_helpers/db');
const Doctor = dbs.Doctor;

module.exports = {
    authenticatedoc,
    getAlldoc,
    getByIddoc,
    createdoc,
    updatedoc,
    deletedoc: deletedoc
};

async function authenticatedoc({ email, password }) {
    let doctor = await Doctor.findOne({ email });
    if (doctor && bcryptdoc.compareSync(password, Doctor.hash)) {
        let { hash, ...DoctorWithoutHash } = Doctor.toObject();
        let tokens = jwtdoc.sign({ sub: Doctor.id }, configdoc.secret);
        return {
            ...DoctorWithoutHash,
            tokens
        };
    }
}

async function getAlldoc() {
    return await Doctor.find().select('-hash');
}

async function getByIddoc(id) {
    return await Doctor.findById(id).select('-hash');
}

async function createdoc(doctorParam) {
    // validate
    if (await Doctor.findOne({ email: doctorParam.email })) {
        throw 'Email Id already registered';
    }

    let doctor = new Doctor(doctorParam);

    // hash password
    if (doctorParam.password) {
        doctor.hash = bcryptdoc.hashSync(doctorParam.password, 10);
    }

    // save Doctor
    await doctor.save();
}

async function updatedoc(id, doctorParam) {
    let doctor = await Doctor.findById(id);

    // validate
    if (!doctor) throw 'Doctor not found';
    if (doctor.username !== doctorParam.username && await doctor.findOne({ username: doctorParam.username })) {
        throw 'Doctorname "' + doctorParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (doctorParam.password) {
        doctorParam.hash = bcryptdoc.hashSync(doctorParam.password, 10);
    }

    // copy DoctorParam properties to Doctor
    Object.assign(doctor, doctorParam);

    await doctor.save();
}

async function deletedoc(id) {
    await Doctor.findByIdAndRemove(id);
}