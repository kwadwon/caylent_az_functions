module.exports = function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message');
    context.bindings.outDoc = mySbMsg;


    //send post request to caylent endpoint
    const https = require('https');
    let options = {
        hostname: "julia.dev-1.staging.caylent.io",
        path: "/azure-notification",
        method: "POST",
        port: 443,
        headers: {
            'Content-Type':'application/json',
        }
    };

    let req = https.request(options, (res)=> {
        context.log('statusCode', res.statusCode);
        context.log('headers', res.headers);
        res.on('data', (d)=> {
            context.log('data:', d);
        });
    });

    req.on('error', (e)=>{
        context.log('error with request', e.message);
    });

    req.write(JSON.stringify(mySbMsg));
    req.end();

    context.log(JSON.stringify(mySbMsg, null, 4));
    context.done();
};