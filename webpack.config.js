//Konfiguracja Webpack
module.exports = {
    entry: "./js/workshopsPI.jsx",
    output: {filename: "./js/out.js"},
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: "url-loader",
                }
            }
        ]
    }
}

