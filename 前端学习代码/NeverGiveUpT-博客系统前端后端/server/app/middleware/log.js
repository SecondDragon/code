module.exports = () => {
  return async function log(ctx, next) {
    await next();
  };
};
