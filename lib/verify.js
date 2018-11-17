const axios = require("axios"),
	RECAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"

exports.v2 = async req =>
	(await axios.post(RECAPTCHA_ENDPOINT, {
		secret: process.env.RECAPTCHA_V2_PRIVATE,
		response: req.body["g-recaptcha-response"],
		remoteip: req.ip
	})).data

exports.v3 = async req =>
	(await axios.post(RECAPTCHA_ENDPOINT, {
		secret: process.env.RECAPTCHA_V3_PRIVATE,
		response: req.body.token,
		remoteip: req.ip
	})).data
