const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function config({isProd, isDev}) {

  return {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: './index.tsx',
    output: {
      filename: 'bundle.[hash].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3000,
      hot: isDev
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[hash].css'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'assets/favicon.ico', to: 'favicon.ico' }
        ],
      })
    ],
    module: {
      rules: [{
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          'ts-loader'
        ]
      }]
    }
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return config({
      isProd: true,
      isDev: false
    })
  }
  return config({
    isProd: false,
    isDev: true
  })
}