const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './index.tsx',
  },
  output: {
    filename: isProd ? './js/[name].[contenthash].js' : './js/[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    clean: true,
  },
  context: path.resolve(__dirname, 'src'),
  devtool: isProd ? false : 'inline-source-map',

  devServer: {
    watchFiles: ['./src/assets/**/*.html'],
    static: {
      directory: path.join(__dirname, './build'),
    },
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: 'http://localhost:8080',
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
      logging: 'error',
    },
  },

  stats: {
    assets: isProd,
    entrypoints: isProd,
    modules: isProd,
  },

  optimization: {
    minimize: isProd,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          toplevel: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
        minimizerOptions: { restructure: false, forceMediaMerge: true, comments: false },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      usedExports: true,
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules|libs)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.d.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [...cssLoaders()],
      },
      {
        test: /\.s[ac]ss$/,
        use: [...cssLoaders(),
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset',
        generator: {
          filename: isDev ? 'assets/img/[name][ext][query]' : 'assets/img/[contenthash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4096,
          },
        },
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: isDev ? 'assets/media/[name][ext][query]' : 'assets/media/[contenthash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: isDev ? 'assets/fonts/[name][ext][query]' : 'assets/fonts/[contenthash][ext][query]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset',
        generator: {
          filename: isDev ? 'assets/img/[name][ext][query]' : 'assets/img/[contenthash][ext][query]',
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4096,
          },
        },
      },
    ],
  },

  plugins: [
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new MiniCssExtractPlugin({
      filename: isProd ? './css/style.[contenthash].css' : './css/style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
      minify: isDev ? false : {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      logger: {
        infrastructure: 'silent',
        issues: 'webpack-infrastructure',
        devServer: true,
      },
      typescript: {
        configFile: '../tsconfig.json',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: "assets",
          to: "assets",
          globOptions: {
            ignore: ["*.html", "*.ico"],
          },
        },
      ],
    }),
  ],
};

if (!isDev) {
  module.exports.plugins.splice(0, 1);
}

function cssLoaders() {
  return [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: /\.module\.\w+$/,
          exportLocalsConvention: 'camelCase',
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    ...isProd ? ['postcss-loader'] : [],
  ];
}
