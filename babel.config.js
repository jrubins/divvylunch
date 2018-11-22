module.exports = {
  plugins: ['lodash', 'react-hot-loader/babel'],
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        modules: false,
        targets: 'last 2 versions',
        useBuiltIns: 'usage',
      },
    ],
  ],
}
