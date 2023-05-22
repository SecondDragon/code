/**
 * 如果在js中引入本地静态资源图片时使用import img from './img/logo.png'这种写法是没有问题的
 * 但是在typescript中是无法识别非代码资源的，所以会报错TS2307: cannot find module '.png'
 * 因此，我们需要主动的去声明这个module
 * 新建一个ts声明文件如：images.d.ts就可以了,这样ts就可以识别svg、png、jpg等等图片类型文件
 * 项目编译过程中会自动去读取.d.ts这种类型的文件，所以不需要我们手动地加载他们
 * 当然.d.ts文件也不能随便放置在项目中，这类文件和ts文件一样需要被typescript编译，
 * 所以一样只能放置在tsconfig.json中include属性所配置的文件夹下
 * 
 */
 declare module '*.svg';
 declare module '*.png';
 declare module '*.jpg';
 declare module '*.jpeg';
 declare module '*.gif';
 declare module '*.bmp';
 declare module '*.tiff';