const BAR = Symbol("Application#bar");

module.exports = {
  log(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    console.log(param);
  },
  get bar() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    
    if (!this[BAR]) {
      // 实际情况肯定更复杂
      // this[BAR] =
      //   this.config.news.serverUrl + "?limit=" + this.config.news.limit;
      console.log('this.config:', this.config);
      this[BAR] =1
    }
    return this[BAR];
  },
};
