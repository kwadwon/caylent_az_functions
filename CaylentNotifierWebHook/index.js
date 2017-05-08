const logger = require('../shared/AzureLogAnalyticsHelper.js');

module.exports = function (context, data) {
    context.log('Webhook was triggered!');
    logger.writeLogEntry(context, "{message: 'Wehbook was triggered!'}");
    
    if(data !== null) {
        context.log(JSON.stringify(data, null, 4));
        context.bindings.outputSbMsg = data;
    }
    context.done();
}
