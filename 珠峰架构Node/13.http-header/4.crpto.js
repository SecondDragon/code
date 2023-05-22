// crypto是我们node中提供好的用于加密的包 各种摘要算法和加密算法

// md5 算法 hash算法 摘要算法  (md5 无法反解)


// 1.md5 
// 不可逆
// 相同的内容摘要出的结果相同
// 摘要的内容不同 结果完全不同 (雪崩效应)
// 摘要不同的内容 长度是相同的

// 撞库不叫解密，为了安全 你可以把一个md5值多次加密 md5(md5(md5(xxx)))

const crypto = require('crypto');
//                               摘要的内容          摘要的个数
let r1 = crypto.createHash('md5').update('abcd').digest('base64')
//                               分开摘要  如果内部使用了流，可以读一点摘要一点
let r2 = crypto.createHash('md5').update('a').update('b').update('cd').digest('base64')
console.log(r1,r2)
// 2.加盐算法 （盐值，秘钥）
// 可以把秘钥生成一个1k大小的 随机的字符，在用作秘钥  jwt的原理
let r3 = crypto.createHmac('sha256','zf1').update('abcd').digest('base64')
console.log(r3)


// 做一个简述  md5的特点


