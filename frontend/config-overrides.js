const path = require('path');
const { addWebpackAlias, useBabelRc, override, fixBabelImports, addLessLoader } = require('customize-cra');

// Add just the necessary icons to decrease bundle size
function overrides(config, env) {
  config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(__dirname, 'src/icons.js')

  return config
}

module.exports = override(
  overrides,
  useBabelRc(),
  addWebpackAlias({
    '@assets': path.join(__dirname, 'src/assets'),
    '@constants': path.join(__dirname, 'src/constants'),
    '@components': path.join(__dirname, 'src/components'),
    '@icons': path.join(__dirname, 'src/icons.js'),
    '@redux': path.join(__dirname, 'src/redux'),
    '@utils': path.join(__dirname, 'src/utils'),
    '@services': path.join(__dirname, 'src/services')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    paths: ['./src/styles', './node_modules'],
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1890FF',
      '@link-color': '#0988FE',
      '@success-color': '#52c41a',
      '@warning-color': '#faad14',
      '@error-color': '#f5222d',
      '@font-size-base': '14px',
      '@heading-color': 'rgba(0, 0, 0, 1)',
      '@text-color': 'rgba(0, 0, 0, .7)',
      '@text-color-secondary ': '#B5B5B5',
      '@disabled-color': '#C4C4C4',
      '@border-radius-base': '5px',
      '@border-color-base': '#D2D2D2',
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',
    },
  }),
);
