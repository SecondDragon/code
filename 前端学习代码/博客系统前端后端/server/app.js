module.exports = app => {
  app.once('server', server => {
    // websocket

    // console.log('server')
    // app.log('123-----');
    console.log(app.bar);
  });
  app.on('error', (err, ctx) => {
    // report error
    console.log('error')

  });
  app.on('request', ctx => {
    // log receive request
    console.log('request')

  });
  app.on('response', ctx => {
    console.log('response',ctx)

  });
};