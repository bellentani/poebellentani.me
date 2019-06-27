const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
//Middleware
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public'))); //determina o conteúdo estático

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
  console.log('Node está brincando na porta ' + app.get('port') + ' do server!');
});
