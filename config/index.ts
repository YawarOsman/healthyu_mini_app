import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import type { Plugin } from 'vite'
import tailwindcss from 'tailwindcss'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-helper-function
export default defineConfig<'vite'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: 'healthyu_mini_app',
    date: '2026-2-14',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2 / 1,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: `dist`,
    plugins: [],
    defineConstants: {
    },
    copy: {
      patterns: [
        { from: 'src/assets/fonts', to: `dist/fonts` },
        { from: 'src/assets/images', to: `dist/images` }
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: {
      type: 'vite',
      vitePlugins: [
        {
          name: 'force-es5',
          config() {
            return {
              build: {
                target: 'esnext', // Bypass esbuild transpilation, let terser handle it
                minify: 'terser',
                terserOptions: {
                  ecma: 5,
                  compress: {
                    ecma: 5,
                    arrows: false,
                    drop_console: false,
                  },
                  output: {
                    ecma: 5,
                    comments: false,
                  },
                },
              }
            }
          }
        },
        {
          name: 'manual-babel-transpile',
          // Use transform to handle source files before bundling
          // Use renderChunk to handle the final output
          // Use renderChunk to handle the final output
          // Use renderChunk to handle the final output
          renderChunk(code, chunk) {
            // Only transpile .js files
            if (!chunk.fileName.endsWith('.js')) return null;
            
            try {
              const babel = require('@babel/core');
              const presetPath = require.resolve('@babel/preset-env');
              
              const result = babel.transformSync(code, {
                presets: [
                  [presetPath, {
                    targets: {
                      ios: '8' // Force ES5 for Alipay
                    },
                    modules: 'commonjs' 
                  }]
                ],
                filename: chunk.fileName,
                sourceMaps: false,
                configFile: false,
                babelrc: false
              });
              return { code: result.code, map: null };
            } catch (e) {
              console.error('Babel transpilation failed for ' + chunk.fileName, e);
              return null;
            }
          }
        },
        {
          name: 'fix-browserslist-crash',
          enforce: 'pre',
          generateBundle() {
            this.emitFile({
              type: 'asset',
              fileName: '.browserslistrc',
              source: 'defaults\nmaintained node versions'
            })
          }
        },
        {
          name: 'fix-css-import',
          enforce: 'post',
          generateBundle(options, bundle) {
            // Fix app.acss import path
            const appAcss = bundle['app.acss'];
            if (appAcss && appAcss.type === 'asset' && typeof appAcss.source === 'string') {
              appAcss.source = appAcss.source.replace('@import "app-origin.acss";', '@import "./app-origin.acss";');
            }
            
            // Fix font paths in app-origin.acss
            const appOriginAcss = bundle['app-origin.acss'];
            if (appOriginAcss && appOriginAcss.type === 'asset' && typeof appOriginAcss.source === 'string') {
              // Replace @/assets/fonts/ or ../assets/fonts/ with ./fonts/
              appOriginAcss.source = appOriginAcss.source.replace(/@\/assets\/fonts\//g, './fonts/');
              appOriginAcss.source = appOriginAcss.source.replace(/\.\.\/assets\/fonts\//g, './fonts/');
            }
          }
        },
        {
          // Load postcss via vite plugin
          name: 'postcss-config-loader-plugin',
          config(config) {
            // Load tailwindcss
            config.css = config.css || {}
            config.css.postcss = config.css.postcss || {}
            
            if (typeof config.css.postcss === 'object') {
              config.css.postcss.plugins = config.css.postcss.plugins || []
              config.css.postcss.plugins.unshift(tailwindcss())
            }
          },
        },
        uvtw({
          // rem to rpx
          rem2rpx: true,
          // Disable for h5, harmony, rn as per docs
          disabled: process.env.TARO_ENV === 'h5' || process.env.TARO_ENV === 'harmony' || process.env.TARO_ENV === 'rn',
          // Inject css vars for Taro
          injectAdditionalCssVarScope: true,
        })
      ] as Plugin[]
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // Default is false, set to true if you want to use css modules
          config: {
            namingPattern: 'module', // Transformation pattern, values: global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        pxtransform: {
          enable: false,
          config: {}
        },
        cssModules: {
          enable: false, // Default is false, set to true if you want to use css modules
          config: {
            namingPattern: 'module', // Transformation pattern, values: global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // Default is false, set to true if you want to use css modules
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // Local development build configuration (no obfuscation/compression)
    return merge({}, baseConfig, devConfig)
  }
  // Production build configuration (compression and obfuscation enabled by default)
  return merge({}, baseConfig, prodConfig)
})
