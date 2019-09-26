const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
db.authenticate().then(() => {
  console.log('connected to the database');
});

function slugify(str) {
  return str.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
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

Page.beforeValidate(async function(page) {
  page.slug = slugify(page.title);
  return Sequelize.Promise.resolve(page);
})

const User = db.define('user', {
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

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  Page,
  User,
};
