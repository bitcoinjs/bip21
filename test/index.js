var bip21 = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')

fixtures.valid.forEach(function (f) {
  if (f.compliant !== false) {
    tape('encodes ' + f.uri, function (t) {
      var result = bip21.encode(f.address, f.options)

      t.plan(1)
      t.equal(result, f.uri)
    })
  }

  tape('decodes ' + f.uri + (f.compliant === false ? ' (non-compliant)' : ''), function (t) {
    var decode = bip21.decode(f.uri)

    t.plan(2)
    t.equal(decode.address, f.address)
    t.same(decode.options, f.options)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode returns nothing for ' + f.uri + ' (' + f.exception + ')', function (t) {
    if (bip21.decode(f.uri)) t.fail()

    t.end()
  })
})
