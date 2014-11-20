// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

var assert = require('assert')
var bs58check = require('bs58check')
var qs = require('qs')

function decode(uri) {
  assert(/bitcoin:+/.test(uri), 'Invalid BIP21 encoded URI: ' + uri)
  var qsplit = uri.slice(8).split('?')
  var address = qsplit[0]

  // throws if invalid
  bs58check.decode(address)

  var query = qsplit[1]
  var parsed = qs.parse(query)
  var amount

  if (parsed.amount) {
    amount = Math.abs(parsed.amount)

    assert.equal(amount + '', parsed.amount, 'Invalid amount')
  }

  return {
    address: address,
    amount: parsed.amount,
    label: parsed.label,
    message: parsed.message
  }
}

function encode(address, options) {
  options = options || {}

  if (options.amount) {
    assert.equal(Math.abs(options.amount), options.amount, 'Invalid amount')
  }

  var query = qs.stringify(options)

  // throws if invalid
  bs58check.decode(address)

  return "bitcoin:" + address + (query ? '?' : '') + query
}

module.exports = {
  decode: decode,
  encode: encode
}
