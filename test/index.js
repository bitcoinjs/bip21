/* global describe, it */

var assert = require('assert')
var bip21 = require('../')

var fixtures = require('./fixtures')

describe('bip21', function () {
  describe('decode', function () {
    fixtures.valid.forEach(function (f) {
      it('decodes ' + f.uri + (f.compliant === false ? ' (non-compliant)' : ''), function () {
        var decode = bip21.decode(f.uri)

        assert.equal(decode.address, f.address)

        if (!f.options) return
        assert.equal(decode.amount, f.options.amount)
        assert.equal(decode.label, f.options.label)
        assert.equal(decode.message, f.options.message)
      })
    })

    fixtures.invalid.forEach(function (f) {
      if (!f.uri) return

      it('throws ' + f.exception + ' for ' + f.uri, function () {
        assert.throws(function () {
          bip21.decode(f.uri)
        }, new RegExp(f.exception))
      })
    })
  })

  describe('encode', function () {
    fixtures.valid.forEach(function (f) {
      if (f.compliant === false) return

      it('encodes ' + f.uri, function () {
        var result = bip21.encode(f.address, f.options)

        assert.equal(result, f.uri)
      })
    })

    fixtures.invalid.forEach(function (f) {
      if (!f.address) return

      it('throws ' + f.exception + ' for ' + f.uri, function () {
        assert.throws(function () {
          bip21.encode(f.address, f.options)
        }, new RegExp(f.exception))
      })
    })
  })
})
