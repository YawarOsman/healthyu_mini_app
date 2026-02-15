/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE built-in environment variable, affects the final build output */
    NODE_ENV: 'development' | 'production',
    /** Current build platform */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    /**
     * Current build mini-program appid
     * @description If different environments have different mini-programs, you can easily switch appid by configuring the environment variable `TARO_APP_ID` in the env file, without having to manually modify the dist/project.config.json file
     * @see https://taro-docs.jd.com/docs/next/env-mode-config#special-environment-variables-taro_app_id
     */
    TARO_APP_ID: string
  }
}
