/**
 * 处理用户发送的消息类型和内容，决定返回不同的内容给用户
 * 接收普通消息：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
 * 被动回复用户消息：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html
 * 接收事件推送：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_event_pushes.html
 */
module.exports = (message) => {
  let options = {
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
    createTime: Date.now(),
    msgType: "text",
  };
  let content = "NeverGiveUpT";
  if (message.MsgType === "text") {
    if (message.Content === "1") {
      //全匹配
      content = "我叫NeverGiveUpT-1";
    } else if (message.Content === "2") {
      content = "我叫NeverGiveUpT-2";
    } else if (message.Content.match("TA")) {
      //半匹配
      content = "我叫NeverGiveUpT-TA";
    }
  }

  if (message.MsgType === "image") {
    options.msgType = "image";
    options.mediaId = message.MediaId; // 把用户发送过来的图片返回给用户
    console.log(message.PicUrl);
  }

  if (message.MsgType === "voice") {
    options.msgType = "voice";
    options.mediaId = message.MediaId; // 把用户发送过来的语音返回给用户
    console.log(message.Recognition); // 语音识别结果，UTF8编码 // 需要开启才有这个参数
  }

  if (message.MsgType === "location") {
    options.msgType = "text"; // 地理位置-回复文本给用户当前的地理位置信息
    content = `经度：${message.Location_Y},纬度：${message.Location_X},地理位置信息:${message.Label}`;
  }

  // MsgType:   link-链接消息 shortvideo-小视频消息 video-视频消息
  // 一般是对用户发送的文本，语音消息做处理。其他一般不做处理

  // 事件处理
  else if (message.MsgType === "event") {
    if (message.Event === "subscribe") {
      // 订阅事件
      content = "欢迎关注我...";
      if (message.EventKey) {
        content = "用户还未关注公众号，扫码了带参数的二维码事件";
      }
    } else if (message.Event === "unsubscribe") {
      // 取消订阅
      // 取消了就收不到微信公众号的消息了。只能在这里处理自己的业务逻辑，比如取关人数上报等。
    } else if (message.Event === "SCAN") {
      content = "用户已经关注过，扫码了带参数的二维码事件";
    } else if (message.Event === "LOCATION") {
      // 上报地理位置事件 需要开启
      content = `经度：${message.Longitude},纬度：${message.Latitude},地理位置精度
    ：${message.Precision}`;
    } else if (message.Event === "CLICK") {
      content = `你点击了按钮${message.EventKey}`; // 事件KEY值，与自定义菜单接口中KEY值对应
    } else if (message.Event === "VIEW") {
      content = `你点击了按钮${message.EventKey}`; // 事件KEY值，设置的跳转URL
    }
  }

  options.content = content;

  return options;
};
