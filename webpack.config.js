const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv');
const process = require('process');

function addEnv(config) {
    const envPath = path.join(__dirname, '.env');
    const envContents = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const envValues = DotEnv.parse(envContents) ?? {};

    /* override process.env with values from process.env.NODE_ENV & contents from .env */
    const processENV = {
        ...envValues,
    };

    return {
        ...config,
        plugins: [
            ...(config.plugins ?? []),
            /* polyfill for process.env.NODE_ENV */
            new webpack.DefinePlugin({
                process: {
                    env: processENV
                },
            }),
        ],
    };
}

function addPolyfills(config) {
    return {
        ...config,
        resolve: {
            ...config.resolve,
            fallback: {
                ...config.resolve.fallback,
                "fs": "empty",
                /* Browser side - empty impl */
                "buffer": require.resolve("buffer/"),
                "url": require.resolve("url/"),
                "assert": require.resolve("assert/"),
                "crypto": require.resolve("crypto-browserify"),
                "util": require.resolve("util/"),
                "stream": require.resolve("stream-browserify"),
                "querystring": require.resolve("querystring-es3"),
                "os": require.resolve("os-browserify/browser")
            }

        }
    }
}

const DEFAULTS = {
    entry: './src/index.ts',
    output: {
        filename: 'worker.js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {}
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
        }, ],
    },
}

module.exports = addPolyfills(addEnv(DEFAULTS));
