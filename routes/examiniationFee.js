const router = require('express').Router();
let ExaminiationFee = require('../models/examiniationFee.model');
const moment = require('moment');

router.route('/').get((req, res) => {
  ExaminiationFee.find({ status: '1', debt: true })
    .then((examiniationFee) => res.json(examiniationFee))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const patientId = req.body.patientId;
  const examiniationId = req.body.examiniationId;
  const debt = true;
  const fee = req.body.fee;
  const createDateFull = new Date();
  const createDate = moment().format('YYYY-MM-DD');
  const createTime = moment().format('LT');
  const status = '1';

  const newExaminiationFee = new ExaminiationFee({
    patientId,
    examiniationId,
    debt,
    fee,
    createDateFull,
    createDate,
    createTime,
    status,
  });

  newExaminiationFee
    .save()
    .then(() => res.json('ExaminiationFee added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  ExaminiationFee.findById(req.params.id)
    .then((examiniationFee) => {
      examiniationFee.status = '0';

      //patient.date = Date.parse(req.body.date);

      examiniationFee
        .save()
        .then(() => res.json('examiniationFee deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
