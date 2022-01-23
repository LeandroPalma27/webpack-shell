const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
const path = require('path');

let otherHtmlPageNames = ['template2']; // Añade tus templates aqui.
let multipleHtmlPlugins = otherHtmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        filename: `resources/${name}.html`,
        template: `./src/resources/${name}.html`,
        chunks: [`${name}`],
        scriptLoading: 'blocking',
    })
});

let entryJsPropertieFiles = otherHtmlPageNames.map(name => {
    return JSON.parse(`{ "${name}": "./src/js/${name}.js", "${name}": "./src/js/${name}.js" }`);
});

let entries = {};

for (file of entryJsPropertieFiles) {
    /* console.log(file); */
    entries = Object.assign(entries, file); 
    // Vamos asignando en cada iteracion el objeto almacenado en file.
}

module.exports = {

    mode: 'production',

    entry: {
        index: './src/js/index.js',
        ...entries
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: [/styles.css$/],
                use: ["style-loader", "css-loader"],
            },
            {
                test: [/index.css$/, /template2.css$/], // Añadir archivos css aqui.
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            logging: 'info',
        },
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            excludeChunks: [...otherHtmlPageNames],
            scriptLoading: 'blocking',
        }),
        new HtmlWebpackPlugin({ 
            filename: 'styles.css',
            template: './src/styles.css',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets", to: "assets/" },
            ],
        }),
    ].concat(multipleHtmlPlugins),

};