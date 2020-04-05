import common from '../../../config/env/common';

const wdio = require('webdriverio');
const assert = require('assert');

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
  const opts = {
    port: common.appiumport,
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
  const client = await wdio.remote(opts);

  const field = await client.$('android.widget.EditText');
  await field.setValue('Hello World!');
  const value = await field.getText();

  assert.equal(value, 'Hello World!');
  //  let logs = wdio.getLogs('driver');

  await client.deleteSession();
};
