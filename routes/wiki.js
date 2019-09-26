const express = require('express')
const addpage = require('../views/addPage')
const router = express.Router()


router.get('/', (req,res)=>{
  res.send('this is all the wiki pages')
})

router.post('/', (req,res)=>{
  res.send('this is the wiki page')
})

router.get('/add', (req,res)=>{
  res.send(addpage())
})

module.exports = router