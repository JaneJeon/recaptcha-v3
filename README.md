# Recaptcha3

[![npm version](https://badge.fury.io/js/recaptcha3.svg)](https://badge.fury.io/js/recaptcha3) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=JaneJeon/recaptcha-v3)](https://dependabot.com)

Protect your endpoints by securing it with a reCAPTCHA! This library supports verifying v2 *and* v3 of reCAPTCHA, and
 integrates with `express`.

## Assumptions
- you're passing the `req` object of a `express` handler.
- for v3, the token obtained from front-end is sent to the backend as `token`; i.e. your AJAX body should have `{token, ...}`
- the environment variables `RECAPTCHA_V2_PRIVATE` if using v2 and `RECAPTCHA_V3_PRIVATE` for the v3 variables must be set
- if you're sending over your v3 tokens from client-side on a field different from `token`, you must specify it in the `RECAPTCHA_V3_TOKEN_FIELD` environment variable.

## Usage
v2:
```javascript
const { v2 } = require('recaptcha3')
const data = await v2(req)
```

v3:
```javascript
const { v3 } = require('recaptcha3')
const data = await v3(req)
```

Response objects:
```javascript
{
	"success": true|false,     // whether this request was a valid reCAPTCHA token for your site
	"score": number,           // v3 only; the score for this request (0.0 - 1.0)
	"action": string,          // v3 only; the action name for this request (important to verify)
	"challenge_ts": timestamp, // timestamp of the challenge load
	"hostname": string,        // hostname of the site where the reCAPTCHA was solved
	"error-codes": [...]       // optional
}
```

## Including reCAPTCHA in your site
Documentation: https://developers.google.com/recaptcha

v2 (invisible)
```html
<head>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>
<form>
    <button class="g-recaptcha" data-sitekey='{{ RECAPTCHA_V2_PUBLIC }}' data-callback='onSubmit'>Submit</button>
    <br>
</form>
</body>
```

v3
```html
<head>
    <script src='https://www.google.com/recaptcha/api.js?render={{ RECAPTCHA_V3_PUBLIC }}' async defer>
<script>
    grecaptcha.ready(async () => {
        const token = await grecaptcha.execute({{ RECAPTCHA_V3_PUBLIC }}, { action: {{ ACTION }} })
    })
</script>
</head>
```
