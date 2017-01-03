const babel  = require('babel-core');
const plugin = require('../plugin');
const fs = require('fs');

describe('API plugin', () => {
  it('Extractors', () => {
    //const source = `export type Params = {user: Body<string>}`;
    const source = fs.readFileSync(`${__dirname}/../src/routes/users.js`);
    const actual = babel.transform(
      source, {
        babelrc: false,
        plugins: [
          'syntax-flow',
          plugin
        ]
      }
    ).code;
    console.log(actual);
  });
});