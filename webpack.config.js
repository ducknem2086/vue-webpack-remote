const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === "production";
const styleLoader = isProd ? MiniCssExtractPlugin.loader : "style-loader";

module.exports = ()=> ({ 
  entry: path.resolve(__dirname, "src/main.ts"),
  target: ["web", "es2020"], // or "es2020"
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.tsx?$/,
        use: [{
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] } // TS inside SFCs
        }],
        exclude: /node_modules/
      },
      // CSS Modules (opt-in via *.module.css / *.module.scss)
      {
        test: /\.module\.css$/i,
        use: [
          styleLoader,
          { loader: "css-loader", options: { modules: true, importLoaders: 1 } },
          // enable if using PostCSS:
          // "postcss-loader"
        ]
      },
      {
        test: /\.module\.(scss|sass)$/i,
        use: [
          styleLoader,
          { loader: "css-loader", options: { modules: true, importLoaders: 2 } },
          // "postcss-loader", // optional
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProd,
              // optional: silence legacy warnings from sass
              // sassOptions: { silenceDeprecations: ["legacy-js-api"] }
            }
          }
        ]
      },

      // Global CSS / SCSS (no modules)
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [styleLoader, "css-loader" /*, "postcss-loader" */]
      },
      {
        test: /\.(scss|sass)$/i,
        exclude: /\.module\.(scss|sass)$/i,
        use: [
          styleLoader,
          { loader: "css-loader", options: { importLoaders: 2 } },
          // "postcss-loader", // optional
          {
            loader: "sass-loader",
            options: { sourceMap: !isProd }
          }
        ]
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1",
      library: { type: "var", name: "remote1" },
      filename: "remoteEntry.js",
      exposes:{
        "./App": path.resolve(__dirname, "src/App.vue"),
      },
      shared: {
        vue: { singleton: true  ,eager: true },
        "vue-router": { singleton: true, eager: true },
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
})
