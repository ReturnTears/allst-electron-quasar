# 环境推荐
```text
查看本地node版本： node -v  推荐版本：v14.x.y+
查看本地npm版本：npm -v     推荐版本：8.x.y+
查看本地yarn版本：yarn -v   推荐版本：1.22.y+

```

# 官方文档
```text
0、https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#scaffold-the-project


1、最快捷的打包方式是使用 Electron Forge, 将 Electron Forge 添加到您应用的开发依赖中，并使用其"import"命令设置 Forge 的脚手架：
yarn add --dev @electron-forge/cli
npx electron-forge import

2、make 命令来创建可分发的应用程序: yarn run make
Electron-forge 会创建 out 文件夹，在软件包将在那里可找到

3、主进程​
每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 
主进程在 Node.js 环境中运行，这意味着它具有 require 模块和使用所有 Node.js API 的能力。

窗口管理#
主进程的主要目的是使用 BrowserWindow 模块创建和管理应用程序窗口。
BrowserWindow 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。 
您可从主进程用 window 的 webContent 对象与网页内容进行交互。

当一个 BrowserWindow 实例被销毁时，与其相应的渲染器进程也会被终止。

应用程序生命周期#
主进程还能通过 Electron 的 app 模块来控制您应用程序的生命周期。 
该模块提供了一整套的事件和方法，可以使你添加自定义的应用程序行为。

原生 API​ #
为了使 Electron 的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的 API 来与用户的作业系统进行交互。
Electron 有着多种控制原生桌面功能的模块，例如菜单、对话框以及托盘图标。
API 文档：https://www.electronjs.org/zh/docs/latest/api/app

4、渲染器进程
每个 Electron 应用都会为每个打开的 BrowserWindow ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。
洽如其名，渲染器负责 渲染 网页内容。
所以实际上，运行于渲染器进程中的代码是须遵照网页标准的。
因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与您在网页开发上使用相同的工具和规范来进行攥写。
这也意味着渲染器无权直接访问 require 或其他 Node.js API。 为了在渲染器中直接包含 NPM 模块，您必须使用与在 web 开发時相同的打包工具 (例如 webpack 或 parcel)

5、预加载脚本
预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码 。 
这些脚本虽运行于渲染器的环境中，却因能访问 Node.js API 而拥有了更多的权限。
预加载脚本可以在 BrowserWindow 构造方法中的 webPreferences 选项里被附加到主进程。

由于预加载脚本与渲染器共享同一个全局 Window 接口，并且可以访问 Node.js API，因此它通过在 window 全局中暴露任意您的网络内容可以随后使用的 API 来增强渲染器。

虽然预加载脚本与其所附加的渲染器在全局共享着一个 window 变数，但您并不能从中直接附加任何变数到 window 之中，因为 contextIsolation 是默认的。

语境隔离（Context Isolation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中。
取而代之，我们將使用 contextBridge 模块来安全地实现交互：

6、设备访问
类似基于 Chromium 的浏览器一样, Electron 也提供了通过 web API 访问设备硬件的方法。 
Electron和浏览器之间的主要区别是请求访问设备时发生的情况。
在浏览器中，用户可以在弹出窗口中允许访问单独的设备。 
在 Electron API中，提供了可供开发者自动选择设备或提示用户通过开发者创建的接口选择设备。

6.1、Web Bluetooth API#
Web Bluetooth API 可以被用来连接蓝牙设备。 
为了在 Electron 中使用此 API ， 开发者将需要在 webContent 处理 select-bluetooth-device 事件 ，从而与设备请求相关联。

6.2、WebHID API​ #
WebHID API 可以用于访问HID 设备，例如 键盘和游戏机。 Electron 提供了几个使用 WebHID API的接口

```

# Github
```text
echo "# allst-electron-quasar" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ReturnTears/allst-electron-quasar.git
git push -u origin main
```