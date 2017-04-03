module.exports = function (context, data) {
    context.log('Webhook was triggered!');

    if(data !== null) {
        context.log(JSON.stringify(data, null, 4));
        context.bindings.outputSbMsg = data;
    }
    context.done();
}
