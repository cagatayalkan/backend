const router = require('express').Router();
let Examiniation = require('../models/examiniation.model');
let ExaminiationFee = require('../models/examiniationFee.model');

const moment = require('moment');
var uniqid = require('uniqid');

router.route('/').get((req, res) => {
  Examiniation.find({ status: '1' })
    .then((examiniation) => res.json(examiniation))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//hastanın ödemeleri
router.route('/getPatientExaminiation/:patientId').get((req, res) => {
  Examiniation.find({ status: '1', patientId: req.params.patientId })
    .then((examiniation) => res.json(examiniation))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = uniqid();
  const patientId = req.body.patientId;
  const description = req.body.description;
  const ecg = req.body.ecg;
  const complaint = req.body.complaint;
  const examiniation = req.body.examiniation;
  const profileDesc = req.body.profileDesc;
  const fee = req.body.fee;
  const eko = req.body.eko;
  const medicament = req.body.medicament;
  const bloodPressure = req.body.bloodPressure;
  const bloodSugar = req.body.bloodSugar;
  const so2 = req.body.so2;
  const lab = req.body.lab;
  const createDateFull = new Date();
  const createDate = moment().format('YYYY-MM-DD');
  const createTime = moment().format('LT');
  const status = '1';

  const newExaminiation = new Examiniation({
    _id,
    patientId,
    description,
    ecg,
    complaint,
    examiniation,
    profileDesc,
    fee,
    eko,
    medicament,
    bloodPressure,
    bloodSugar,
    so2,
    lab,
    status,
    createDateFull,
    createDate,
    createTime,
  });

  newExaminiation
    .save()
    .then(() => {
      res.status(201).json({
        _id : _id
      })
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Examiniation.findById(req.params.id)
    .then((examiniation) => res.json(examiniation))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:examinationId').delete((req, res) => {
  Examiniation.findById(req.params.examinationId)
    .then((examiniation) => {
      examiniation.status = '0';

      //patient.date = Date.parse(req.body.date);

      examiniation
        .save()
        .then(() => {

           ExaminiationFee.find({ status: '1', examinationId : req.params.examinationId })
           .then((examiniationFee) => {
            examiniationFee.status ="0";
           })
           .catch((err) => res.status(400).json('Error: ' + err));

          res.json('examiniation deleted!')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));


});

router.route('/update/:id').post((req, res) => {
  console.log('update');
  Examiniation.findById(req.params.id)
    .then((examiniation) => {
      examiniation.description = req.body.description;
      examiniation.ecg = req.body.ecg;
      examiniation.complaint = req.body.complaint;
      examiniation.examiniation = req.body.examiniation;
      examiniation.profileDesc = req.body.profileDesc;
      examiniation.fee = req.body.fee;
      examiniation.medicament = req.body.medicament;
      examiniation.bloodPressure = req.body.bloodPressure;
      examiniation.bloodSugar = req.body.bloodSugar;
      examiniation.lab = req.body.lab;

      examiniation
        .save()
        .then(() => res.json('Examiniation updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
