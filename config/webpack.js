import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

export default {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    assetModuleFilename: ({ filename }) => {
      const pathDirectories = filename.split('/');

      pathDirectories.shift();
      pathDirectories.shift();
      pathDirectories.pop();

      return `${pathDirectories.join('/')}/[name].[contenthash:8][ext]`;
    },
    filename: 'scripts/[name].[contenthash:8].js',
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ContextReplacementPlugin(
      /[/\\]node_modules[/\\]timezonecomplete[/\\]/,
      path.resolve('tz-database-context'),
      {
        tzdata: 'tzdata',
      },
    ),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
    fallback: { util: false },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: `${path.dirname(fileURLToPath(import.meta.url))}/babel.js`,
          },
        },
      },
      {
        test: /\.(css|png|svg|jpg|gif|ttf|webm|mp4)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },
};
