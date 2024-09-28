const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

mongoose.connect(DB)
    .then(() => {
        console.log('database connected successfully');
    })
    .catch(err => {
        console.error('error connecting to database', err.message);
    });



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})