class HYEventBus {
  constructor() {
    this.eventBus = {};
  }
  on(eventName, eventCallback, thisArgs) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      eventCallback,
      thisArgs,
    });
  }
  emit(eventName, ...payload) {
    let handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArgs,payload)
    });

  }
  off(eventName, eventCallback) { 
    let handlers = this.eventBus[eventName];
    if (!handlers) return;

    let newHandlers = [...handlers]
    for (let i = 0; i < newHandlers.length; i++) { 
      let handler = newHandlers[i]
      if (eventCallback === handler.eventCallback) { 
        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);
      }
    }


  }

}

const eventBus = new HYEventBus()

// main.js
eventBus.on("abc", function() {
  console.log("监听abc1", this)
}, {name: "why"})

const handleCallback = function() {
  console.log("监听abc2", this)
}
eventBus.on("abc", handleCallback, {name: "why"})

// utils.js
eventBus.emit("abc", 123)
console.log("_______________________________________");
// 移除监听
eventBus.off("abc", handleCallback)
eventBus.emit("abc", 123)


