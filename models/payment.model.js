const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    patientId: { type: String },
    amountMoney: { type: Number },
    paymentType: { type: String },
    name: { type: String },
    surname: { type: String },
    createDateFull: { type: Date },
    createDate: { type: String },
    createTime: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
