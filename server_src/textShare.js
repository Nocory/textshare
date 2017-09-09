const levelDB = require('level')

function generateID(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateID) }

const db = levelDB('./db', {
	valueEncoding: "json",
	cacheSize: 64 * 1024 * 1024
})

const cleanTemp = () => {
	//console.log("starting cleanup of temp shares")
	let ops = []

	db.createKeyStream({
			lte: String(Date.now()),
		})
		.on('data', function(data) {
			console.log("deleting", data)
			ops.push({ type: "del", key: data })
		})
		.on('end', function() {
			db.batch(ops, (err) => {
				if (err) {
					console.log("error", err)
				}
			})
		})
}

cleanTemp()
setInterval(cleanTemp, 60000)

let recentShares = []
for (let i = 0; i < 10; i++) {
	recentShares[i] = {
		id: "placeholder" + "_" + generateID(Math.random() * 16384),
		created: Date.now(),
		title: "PLACEHOLDER",
	}
}

const getSpecificShare = (id, res) => {
	if (!id || typeof(id) != "string") return null
	db.get(id, (err, val) => {
		if (err) {
			res.send({
				id: "Error: ID does not exist in database",
				content: ""
			})
		} else {
			res.send(val)
		}
	})
}

const saveNewShare = (newShare, res) => {
	if (!newShare.content) return res.send("")
	if (typeof(newShare.saveLength) != "number" || newShare.saveLength < 0 || newShare.saveLength > 6.048e+8) return res.send("")

	const now = Date.now()
	const id = ((newShare.saveLength || "p") + now) + "_" + generateID(Math.random() * 16384)

	const validShare = {
		id,
		created: now,
		isPublic: newShare.isPublic || false,
		title: newShare.title || "No Title",
		content: newShare.content || "No Content",
		saveLength: newShare.saveLength
	}

	if (validShare.isPublic) {
		recentShares.shift()
		recentShares.push({
			id,
			created: now,
			title: validShare.title,
		})
	}

	db.put(id, validShare, (err, value) => {
		if (err) {
			console.log(err)
			res.send("")
		} else {
			res.send(id)
		}
	})
}

module.exports = {
	saveNewShare,
	getSpecificShare,
	getRecent: () => recentShares
}