const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const path = require("path");

let win = null;
let ignoreMouse = true;

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
      nodeIntegration: false
    }
  });

  win.setMenuBarVisibility(false);
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(path.join(__dirname, "index.html"));

  // Ctrl + Shift + Q：关闭程序
  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    app.quit();
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

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  app.quit();
});
