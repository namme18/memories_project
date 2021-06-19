const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const path = require('path');

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

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

