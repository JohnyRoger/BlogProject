require('dotenv').config(); //umożliwia używanie .env w aplikacji (jest tam hasło do połączenia z bazą danych wsm tylko)

const express = require('express'); //tworzy express server pod stałą express
const expressLayout = require('express-ejs-layouts'); //ejs przesyła dane do widoku aplikacji
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//tworzy baze danych(zmienną)
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express(); //tworzy aplikacje express
const PORT = 5000 || process.env.PORT; //aplikacja express potrzebuje portu(ustawiam na 5000) lub domyślny dla zewnętrznego servera

connectDB();

app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(express.static('public'));


app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
//admin route
app.use('/', require('./server/routes/admin'));


app.listen(PORT, ()=>{
    console.log(`aplikacja nasłuchuje portu ${PORT}`);
});
