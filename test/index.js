var assert = require('assert')
var bip21 = require('../')

var fixtures = require('./fixtures')

describe('bip21', function() {
  describe('decode', function() {
    fixtures.valid.forEach(function(f) {
      it('decodes ' + f.uri + ' correctly', function() {
        var decode = bip21.decode(f.uri)

        assert.equal(decode.address, f.address)
        assert.equal(decode.amount, f.amount)
        assert.equal(decode.label, f.label)
        assert.equal(decode.message, f.message)
      })
    })
  })

  describe('encode', function() {
    fixtures.valid.forEach(function(f) {
      it('encodes ' + f.uri + ' correctly', function() {
        var result = bip21.encode(f.address, {
          amount: f.amount,
          label: f.label,
          message: f.message
        })

        assert.equal(result, f.uri)
      })
    })
  })
})
