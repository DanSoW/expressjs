import express from 'express';
import path from 'path';
import {requestTime, logger} from './middlewares/middlewares.js';
import serverRoutes from './routes/servers.js';

const __dirname = path.resolve();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.set('view engine', 'ejs');
//app.set('views', path.resolve(__dirname, 'ejs'));

// По данному пути необходимо определять все виды
console.log(app.get('views'));

// Подключение middleware
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestTime);
app.use(logger);

app.use(serverRoutes);

// req - запрос с браузера
// res - ответ с сервера
/*app.get('/', (req, res) => {
    //res.send('<h1>Hello, world</h1>');'
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.get('/features', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'features.html'));
});*/

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page', active: 'main'});
});

app.get('/features', (req, res) => {
    res.render('features', {title: 'Features Page', active: 'features'});
});

/*app.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, 'static', 'index.html'));
});*/

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
});