const express = require("express");
const addpage = require("../views/addPage");
const { Page, User } = require("../models");
const wikipage = require("../views/wikipage");
const mainpage = require("../views/main");
const router = express.Router();

router.get("/", async (req, res) => {
  const pages = await Page.findAll({ //find all pages created in the database
    raw: true
  });
  res.send(mainpage(pages)); 
});

router.post("/", async (req, res, next) => {
  try {
    const name = req.body.name;  //takes all info from the add page inputed by client
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const email = req.body.email;

    //findOrCreate could be used here instead
    let author = await User.findOne({ where: { name: name, email: email } });
    if (!author) {   //find an author who has the exact same name and email. if exist continue to make a new post for them. If a new author or an existing author with a new email, make a new instance of them in the table.
      author = await User.create({
        name,
        email
      });
    }

    const page = await new Page({
      title: title,  //add info to new page table instance
      content: content,
      status: status,
      authorId: author.id //foreign key that relates it to a single author
    });

    await page.save(); //add instance into the Page table or model.
    res.redirect(`/wiki/${page.slug}`); //redirect to newly created page
  } catch (err) {
    console.error(err);
  }
  // console.log(page);
});

router.get("/add", (req, res) => {
  res.send(addpage()); //webpage that prints out a form to take in data for the database
});

router.get("/:slug", async (req, res, next) => {
  try {
    const targetPage = await Page.findOne({ where: { slug: req.params.slug } }); //get page that matches webpage param
    let author = await targetPage.getAuthor({
      raw: true //get the data values from the author that made the page. Need raw to get datavalues otherwise stuck as a promise object with no acccess
    })
    res.send(wikipage(targetPage, author)); //show you page with the info for this postt
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
