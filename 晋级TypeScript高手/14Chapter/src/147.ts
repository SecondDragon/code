// 14-7  一个联合类型技巧性使用的场景 

type IncreaseBoolean = Boolean | 1 | 0

function mounted(isStartUp: IncreaseBoolean) {
  if (isStartUp) {
    console.log("yes");
  } else {
    console.log("no");
  }
}

mounted(1)