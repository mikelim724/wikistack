const express = require('express')
const addpage = require('../views/addPage')
const { Page } = require("../models");
const router = express.Router()




router.get('/', (req,res)=>{
  res.send('this is all the wiki pages')
})

router.post('/', async (req,res, next)=>{
  const name = req.body.name;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const page = await new Page({
    title: title,
    content: content,
    status: status
  })
  try{
    await page.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
  console.log(page);
})

router.get('/add', (req,res)=>{
  res.send(addpage())
})

module.exports = router