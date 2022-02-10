// Modules

// path
import * as nodePath from 'path'

// plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// base utils
import { env, routes } from '../utils/utils.js'

// Functions

const {
  baseDirs: { distDir, srcDir },
  pages,
} = routes

const getEntries = () =>
  pages.reduce((entries, page) => {
    entries[page] = ['@babel/polyfill', `./assets/js/${page}.js`]
    return entries
  }, {})

const applyHtmlPlugin = () =>
  pages.map(
    page =>
      new HtmlWebpackPlugin({
        chunks: [page],
        filename: `${page}.html`,
        minify: env.isProd,
        template: `./gulp/pages/${page}.html`,
      })
  )

const cssLoaders = extra => {
  let loaders = [MiniCssExtractPlugin.loader, 'css-loader']

  if (extra) loaders = [...loaders, extra]

  return loaders
}

// Config

const path = {
  distDir: nodePath.resolve(distDir),
  srcDir: nodePath.resolve(srcDir),
}

const config = {
  context: path.srcDir,
  target: 'web',
  entry: getEntries(),
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  resolve: {
    alias: {
      '@': `${path.srcDir}`,
      '@common': `${path.srcDir}/assets/js/modules/common`,
      '@files': `${path.srcDir}/assets/files`,
      '@i18n': `${path.srcDir}/assets/js/i18n`,
      '@model': `${path.srcDir}/assets/js/model`,
      '@modules': `${path.srcDir}/assets/js/modules`,
      '@services': `${path.srcDir}/assets/js/services`,
      '@sass': `${path.srcDir}/assets/sass`,
      '@utils': `${path.srcDir}/assets/js/utils`,
    },
    extensions: ['.js', '.json', '.sass', '.scss'],
  },
  output: { path: path.distDir },
  plugins: [new CleanWebpackPlugin(), ...applyHtmlPlugin()],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(gif|ico|jpe?g|png|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

// Exports

export default config
