#### 什么是JSONP

##### JSONP:
请求方:浏览器
响应方:服务器

1. 请求方创建script,src指向响应方,同时传递一个查询参数 ?callback=functionName;
2. 响应方根据查询参数callback,构造函数functionName.call(undefined,'数据');
3. 浏览器接受到响应,就会执行functionName.call(undefined,'数据');
4. 那么请求方就知道了他要的数据

按照约定:
1. 查询参数应为callback;
2. functionName -> 随机名字

#### 实现一个JOSNP

预览:

前端代码:
``` bash
<script>
    button.addEventListener('click', (e)=>{
    let script = document.createElement('script') 
    let functionName = 'frank'+ parseInt(Math.random()*10000000 ,10)  // 每次请求之前搞出一个随机的函数
    window[functionName] = function(result){
        if(result === 'success'){
            amount.innerText = amount.innerText - 0 - 1
        }
    }
    script.src = 'http://localhost:8002/pay?callback=' + functionName
    document.body.appendChild(script)
    script.onload = function(e){ 
        e.currentTarget.remove()
        delete window[functionName] 
    }
    script.onload = function(e){ 
        e.currentTarget.remove()
        delete window[functionName] 
    }
    })
</script>
```
后端代码:
``` bash
if(path === '/'){
    var string = fs.readFileSync('./index.html','utf8')
    var amount = fs.readFileSync('./db', 'utf8');
    string = string.replace('&&&amount&&&', amount);
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string);
    response.end();
  }else if(path === '/pay'){
    var amount = fs.readFileSync('./db', 'utf8')
    amount -= 1
    fs.writeFileSync('./db', amount);
    var callbackName = query.callback;
    response.setHeader('Content-Type', 'application/javascript')
    response.statusCode = 200;
    response.write(`
        ${callbackName}.call(undefined, 'success')
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应路径,你需要自行修改 index.html')
    response.end()
  }
```

##### 流程如下:
1. 浏览器8001点击按钮button
2. 创建script,src指向8002/pay
3. 创建随机名函数functionName
4. 发送get请求,用查询参数?callback = functionName 传递函数名
5. 服务器8002响应
6. 当被指向pay执行以下命令
7. 读取数据库db中的amout
8. amount = amount-1
9. 将amount写入数据库
10. 根据callback构造一个函数
11. 调用函数functionName.call(undefined,'success')
12. 浏览器接收响应,根据输入参数success执行functionName函数
13. innerText - 1
14. 删除script标签
15. 假如刷新浏览器8001,重新读取修改后的数据库db,获得修改后的数据

用jQuery实现JOSNP:
前端代码如下:
``` bash
$.ajax({
 url: "http://localhost:8002/pay",
 dataType: "jsonp",
 success: function( response ) {
     if(response === 'success'){
     amount.innerText = amount.innerText - 1
     }
 }
 })
```

#### 为什么JSONP不支持POST?

因为JSONP是通过动态创建script实现的,动态创建script只有get请求.