const ArticleModel = require('./model/article');
const mongoose = require('./model/index')
const UserModel = require('./model/user');


// (async () => {
//     let user = await UserModel.create({ username: 'jw', password: 'jw' });
//     let article =await ArticleModel.create({ title: 'MongoDB', content: '如何使用', user_id: user._id });
//     console.log(article);
// })();


// 我进入到文章中 需要知道这个文章是谁写的？ 关联查询
//  

// 聚合功能

(async ()=>{
//   let r = await ArticleModel.findById('608c0f8094e62439d0031810').populate('user_id',{_id:0});
//   console.log(r);
    let r = await ArticleModel.aggregate([
        {
            $lookup:{
                from:'user', // 通过文章 查询用户
                localField:'user_id', // 通过文章的localField 关联foreginFiled
                foreignField:"_id",
                as:'user' // 查到的结果 放到user字段中
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId('608c0f8094e62439d0031810')
            }
        },
        {
            $project:{ // 和我们写的populate第二个参数功能一样,只显示用户的字段
                user:1
            }
        },
        {
            $group:{ // mysql 分组 学生-> 考试 对他们的科目分组 并且就平均分 总分....

            }
        }
    ])
    console.log(JSON.stringify(r))
})();