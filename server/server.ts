import * as express from 'express';
import { routes } from './routes';
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT, GET, DELETE');

  if('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }

});

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send([{'message':'Hello world'}]);
});

app.listen(4201, '127.0.0.1', () => {
  console.log('Listening on port 4201...');
});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME || 'trippydatabase.cnioslqsy5gc.us-west-2.rds.amazonaws.com',
  user     : process.env.RDS_USERNAME || 'escott07',
  password : process.env.RDS_PASSWORD || 'password12yu',
  port     : process.env.RDS_PORT || '3306'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();

