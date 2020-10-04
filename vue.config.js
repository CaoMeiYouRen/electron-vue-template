const pkg = require('./package.json')
process.env.VUE_APP_VERSION = pkg.version

const StyleLintPlugin = require('stylelint-webpack-plugin')
module.exports = {
    lintOnSave: process.env.NODE_ENV === 'development',
    publicPath: './',
    devServer: {
        // open: false, // 自动打开浏览器
        // port: 6000, // 设置端口
        // hot: true, // 启用热更新
        // compress: true, // 是否启用gzip压缩
    },
    productionSourceMap: process.env.NODE_ENV === 'development', // 移除生产环境的 source map
    chainWebpack: (config) => {
        config.plugin('html').tap(([options]) => {
            options.title = pkg.name
            return [options]
        })
    },
    configureWebpack: config => {
        config.node = {
            Buffer: false,
            __filename: false,
            __dirname: false,
            fs: false,
            path: false,
        }
        config.plugins.push(
            // @ts-ignore
            new StyleLintPlugin({
                files: ['src/**/*.{vue,html,css,scss,sass,less}'],
                failOnError: false,
                cache: true,
                fix: true,
            }),
        )
    },
    pluginOptions: {
        electronBuilder: {
            preload: {
                preload: 'src/preload.ts',
            },
            builderOptions: {
                win: {
                    target: [
                        {
                            target: 'nsis',
                            arch: [
                                'x64',
                            ],
                        },
                        {
                            target: 'zip',
                            arch: [
                                'x64',
                            ],
                        },
                    ],
                    icon: './build/favicon.ico',
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    perMachine: true,
                    installerIcon: './public/favicon.ico',
                    uninstallerIcon: './public/favicon.ico',
                    installerHeaderIcon: './public/favicon.ico',
                },
            },
        },
    },
}