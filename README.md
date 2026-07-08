# 生日蛋糕透明悬浮全屏版

这个项目用于在电脑屏幕上显示生日蛋糕透明悬浮特效。

特点：

- 全屏透明悬浮层
- 不使用普通浏览器窗口展示
- 中间显示生日蛋糕视频
- 保留粒子、星星、发光特效
- 默认鼠标穿透，不影响原来打开的窗口

## 第一次安装

在项目目录执行：

```powershell
npm.cmd config set registry https://registry.npmmirror.com
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm.cmd install
```

## 运行

```powershell
npm.cmd run start
```

或者在 VS Code 里打开“运行和调试”，选择：

```text
运行生日蛋糕透明悬浮版
```

## 快捷键

```text
Ctrl + Shift + Q   关闭程序
Ctrl + Shift + M   切换鼠标穿透
```

## 文件说明

```text
package.json      项目依赖和启动命令
main.js           Electron 主进程，负责创建透明悬浮窗口
index.html        页面和特效代码
生日蛋糕3.mp4     视频素材，需要放在项目根目录
.vscode/          VS Code 调试配置
```

注意：如果你不想把 mp4 上传到 GitHub，可以自己把 `生日蛋糕3.mp4` 放到项目根目录。