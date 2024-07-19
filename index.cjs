// https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
// bitcoin:<address>[?amount=<amount>][?label=<label>][?message=<message>]

const querystring = require('query-string').default

function decode (uri, urnScheme) {
  urnScheme = urnScheme || 'bitcoin'
  
  const urnSchemeActual = uri.slice(0, urnScheme.length).toLowerCase()
  if (urnSchemeActual !== urnScheme ||
    uri.charAt(urnScheme.length) !== ':'
  ) throw new Error('Invalid BIP21 URI: ' + uri)

  const split = uri.indexOf('?')
  const address = uri.slice(urnScheme.length + 1, split === -1 ? undefined : split)
  const query = split === -1 ? '' : uri.slice(split + 1)
  const options = querystring.parse(query)

  if (options.amount) {
    options.amount = Number(options.amount)
    if (!isFinite(options.amount)) throw new Error('Invalid amount')
    if (options.amount < 0) throw new Error('Invalid amount')
  }

  return { address: address, options: options }
}

function encode (address, options, urnScheme) {
  options = options || {}
  const scheme = urnScheme || 'bitcoin'
  const query = querystring.stringify(options)

  if (options.amount) {
    if (!isFinite(options.amount)) throw new TypeError('Invalid amount')
    if (options.amount < 0) throw new TypeError('Invalid amount')
  }

  return scheme + ':' + address + (query ? '?' : '') + query
}

module.exports = {
  decode: decode,
  encode: encode
}