const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path');
const cors = require('cors');

//inicializaciones
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//variables gobales

//routes
app.use('/OnGym-api', require('./routes/index.js'));


//public
app.use(express.static(path.join(__dirname, 'public')));

//starting
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})