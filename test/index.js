import * as bip21 from '../index.js'
import fixtures from './fixtures.json' assert { type: 'json' }
const { valid, invalid } = fixtures
import tape from 'tape'

valid.forEach(function (f) {
  if (f.compliant === false) return

  tape('encodes ' + f.uri, function (t) {
    let result
    if (f.urnScheme) {
      result = bip21.encode(f.address, f.options, f.urnScheme)
    } else {
      result = bip21.encode(f.address, f.options)
    }

    t.plan(1)
    // replace the bitcoin: portion (case-insensitive) with lowercase
    t.equal(result, f.uri.replace(/^bitcoin:/i, 'bitcoin:'))
  })

  tape('decodes ' + f.uri + (f.compliant === false ? ' (non-compliant)' : ''), function (t) {
    let decode
    if (f.urnScheme) {
      decode = bip21.decode(f.uri, f.urnScheme)
    } else {
      decode = bip21.decode(f.uri)
    }

    t.plan(f.options ? 4 : 1)
    t.equal(decode.address, f.address)

    if (!f.options) return
    t.equal(decode.options.amount, f.options.amount !== undefined ? Number(f.options.amount) : undefined)
    t.equal(decode.options.label, f.options.label)
    t.equal(decode.options.message, f.options.message)
  })
})

invalid.forEach(function (f) {
  if (f.address) {
    tape('throws ' + f.exception + ' for ' + f.uri, function (t) {
      t.plan(1)
      t.throws(function () {
        bip21.encode(f.address, f.options)
      }, new RegExp(f.exception))
    })
  }

  if (f.uri) {
    tape('throws ' + f.exception + ' for ' + f.uri, function (t) {
      t.plan(1)
      t.throws(function () {
        bip21.decode(f.uri)
      }, new RegExp(f.exception))
    })
  }
})
