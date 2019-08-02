'use strict'
const expect = require('chai').expect
const index = require('../dist/index.js')

describe('index', () => {
    it('结果：为数组', () => {
        const r = index.default()
        expect(r).to.be.a('array')
    })
})
