const express = require('express')
const router = express.Router()
const { User, Page } = require('../models')
const userList = require('../views/userList')
const userPages = require('../views/userPages')

router.get('/', async (req, res, next) => { //default is /users/
  const allUsers = await User.findAll({ //find all authors in the database
    raw: true
  })
  res.send(userList(allUsers)); //send to html write
})

router.get('/:id', async (req, res, next) => {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.id } }); //get the author whose id matches the param
    const pages = await Page.findAll({ where: { authorId: targetUser.id}}); //find all pages who were made by the author
    res.send(userPages(targetUser, pages)); //send to html writer and send back to web page
  } catch (err) {
    console.error(err);
  }
})

module.exports = router