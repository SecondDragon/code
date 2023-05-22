# 第8节：Nginx 来提供 HTTP 服务或者设置代理

1.什么是nginx？

Nginx是一款使用C语言开发的高性能的http服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。由俄罗斯的程序设计师Igor Sysoev所开发，官方测试nginx能够支撑5万并发链接，并且cpu、内存等资源消耗却非常低，运行非常稳定。

2.Nginx的应用场景

(1).http服务器。Nginx是一个http服务可以独立提供http服务。可以做网页静态服务器。

(2).虚拟主机。可以实现在一台服务器虚拟出多个网站。例如个人网站使用的虚拟主机。

(3).反向代理，负载均衡。当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。

3.查看Nginx所有版本：http://nginx.org/download/
![nginx.png](/Users/xwl/Desktop/nginx.png)



4.我选用的是`nginx-1.18.0.tar.gz` 这个版本。

5.安装步骤

+ 检查并安装所需的依赖软件

    (1).gcc:nginx编译依赖gcc环境

    ```bash
    $ yum install gcc-c++
    ```

    (2).pcre:(Perl Compatible Regular Expressions)是一个Perl库，包括perl兼容的正则表达式库。nginx的http模块使用pcre来解析正则表达式.

    ```bash
$ yum install -y pcre pcre-devel
    ```
    
    (3).zlib：该库提供了很多种压缩和解压缩的方式，nginx使用zlib对http包的内容进行gzip。

    ```bash
$ yum install -y zlib zlib-devel
    ```
    
    (4).openssl:一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。nginx不仅支持http协议，还支持https（即在ssl协议上传输http）.

    ```bash
$ yum install -y openssl openssl-devel
    ```

6.下载nginx源码包

```bash
$ cd /usr/local  # 安装在此目录下
$ wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

7.解压缩源码包并进入

```bash
$ tar -zxvf nginx-1.18.0.tar.gz
$ mv nginx-1.18.0 nginx
```

8.Nginx基本使用方式

​	(1).进入安装目录

```bash
$ cd /usr/local/nginx/sbin
```

​	(2).启动

```bash
$ ./nginx
```

​	(3).关闭 nginx

```bash
$ ./nginx -s stop
```

​	(4).重启 nginx

```bash
$ ./nginx -s reload
```

​	(5).Nginx在启动时默认加载conf/nginx.conf文件,这个文件就是nginx的配置文件了，我给出我的配置：

```bash
$ cd /usr/local/nginx/conf
$ vim nginx.conf
```

```bash
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    # 这里监听 80端口，默认打开前台页面
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            root   /usr/blog/front/web/dist/; # 这个是我前台前端打包后的文件放置的位置，根据自己的修改。
            index  index.html index.htm; # 加载dist目录下的index.html页面
            try_files $uri $uri/ @router;
            autoindex on;
        }
        location /api/ { 
            # 这里是接口代理 比如你前台页面接口请求地址为：
            # /api/login,那么会代理成http://127.0.0.1:7001/api/login。
            # 注意：proxy_pass 配置的http://127.0.0.1:7001后面没有/。
            proxy_pass http://127.0.0.1:7001; # 这个地址是我后台服务启动后的地址
            proxy_set_header Host $host:$server_port;
        }
        location @router{
        # 这里配置是因为我们的项目是Vue或React通过js渲染出来的。
        # 默认打包的只要index.html。所有需要做如下的路由配置。
            rewrite ^.*$ /index.html last;
        }
        gzip on;
        gzip_buffers 32 4k;
        gzip_comp_level 6;
        gzip_min_length 200;
        gzip_types text/css text/xml application/javascript;
        gzip_vary on;
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    # another virtual host using mix of IP-, name-, and port-based configuration
    # 管理后台服务代理
    server {
        listen       9000;
        server_name  localhost;
        location / {
            root   /usr/blog/front/admin/dist/;
            index  index.html index.htm;
            try_files $uri $uri/ @router;
            autoindex on;
        }
        location /api/v1/ {
            proxy_pass http://127.0.0.1:7001;
            proxy_set_header Host $host:$server_port;
        } 
        location @router{
            rewrite ^.*$ /index.html last;
        }
        gzip on;
        gzip_buffers 32 4k;
        gzip_comp_level 6;
        gzip_min_length 200;
        gzip_types text/css text/xml application/javascript;
        gzip_vary on;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```

我是开了两个代理的：

前台展示打开的服务代理和管理后台打开的服务代理，这个项目是分开端口访问的。 比如：我的公网IP是 47.134.30.148，那么可以通过 http://47.134.30.148 即可访问前台展示，http://47.134.30.148:9000 即可访问管理后台的登录界面。



解决Vue或React路由跳转页面404问题：

```bash
try_files $uri $uri/ @router;

location @router{
    rewrite ^.*$ /index.html last;
}
```


