console.log("main.js");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const Menu = electron.Menu;

//SET env
process.env.NODE_ENV = 'production';

let mainWin, addWin;

//Listen app to be ready
function createWindow() {
  mainWin = new BrowserWindow({});

  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file',
    slashes: true
  }));

   //mainWin.openDevTools();

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(mainMenu);

  mainWin.on('closed', () => {
    app.quit();
  })
}

app.on('ready', createWindow);

//Create Menu template
const mainMenuTemplate = [
  {
    label: 'Actions',
    submenu: [
      {
        label: 'Add Employee',
        click: function () {
          createAddWindow();
        }
      },
      {
        label: 'Delete Employee',
        click: function () {
          mainWin.webContents.send('emp:clear');
        }
      },
      {
        label: 'Quit',
        click: function () {
          app.quit();
        },
        accelerator: 'Ctrl + Q'
      }
    ]
  }
];

//Handle create add mainWindow
function createAddWindow() {
  addWin = new BrowserWindow({ width: 700, height: 500, title: 'Add Employee' });

  addWin.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
  }));

  //addWin.openDevTools();

  //Garbage collection Handle
  addWin.on('closed', () => {
    addWin = null;
  });
}

//Catch emp:add
ipc.on('emp:add', function (e, empFname, empLname, empDob, empSalary, empAddress, empCity, empDept) {
  mainWin.webContents.send('emp:add', empFname, empLname, empDob, empSalary, empAddress, empCity, empDept);
  addWin.close();
});


