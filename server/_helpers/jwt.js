const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const doctorService = require('../doctors/doctor.service');

module.exports = jwt;
module.exports = jwtdoctors;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

function jwtdoctors() {
    let  secret = config.secret;
    return expressJwt({ secret , isRevokeddoc }).unless({
        path: [
            // public routes that don't require authentication
            '/doctors/authenticate',
            '/doctors/register',
        ]
    });
}

async function isRevokeddoc(req, payload, done) {
    const userdoc = await doctorService.getByIddoc(payload.sub);

    // revoke token if user no longer exists
    if (!userdoc) {
        return done(null, true);
    }

    done();
};
