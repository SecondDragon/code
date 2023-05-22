const mongoose = require('mongoose');
mongoose.connect(`mongodb://webAdmin:1234@127.0.0.1:27017/web`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        return console.log('数据库链接失败')
    }
    console.log('链接数据库成功')
});

// 给数据库创造一个固定的骨架  用来描述集合中的字段，规范存入的数据格式，更像关系型数据库
const UserSchema = mongoose.Schema({ // 在配置骨架的时候 可以增加默认值和校验，包裹对属性的操作功能 
    username:{  // vue-> props校验
        type:String,
        trim:true, // 表示去掉前后空格
        lowercase:true,
        required:true
    },
    password:{
        type:String, // 当保存密码的时候
        required:true,
        validate:{
            validator(value){ // 返回true表示校验通过
                return true
            }
        }
        // maxlength:10,
        // minlength:6
    },
    age:{
        type:Number,
        default:6,
        min:0,
        max:120
    },
    gender:{
        type:Number,
        enum:[0,1]
    },
},{
    timestamps:{
        createAt:'createAt',
        updateAt:'updateAt'
    }
})
// 创造一个数据库的模型(集合) 来操作数据库 , 默认会给你创造一个 小写+s的集合

const UserModel = mongoose.model('User',UserSchema,'user');

(async ()=>{ // 如果添加的数据 比骨架的内容多，会被忽略，如果少也可以存
    let r = await UserModel.create({username:' Zs ',address:'回龙观',password:'abc',gender:0});
    console.log(r);
    mongoose.disconnect();
})()