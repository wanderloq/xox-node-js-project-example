const express = require('express');
const app = express();
const path = require('path');
const gameRoutes = require('./routes/gameRoutes.js');
const aboutRoutes = require('./routes/aboutRoutes.js');

app.use(express.static(path.join(__dirname, 'public')));
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
app.use('/', gameRoutes);
app.use('/about', aboutRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
