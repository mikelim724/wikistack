const express = require("express");
const addpage = require("../views/addPage");
const { Page, User } = require("../models");
const wikipage = require("../views/wikipage");
const mainpage = require("../views/main");
const router = express.Router();

router.get("/", async (req, res) => {
  const pages = await Page.findAll({
    raw: true
  });
  res.send(mainpage(pages));
});

router.post("/", async (req, res, next) => {
  try {
    const name = req.body.name;
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const email = req.body.email;

    //findOrCreate could be used here instead
    let author = await User.findOne({ where: { name: name, email: email } });
    if (!author) {
      author = await User.create({
        name,
        email
      });
    }

    const page = await new Page({
      title: title,
      content: content,
      status: status,
      authorId: author.id
    });

    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    console.error(err);
  }
  // console.log(page);
});

router.get("/add", (req, res) => {
  res.send(addpage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const targetPage = await Page.findOne({ where: { slug: req.params.slug } });
    const author = await User.findByPk(await targetPage.getAuthor());
    res.send(wikipage(targetPage, author));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
