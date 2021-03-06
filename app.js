require('dotenv').config();

let express = require('express'),
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

app.use((req, res, next) => {
	res.locals.message = req.flash('success');
	next();
});

// RUTAS
app.get('/', (req, res) => {
	res.render('perfil');
});

app.get('/contacto', (req, res) => {
	res.render('contacto');
});

// NODEMAILER CONFIG
app.post('/contacto', (req, res) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: process.env.EMAIL_USERNAME,
			clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
			clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
			refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
			accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN,
			expires: Number.parseInt(process.env.GMAIL_OAUTH_TOKEN_EXPIRE, 10)
		}
	});
	let mailOptions = {
		from: 'from',
		to: process.env.EMAIL_USERNAME,
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
	transporter.sendMail(mailOptions, (err, info) => {
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
app.listen(process.env.PORT, () => {
	console.log('Conectado');
});
