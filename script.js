const http = require("http");
const mongodb = require("mongodb").MongoClient;

const hostname = "127.0.0.1";
const port = 3000;

let db;
let connectionString =
  "mongodb+srv://krejcir_sandra:54Ndr42810@cph-webdev.6nfcpoh.mongodb.net/travel_project";
mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, client) {
    db = client.db();
    db.collection("destinations").findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result);
      const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.write("Hello");
        res.end();
      });

      server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
    });
  }
);
