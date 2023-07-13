require('dotenv').config(); //umożliwia używanie dotenv w aplikacji 

const express = require('express'); //tworzy express server pod stałą express
const expressLayout = require('express-ejs-layouts'); //ejs przesyła dane do widoku aplikacji

//tworzy baze danych
const connectDB = require('./server/config/db');

const app = express(); //tworzy aplikacje express
const PORT = 5000 || process.env.PORT; //aplikacja express potrzebuje portu(ustawiam na 5000) lub domyślny dla zewnętrznego servera

connectDB();

app.use(express.static('public'));


app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main')); 


app.listen(PORT, ()=>{
    console.log(`aplikacja nasłuchuje portu ${PORT}`);
});
