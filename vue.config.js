const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const styleLoader = isProd ? MiniCssExtractPlugin.loader : "style-loader";

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/main.ts',
    },
  },
  publicPath: 'auto',
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    // module:{
    //    rules: [
   
    //   {
    //     test: /\.tsx?$/,
    //     use: [{
    //       loader: "ts-loader",
    //       options: { appendTsSuffixTo: [/\.vue$/] } // TS inside SFCs
    //     }],
    //     exclude: /node_modules/
    //   },
    //   // CSS Modules (opt-in via *.module.css / *.module.scss)
    //   {
    //     test: /\.module\.css$/i,
    //     use: [
    //       styleLoader,
    //       { loader: "css-loader", options: { modules: true, importLoaders: 1 } },
    //       // enable if using PostCSS:
    //       // "postcss-loader"
    //     ]
    //   },
    //   {
    //     test: /\.module\.(scss|sass)$/i,
    //     use: [
    //       styleLoader,
    //       { loader: "css-loader", options: { modules: true, importLoaders: 2 } },
    //       // "postcss-loader", // optional
    //       {
    //         loader: "sass-loader",
    //         options: {
    //           sourceMap: !isProd,
    //           // optional: silence legacy warnings from sass
    //           // sassOptions: { silenceDeprecations: ["legacy-js-api"] }
    //         }
    //       }
    //     ]
    //   },

    //   // Global CSS / SCSS (no modules)
    //   {
    //     test: /\.css$/i,
    //     exclude: /\.module\.css$/i,
    //     use: [styleLoader, "css-loader" /*, "postcss-loader" */]
    //   },
    //   {
    //     test: /\.(scss|sass)$/i,
    //     exclude: /\.module\.(scss|sass)$/i,
    //     use: [
    //       styleLoader,
    //       { loader: "css-loader", options: { importLoaders: 2 } },
    //       // "postcss-loader", // optional
    //       {
    //         loader: "sass-loader",
    //         options: { sourceMap: !isProd }
    //       }
    //     ]
    //   }
    // ],
    // },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'app_exposes',
        filename: 'remoteEntry.js',
        exposes: {
          './Page1Component': './src/pages/Page1Component.vue',
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});