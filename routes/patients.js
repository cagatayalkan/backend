const router = require('express').Router();
let Patient = require('../models/patient.model');
const moment = require('moment');
var uniqid = require('uniqid');

router.route('/').get((req, res) => {
  Patient.find({ status: '1' }).sort({ createDateFull: 'descending' })
    .then((patient) => {
      res.json(patient);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = uniqid();
  const name = req.body.name;
  const surname = req.body.surname;
  const age = moment(req.body.age.toString()).format('YYYY-MM-DD');
  const tc = req.body.tc;
  const phone = req.body.phone;
  const mail = req.body.mail;
  const description = req.body.description;
  const gender = req.body.gender;
  const address = req.body.address;
  const createDateFull = new Date();
  const createDate = moment().format('YYYY-MM-DD');
  const createTime = moment().format('LT');
  const status = '1';

  const newPatient = new Patient({
    _id,
    name,
    surname,
    age,
    tc,
    phone,
    mail,
    description,
    gender,
    status,
    createDateFull,
    createDate,
    createTime,
    address,
  });

  newPatient
    .save()
    .then(() => res.json('Patient added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => res.json(patient))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => {
      patient.status = '0';

      //patient.date = Date.parse(req.body.date);

      patient
        .save()
        .then(() => res.json('Patient deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => {
      patient.name = req.body.name;
      patient.surname = req.body.surname;
      //  patient.age = req.body.age;
      patient.phone = req.body.phone;
      patient.mail = req.body.mail;
      patient.description = req.body.description;
      patient.gender = req.body.gender;
      patient.address = req.body.address;
      //patient.date = Date.parse(req.body.date);

      patient
        .save()
        .then(() => res.json('Patient updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
