# 生日蛋糕透明悬浮特效

## 运行步骤

1. 安装 Node.js LTS：

```text
https://nodejs.org/
```

2. 下载或克隆这个项目。

3. 在项目文件夹里打开 PowerShell。

4. 安装依赖：

```powershell
npm.cmd config set registry https://registry.npmmirror.com
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm.cmd install
```

安装时如果看到 `Electron 修复完成。` 是正常的，说明项目正在补齐 Electron。

5. 启动特效：

```powershell
npm.cmd run start
```

程序会自动播放完整生日蛋糕特效，约 13 秒后自动关闭。

## 常见问题

如果启动时报 Electron 安装不完整，执行：

```powershell
npm.cmd run ensure-electron
npm.cmd run start
```

如果还是失败，重新执行第 4 步的三行安装命令。

音乐文件是本地 `bgm.mp3`，不依赖网易云外链。
