const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.options('Access-Control-Allow-*', cors());
app.options('Acess-Control-Allow-Origin:*', cors());


const knex = require('./db.js');
app.get('/sweets', async (req, res) => {
  const results = await knex('sweets')
    .orderBy('id');
  console.log(results);
  res.json(results);
});

app.delete("/sweets/delete/:id", async (req, res) => {
  const remove = await knex('sweets')
    .where('id', req.params.id)
    .del();
  res.json(remove)
  console.log(remove);
  total()
});

app.post("/sweets/add", async (req, res) => {
  console.log(req.body);
  const add = await knex('sweets')
    .insert({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
    });
  res.json(add);
  console.log(add);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
