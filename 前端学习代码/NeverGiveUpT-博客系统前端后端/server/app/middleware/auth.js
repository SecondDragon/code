module.exports = () => {
  return async function auth(ctx, next) {
    const currentUrl = ctx.request.url; // '/api/v1/admin/login'
    // 前台则不需要校验用户权限
    if (currentUrl.indexOf("/web") > -1) {
      return await next();
    }
    // 后台校验用户访问权限。
    const urlWhiteList = ["/admin/login", "/admin/logout"];
    const whiteList = ctx.app.config.auth.whiteList;
    const secret = ctx.app.config.jwt.secret;

    let isNoValidate = urlWhiteList.some(
      (item) => currentUrl.indexOf(item) > -1
    ); // 是否不需要验证 如果currentUrl在urlWhiteList里面就不需要验证

    if (isNoValidate) {
      await next();
    } else {
      const authorization = ctx.request.header.authorization;
      if (authorization) {
        // const token = authorization.replace("Bearer ", "");
        // let decode = await ctx.app.jwt.verify(token, secret);
         await next();
        // const userName = decode._doc.userName;
        // if (whiteList.includes(userName)) {
        //   await next();
        // } else {
        //   console.log("原因在这");
        //   ctx.status = 403; // 无权限
        // }
      } else {
        await next();
      }
    }
  };
};
