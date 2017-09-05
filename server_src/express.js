const helmet = require('helmet')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const compression = require('compression')
const path = require("path")
const bodyParser = require('body-parser')

const textShare = require("./textShare")

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))
server.listen(4001);

app.get('/', function(req, res) {
	res.sendStatus(200)
})

app.get('/getRecent', function(req, res) {
	res.send(textShare.getRecent())
})

app.get('/getSpecific/:id', function(req, res) {
	textShare.getSpecificShare(req.params.id, res)
	//res.send(share)
})

app.post('/save', function(req, res) {
	textShare.saveNewShare(req.body, res)
})