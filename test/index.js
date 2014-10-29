var assert = require('assert')

var BIP21 = require('../')

var fixtures = require('./fixtures')

describe('BIP21', function() {
  describe('decode', function() {
    fixtures.valid.forEach(function(f) {
      it('decodes ' + f.uri + ' correctly', function() {
        var decode = BIP21.decode(f.uri)

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
        var result = BIP21.encode(f.address, {
          amount: f.amount,
          label: f.label,
          message: f.message
        })

        assert.equal(result, f.uri)
      })
    })
  })
})
