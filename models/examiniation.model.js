const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examiniationSchema = new Schema(
  {
    _id : {type:String},
    patientId: { type: String },
    description: { type: String },
    ecg: { type: String },
    complaint: { type: String },
    examiniation: { type: String },
    profileDesc : { type: String },
    fee: { type: Number },
    eko: { type: String },
    medicament: { type: String },
    bloodPressure: { type: String },
    bloodSugar: { type: String },
    so2: { type: String },
    lab: { type: String },
    createDateFull: { type: Date },
    createDate: { type: String },
    createTime: { type: String },
    status : { type: String }
  },
  {
    timestamps: true
  }
);

const Examiniation = mongoose.model('Examiniation', examiniationSchema);

module.exports = Examiniation;
