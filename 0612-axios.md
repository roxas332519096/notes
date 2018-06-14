axios与jquery的ajax

jquery
``` bash
$.ajax({
    url:'/xxx',
    method:'post'
})
$.post('/xxx',data)
$.get('/xxxxx')
```

axios

``` bash
axios.post()
axios.get()
axios.put()
axios.patch()
axios.delete()
```
1. 比jquery.ajax 功能更多
2. 除了ajax功能之外,就没有其他功能(更专注)

#### api

interceptor 拦截

``` bash
axios.interceptor.respone.use(function(response){
    let {config: {method,url,data}} = response;
    if(url==='/books/1' && method === 'get'){
        response.data = {
            name : 'JavaScript 高级程序设计',
            number:2,
            id:1
        }
    }
    return response;
})
```


``` bash
let config = response.config;
let {method,url,data} = config;
//等价于
let {config: {method,url,data}} = response;
```
