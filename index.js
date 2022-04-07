const express = require('express');
const listRoutes = require('./routes/list')
const itemRoutes = require('./routes/item')
const categoryRoutes = require('./routes/category')
const shopRoutes = require('./routes/shop')
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({message: message});
})

app.use('/lists', listRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);
app.use('/shops', shopRoutes);

app.listen(8080, () => {
  console.log("pokrenut server")
})