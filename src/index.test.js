// import b64url  from 'base64url';
import expect    from 'expect';
import transform from './index';

expect.extend(require('jest-isa'));

test('Ensure ws-transform is a function', () => {
  expect(transform).isA(Function);
});
