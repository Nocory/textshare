const textShare = require("./textShare")

const Koa = require('koa');
const app = new Koa();
app.listen(2001);



const express = require('express')
const app = express()
const server = require('http').Server(app)
const compression = require('compression')
const path = require("path")



app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))
server.listen(2001);

app.get('/getLastN/:n', function(req, res) {
	res.send(textShare.getLastN(req.params.n))
})

app.post('/save', function(req, res) {
	console.log("request:", req.body)
	res.sendStatus(200)
})