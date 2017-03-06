console.log("test");

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect('..', (err, database) => {
  if (err) return console.log(err)
  db = database;
  appInit();
})

var appInit = () => {

  app.listen(3000, () => {
    console.log('listening on 3000')

  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get("/quotes", (req, res) => {
    db.collection('quotes').find().toArray(function(err, results) {
      res.send(results);
    })
  });

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    })
  });


}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});
