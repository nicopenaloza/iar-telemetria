const express = require('express');
const datos = require('./modules/datos.js');

const app = express();

app.set('port', process.env.port || 3000);

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));

app.get('/info', (req, res) => {
    res.send(datos.getInfo());
});
  