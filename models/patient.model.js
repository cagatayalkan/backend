const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: String },
    tc: { type: String },
    phone: { type: String },
    mail: { type: String },
    description: { type: String },
    gender: { type: String },
    status: { type: String },
    createDateFull: { type: Date },
    createDate: { type: String },
    createTime: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
