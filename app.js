/*app.js*/
const express = require("express");

const PORT = parseInt(process.env.PORT || "8080");
const app = express();

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("Hello World");
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
