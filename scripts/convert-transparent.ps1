$ErrorActionPreference = "Stop"

$similarity = if ($args.Count -ge 1) { $args[0] } else { "0.13" }
$blend = if ($args.Count -ge 2) { $args[1] } else { "0.08" }
$crf = if ($args.Count -ge 3) { $args[2] } else { "16" }
$sharpen = if ($args.Count -ge 4) { $args[3] } else { "0.45" }

$root = Split-Path -Parent $PSScriptRoot
$inputFile = Join-Path $root "生日蛋糕3.mp4"
$outputFile = Join-Path $root "生日蛋糕透明.webm"

$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpeg) {
  $wingetFfmpeg = Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1

  if (-not $wingetFfmpeg) {
    Write-Host "请先安装 FFmpeg。"
    exit 1
  }

  $ffmpegPath = $wingetFfmpeg.FullName
} else {
  $ffmpegPath = $ffmpeg.Source
}

if (-not (Test-Path $inputFile)) {
  Write-Host "请把视频放到项目根目录。"
  exit 1
}

Write-Host "开始转换：生日蛋糕3.mp4 -> 生日蛋糕透明.webm"
Write-Host "当前参数：similarity=$similarity blend=$blend crf=$crf sharpen=$sharpen"

& $ffmpegPath -y -i $inputFile -vf "format=rgba,unsharp=5:5:${sharpen}:3:3:0.25,colorkey=0x000000:${similarity}:${blend},format=yuva420p" -c:v libvpx-vp9 -b:v 0 -crf $crf -auto-alt-ref 0 $outputFile

Write-Host "转换完成：生日蛋糕透明.webm"
