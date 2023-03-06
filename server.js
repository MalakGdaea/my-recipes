const express = require("express");
const path = require("path");
const routes = require("./server/recipes-routes");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", routes);

const port = 3000;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
