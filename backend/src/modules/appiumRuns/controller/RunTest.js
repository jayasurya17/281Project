

const wdio = require('webdriverio');
const assert = require('assert');
const fs = require('fs')
const child_process = require('child_process');


// const opts = {
//   port: 4723,
//   path:'/wd/hub/',
//   capabilities: {
//     platformName: "Android",
//     platformVersion: "8.1",
//     deviceName: "emulator-5554",
//     app: "./ApiDemos.apk",
//     appPackage: "io.appium.android.apis",
//     appActivity: ".view.TextFields",
//     automationName: "UiAutomator1"
//   }
// };

exports.runAppium = async (req) => {
	req = req.capabilities;
	const opts = {
		port: 4723,
		path: '/wd/hub/',
		capabilities: {
			platformName: req.platformName,
			platformVersion: req.platformVersion,
			deviceName: req.deviceName,
			app: `./${req.app}`,
			appPackage: req.appPackage,
			appActivity: req.appActivity,
			automationName: req.automationName,
		},
	};


	let cmd = 'node'
	// let cmddata;
	console.log("Running TestScript");
	// console.log(req)
	console.log(`./src/apkStore/${req.testScriptName}`)
	let cp = child_process.spawn(cmd, [`src/apkStore/${req.testScriptName}`,
		"--platformName", `${req.platformName}`,
		"--platformVersion", `${req.platformVersion}`,
		"--deviceName", `${req.deviceName}`,
		"--app", `./${req.app}`,
		"--appPackage", `${req.appPackage}`,
		"--appActivity", `${req.appActivity}`,
		"--automationName", `${req.automationName}`,
		"--port", "4723",
		"--path", '/wd/hub/',
	])
	console.log

	cp.stdout.on('data', (data) => {
		console.log(data.toString());

	})
	cp.stderr.on('data', (data) => {
		console.log(data.toString());
	})


	//	 const TestScript = await runTestScript(req.testScriptName)
	// console.log("current path " + process.cwd())
	// const client = await wdio.remote(opts);

	// const field = await client.$('android.widget.EditText');
	// await field.setValue('Hello World!');
	// const value = await field.getText();

	// // let screenshot = client.takeScreenshot();

	// assert.equal(value, 'Hello World!');
	// let bugreport = await client.getLogs('bugreport');
	// let logs = await client.getLogs('logcat');
	// const date = new Date();
	// const fileName = req.runId + "_" + (date.getMonth() + 1) + "" + date.getDate() + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "_Logs.txt";
	// let path = `./src/apkStore/${fileName}`
	// //JSON.stringify(logs.map(entry => entry.message).join('\n'))
	// try {
	// 	fs.writeFileSync(path, JSON.stringify(TestScript.map(entry => entry.message).join('\n')));
	// } catch (err) {
	// 	console.error(err)
	// }
	// await client.deleteSession();
};




// let runTestScript = async (req) => {
// 	let cmd = 'node'
// 	// let cmddata;
// 	console.log("Running TestScript");
// 	let cp = child_process.spawn(cmd, [`../../../apkStore/${req}`])
// 	let cmddata = cp.stdout.on('data', (data) => {
// 		//   cmddata = data;
// 		console.log('stdout: ' + data);
// 		return data;
// 	})

// };

