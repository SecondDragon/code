//代表一个课程
export default interface Lesson{
    id:string;//ID
    title:string;//标题
    video:string;//视频
    poster:string;//海报
    url:string;//url
    price:string;//价格
    category:string//分类
}
interface LessonResult {
    success:boolean;
    data:Lesson
}
export {
    Lesson,
    LessonResult
}