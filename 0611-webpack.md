
### 前端目录

src source 未经翻译的代码
dist distribution 发布代码
vendors 第三方库
node_modules 第三方包

### webpack

#### 安装

##### 安装webpack3

``` bash
npm init
npm i webpack@3
```
##### 新建webpack.config.js文件

编辑文件
``` bash
const path = require('path');

module.exports = {
    entry: './src/js/app.js', //入口文件
    output: {
      filename: 'bundle.js',//输出文件
      path: path.resolve(__dirname, 'dist/js/') //输出路径
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: { importLoaders: 1 }
          }, {
            loader: 'postcss-loader'
          },{
            loader: "sass-loader" // compiles Sass to CSS
          }]
        }
      ]
    }
  };
```
##### 安装babel-loader与scss-loader

``` bash
npm install --save-dev babel-loader babel-core babel-preset-env webpack
npm install sass-loader node-sass webpack --save-dev
```
##### 安装其他必须插件

它提示确实什么就npm i 缺少的东西

##### 使用将babel-loader将es6转成es5

编辑app.js文件(入口文件)

``` bash
function fn(){
    let b = 'I am b';
    console.log(b);
}
export default fn;
```

##### 编辑模块文件

``` bash
//1.js
function fn(){
    let a = 'I am a';
    console.log(a);
}
export default fn;
//2.js
function fn(){
    let b = 'I am b';
    console.log(b);
}
export default fn;
```

##### 在html中引入./dist/js/bundle.js

##### 运行webpack

``` bash
npx webpack
```

##### 将scss转成css

根目录创建 postcss.config.js文件
``` bash
module.exports = {
    plugins: {
      'postcss-cssnext': {},
    }
  }
```
##### 入口文件引入scss文件

``` bash
import '../css/main.scss'
```

##### 运行webpack
``` bash
npx webpack
```

////////////
caniuse 插兼容性问题

autoprefixer 自动解决兼容性