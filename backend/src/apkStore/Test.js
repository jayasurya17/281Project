
const wdio = require('webdriverio');
const assert = require('assert');
const fs = require('fs')
var argv = require('minimist')(process.argv.slice(2));

let f = async () => {
    return new Promise(async (resolve) => {

        console.log(argv)


        console.log("Running Test File")
        console.log("current path " + process.cwd())


        const req = {
            port: argv["port"],
            path: argv["path"],
            capabilities: {
                platformName: argv["platformName"],
                platformVersion: `${argv["platformVersion"]}`,
                deviceName: argv["deviceName"],
                app: argv["app"],
                appPackage: argv["appPackage"],
                appActivity: argv["appActivity"],
                automationName: argv["automationName"]
            },
        };

        console.log("current path " + process.cwd())
        const client = await wdio.remote(opts);

        const field = await client.$('android.widget.EditText');
        await field.setValue('Hello World!');
        const value = await field.getText();

        // let screenshot = client.takeScreenshot();

        assert.equal(value, 'Hello World!');
        let bugreport = await client.getLogs('bugreport');
        let logs = await client.getLogs('logcat');
        const date = new Date();
        const fileName = req.runId + "_" + (date.getMonth() + 1) + "" + date.getDate() + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "_Logs.txt";
        let path = `./src/apkStore/${fileName}`
        //JSON.stringify(logs.map(entry => entry.message).join('\n'))
        try {
            fs.writeFileSync(path, JSON.stringify(logs.map(entry => entry.message).join('\n')));
        } catch (err) {
            console.error(err)
        }
        await client.deleteSession();
        resolve();
    });
}



f()