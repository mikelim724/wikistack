const express = require('express')
const router = express.Router()
const { User, Page } = require('../models')
const userList = require('../views/userList')
const userPages = require('../views/userPages')

router.get('/', async (req, res, next) => {
  const allUsers = await User.findAll({
    raw: true
  })
  res.send(userList(allUsers));
})

router.get('/:id', async (req, res, next) => {
  try {
    const targetUser = await User.findOne({ where: { id: req.params.id } });
    const pages = await Page.findAll({ where: { id: targetUser.id}});
    res.send(userPages(targetUser, pages));
  } catch (err) {
    console.error(err);
  }
})

module.exports = router