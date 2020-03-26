let express = require('express');
let router = express.Router();
const doctorServices = require('./doctor.service');

// routes
router.post('/authenticate', authenticatedoc);
router.post('/register', registerdoc);
router.get('/', getAlldoc);
router.get('/current', getCurrentdoc);
router.get('/:id', getByIddoc);
router.put('/:id', updatedoc);
router.delete('/:id', deletedoc);

module.exports = router;

function authenticatedoc(req, res, next) {
    doctorServices.authenticatedoc(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function registerdoc(req, res, next) {
    doctorServices.createdoc(req.body)
    .then(() => res.status(200).json({ message: 'Registration Successfull' }))
    .catch(err => next(err));
}

function getAlldoc(req, res, next) {
    doctorServices.getAlldoc()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrentdoc(req, res, next) {
    doctorServices.getByIddoc(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getByIddoc(req, res, next) {
    doctorServices.getByIddoc(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function updatedoc(req, res, next) {
    doctorServices.updatedoc(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function deletedoc(req, res, next) {
    doctorServices.deletedoc(req.params.id)
    .then(() => res.json({ message: 'Deleted Successfully' }))
    .catch(err => next(err));
}