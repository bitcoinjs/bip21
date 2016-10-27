// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

var bs58check = require('bs58check')
var qs = require('qs')

function decode (uri) {
  var qregex = /bitcoin:\/?\/?([^?]+)(\?([^]+))?/.exec(uri)
  if (!qregex) return

  // throws if invalid
  var address = qregex[1]
  if (!bs58check.decodeRaw(address)) return

  var query = qregex[3]
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
