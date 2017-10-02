const express = require ('express');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const hbs = require('express-handlebars');
const $ = require('jQuery');
const port = process.env.PORT || 3000;

var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const argv = yargs
	.command('start', 'start the server')
	.help()
	.argv;


const command = argv._[0];

if (command === 'start'){
	console.log('server starting');
	startServer();
}else {
	console.log('no option choosen. Use \'server --help\' to find options.');
}

app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  partialsDir: __dirname + '/../views/partials/'
}));

app.use(express.static(__dirname + '/../public'));

app.get('/',(req,res) => {
	res.render('home.hbs')
});
app.get('/main',(req,res) => {
	res.render('main.hbs')
});

app.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});

function startServer(){
	app.listen(port,() => {
		console.log(`server is up on port ${port}.`);
		console.log(__dirname);
	});
}