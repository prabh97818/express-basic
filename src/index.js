const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./Routes/routes')
app.use('/', routes)

app.listen(3000, function () {
  console.log("Server is running on 3000");
});
