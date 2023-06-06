/**
 * 1. 转换后的第几列 因为默认换后肯定只有一行,所以省了
 * 2. sources属性中的哪一个文件
 * 3. 转换前代码的第几行
 * 4. 转换前代码的第几列
 * 5. names属性中的哪一个变量
 */
let origin = 'feel the force';
let target = 'the force feel';
let mapping = {
    "mappings":[[10,"a.js",0,0,'feel'],[-10,"a.js",0,5,'the'],[4,"a.js",0,4,'force']],
    "sources":["a.js"],//源代码的文件名
    "names":["feel","the","force"]//变量名
}


