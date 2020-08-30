const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        aliases: {
          ['@_c']: path.resolve(__dirname, 'src/component/'),
          ['@_v']: path.resolve(__dirname, 'src/view/'),
          ['@_u']: path.resolve(__dirname, 'src/utils/'),
          ['@']: path.resolve(__dirname, 'src')
        },
        tsConfigPath: './paths.json'
        // see in examples section
      }
    }
  ]
};
