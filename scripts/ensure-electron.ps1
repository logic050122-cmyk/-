$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$electronDir = Join-Path $root "node_modules\electron"
$electronExe = Join-Path $electronDir "dist\electron.exe"
$electronZip = Join-Path $root "electron.zip"
$installJs = Join-Path $electronDir "install.js"
$pathTxt = Join-Path $electronDir "path.txt"

if (Test-Path $electronExe) {
  Write-Host "Electron 已就绪。"
  exit 0
}

Write-Host "Electron 缺少 electron.exe，开始修复。"

if (Test-Path $electronZip) {
  Write-Host "使用项目里的 electron.zip 补齐 Electron。"

  $distDir = Join-Path $electronDir "dist"
  if (Test-Path $distDir) {
    Remove-Item -LiteralPath $distDir -Recurse -Force
  }

  New-Item -ItemType Directory -Force $distDir | Out-Null
  tar -xf $electronZip -C $distDir
  Set-Content -Path $pathTxt -Value "electron.exe" -NoNewline -Encoding ASCII
} elseif (Test-Path $installJs) {
  Write-Host "没有找到 electron.zip，尝试从镜像下载 Electron。"
  $env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
  $env:force_no_cache = "true"
  node $installJs
} else {
  Write-Host "请先执行 npm.cmd install。"
  exit 1
}

if (-not (Test-Path $electronExe)) {
  Write-Host "Electron 修复失败，请确认 electron.zip 是否在项目根目录。"
  exit 1
}

Write-Host "Electron 修复完成。"
