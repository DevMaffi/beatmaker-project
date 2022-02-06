// Modules

import EslintPlugin from 'eslint-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// Config

const config = {
  mode: 'development',
  devtool: 'source-map',
  output: { filename: '[name].js' },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new EslintPlugin(),
  ],
}

// Exports

export default config
