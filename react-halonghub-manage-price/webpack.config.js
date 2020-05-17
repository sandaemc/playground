const webpack = require('webpack');

module.exports = {
    entry: "./app.jsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/../halonghub/web/assets/apps/manage-price"
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"]
    },

    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                loader: "babel-loader" ,
                query: {
                    presets: ['react', 'env']
                },
                exclude: /node_modules/
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "$": "jquery"
    },
};
