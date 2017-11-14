Clojure-like 'thread-any' macro. Example:

```javascript

const {thread, $$} = require('vacuumlabs-threading')
const x = thread('3',
  parseInt,
  [Math.max, 10, $$],
  [Math.min, 20, $$])
  assert.equal(x, 10)
```

Example with lodash:

```javascript
const {thread, $$} = require('vacuumlabs-threading')

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
```
