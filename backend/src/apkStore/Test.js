
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


        console.log("before wdio")
        const client = await wdio.remote(req);
        console.log("after wdio")

        const field = await client.$('android.widget.EditText');
        console.log("after client")

        field.setValue('Hello World!');
        const value = await field.getText();

        // let screenshot = client.takeScreenshot();

        assert.equal(value, 'Hello World!');
        let bugreport = await client.getLogs('bugreport');
        let logs = await client.getLogs('logcat');

        const date = new Date();
        const fileName = req.runId + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear() + "_" + date.getHours() + "_" + date.getMinutes() + "_Logs.txt";
        let path = `./${fileName}`
        //JSON.stringify(logs.map(entry => entry.message).join('\n'))
        try {
            fs.writeFileSync(path, JSON.stringify(TestScript.map(entry => entry.message).join('\n')));
        } catch (err) {
            console.error(err)
        }
        client.deleteSession();
        resolve()
    })

}



f()