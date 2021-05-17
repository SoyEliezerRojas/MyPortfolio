const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash].[ext][query]'

    },
    mode: 'development',
    resolve:{
        extensions:['.js','.css'],
    },
    module:{
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,'src','assets/'),
                    to: "assets/"
                }
            ]
        })
    ],
}