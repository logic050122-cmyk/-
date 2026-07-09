const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("appControl", {
  close: () => ipcRenderer.send("app:close")
});
