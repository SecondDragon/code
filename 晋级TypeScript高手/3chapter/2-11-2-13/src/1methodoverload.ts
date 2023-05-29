type MessageType = "image" | "audio" | string;//微信消息类型
//type xtype=string
//boolean true false
type Message = {
  id: number;
  type: MessageType;
  sendmessage: string;
};
//let msgobj:Message={id:23,type:"df",sendmessage:"abc"}
//let obj={username:"wangwu",age:23}
let messages: Message[] = [
  //let messages: Array<Message> = [
  {
    id: 1, type: 'image', sendmessage: "你好啊,今晚咱们一起去三里屯吧",
  },
  {
    id: 2, type: 'audio', sendmessage: "朝辞白帝彩云间，千里江陵一日还"
  },
  {
    id: 3, type: 'audio', sendmessage: "你好！张无忌"
  },
  {
    id: 4, type: 'image', sendmessage: "刘老根苦练舞台绝技！"
  },
  {
    id: 5, type: 'image', sendmessage: "今晚王牌对王牌节目咋样?"
  }]

//不用函数重载来实现2-12的功能
// 1.函数结构不分明,可读性，可维护性变差
function getMessage(value: number | MessageType):
  Message | undefined | Array<Message> {
  if (typeof value === "number") {
    return messages.find((msg) => { return value === msg.id })
  } else {
    //return messages.filter((msg) => { return value === msg.type })
    return messages.filter((msg) => value === msg.type)
  }
}
// 自定义守卫
//document.getElementById("id")
console.log(getMessage("audio"));
// TS没有办法运行之前根据传递的值来推导方法最终返回的数据的数据类型
// 只可以根据方法定义的类型展现
//let msg=getMessage(1) 
//console.log(msg.sendMessage)//错误 类型“Message | Message[]”上不存在属性“sendMessage”。
//  类型“Message”上不存在属性“sendMessage”
let msg = (<Message>getMessage(1)).sendmessage
console.log("msg:", msg)// msg: 你好啊,今晚咱们一起去三里屯吧


export { }