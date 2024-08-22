const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  saveFile: () => ipcRenderer.invoke("save-file"),
  openFolder: (folderPath) => ipcRenderer.invoke("open-folder", folderPath),
});
