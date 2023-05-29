## 慕课TS高级课程

## 	 【第三章  第5节】

## 	 		 【TS自动重启+TS自动运行+Parcel自动打包】    

####   步骤如下：

（1）初始化 npm init --yes 出现 package.json

（2） 安装 typescript

​			全局安装 cnpm i typescript -g     或

​			本地安装： cnpm i typescript -D   或

​		    yarn安装 yarn global   add typescript 

​		 【cnpm i typescript -D 是 cnpm install typescript --save-dev的缩写】

  (3）生成tsconfig.json文件  

​			 tsc --init  

 （4）修改 tsconfig.json 中的配置
   		 “outDir:  "./dist"     --outDir是ts编译后生成js文件保存的目录
    		"rootDir": "./src", --rootDir是自己编写的ts源文件所在的目录
   		注意: dist src package.json 必须是在一个目录下

（5）编译src目录以及子目录下的ts文件

​			tsc 【在src当前目录下：输入tsc   注意直接写tsc命令即可】
 		  【会把src目录以及子目录下的ts文件全部编译成js文件，并全部输出到dist目录中】

（6）安装 ts-node

​		 	 ts-node让node能直接运行ts代码，无需使用tsc将ts代码编译成js代码。【ts-node则包装了node，它可以直接的运行ts代码】

​			全局安装     cnpm i ts-node -g     或

​			本地安装： cnpm i ts-node -D   或

​		    yarn安装：yarn global   add ts-node 

  （6）安装nodemon工具 【自动检测工具】
  		 nodemon作用：【nodemon可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序】

​		    全局安装  cnpm install -g nodemon     或

​			本地安装： cnpm i nodemon  -D  或

​		    yarn安装    yarn add nodemon  -D   

 （7） 在package.json中配置自动检测，自动重启应用程序

	   "scripts": {
		 "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
	    }
​		  nodemon --watch src/  表示检测目录是package.json同级目录src

​		 -e ts   表示nodemon 命令准备将要监听的是ts后缀的文件

​		 --exec ts-node ./src/project/app.ts 表示检测到src目录下有任何变化 都要重新执行app.ts文件



#### 2.Parcel打包支持浏览器运行TS文件

​		（1）安装Parcel打包工具：npm install parcel-bundler --save-dev

​		（2）在package.json中给npm添加启动项，支持启动parcel工具包

	     "scripts": {
	        "start": "parcel ./index.html"
	      },

​		  (3)  启动parcel工具包

​				cnpm run start  【cnpm start】或  npm  run start  【npm start】或 yarn run start 【yarn start】

#### 慕课TS高级课程


##### 

####  	

​		 


​	         






