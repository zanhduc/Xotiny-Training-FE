const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    shop: "./src/shop.js",
    product: "./src/product.js",
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].bundle.js",
    clean: true,
    assetModuleFilename: "images/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              sassOptions: {
                silenceDeprecations: ["legacy-js-api", "import"],
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
    }),

    new HtmlWebpackPlugin({
      filename: "shop-all.html",
      template: "./src/shop-all.html",
      chunks: ["shop"],
    }),

    new HtmlWebpackPlugin({
      filename: "product-detail.html",
      template: "./src/product-detail.html",
      chunks: ["product"],
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: "public/image", to: "image", noErrorOnMissing: true }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
    watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"],
  },

  mode: "development",
};
