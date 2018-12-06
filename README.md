# ws-transform

> Transform websocket data

[![NPM](https://nodei.co/npm/ws-transform.png)](https://nodei.co/npm/ws-transform/)


## Install

```bash
npm install --save ws-transform
```

## Usage

This module wraps around an existing websocket, allowing you to modify outgoing (egress) and incoming (ingress) data.
Hooking into the send method & message event, you could even add your own encryption layer.

Internally, this module awaits your function, allowing you to use asynchronous functions or return promises. Keep in
mind that whatever you're wrapping may rely on same-order packages, so it may be important to quickly return the
transformed data.

### Node.JS

```js
const transform = require('ws-transform');

// Fetch a socket somehow
let remote = accept(listeningSocket);

// Wrap the original websocket into something to use locally
let local = transform(remote, {
  
  // Turn all outgoing text into uppercase
  // A.k.a. the remote side sees all-caps
  // DEFAULT: no transform
  egress: function( chunk ) {
    return Buffer.from(chunk).toString().toUpperCase();
  },
  
  // Turn all incoming text into lowercase
  // A.k.a. our side sees all lowercase
  // DEFAULT: no transform
  ingress: function( chunk ) {
    return Buffer.from(chunk).toString().toLowerCase();
  },
  
  // Our side expects a buffer, convert it
  // DEFAULT: no conversion
  convert: 'buffer'
  
});

```

### Browser

This module does not directly work in the browser. You'll need to use a tool like [browserify][browserify] to make use
it.

[browserify]: https://npmjs.com/package/browserify
[ws]: https://npmjs.com/package/ws
[websocket]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
