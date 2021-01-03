const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examiniationFeeSchema = new Schema(
  {
    patientId: { type: String },
    examiniationId: { type: String },
    debt: { type: Boolean },
    fee: { type: Number },
    createDateFull: { type: Date },
    createDate: { type: String },
    createTime: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const ExaminiationFee = mongoose.model(
  'ExaminiationFee',
  examiniationFeeSchema
);

module.exports = ExaminiationFee;
