const logger = require('../shared/AzureLogAnalyticsHelper.js');

module.exports = function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message');
    logger.writeLogEntry(context, "{message: 'JavaScript ServiceBus queue trigger function processed message'}");

    context.bindings.outDoc = mySbMsg;


    //send post request to caylent endpoint
    const https = require('https');
    let options = {
        hostname: process.env.CAYLENT_NOTIFIER_HOSTNAME,
        path: process.env.CAYLENT_NOTIFIER_PATH,
        method: process.evn.CAYLENT_NOTIFIER_METHOD,
        port: prorcess.env.CAYLENT_NOTIFIER_PORT,
        headers: {
            'Content-Type':'application/json',
        }
    };

    let req = https.request(options, (res)=> {
        context.log('statusCode', res.statusCode);
        context.log('headers', res.headers);
        res.on('data', (d)=> {
            context.log('data:', d);
            logger.writeLogEntry(context, `{data: '${d}'}`);
        });
    });

    req.on('error', (e)=> {
        context.log('error with request', e.message);
        logger.writeLogEntry(context, `{message: '${e.message}'}`);
    });

    req.write(JSON.stringify(mySbMsg));
    req.end();

    context.log(JSON.stringify(mySbMsg, null, 4));
    context.done();
};