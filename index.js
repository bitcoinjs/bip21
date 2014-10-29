// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

var assert = require('assert')
var qs = require('qs')

function decode(uri) {
  assert(/bitcoin:+/.test(uri), 'Invalid BIP21 encoded URI: ' + uri)
  var qsplit = uri.slice(8).split('?')
  var address = qsplit[0]
  var query = qsplit[1]

  var parsed = qs.parse(query)

  return {
    address: address,
    amount: parsed.amount,
    label: parsed.label,
    message: parsed.message
  }
}

function encode(address, options) {
  options = options || {}
  var query = qs.stringify(options)

  return "bitcoin:" + address + (query ? '?' : '') + query
}

module.exports = {
  decode: decode,
  encode: encode
}
