const test      = require('tape');
const transform = require('ws-transform');

test('Ensure ws-transform is a function', t => {
  t.plan(1);

  t.equal(typeof transform, 'function', 'Transform is a function');
});
