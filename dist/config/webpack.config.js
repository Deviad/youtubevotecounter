"use strict";
const root = require('app-root-path').path;
module.exports = {
    entry: './src/app.ts',
    target: 'node',
    // externals: [
    //   /^[a-z\-0-9]+$/ // Ignore node_modules folder
    // ],
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                loader: "figlet-loader",
                // ONLY FOR `webpack@4` and `JSON` config
                type: "javascript/auto",
                options: {
                    fontOptions: {
                        // Full list of supported options and their description can be found in [figlet](https://github.com/patorjk/figlet.js).
                        font: "ANSI Shadow",
                        horizontalLayout: "default",
                        kerning: "default",
                        verticalLayout: "default"
                    },
                    textBefore: "",
                    text: "Contest Vote Counter",
                    textAfter: "v1.0.0"
                },
                test: /empty-alias-file\.js$/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // modules: [
        //   `${root}/src`,
        //   'node_modules'
        // ],
        alias: {
            figlet$: `${root}/empty-alias-file.js`
        }
    },
    output: {
        filename: 'cli.js',
        path: `${root}/dist`,
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
};
//# sourceMappingURL=webpack.config.js.map