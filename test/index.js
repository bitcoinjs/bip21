var bip21 = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')

fixtures.valid.forEach(function (f) {
  if (f.compliant === false) return

  tape('encodes ' + f.uri, function (t) {
    var result = bip21.encode(f.address, f.options)

    t.plan(1)
    t.equal(result, f.uri)
  })

  tape('decodes ' + f.uri + (f.compliant === false ? ' (non-compliant)' : ''), function (t) {
    var decode = bip21.decode(f.uri)

    t.plan(f.options ? 4 : 1)
    t.equal(decode.address, f.address)

    if (!f.options) return
    t.equal(decode.options.amount, f.options.amount !== undefined ? Number(f.options.amount) : undefined)
    t.equal(decode.options.label, f.options.label)
    t.equal(decode.options.message, f.options.message)
  })
})

fixtures.invalid.forEach(function (f) {
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
