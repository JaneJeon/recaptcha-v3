const { post } = require("request"),
  RECAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"

exports.v2 = req =>
  new Promise((resolve, reject) => {
    post(
      {
        url: RECAPTCHA_ENDPOINT,
        form: {
          secret: process.env.RECAPTCHA_V2_PRIVATE,
          response: req.body["g-recaptcha-response"],
          remoteip: req.ip
        }
      },
      (err, httpResponse, body) => {
        if (err) reject(err)
        else resolve(JSON.parse(body))
      }
    )
  })

exports.v3 = req =>
  new Promise((resolve, reject) => {
    post(
      {
        url: RECAPTCHA_ENDPOINT,
        form: {
          secret: process.env.RECAPTCHA_V3_PRIVATE,
          response: req.body[process.env.RECAPTCHA_V3_TOKEN_FIELD || "token"],
          remoteip: req.ip
        }
      },
      (err, httpResponse, body) => {
        if (err) reject(err)
        else resolve(JSON.parse(body))
      }
    )
  })
