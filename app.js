const express = require('express');
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