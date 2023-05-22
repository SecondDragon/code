module.exports = {
  schedule: {
    // interval: '10s',// 每 10 秒执行一次 https://github.com/vercel/ms
    cron: "0 */30 * * * *", // 每30分钟执行一次  // https://github.com/harrisiirak/cron-parser
    type: "all", // 指定所有的 worker都需要执行
  },
  async task(ctx) {
    console.log("每30分钟执行定时任务-audit");
    await ctx.model.Comment.updateMany(
      {
        auditStatus: "3",
      },
      {
        auditStatus: "1",
        auditTime: ctx.helper.moment().unix(),
      }
    );
  },
};
