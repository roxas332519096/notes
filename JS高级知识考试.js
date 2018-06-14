//1
var object = {};
object.__proto__ === Object.prototype;

var fn = function(){}
fn.__proto__  === Function.prototype;
fn.__proto__.__proto__ === Object.prototype;

var array = [];
array.__proto__ === Array.prototype;
array.__proto__.__proto__ === Object.prototype;

Function.__proto__ === Function.prototype;
Array.__proto__ === Function.prototype;
Object.__proto__  === Function.prototype;

true.__proto__ === Boolean.prototype;

Function.prototype.__proto__ === Object.prototype;

//2

new fn(),这个this是一个对象
该对象自身属性为空,
原型具有属性:
constructor:function fn(),
__proto__ : Object{}


//3
JSON是一种轻量级的数据交换格式.是JavaScript数据类型的一个子集.
两者区别:

1. JSON没有undefined和function;
2. JSON字符串首尾必须是双引号;
3. JSON没有变量
4. JSON没有原型链

具体对比:

javascript     JSON

undefined      没有
null           null
['a','b']      ["a","b"]
function(){}   没有
{name:'roxas'} {"name":"roxas"}
'roxas'        "roxas"
var a = {}      没有变量
{__proto__}     没有原型链

//4
MVC是一种框架模式,分为三个部分,分别是Model(模型数据),View(视图),Contorller(控制器)

Model代表模型,操作数据
model对象的方法有init(初始化数据),fetch(读取数据),save(保存数据)
```
var model = {
    init:function(){
        //初始化数据代码
    },
    fetch:function(){
        //读取数据代码
    },
    save:function(){
        //保存数据代码
    }
}
```

View代表视图
View对象是通过选择器选出需要操作的node对象
```
var view = document.querySelector('选择器')
```
Controller代表控制器

Controller对象属性有view对象,model对象以及自身需要操作的对象
方法有init(初始化),bindEvents(绑定事件),其他操作对象的方法

```
var controller = {
    view:null,
    model:null,
    xxx: null,
    //其他属性
    init:function(model,view){
        this.view = view;
        this.model = model;
        this.xxx = xxx;
        ////传入其他属性的代码
        this.model.init();//初始化数据
        this.bindEvent();
    },
    bindEvent:function(){
        this.f1;
        this.f2;
    },
    f1:fucntion(){},
    f2:function(){}
}
```
通过调用controller的init()方法,执行整个代码
```
controller.init(model,view);
```

//5
ES5中模拟一个类,通过以下代码创建一个新的类Class
```
function Class(options){
    this.value1 = options.value1;
    this.value2 = options.value2;
    ....
    //构造函数的代码
}
//添加类的原型下的属性与方法
Class.prototype.value = value;
Class.prototype.method = function(){} 
...
```
执行时,对构造类的函数传入一个对象
``` 
var class1 = new Class(value1:'ABC',value:'EFG');
var class2 = new Class(value1:'abc',value:'efg');
```

//6 
1. 封装ajax时用过,假如状态码200~300或者是304则调用resolve函数,假如大于400调用request函数
```
window.jQuery.ajax = function({url,method,body,headers}){
    return new Promise(function(resolve,reject){
        let request = new XMLHttprequest();
        request.open(method,url);
        for(let key in headers){
            let value = headers[key];
            request.setRequestHeader(key,value)
        }
        request.onreadystatechange = ()=>{
            if(request.readystates === 4){
                if(request.status >= 200 && request.status < 300){
                    resolve.call(undefined,request.responseText);
                }else if(request.status >= 400){
                    reject.call(undefined,request)
                }
            }
        }
        request.send(body);
    })
}
```

2. 创建留言板时用过,下列代码query对象是一个Promise对象,可以调用then()方法
```
var model = {
    init:function(){
        var APP_ID = '6lvWkua1rf93YuTrlvBN8GVR-gzGzoHsz';
        var APP_KEY = 'uPlBTdzbkh8JANXfgEN8j0Lv';
        AV.init({
        appId: APP_ID,
        appKey: APP_KEY})
    },
    fetch:function(){
        var query = new AV.Query('Messages');
        return query.find();
    },
    save:function(username,content){
        var Messages = AV.Object.extend('Messages');
        var messages = new Messages();
        return messages.save({
            'content': content,
            'username':username
        })
    }
}
```

创建一个返回Promise对象的函数
```
function x(url){
    return new Promise((resolve,reject)=>{
        let request = new XMLHttprequest();
        request.open('GET',url);
        request.onload = function(){
            resolve(request.responseText);
        }
        request.onerror = function(){
            reject(request);
        }
        request.send();
    })
}
```