const path = require('path');
const webPackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',

  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  externals: [webPackNodeExternals()],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
  },
};
