# 06-容器对象 -4-ArrayBuffer

## 一 定型数组概念

定型数组（TypedArray）是新增的数据结构，目的是提升向原生库传输数据的效率，如 WebGL。

默认情况下，JavaScript 的数组以双精度浮点格式传递值，而 WebGL 则不能直接接受该类型，需要在目标环境先分配一个新数组，迭代时将数值类型转换为适和自己的格式！这引起了极大性能浪费。

由 Mozilla 发起，浏览器逐渐内置了一些类型数组，如 Float32Array。

## 二 基本单位与视图

### 2.1 基本单位 ArrayBuffer

ArrayBuffer 是一块预分配的内存，是所有定型数组、视图引用的基本单位，其本质仍然是一个普通的 JS 构造函数，用于在内存中分配特定数量的字节空间：

```js
const buf = new ArrayBuffer(16) // 在内存中分配 16 字节
console.log(buf.byteLength) // 16
```

与普通数组不同的是，ArrayBuffer 一旦创建就不能调整大小，只能使用 slice() 复制其全部、部分到一个全新的实例中：

```js
const buf1 = new ArrayBuffer(16)
const buf2 = buf1.slice(4, 12)
console.log(buf2.byteLength) // 8
```

ArrayBuffer 与 C++ 中的 malloc 很相似，区别如下：

- ArrayBuffer 在分配失败时抛出错误，而 malloc() 则返回 null 指针
- ArrayBuffer 可分配内存不能超过 Number.MAX_SAFE_INTEGER 字节，malloc() 则可以使用虚拟内存
- ArrayBuffer 声明后，所有二进制位都被初始化为 0，malloc() 则不会初始化实际地址
- ArrayBuffer 申请的内存支持垃圾回收，malloc() 则需要使用 free() 手动释放

注意：**ArrayBuffer 内存储的二进制数据不能直接读取，必须通过视图**，如：DataView。

### 2.2 视图 DataView

视图 DataView 是第一种可以读写 ArrayBuffer 的类，是专门为 I/O 设计，DataView 没有预设数据类型，也不能迭代。

```js
const buf = new ArrayBuffer(16)

// 使用全部 ArrayBuffer
const dv = new DataView(buf)
console.log(dv.buffer === buf) // true
console.log(dv.byteLength) // 16
console.log(dv.byteOffset) // 0

// 使用部分 ArrayBuffer，
// 参数二 byteOffset 表示缓冲起点
// 参数三 byteLength 限制视图为前 8 个字节
const dv1 = new DataView(buf, 0, 8)
console.log(dv1.buffer === buf) // true
console.log(dv1.byteLength) // 8
console.log(dv1.byteOffset) // 0

// 若 byteLength 未指定，视图默认使用剩余缓冲，则视图使用剩余缓冲
// byteOffset=8 表示视图从缓冲的第 9 个字节开始
const dv2 = new DataView(buf, 8)
console.log(dv2.buffer === buf) // true
console.log(dv2.byteLength) // 8
console.log(dv2.byteOffset) // 8
```

### 2.3 ElementType

由于 DataView 没有预设数据类型，不能直接实现对 ArrayBuffer 数据的读写，必须设定 ElementType，ES6 支持 8 中 ElementType：

![ElementType](../images/javascript/array-buffer.png)

DataView 为上表中的每种类型都暴露了 get 和 set 方法，这些方法使用 byteOffset（字节偏移量）定位要读取或写入值的位置，类型也是可以互换使用的：

```js
const buf = new ArrayBuffer(2)
const view = new DataView(buf)

// 读取缓存二进制位：默认为 0
console.log(view.getInt8(0)) // 读取第一个字符：0
console.log(view.getInt8(1)) // 读取第二个字符：0
console.log(view.getInt16(0)) // 读取所有字符：0

// 将整个缓冲都设置为 1
view.setUint8(0, 255) // 255 的二进制表示是 11111111（2^8 - 1）

// DataView 会自动将数据转换为特定的 ElementType
view.setUint8(1, 0xff) // 255 的十六进制表示是 0xFF
// 缓冲现在都是 1，如果当成二补数的有符号整数，则应该是 -1
console.log(view.getInt16(0)) // -1
```

### 2.4 字节序

字节序默认为大端字节序。字节序”指的是计算系统维护的一种字节顺序的约定，一般有两种：

- 大端字节序：最高有效位保存在第一个字节，最低有效位保存在最后一个字节
- 小端字节序：最低有效位保存在第一个字节，最高有效位保存在最后一个字节

JavaScript 的运行时所在的操作系统会决定如何读取、写入字节，但是 DataView 会遵循开发者指定的字节序，默认是大端字节序：

```js
// 在内存中分配两个字节并声明一个 DataView
const buf = new ArrayBuffer(2)
const view = new DataView(buf)
// 填充缓冲，让第一位和最后一位都是 1
view.setUint8(0, 0x80) // 设置最左边的位等于 1
view.setUint8(1, 0x01) // 设置最右边的位等于 1
// 缓冲内容（为方便阅读，人为加了空格）
// 0x8 0x0 0x0 0x1
// 1000 0000 0000 0001
// 按大端字节序读取 Uint16
// 0x80 是高字节，0x01 是低字节
// 0x8001 = 2^15 + 2^0 = 32768 + 1 = 32769
console.log(view.getUint16(0)) // 32769
// 按小端字节序读取 Uint16
// 0x01 是高字节，0x80 是低字节
// 0x0180 = 2^8 + 2^7 = 256 + 128 = 384
console.log(view.getUint16(0, true)) // 384
// 按大端字节序写入 Uint16
view.setUint16(0, 0x0004)
// 缓冲内容（为方便阅读，人为加了空格）
// 0x0 0x0 0x0 0x4
// 0000 0000 0000 0100
console.log(view.getUint8(0)) // 0
console.log(view.getUint8(1)) // 4
// 按小端字节序写入 Uint16
view.setUint16(0, 0x0002, true)
// 缓冲内容（为方便阅读，人为加了空格）
// 0x0 0x2 0x0 0x0
// 0000 0010 0000 0000
console.log(view.getUint8(0)) // 2
console.log(view.getUint8(1)) // 0
```

### 2.5 边界

DataView 完成读、写操作的前提是必须有充足的缓冲区，否则就会抛出 RangeError：

```js
const buf = new ArrayBuffer(6)
const view = new DataView(buf)
// 尝试读取部分超出缓冲范围的值
view.getInt32(4)
// RangeError
// 尝试读取超出缓冲范围的值
view.getInt32(8)
// RangeError
// 尝试读取超出缓冲范围的值
view.getInt32(-1)
// RangeError
// 尝试写入超出缓冲范围的值
view.setInt32(4, 123)
// RangeError
```

DataView 在写入缓冲里会尽最大努力把一个值转换为适当的类型，后备为 0。如果无法转换，则
抛出错误：

```js
const buf = new ArrayBuffer(1)
const view = new DataView(buf)
view.setInt8(0, 1.5)
console.log(view.getInt8(0)) // 1
view.setInt8(0, [4])
console.log(view.getInt8(0)) // 4
view.setInt8(0, 'f')
console.log(view.getInt8(0)) // 0
view.setInt8(0, Symbol())
// TypeError
```

## 三 定型数组

### 3.1 定型数组基础

定型数组是另一种 ArrayBuffer 的视图，特定于一种 ElementType，遵循系统原生字节序！

设计定型数组的目的就是提高与 WebGL 等原生库交换二进制数据的效率。由于定型数组的二进制表示对操作系统而言是一种容易使用的格式，JavaScript 引擎可以重度优化算术运算、按位运算和其他对定型数组的常见操作，因此使用它们速度极快。

创建定型数组的方式包括读取已有的缓冲、使用自有缓冲、填充可迭代结构，以及填充基于任意类型的定型数组。另外，通过`<ElementType>.from()`和`<ElementType>.of()`也可以创建定型数组：

```js
// 创建一个 12 字节的缓冲
const buf = new ArrayBuffer(12)
// 创建一个引用该缓冲的 Int32Array
const ints = new Int32Array(buf)
// 这个定型数组知道自己的每个元素需要 4 字节
// 因此长度为 3
console.log(ints.length) // 3
// 创建一个长度为 6 的 Int32Array
const ints2 = new Int32Array(6)
// 每个数值使用 4 字节，因此 ArrayBuffer 是 24 字节
console.log(ints2.length) // 6
// 类似 DataView，定型数组也有一个指向关联缓冲的引用
console.log(ints2.buffer.byteLength) // 24
// 创建一个包含 [2, 4, 6, 8] 的 Int32Array
const ints3 = new Int32Array([2, 4, 6, 8])
console.log(ints3.length) // 4
console.log(ints3.buffer.byteLength) // 16
console.log(ints3[2]) // 6
// 通过复制 ints3 的值创建一个 Int16Array
const ints4 = new Int16Array(ints3)
// 这个新类型数组会分配自己的缓冲
// 对应索引的每个值会相应地转换为新格式
console.log(ints4.length) // 4
console.log(ints4.buffer.byteLength) // 8
console.log(ints4[2]) // 6
// 基于普通数组来创建一个 Int16Array
const ints5 = Int16Array.from([3, 5, 7, 9])
console.log(ints5.length) // 4
console.log(ints5.buffer.byteLength) // 8
console.log(ints5[2]) // 7
// 基于传入的参数创建一个 Float32Array
const floats = Float32Array.of(3.14, 2.718, 1.618)
console.log(floats.length) // 3
console.log(floats.buffer.byteLength) // 12
console.log(floats[2]) // 1.6180000305175781
```

定型数组的构造函数和实例都有一个 BYTES_PER_ELEMENT 属性，返回该类型数组中每个元素的大小：

```js
console.log(Int16Array.BYTES_PER_ELEMENT) // 2
console.log(Int32Array.BYTES_PER_ELEMENT) // 4
const ints = new Int32Array(1),
  floats = new Float64Array(1)
console.log(ints.BYTES_PER_ELEMENT) // 4
console.log(floats.BYTES_PER_ELEMENT) // 8
```

如果定型数组没有用任何值初始化，则其关联的缓冲会以 0 填充：

```js
const ints = new Int32Array(4)
console.log(ints[0]) // 0
console.log(ints[1]) // 0
console.log(ints[2]) // 0
console.log(ints[3]) // 0
```

### 3.2 定型数组行为

从很多方面看，定型数组与普通数组都很相似，支持绝大多数普通数组的方法。

定型数组同样使用数组缓冲来存储数据，而数组缓冲无法调整大小。因此，下列方法不适用于定型数组：

```js
concat()
pop()
push()
shift()
splice()
unshift()
```

不过定型数组也提供了两个新方法，可以快速向外或向内复制数据：set() 和 subarray()。示例：

```js
// 创建长度为 8 的 int16 数组
const container = new Int16Array(8)
// 把定型数组复制为前 4 个值
// 偏移量默认为索引 0
container.set(Int8Array.of(1, 2, 3, 4))
console.log(container) // [1,2,3,4,0,0,0,0]
// 把普通数组复制为后 4 个值
// 偏移量 4 表示从索引 4 开始插入
container.set([5, 6, 7, 8], 4)
console.log(container) // [1,2,3,4,5,6,7,8]
// 溢出会抛出错误
container.set([5, 6, 7, 8], 7)
// RangeError
```

subarray() 执行与 set() 相反的操作，它会基于从原始定型数组中复制的值返回一个新定型数组。复制值时的开始索引和结束索引是可选的：

```js
const source = Int16Array.of(2, 4, 6, 8)
// 把整个数组复制为一个同类型的新数组
const fullCopy = source.subarray()
console.log(fullCopy) // [2, 4, 6, 8]
// 从索引 2 开始复制数组
const halfCopy = source.subarray(2)
console.log(halfCopy) // [6, 8]
// 从索引 1 开始复制到索引 3
const partialCopy = source.subarray(1, 3)
console.log(partialCopy) // [4, 6]
```

定型数组没有原生的拼接能力，但使用定型数组 API 提供的很多工具可以手动构建：

```js
// 第一个参数是应该返回的数组类型
// 其余参数是应该拼接在一起的定型数组
function typedArrayConcat(typedArrayConstructor, ...typedArrays) {
  // 计算所有数组中包含的元素总数
  const numElements = typedArrays.reduce((x, y) => (x.length || x) + y.length)
  // 按照提供的类型创建一个数组，为所有元素留出空间
  const resultArray = new typedArrayConstructor(numElements)
  // 依次转移数组
  let currentOffset = 0
  typedArrays.map((x) => {
    resultArray.set(x, currentOffset)
    currentOffset += x.length
  })
  return resultArray
}
const concatArray = typedArrayConcat(
  Int32Array,
  Int8Array.of(1, 2, 3),
  Int16Array.of(4, 5, 6),
  Float32Array.of(7, 8, 9)
)
console.log(concatArray) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(concatArray instanceof Int32Array) // true
```

### 3.3 下溢、上溢

定型数组中值的下溢和上溢不会影响到其他索引，但仍然需要考虑数组的元素应该是什么类型。定型数组对于可以存储的每个索引只接受一个相关位，而不考虑它们对实际数值的影响。以下代码演示了如何处理下溢和上溢：

```js
// 长度为 2 的有符号整数数组
// 每个索引保存一个二补数形式的有符号整数
// 范围是 -128（ -1 * 2^7） ~127（2^7 - 1）
const ints = new Int8Array(2)
// 长度为 2 的无符号整数数组
// 每个索引保存一个无符号整数
// 范围是 0~255（2^7 - 1）
const unsignedInts = new Uint8Array(2)
// 上溢的位不会影响相邻索引
// 索引只取最低有效位上的 8 位
unsignedInts[1] = 256 // 0x100
console.log(unsignedInts) // [0, 0]
unsignedInts[1] = 511 // 0x1FF
console.log(unsignedInts) // [0, 255]
// 下溢的位会被转换为其无符号的等价值
// 0xFF 是以二补数形式表示的 -1（截取到 8 位） ,
// 但 255 是一个无符号整数
unsignedInts[1] = -1 // 0xFF (truncated to 8 bits)
console.log(unsignedInts) // [0, 255]
// 上溢自动变成二补数形式
// 0x80 是无符号整数的 128，是二补数形式的 -128
ints[1] = 128 // 0x80
console.log(ints) // [0, -128]
// 下溢自动变成二补数形式
// 0xFF 是无符号整数的 255，是二补数形式的 -1
ints[1] = 255 // 0xFF
console.log(ints) // [0, -1]
```
