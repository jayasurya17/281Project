const child_process = require('child_process');

exports.createEmulator = (emulatorname, port) => {
    console.log("reached create emulator" + emulatorname + port);
    const cmd = 'emulator'
    return new Promise(function (resolve, reject) {
        const cp = child_process.spawnSync(cmd, ['-avd', `${emulatorname}`], {
            detached: true,
            timeout: 1000
        });
        console.log(`Spawned child pid: ${cp.pid}`);

    });
}