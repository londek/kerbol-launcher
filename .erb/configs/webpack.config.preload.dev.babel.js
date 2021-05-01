/**
 * Webpack config for development electron preload script
 */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import DeleteSourceMaps from '../scripts/DeleteSourceMaps';

DeleteSourceMaps();

export default merge(baseConfig, {
    mode: 'development',
    target: 'electron-preload',
    entry: './src/preload.ts',

    output: {
        path: path.join(__dirname, '../../dist'),
        filename: 'preload.dev.js',
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true',
        }),

        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
            START_MINIMIZED: false,
        }),
    ]
});
