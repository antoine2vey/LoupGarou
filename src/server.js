const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`LoupGarou listening on port ${PORT}!`);
});