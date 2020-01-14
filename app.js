var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS
app.get('/', function(req, res) {
	res.render('perfil');
});

app.get('/datos', function(req, res) {
	res.render('datos');
});

app.get('/contacto', function(req, res) {
	res.render('contacto');
});

// SERVIDOR
app.listen(3000, function(req, res) {
	console.log('Conectado');
});
