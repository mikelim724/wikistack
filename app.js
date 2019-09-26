const express = require('express');
<<<<<<< HEAD
const morgan = require('morgan')
const layout = require('./views/layout')
const {db} = require('./models/index')
const app = express()

app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
  let test = layout('')
  res.send(test)
})

app.listen(3000)
=======
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));



app.get('/', (req, res) => {
  res.send(layout(''));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
})
>>>>>>> c89beb4fb5adb2ad7a612bce2f2c3b87cd5b28e1
