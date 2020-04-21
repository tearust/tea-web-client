const nkn = require('nkn-sdk');

let client = new nkn.Client({
  seed: '2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edaa'
});

console.log(client.getPublicKey());

client.onConnect(() => {
  console.log('Client ready.');
});

client.onMessage(({ src, payload }) => {
  console.log('Receive message', payload, 'from', src);

  return JSON.stringify(payload);
});