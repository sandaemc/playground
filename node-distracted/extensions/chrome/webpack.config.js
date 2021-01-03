var path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = { 
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts"
  },  
  output: {
    filename: "[name].js",
    path: __dirname + "/build"
  },  
  plugins: [new CleanWebpackPlugin(), new Dotenv()],
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },  
  node: {
    fs: "empty"
  },  
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]   
  },  

  externals: {}
};

