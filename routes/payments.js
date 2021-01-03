const router = require('express').Router();
const moment = require('moment');

let ExaminiationFee = require('../models/examiniationFee.model');
let Payment = require('../models/payment.model');

router.route('/').get((req, res) => {
  Payment.find({ status: '1' })
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//hastanın ödemeleri
router.route('/getPatientPayment/:patientId').get((req, res) => {
  Payment.find({ status: '1', patientId: req.params.patientId })
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const patientId = req.body.patientId;
  const amountMoney = req.body.amountMoney;
  const paymentType = req.body.paymentType;
  const name = req.body.name;
  const surname = req.body.surname;
  const createDateFull = new Date();
  const createDate = moment().format('YYYY-MM-DD');
  const createTime = moment().format('LT');
  const status = '1';

  const newPayment = new Payment({
    patientId,
    amountMoney,
    paymentType,
    name,
    surname,
    createDateFull,
    createDate,
    createTime,
    status,
  });

  newPayment
    .save()
    .then(() => {

      Payment.find({ status: '1', patientId: req.body.patientId })
      .then((payment) => {
        let sumAmountPayment = 0;
        let sumAmountFee = 0;
  
        payment.forEach((doc) => {
          sumAmountPayment += doc.amountMoney;
        });
        console.log('**************' + sumAmountPayment);
  
        ExaminiationFee.find({ status: '1', patientId: req.body.patientId })
          .then((res) => {
            res.forEach((doc) => {
              sumAmountFee += doc.fee;
            });
        console.log('**************----' + sumAmountPayment);
            if (sumAmountPayment >= sumAmountFee) {
              res.forEach((doc) => {
                doc.debt = false;
  
                doc
                  .save()
                  .then(() => {
                    res.json('fee updated!');
                  })
                  .catch((err) => res.status(400).json('Error: ' + err));
              });
            }
          })
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));

      res.json('Payment added!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));

  
});

router.route('/:id').get((req, res) => {
  Payment.findById(req.params.id)
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Payment.findById(req.params.id)
    .then((payment) => {
      payment.status = '0';

      //patient.date = Date.parse(req.body.date);

      payment
        .save()
        .then(() => res.json('payment deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

//   router.route('/update/:id').post((req, res) => {
//     Payment.findById(req.params.id)
//       .then(payment => {
//         payment.amountMoney = req.body.amountMoney;
//         payment.paymentType = req.body.paymentType;
//         payment.name = req.body.name;
//         payment.surname = req.body.surname;
//         payment.description = req.body.description;
//         payment.gender = req.body.gender;
//         payment.address = req.body.address;

//         patient.save()
//           .then(() => res.json('Patient updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;
