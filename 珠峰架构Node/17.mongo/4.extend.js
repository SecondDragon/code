const UserModel = require('./model/user');
    // static 方法
(async () => {
    //    let r =  await UserModel.findByName('jw');
    //    console.log(r);
    // 实例方法
    // await new UserModel({username:'zs1',password:'ls'}).saveMd5(); // create


    let r = await UserModel.findOne({}); // 计算属性 
    console.log(r.usernameAndPassword); // 根据内容可以虚拟一个字段，但是这个字段不会影响我们原有的逻辑
})();


// koa + mongo