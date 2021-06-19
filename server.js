const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//use routes

app.use('/', require('./routes/posts'));
app.use('/', require('./routes/user'));

const db = config.get('mongoURI');

mongoose
    .connect(db, {
        useCreateIndex:true, 
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        useFindAndModify: false})
    .then(res => console.log('MongoDb connected!'))
    .catch(err => console.log(err.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

