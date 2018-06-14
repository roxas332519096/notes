#### Session 与 Cookie 的关系与区别

关系:

Session 基于 Cookie 实现的.

区别:

Cookie 保存在客户端，每次都随请求发送给 Server.
Session 保存在 Server 的内存里，其 Session ID 是通过 Cookie 发送给客户端的.

#### Cookie

1. 服务器通过 Set-Cookie 头给客户端一串字符串;
2. 客户端每次访问相同域名的网页时,必须带上这段字符串;
3. 客户端要在一段时间内保存这个Cookie.
4. Cookie最大存储量4K.
5. Cookie默认在用户关闭页面后就失效,后台代码可以任意设置 Cookeie 的过期时间.

#### 什么是Seesion?

1. 服务器将SessionID(随机数)通过Cookie发给客户端;
2. 客户端访问服务器时,服务器读取SessionID;
3. 服务器有一块内存(哈希表)保存了所有Session
4. 通过SessionID我们可以得到用户的隐私信息,如id,email;
5. 这块内存(哈希表)就是服务器上的所有session.

#### localStorage

##### 什么是localStorage?

持久化存储

HTML5里的API
window.localStorage

##### 方法:
1. localStorage.setItem();
2. localStorage.getItem();
3. localStorage.removeItem();

##### 特点:

1. localStorage 跟 HTTP 无关;
2. HTTP不会带上 localStorage 的值;
3. 只有相同域名的页面才能互相读取 localStorage(没有同源那么严格);
4. 每个域名localStorage 最大存储量为5 MB 左右 (每个浏览器不一样);
5. 常用场景: 记录有没有提示过用户 (没有用的信息,不能记录密码);
6. localStorage 永久有效,除非用户清除缓存.

###### LocalStorage与Cookie的区别.

Cookie在客户端每次发送请求跟服务器响应都会带上,通过服务器设置过期时间,最大4KB.
LocalStorage跟HTTP无关,请求时不会带上它的值,它永久有效.最大5MB.

##### SessionStorage(会话存储)

1. SessionStorage 跟 HTTP 无关;
2. HTTP不会带上 SessionStorage 的值;
3. 只有相同域名的页面才能互相读取 SessionStorage(没有同源那么严格);
4. 每个域名lSessionStorage 最大存储量为5 MB 左右 (每个浏览器不一样);
5. SessionStorage 在用户关闭页面(会话结束)后失效.

##### SessionStorage与LocalStorage区别

LocalStorage永久有效,SessionStorage页面关闭后失效.

#### HTTP 缓存(Cache)

##### Cache-Control

用来区分对应缓存机制的支持情况,在请求头和响应头都支持这个属性.

假如在缓存有效期内,对于同样的URL,浏览器不会对服务器发出HTTP请求,而是从内存中获取数据.

时间是经过多久时间后过期.

##### 更新缓存
可以做入口改动,利用URL的查询参数更新缓存.
比如:
在HTML文件里改对应文件的URL.<link rel="stylesheet" href="css/style.css?v2">,

##### 为什么首页不能设置Cache-Control

因为用户不能从服务器中获取最新网页.

##### Expires

如果设置Cache-Control那么Expires会被忽略.

时间是一个时间点,即几分几秒过期,时间指的是本地时间,不靠谱.

##### MD5

一个摘要算法

Bash里 输入md5 文件名即转成MD5.

如果内容差异越小,那么MD5值越大.

##### ETag

服务器返回一个ETag,内容是MD5给浏览器,浏览器下次发送请求时,请求时带上请求头if-none-match,那么内容不需要下载,服务器返回状态码304,304返回的第四部分是空的.

##### Cache-Control和ETag

Cache-Control是未过期不发送请求,ETag是发送请求假如不匹配,但是不返回内容,即响应体是空的.