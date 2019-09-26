const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', require('./routes/wiki'))
app.use('/user', require('./routes/user'))

app.get('/', (req,res) =>{
  res.redirect('/wiki')
})

const init = async () => {
  await models.db.sync({force:true})
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
};

init()
