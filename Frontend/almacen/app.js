const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser =require('body-parser')
var cors = require('cors')


app.set('port', process.env.PORT || 4001);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public")); 
app.use(express.static("node_modules")); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

//routas

app.use('/', require('./routes/index'));
//app.use('/almacen', require('./routes/almacen'));
//app.use('/medicamento', require('./routes/medicamento'));
//app.use('/proveedores', require('./routes/proveedores'));
//app.use('/pedidos', require('./routes/pedidos'));
//app.use('/distribucion', require('./routes/distribucion'));
//app.use('/stock', require('./routes/stock'));

app.listen(app.get('port'), () => {
    console.log(`servidor en puerto ${app.get('port')}`)
 });

 