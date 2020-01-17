var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	nodemailer = require('nodemailer');

// APP CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// RUTAS
app.get('/', function(req, res) {
	res.render('perfil');
});

app.get('/contacto', function(req, res) {
	res.render('contacto');
});

// NODEMAILER CONFIG
app.post('/contacto', function(req, res) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'sligas3arg@gmail.com',
			pass: 'silvio_20'
		}
	});
	var mailOptions = {
		from: req.body.nombre,
		to: req.body.email,
		subject: req.body.asunto,
		text: req.body.mensaje
	};
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			res.send(500, err.message);
		} else {
			res.redirect('/');
		}
	});
});

// SERVIDOR
app.listen(3000, function(req, res) {
	console.log('Conectado');
});
