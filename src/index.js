
const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const { Registry } = require('registry-js');
const os = require('os');
const path = require('path');

const appName = 'Browser Picker';

const isWindows = os.platform() === 'win32' || os.platform() === 'win64';

process.title = appName;
app.setName(appName);

if (!isWindows) {
    console.error('This application can only run on Windows.');
    process.exit(1);
}

// Get a list of installed browser on Windows
function getInstalledBrowsers() {

    // Get user only browsers
    var key = Registry.current_user.open('HKEY_CURRENT_USER\\Software\\Clients\\StartMenuInternet', Registry.ACCESS_READ);
    const browsers = [];

    if (key) {
        for (const subkeyName of key.subkeyNames()) {
            const subkey = key.open(subkeyName, Registry.ACCESS_READ);
            const defaultIconValue = subkey.getStringValue('DefaultIcon');
            const commandValue = subkey.getStringValue('shell\\open\\command');

            if (defaultIconValue && commandValue) {
                const browserName = subkeyName.split('\\').pop();
                const browserPath = commandValue.split('"')[1];
                browsers.push({ browserName, browserPath });
            }

            subkey.close();
        }

        key.close();
    }

    // Get all users browsers
    var key = Registry.current_user.open('HKEY_LOCAL_MACHINE\\Software\\Clients\\StartMenuInternet', Registry.ACCESS_READ);

    if (key) {
        for (const subkeyName of key.subkeyNames()) {
            const subkey = key.open(subkeyName, Registry.ACCESS_READ);
            const defaultIconValue = subkey.getStringValue('DefaultIcon');
            const commandValue = subkey.getStringValue('shell\\open\\command');

            if (defaultIconValue && commandValue) {
                const browserName = subkeyName.split('\\').pop();
                const browserPath = commandValue.split('"')[1];
                browsers.push({ browserName, browserPath });
            }

            subkey.close();
        }

        key.close();
    }

    return browsers;
}

ipcMain.on('get-installed-browsers', (event) => {
    event.returnValue = getInstalledBrowsers();
});

ipcMain.on('execute-browser', (event, browserPath) => {
    const childProcess = require('child_process').execFile;
    childProcess(browserPath, [], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing browser: ${error}`);
            return;
        }
        console.log(`Browser executed: ${stdout}`);
    });
});

// Creates the main window
function createWindow() {
    const win = new BrowserWindow({
        title: 'Browser Picker',
        icon: path.join(__dirname, 'assets/icons/icon.ico'),
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Loads HTML file into the window
    win.loadFile(path.join(__dirname, 'index.html'));

    // Disable the menu
    Menu.setApplicationMenu(null);

    ipcMain.on('get-installed-browsers', () => {
        win.webContents.send('installed-browsers', getInstalledBrowsers());
    });
}

// Calls createWindow() when the app is ready
app.whenReady().then(createWindow);

// Quits the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Opens a window if none are open (macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


console.log(getInstalledBrowsers());

