var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;
//Middleware
app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist'))); //determina o conteúdo estático

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function() {
  console.log('Node está brincando na porta ' + app.get('port'));
});
