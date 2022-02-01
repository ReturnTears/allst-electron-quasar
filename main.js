// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem } = require('electron')
const path = require('path')

// 引入colors
// const colors = require('colors')
// console.log(colors.rainbow('Hello World!'))

// 引入bcrypt、todo 有问题待解决
// const bcrypt = require('bcrypt')
// bcrypt.hash('myPlaintextPassword', 10, function (err, hash) {
//   console.log(hash)
// })

// 父子窗口的第二个窗口
let secondWindow

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // 是否打开窗口
    // show: false
    backgroundColor: '#2e2c29'
  })

  const secondWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: { nodeIntegration: true },
    parent: mainWindow,
    // 模态窗口是禁用父窗口的子窗口
    modal: true
  })

  // 配置了show：false， 开启更优雅的打开窗口方式
  // mainwindow.once('ready-to-show', () => {
  //   mainwindow.show()
  // })

  // devices
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    if (deviceList && deviceList.length > 0) {
      callback(deviceList[0].deviceId)
    } 
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')
  secondWindow.loadFile('second.html')

  // 加载github
  // mainWindow.loadURL('https://github.com')

  // 打开开发工具
  mainWindow.webContents.openDevTools()

  // listen for window be closed
  mainWindow.on('closed', () => {
    // app中监听了关闭, 这里置空了mainWindow会导致后面关闭应用时报错
    // mainWindow = null
  })

  // const contents = mainWindow.webContents
  // console.log(contents)

  // Dark Mode
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

// 菜单
const menu = new Menu()
menu.append(new MenuItem({
  label: '调试快捷键',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))
Menu.setApplicationMenu(menu)

app.on('ready', () => {
  // console.log('App is ready!')
  // console.log(app.getPath('music'))
  // console.log(app.getPath('temp'))
  // console.log(app.getPath('desktop'))
})

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    console.log('App is activate!')
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('before-quit', () => {
  console.log('App is quitting')
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  console.log('App is closed')
  if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。