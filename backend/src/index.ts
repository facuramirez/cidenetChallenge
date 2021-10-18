import mongoose from 'mongoose';

var URI = 'mongodb://localhost:27017/cidenet';

mongoose.connect(URI)
.then( (db) => console.log('DB is connected !'))
.catch(err => console.log(err))