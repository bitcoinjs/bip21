// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

var bs58check = require('bs58check')
var qs = require('qs')

function decode (uri) {
  if (uri.indexOf('bitcoin:') !== 0) return

  var split = uri.split('?')
  if (split.length > 2) return

  // truncate bitcoin: (or non-compliant bitcoin://)
  var address = split[0]
  if (address.indexOf('//') === 8) address = address.slice(10)
  else address = address.slice(8)

  if (!bs58check.decodeRaw(address)) return

  var query = split[1]
  var options = qs.parse(query)
  if (options.amount !== undefined) {
    var amount = parseFloat(options.amount)
    if (typeof amount !== 'number') return
    if (!isFinite(amount)) return
    if (amount < 0) return

    // BTC -> satoshis
    options.amount = amount * 1e8
  }

  return {
    address: address,
    options: options
  }
}

function encode (address, options) {
  var _options = {}
  for (var k in options) _options[k] = options[k]

  if (_options.amount !== undefined) {
    // satoshis -> BTC
    _options.amount /= 1e8
  }

  var query = qs.stringify(_options)
  return 'bitcoin:' + address + (query ? '?' : '') + query
}

module.exports = {
  decode: decode,
  encode: encode
}
