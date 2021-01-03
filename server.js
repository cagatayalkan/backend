const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 80;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology:true ,useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const patientsRouter = require('./routes/patients');
const examiniationsRouter = require('./routes/examiniations');
const paymentsRouter = require('./routes/payments');
const examiniationFeeRouter = require('./routes/examiniationFee');

app.use('/patients', patientsRouter);
app.use('/examiniations', examiniationsRouter);
app.use('/payments', paymentsRouter);
app.use('/examiniationFee', examiniationFeeRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
