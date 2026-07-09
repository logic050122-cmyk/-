const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

let win = null;
let ignoreMouse = true;
let isQuitting = false;

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.bounds;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    fullscreen: false,
    hasShadow: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    backgroundColor: "#00000000",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false
    }
  });

  win.setMenuBarVisibility(false);
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(path.join(__dirname, "index.html"));

  // Ctrl + Shift + Q：关闭程序
  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    if (isQuitting) return;
    isQuitting = true;

    if (!win) {
      app.quit();
      return;
    }

    win.webContents.executeJavaScript("window.startExitAnimation && window.startExitAnimation();").catch(() => {});
    setTimeout(() => app.quit(), 3100);
  });

  // Ctrl + Shift + M：切换鼠标穿透
  globalShortcut.register("CommandOrControl+Shift+M", () => {
    if (!win) return;

    ignoreMouse = !ignoreMouse;

    if (ignoreMouse) {
      win.setIgnoreMouseEvents(true, { forward: true });
    } else {
      win.setIgnoreMouseEvents(false);
    }
  });
}

app.whenReady().then(createWindow);

ipcMain.on("app:close", () => {
  app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  app.quit();
});
