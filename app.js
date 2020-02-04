require('dotenv').config();

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	nodemailer = require('nodemailer'),
	flash = require('connect-flash');

// APP CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// FLASH
app.use(
	require('express-session')({
		secret: 'Nana es la perra mas bella del mundo',
		resave: false,
		saveUninitialized: false
	})
);
app.use(flash());

app.use(function(req, res, next) {
	res.locals.message = req.flash('success');
	next();
});

// RUTAS
app.get('/', function(req, res) {
	res.render('perfil');
});

app.get('/contacto', function(req, res) {
	res.render('contacto');
});

// NODEMAILER CONFIG
app.post('/contacto', function(req, res) {
	var GMAIL_USER = process.env.EMAIL_USERNAME,
		CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID,
		CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET,
		REFRESH_TOKEN = process.env.GMAIL_OAUTH_REFRESH_TOKEN,
		ACCESS_TOKEN = process.env.GMAIL_OAUTH_ACCESS_TOKEN;
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: GMAIL_USER,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
			accessToken: ACCESS_TOKEN,
			expires: Number.parseInt(process.env.GMAIL_OAUTH_TOKEN_EXPIRE, 10)
		}
	});
	var mailOptions = {
		from: 'from',
		to: GMAIL_USER,
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
			res.status(500).send(err.message);
		} else {
			console.log('Email sent');
			req.flash('success', 'Su mensaje ha sido enviado con éxito. Muchas gracias.');
			res.redirect('/contacto');
		}
	});
});

// SERVIDOR;
// app.listen(3000, function(req, res) {
// console.log('Conectado');
// });
app.listen(process.env.PORT, process.env.IP);
