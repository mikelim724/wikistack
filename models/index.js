const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false //dont print all the complicated stuff
});
db.authenticate().then(() => {  //make sure connected to db
  console.log('connected to the database');
});

function slugify(str) { //turn inputed title into a slug title
  return str.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', { //make a table called Page named page
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
  
});

Page.beforeValidate(async function(page) { //before each page table is made, input a slug value first
  page.slug = slugify(page.title);
  return Sequelize.Promise.resolve(page);
})

const User = db.define('user', { //make a users table called user. Has a name and email column.
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Page.belongsTo(User, { as: 'author' }); //Plants a foreign id into page that relates it to user called authorId

module.exports = {
  db,
  Page,
  User,
};
