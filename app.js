const express = require('express');
const datos = require('./modules/datos.js');
const config = require('./config');

const app = express();

app.set('port', config.puerto);

app.listen(app.get('port'), () => console.log('Server on port', app.get('port'))); // Comienza a escuchar los eventos en este puerto

app.get('/info', (req, res) => { // cuando alguien entre al puerto configurado con le route /info le va a devolver un json con los datos del equipo 'localhost:3000/info'
    res.send(datos.getInfo());
});
  
