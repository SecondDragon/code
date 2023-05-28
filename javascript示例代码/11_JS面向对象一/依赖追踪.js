//   const transform = (obj, i) => {
//     var unKnow = obj[i]
//     Object.defineProperty(obj, i, {
//       get() {
//         console.log(`getting"${i}": ${unKnow}`, unKnow)
//         return unKnow
//       },
//       set(value) {
//         console.log(`setting"${i}" to: ${value}`)
//         unKnow = value
//       }
//     })
//   }

//   function convert (obj) {
//     // Implement this!
//     for (let i in obj) {
//       transform(obj, i)
//     }
//   }

//   // test
//   let a = {
//     a: 1,
//     b: 2
//   }

// convert(a)

// // console.log("依赖追踪打印a", a);
// console.log("依赖追踪打印a", a.a);
// console.log("依赖追踪打印b", a.b);

// a.a = 2
// a.b = 3
// console.log("依赖追踪打印a", a.a);
// console.log("依赖追踪打印b", a.b);

// 2. 依赖项
class Dep {
  constructor() {
    this.taskList = new Set();
  }

  getDep() {
    //   debugger
    if (activeUpdate) {
      //   console.log(this);
      //   console.log("进行依赖收集", activeUpdate);

      // 为啥这个要使用外部变量不用传参的方式传进来呢？
      // 依赖收集的时候，在get方法内部， 在内部我们怎么访问到
      this.taskList.add(activeUpdate);
    }
  }

  notify() {
    //   debugger;
    this.taskList.forEach((item) => item());
  }
}

let activeUpdate = null;

function autorun(update) {
  //   debugger;
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate;
    // 这个就是一个依赖， 注意，这个其实是是外层函数, 在dep类里， 我们会把它存进taskList, 供通知的时候使用
    // update里面触发数据监听， 会先触发get, 而我们在get里做依赖收集，此时activeUpdate存的是 整个函数体
    // 通过这种方式完成了依赖收集， 并且把activeUpdate置空，为下次使用做准备
    update(); // update里面要执行一个依赖收集
    activeUpdate = null;
  };
  wrappedUpdate();
}

// 3. 结合数据变化检测 + 依赖项收集
function scan(obj) {
  Object.keys(obj).forEach((key) => {
    //   debugger
    let internalValue = obj[key];
    if (typeof internalValue == "object") {
      scan(internalValue);
    }
    //   if (typeof internalValue == "array") {
    //       internalValue
    //   }
    // 在进行响应式的同时初始化依赖项实例， 之后再对应的getter/setter方法中形成闭包， 把依赖状态持久化
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 每次进行get方法的时候， 都进行一次依赖收集
        dep.getDep();
        return internalValue;
      },
      set(newVal) {
        debugger;
        // 检测值是否改变， 如果没有改变， 那么不做处理（为了性能）
        const changed = internalValue !== newVal;
        internalValue = newVal;

        // 如果发生了改变， 那么在依赖class触发依赖项的更新
        if (changed) {
          dep.notify();
        }
      },
    });
  });
  return obj;
}

debugger;

var state = {
  count: 0,
  // b: 1,
  // c: 2,
  d: {
    aaa: 3,
    ddd: 5,
  },
};

scan(state);

// 这就是依赖收集,那么,vue里的依赖收集怎么做的呢
autorun(() => {
  // 在state.count就触发了getter操作， 继而触发了依赖收集
  a = state.count; // 0
  b = state.b;
  d = state.d.aaa;
});

// 对state.count = 1触发了setter操作， 继而触发了依赖更新
// state.count = 1

// console.log(a);  // 1
state.d.aaa = 4;

console.log("打印d", d);
state.d.aaa = 8;
console.log("打印d", d);
// state.count = 2
a="dddd"
console.log(a); // 2
