const levelDB = require('level')

function generateID(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateID) }

let dbPermanent = levelDB('./dbPermanent', {
	valueEncoding: "json",
	cacheSize: 32 * 1024 * 1024
})

let dbTemp = levelDB('./dbTemp', {
	valueEncoding: "json",
	cacheSize: 16 * 1024 * 1024
})

dbTemp.createKeyStream()
	.on('data', function(data) {
		console.log("key:", data)
	})

const cleanTemp = () => {
	console.log("starting cleanup of temp shares")
	let ops = []

	dbTemp.createKeyStream({
			lte: String(Date.now()),
		})
		.on('data', function(data) {
			console.log("deleting", data)
			ops.push({ type: "del", key: data })
		})
		.on('end', function() {
			dbTemp.batch(ops, (err) => {
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
	let actualDB = id.startsWith("0") ? dbPermanent : dbTemp

	actualDB.get(id, (err, val) => {
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
	const storeUntil = now + newShare.saveLength
	const id = storeUntil + "_" + generateID(Math.random() * 16384)

	const validShare = {
		id,
		created: now,
		isPublic: newShare.isPublic || false,
		title: newShare.title || "No Title",
		content: newShare.content || "No Content",
		saveLength: newShare.saveLength,
		storeUntil
	}

	if (validShare.isPublic) {
		recentShares.shift()
		recentShares.push({
			id,
			created: now,
			title: validShare.title,
		})
	}

	let actualDB = newShare.saveLength ? dbTemp : dbPermanent
	actualDB.put(id, validShare, (err, value) => {
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