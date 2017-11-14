const {assert} = require('chai')
const {thread, $$} = require('../')
const lo = require('lodash')

function inc(x) {
  return x + 1
}

describe('threading', () => {

  it('threads', () => {
    const x = thread('3',
      parseInt,
      [Math.max, 10, $$],
      [Math.min, 20, $$])
    assert.equal(x, 10)
  })

  it('resolves attr', () => {
    const x = thread({a: {b: 1}},
      '.a',
      '.b',
      inc)
    assert.equal(x, 2)
  })

  it('demo with lodash', () => {

    const data = [
      {name: 'alice', score: 10},
      {name: 'bob', score: 15},
      {name: 'alice', score: 20},
      {name: 'bob', score: 5},
    ]

    const maxScore = (scores) => thread(
      scores,
      [lo.map, $$, (arg) => arg.score],
      lo.max)

    thread(
      data,
      [lo.groupBy, $$, 'name'],
      [lo.mapValues, $$, maxScore],
      [assert.deepEqual, $$, {alice: 20, bob: 15}])
  })

})
