export const enum ShapeFlags {
    ELEMENT = 1,// 1
    FUNCTIONAL_COMPONENT = 1 << 1, // 2
    STATEFUL_COMPONENT = 1 << 2, // 4
    TEXT_CHILDREN = 1 << 3, // 8
    ARRAY_CHILDREN = 1 << 4,
    SLOTS_CHILDREN = 1 << 5,
    TELEPORT = 1 << 6,
    SUSPENSE = 1 << 7,
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    COMPONENT_KEPT_ALIVE = 1 << 9,
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
  }

  // 位运算 是以前人总结出来 做权限判断 和 类型 位运算是最佳实践
  
  // 2进制 一个字节由8个位组成  8个位最大都是1
  // 00000001    1 * 2^0
  // 00000010    1 * 2^1 + 0 * 2^0
  // 00000100    1 * 2^2 + 0 * 2^1  + 0 * 2^0

  // 用位运算来做标识位

  // 00000100
  // 00000010  // 这两个二进制 做|运算 有一个是1 就是1
  // 00000110   = component

  // 想判断他是不是组件
  // 00000100 &  00000110  全1 才是1  =》 00000100  true
  // 00001000 &  00000110  => 00000000

  // | 有一个是1 就是1
  // & 都是1 才是1