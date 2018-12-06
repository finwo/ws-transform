const direct = d => d;

module.exports = function (remote, {egress = direct, ingress = direct, convert = false} = {}) {
  const local = Object.create(remote);

  // Intercept egress
  local.send = async function( chunk ) {
    return remote.send(await egress(chunk));
  };

  // Intercept adding events
  local.on = function( type, listener ) {
    if ('message' !== type) { remote.on(type, listener); return local; }
    remote.on('message', async function(chunk) {
      switch(convert) {
        case 'buffer':
          return listener(Buffer.from(await ingress(chunk)));
        case 'string':
          return listener(Buffer.from(await ingress(chunk)).toString());
        default:
          return listener(await ingress(chunk));
      }
    });
    return local;
  };

  // Handle browser-style onopen
  // Using forEach to not overwrite type after iteration
  ['open','message','close','error'].forEach(function(type) {
    Object.defineProperty(local, 'on' + type, {
      enumerable  : true,
      configurable: true,
      get         : () => function () {},
      set         : listener => local.on(type, listener)
    })
  });

  // Return the transforming socket
  return local;
};
