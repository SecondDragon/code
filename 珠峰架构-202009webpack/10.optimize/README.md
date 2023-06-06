1. 一个项目中,所有产出的文件的`hash`值都是一样的
2. 

它们的应用场景是什么样的子?

hash
chunkHash
contentHash

 从上下往下是越来越稳定 ,越来越不容易改变 
 从下往下计算难度越越大,性能越来越差

 那些越稳定的,可以往下选择
 css contenthash
 vendor chunk chunkhash
 hash

tree shaking
1.没有被导入或使用
2.一个代码没有被执行,或者说不可到达
3.代码结果没有人用
4.代码只写不读的变量