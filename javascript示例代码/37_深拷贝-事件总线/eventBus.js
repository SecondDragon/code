class MyEventBus{
    constructor() {
        this.eventBus = {}
    }

    on(eventName,eventCallback,thisArg){
        let handlers = this.eventBus[eventName]
        if (!handlers){
            handlers=[]
            this.eventBus[eventName]= handlers
        }
        handlers.push({eventCallback,thisArg})
    }
    emit(eventName,...payload){
        let handlers=this.eventBus[eventName]
        if (!handlers){
            return;
        }else {
            debugger
            handlers.forEach(item=>item.eventCallback.apply(item.thisArg,payload) )
        }
    }
}


let eventBus =new MyEventBus()

obj={a:3333}

eventBus.on("myfirst",function (data="ssssss"){

    console.log(data);
    console.log(this.a);
    },obj
)

setTimeout(()=>{
    eventBus.emit("myfirst","2222222")
},1000)
