const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const hostname = "127.0.0.1";
let connectionString = `mongodb+srv://bob:cphwebdevcdhs@cdhs.ini9gfr.mongodb.net/CDHS`;

const Destination = require("./../backend/schemas");

mongoose.connect(connectionString).catch((err) => console.log(err));

app.get("/", (req, res) => {
  Destination.find({}, (err, data) => {
    console.log(data);
    res.status(200).json(data);
  });
});

app.get("/:destinationID", (req, res) => {
  Destination.find(
    { _id: new ObjectId(req.params.destinationID) },
    (err, data) => {
      console.log(data);
      res.status(200).json(data);
    }
  );
});

app.post("/", (req, res) => {
  const newDestination = new Destination({
    title: req.body.title,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    description: req.body.description,
    location: req.body.location,
    country: req.body.country,
    picture: req.body.picture,
  });
  newDestination.save((err) => {
    if (err) console.error(err);
    res.status(201).json(newDestination);
  });
});

app.put("/:destinationID", (req, res) => {
  console.log(req.params.destinationID);
  const newDestination = new Destination({
    title: req.body.title,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    description: req.body.description,
    location: req.body.location,
    country: req.body.country,
    picture: req.body.picture,
  });
  (newDestination._id = new ObjectId(req.params.destinationID)),
    newDestination
      .updateOne(newDestination, {
        _id: new ObjectId(req.params.destinationID),
      })
      .then((results) => {
        console.log(results);
      })
      .catch((error) => console.error(error));
});

app.delete("/:destinationID", (req, res) => {
  Destination.deleteOne({ _id: new ObjectId(req.params.destinationID) })
    .then((results) => {
      console.log(results);
    })
    .catch((error) => console.error(error));
});
/* mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
  }
);

app.get("/", (req, res) => {
  db.collection("destinations")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((error) => console.error(error));
});

app.get("/:destinationID", (req, res) => {
  db.collection("destinations")
    .findOne({ _id: new ObjectId(req.params.destinationID) })
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((error) => console.error(error));
});

app.post("/", (req, res) => {
  console.log(req.body);
  db.collection("destinations")
    .insertOne(req.body)
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((error) => console.error(error));
});

app.put("/:destinationID", (req, res) => {
  console.log(req.params.destinationID);
  db.collection("destinations")
    .updateOne(
      { _id: new ObjectId(req.params.destinationID) },
      { $set: req.body }
    )
    .then((results) => {
      console.log(results);
    })
    .catch((error) => console.error(error));
}); */

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
