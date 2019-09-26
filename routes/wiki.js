const express = require('express')
const addpage = require('../views/addPage')
const { Page } = require("../models");
const wikipage = require('../views/wikipage')
const mainpage = require('../views/main')
const router = express.Router()




router.get('/', async (req,res)=>{
  const pages = await Page.findAll({
    raw: true
  });
  res.send(mainpage(pages));
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    console.error(err);
  }
  // console.log(page);
})

router.get('/add', (req,res)=>{
  res.send(addpage())
})

router.get('/:slug', async (req, res, next) => {
  try { 
  const targetPage = await Page.findOne({ where: {slug: req.params.slug} });
  res.send(wikipage(targetPage));
  } catch(err) {
    console.error(err);
  }
});

module.exports = router