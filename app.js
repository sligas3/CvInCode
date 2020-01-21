require('dotenv').config();

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
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	var mailOptions = {
		from: 'Silvio',
		to: 'sligas3@gmail.com',
		subject: req.body.asunto,
		html: `
			<div>
				<p>${req.body.nombre}</p>
				<p>${req.body.email}</p>
				<p>${req.body.asunto}</p>
				<p>${req.body.mensaje}</p>

			</div>
			`
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {
			console.log(err);
			res.send(500, err.message);
		} else {
			console.log('Email sent');
			res.redirect('/');
		}
	});
});

// SERVIDOR
app.listen(3000, function(req, res) {
	console.log('Conectado');
});
